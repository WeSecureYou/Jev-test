import {
  jevRequestSchema,
  jevResponseSchema,
  type FutureTrajectory,
  type JevRequest,
  type JevResponse,
} from "../types/jev.js";

const JEV_URL = "https://api.typesafe.ai/v1/systemone";
let hasWarnedAboutMock = false;

interface MockPreset {
  risk: number;
  trajectory: FutureTrajectory;
  accountability: number;
}

const HIGH_RISK_TERMS = [
  "data entry",
  "transcription",
  "telemarketer",
  "bookkeeping",
  "proofreader",
  "cashier",
  "clerk",
];
const TRENDING_TERMS = [
  "ai engineer",
  "machine learning",
  "cybersecurity",
  "nurse",
  "therapist",
  "electrician",
  "robotics",
  "renewable energy",
];
const ACCOUNTABILITY_TERMS = [
  "doctor",
  "nurse",
  "lawyer",
  "manager",
  "engineer",
  "teacher",
  "therapist",
  "electrician",
];

function includesAny(value: string, terms: readonly string[]): boolean {
  return terms.some((term) => value.includes(term));
}

function mockPreset(title: string, description?: string): MockPreset {
  const occupation = `${title} ${description ?? ""}`.toLowerCase();

  if (includesAny(occupation, HIGH_RISK_TERMS)) {
    return { risk: 0.82, trajectory: "high_layoff_risk", accountability: 0.28 };
  }

  if (includesAny(occupation, TRENDING_TERMS)) {
    return { risk: 0.18, trajectory: "ruling_trend", accountability: 0.84 };
  }

  if (includesAny(occupation, ACCOUNTABILITY_TERMS)) {
    return { risk: 0.32, trajectory: "transformed_hybrid", accountability: 0.9 };
  }

  return { risk: 0.48, trajectory: "transformed_hybrid", accountability: 0.65 };
}

function riskDistribution(risk: number): Record<string, number> {
  const scaled = risk * 4;
  const lower = Math.floor(scaled);
  const upper = Math.ceil(scaled);
  const probabilities: Record<string, number> = {
    "0": 0,
    "1": 0,
    "2": 0,
    "3": 0,
    "4": 0,
  };

  if (lower === upper) {
    probabilities[String(lower)] = 1;
  } else {
    probabilities[String(lower)] = Number((upper - scaled).toFixed(2));
    probabilities[String(upper)] = Number((scaled - lower).toFixed(2));
  }

  return probabilities;
}

function trajectoryDistribution(
  trajectory: FutureTrajectory,
): Record<FutureTrajectory, number> {
  const secondary: Record<FutureTrajectory, FutureTrajectory> = {
    high_layoff_risk: "transformed_hybrid",
    transformed_hybrid: "ruling_trend",
    ruling_trend: "transformed_hybrid",
  };
  const probabilities: Record<FutureTrajectory, number> = {
    high_layoff_risk: 0.06,
    transformed_hybrid: 0.06,
    ruling_trend: 0.06,
  };
  probabilities[trajectory] = 0.78;
  probabilities[secondary[trajectory]] += 0.1;
  return probabilities;
}

function createMockResponse(request: JevRequest): JevResponse {
  const preset = mockPreset(request.state.title, request.state.description);

  return jevResponseSchema.parse({
    model: "jev-latest-mock",
    answers: {
      layoff_risk: {
        type: "score",
        score: preset.risk * 4,
        legend: {
          "0": "Minimal displacement exposure",
          "1": "Limited task automation",
          "2": "Material role transformation",
          "3": "High displacement pressure",
          "4": "Severe near-term displacement risk",
        },
        probabilities: riskDistribution(preset.risk),
        confidence: 0.76,
      },
      future_trajectory: {
        type: "choice",
        choice: preset.trajectory,
        probabilities: trajectoryDistribution(preset.trajectory),
        confidence: 0.72,
      },
      human_accountability: {
        type: "noul",
        noul: preset.accountability,
      },
    },
    usage: { input_tokens: 0, output_tokens: 0 },
  });
}

export interface JevEvaluation {
  response: JevResponse;
  source: "jev" | "mock";
}

export function getJevApiKey(): string | undefined {
  return process.env.JEV_API_KEY?.trim() || undefined;
}

export async function evaluateWithJev(request: JevRequest): Promise<JevEvaluation> {
  const payload = jevRequestSchema.parse(request);
  const apiKey = getJevApiKey();

  if (!apiKey) {
    if (!hasWarnedAboutMock) {
      console.warn("JEV_API_KEY is not set; using deterministic mock analysis.");
      hasWarnedAboutMock = true;
    }
    return { response: createMockResponse(payload), source: "mock" };
  }

  const response = await fetch(JEV_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
    signal: AbortSignal.timeout(30_000),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Jev API request failed (${response.status}): ${body.slice(0, 500)}`);
  }

  return {
    response: jevResponseSchema.parse(await response.json()),
    source: "jev",
  };
}

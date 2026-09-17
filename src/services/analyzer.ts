import {
  analyzeInputSchema,
  jevRequestSchema,
  riskProfileSchema,
  type AnalyzeInput,
  type JevRequest,
  type RiskProfile,
} from "../types/jev.js";
import { evaluateWithJev } from "./jevClient.js";

const MAX_LAYOFF_LEVEL = 4;

function roundMetric(value: number): number {
  return Math.round(value * 1000) / 1000;
}

export function createAnalysisRequest(input: AnalyzeInput): JevRequest {
  return jevRequestSchema.parse({
    state: {
      title: input.title,
      ...(input.description ? { description: input.description } : {}),
      forecast_horizon: "The next 5 to 10 years from the present day",
    },
    model: "jev-latest",
    questions: {
      layoff_risk: {
        type: "score",
        instructions:
          "How exposed is this occupation to AI-driven layoffs or substantial headcount reduction over the forecast horizon? Judge the occupation, not one individual worker.",
        criteria: [
          "Minimal displacement exposure; physical presence, trust, or scarce expertise keeps demand durable",
          "Limited task automation; AI assists the role but rarely removes positions",
          "Material role transformation; routine tasks shrink while human-led work remains",
          "High displacement pressure; many core tasks can be automated and staffing likely contracts",
          "Severe near-term displacement risk; most core output is automatable with little human involvement",
        ],
      },
      future_trajectory: {
        type: "choice",
        instructions:
          "Which labor-market trajectory best fits this occupation over the forecast horizon?",
        criteria: {
          high_layoff_risk:
            "Demand and headcount decline substantially because AI substitutes for core work",
          transformed_hybrid:
            "The occupation persists but becomes an AI-augmented hybrid with changed skills and workflows",
          ruling_trend:
            "The occupation is positioned for strong demand, influence, or strategic importance",
        },
      },
      human_accountability: {
        type: "noul",
        instructions:
          "Does this occupation require a human to remain meaningfully accountable for consequential decisions, safety, trust, or real-world outcomes?",
        criteria: {
          true: "A responsible human must own important outcomes or interpersonal trust",
          false: "Outputs can usually be automated with little need for accountable human judgment",
        },
      },
    },
  });
}

export async function analyzeOccupation(rawInput: AnalyzeInput): Promise<RiskProfile> {
  const input = analyzeInputSchema.parse(rawInput);
  const { response, source } = await evaluateWithJev(createAnalysisRequest(input));
  const layoffRisk = Math.min(
    1,
    Math.max(0, response.answers.layoff_risk.score / MAX_LAYOFF_LEVEL),
  );
  const humanAccountability = response.answers.human_accountability.noul;
  const trajectoryBoost =
    response.answers.future_trajectory.choice === "ruling_trend"
      ? 0.1
      : response.answers.future_trajectory.choice === "high_layoff_risk"
        ? -0.1
        : 0;
  const resilienceScore = Math.min(
    1,
    Math.max(0, 0.65 * (1 - layoffRisk) + 0.35 * humanAccountability + trajectoryBoost),
  );

  return riskProfileSchema.parse({
    title: input.title,
    ...(input.description ? { description: input.description } : {}),
    layoffRisk: roundMetric(layoffRisk),
    futureTrajectory: response.answers.future_trajectory.choice,
    trajectoryConfidence: response.answers.future_trajectory.confidence,
    humanAccountability: roundMetric(humanAccountability),
    resilienceScore: roundMetric(resilienceScore),
    source,
    model: response.model,
  });
}

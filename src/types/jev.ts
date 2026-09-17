import { z } from "zod";

export const probabilitySchema = z.number().min(0).max(1);
export const futureTrajectorySchema = z.enum([
  "high_layoff_risk",
  "transformed_hybrid",
  "ruling_trend",
]);

export const jevNoulQuestionSchema = z.object({
  type: z.literal("noul"),
  instructions: z.string().min(1),
  criteria: z
    .object({
      true: z.string().min(1),
      false: z.string().min(1),
    })
    .optional(),
});

export const jevChoiceQuestionSchema = z.object({
  type: z.literal("choice"),
  instructions: z.string().min(1),
  criteria: z.record(z.string().min(1), z.string().nullable()),
});

export const jevScoreQuestionSchema = z.object({
  type: z.literal("score"),
  instructions: z.string().min(1),
  criteria: z.array(z.string().min(1)).min(2).max(10),
});

export const jevQuestionSchema = z.discriminatedUnion("type", [
  jevNoulQuestionSchema,
  jevChoiceQuestionSchema,
  jevScoreQuestionSchema,
]);

export const occupationStateSchema = z.object({
  title: z.string().trim().min(1).max(200),
  description: z.string().trim().max(4000).optional(),
  forecast_horizon: z.string().min(1),
});

export const jevRequestSchema = z.object({
  state: occupationStateSchema,
  model: z.literal("jev-latest"),
  questions: z.object({
    layoff_risk: jevScoreQuestionSchema,
    future_trajectory: jevChoiceQuestionSchema,
    human_accountability: jevNoulQuestionSchema,
  }),
});

export const scoreAnswerSchema = z.object({
  type: z.literal("score"),
  score: z.number().min(0),
  legend: z.record(z.string(), z.string()),
  probabilities: z.record(z.string(), probabilitySchema),
  confidence: probabilitySchema,
});

export const choiceAnswerSchema = z.object({
  type: z.literal("choice"),
  choice: futureTrajectorySchema,
  probabilities: z.object({
    high_layoff_risk: probabilitySchema,
    transformed_hybrid: probabilitySchema,
    ruling_trend: probabilitySchema,
  }),
  confidence: probabilitySchema,
});

export const noulAnswerSchema = z.object({
  type: z.literal("noul"),
  noul: probabilitySchema,
});

export const jevResponseSchema = z.object({
  model: z.string().min(1),
  answers: z.object({
    layoff_risk: scoreAnswerSchema,
    future_trajectory: choiceAnswerSchema,
    human_accountability: noulAnswerSchema,
  }),
  usage: z.object({
    input_tokens: z.number().int().nonnegative(),
    output_tokens: z.number().int().nonnegative(),
  }),
});

export const analyzeInputSchema = z.object({
  title: z.string().trim().min(1, "title is required").max(200),
  description: z.string().trim().max(4000).optional(),
});

export const riskProfileSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  layoffRisk: probabilitySchema,
  futureTrajectory: futureTrajectorySchema,
  trajectoryConfidence: probabilitySchema,
  humanAccountability: probabilitySchema,
  resilienceScore: probabilitySchema,
  source: z.enum(["jev", "mock"]),
  model: z.string(),
});

export type JevQuestion = z.infer<typeof jevQuestionSchema>;
export type JevRequest = z.infer<typeof jevRequestSchema>;
export type JevResponse = z.infer<typeof jevResponseSchema>;
export type AnalyzeInput = z.infer<typeof analyzeInputSchema>;
export type FutureTrajectory = z.infer<typeof futureTrajectorySchema>;
export type RiskProfile = z.infer<typeof riskProfileSchema>;

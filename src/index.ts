export { analyzeOccupation, createAnalysisRequest } from "./services/analyzer.js";
export { buildServer } from "./server/app.js";
export type {
  AnalyzeInput,
  FutureTrajectory,
  JevRequest,
  JevResponse,
  RiskProfile,
} from "./types/jev.js";

import { buildServer } from "./server/app.js";

const app = buildServer();

export default app;

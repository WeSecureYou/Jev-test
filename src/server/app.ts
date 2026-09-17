import Fastify, { type FastifyInstance } from "fastify";
import { pathToFileURL } from "node:url";
import { ZodError } from "zod";
import { analyzeOccupation } from "../services/analyzer.js";
import { analyzeInputSchema } from "../types/jev.js";

export function buildServer(): FastifyInstance {
  const app = Fastify({ logger: true });

  app.get("/health", async () => ({ status: "ok" }));

  app.post("/api/analyze", async (request, reply) => {
    try {
      const input = analyzeInputSchema.parse(request.body);
      return await analyzeOccupation(input);
    } catch (error) {
      if (error instanceof ZodError) {
        return reply.status(400).send({
          error: "Invalid request",
          issues: error.issues.map((issue) => ({
            path: issue.path.join("."),
            message: issue.message,
          })),
        });
      }
      throw error;
    }
  });

  app.setErrorHandler((error, _request, reply) => {
    app.log.error(error);
    void reply.status(502).send({ error: "Occupation analysis failed" });
  });

  return app;
}

async function start(): Promise<void> {
  const port = Number.parseInt(process.env.PORT ?? "3000", 10);
  const host = process.env.HOST ?? "0.0.0.0";
  await buildServer().listen({ port, host });
}

const isMain = process.argv[1]
  ? import.meta.url === pathToFileURL(process.argv[1]).href
  : false;

if (isMain) {
  start().catch((error: unknown) => {
    console.error(error);
    process.exitCode = 1;
  });
}

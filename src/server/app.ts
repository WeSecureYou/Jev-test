import Fastify, { type FastifyInstance } from "fastify";
import type { IncomingMessage, ServerResponse } from "node:http";
import { pathToFileURL } from "node:url";
import { ZodError } from "zod";
import { analyzeOccupation } from "../services/analyzer.js";
import { getJevApiKey } from "../services/jevClient.js";
import { analyzeInputSchema } from "../types/jev.js";
import { HOME_PAGE } from "./web.js";

export function buildServer(): FastifyInstance {
  const app = Fastify({ logger: true });

  app.get("/", async (_request, reply) => {
    return reply.type("text/html; charset=utf-8").send(HOME_PAGE);
  });

  app.get("/health", async (_request, reply) => {
    reply.header("Cache-Control", "no-store");
    return {
      status: "ok",
      analysisMode: getJevApiKey() ? "jev" : "mock",
    };
  });

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

const app = buildServer();

export default async function handler(
  request: IncomingMessage,
  response: ServerResponse,
): Promise<void> {
  await app.ready();
  app.server.emit("request", request, response);
}

async function start(): Promise<void> {
  const port = Number.parseInt(process.env.PORT ?? "3000", 10);
  const host = process.env.HOST ?? "0.0.0.0";
  await app.listen({ port, host });
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

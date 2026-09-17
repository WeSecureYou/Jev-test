# Job Risk Analyzer

A TypeScript/Node.js CLI and REST API that uses TypeSafe AI's Jev System One model to evaluate an occupation's exposure to AI-driven layoffs, likely future trajectory, need for human accountability, and overall resilience.

The project works immediately without credentials. When `JEV_API_KEY` is absent, it logs a warning and uses deterministic, occupation-aware mock data with the same validated shape as a live Jev response.

## Requirements

- Node.js 20 or newer
- npm
- Optional: a TypeSafe AI API key for live analysis

## Setup

```bash
npm install
cp .env.example .env
```

Environment variables are read from the process. Export the key before running the app:

```bash
export JEV_API_KEY="your-api-key"
```

If the variable is unset or blank, the CLI and server automatically use mock evaluations.

## CLI

Run through the npm script:

```bash
npm run cli -- --title "Data Entry Clerk"
npm run cli -- --title "Cybersecurity Analyst" --desc "Protects cloud infrastructure and responds to incidents"
```

Or invoke `tsx` directly:

```bash
npx tsx src/cli/index.ts --title "Data Entry Clerk"
```

The table reports layoff risk, future trajectory, trajectory confidence, human-accountability probability, and a derived resilience score.

## REST API

Start the server:

```bash
npm run server
```

Development mode restarts when TypeScript files change:

```bash
npm run dev
```

The server listens on `0.0.0.0:3000` by default. Override it with `HOST` and `PORT`.

Open `http://localhost:3000` in a browser to use the responsive web interface. Enter an occupation and optional role context, then select **Run occupation forecast**. The page calls the REST API from the browser and displays the risk forecast in the report panel.

Analyze an occupation:

```bash
curl -X POST http://localhost:3000/api/analyze \
  -H "Content-Type: application/json" \
  -d '{"title":"Registered Nurse","description":"Provides bedside care in an acute hospital"}'
```

Health check:

```bash
curl http://localhost:3000/health
```

## Deploy to Vercel

Vercel detects the Fastify entrypoint in `src/index.ts` without additional configuration:

```bash
npx vercel deploy --prod
```

Add `JEV_API_KEY` in the Vercel project's environment variables to use live Jev analysis. Without it, the deployed API uses the typed mock fallback.

## Scripts

| Script | Purpose |
| --- | --- |
| `npm run dev` | Run the API server in watch mode |
| `npm run cli -- --title "..."` | Run an occupation analysis |
| `npm run server` | Start the API server |
| `npm run typecheck` | Run strict TypeScript checks |

## How It Works

The analyzer sends three independent questions in one `POST https://api.typesafe.ai/v1/systemone` request using model `jev-latest`:

- `layoff_risk`: a five-level Score normalized to `0..1` in application code
- `future_trajectory`: a Choice among `high_layoff_risk`, `transformed_hybrid`, and `ruling_trend`
- `human_accountability`: a Noul probability that a human must remain accountable for consequential outcomes

The resilience score is a transparent application-level calculation combining inverse layoff risk, human accountability, and a small trajectory adjustment. Results are forecasts, not employment or financial advice.

## Example Response

```json
{
  "title": "Data Entry Clerk",
  "layoffRisk": 0.82,
  "futureTrajectory": "high_layoff_risk",
  "trajectoryConfidence": 0.72,
  "humanAccountability": 0.28,
  "resilienceScore": 0.115,
  "source": "mock",
  "model": "jev-latest-mock"
}
```

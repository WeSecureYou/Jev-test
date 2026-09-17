#!/usr/bin/env node
import chalk from "chalk";
import Table from "cli-table3";
import { Command } from "commander";
import { analyzeOccupation } from "../services/analyzer.js";
import type { FutureTrajectory, RiskProfile } from "../types/jev.js";

interface CliOptions {
  title: string;
  desc?: string;
}

const trajectoryLabels: Record<FutureTrajectory, string> = {
  high_layoff_risk: "HIGH LAYOFF RISK",
  transformed_hybrid: "TRANSFORMED HYBRID",
  ruling_trend: "RULING / TRENDING",
};

function percent(value: number): string {
  return `${Math.round(value * 100)}%`;
}

function riskBadge(risk: number): string {
  if (risk >= 0.7) return chalk.bgRed.white.bold(" HIGH ");
  if (risk >= 0.4) return chalk.bgYellow.black.bold(" MEDIUM ");
  return chalk.bgGreen.black.bold(" LOW ");
}

function trajectoryBadge(trajectory: FutureTrajectory): string {
  const label = trajectoryLabels[trajectory];
  if (trajectory === "high_layoff_risk") return chalk.red.bold(label);
  if (trajectory === "ruling_trend") return chalk.green.bold(label);
  return chalk.yellow.bold(label);
}

function renderProfile(profile: RiskProfile): void {
  const table = new Table({
    head: [chalk.cyan.bold("Metric"), chalk.cyan.bold("Assessment")],
    colWidths: [26, 48],
    wordWrap: true,
  });

  table.push(
    ["Occupation", chalk.bold(profile.title)],
    ["AI layoff risk", `${percent(profile.layoffRisk)}  ${riskBadge(profile.layoffRisk)}`],
    ["Future trajectory", trajectoryBadge(profile.futureTrajectory)],
    ["Trajectory confidence", percent(profile.trajectoryConfidence)],
    ["Human accountability", percent(profile.humanAccountability)],
    ["Resilience score", chalk.bold(percent(profile.resilienceScore))],
    ["Analysis source", profile.source === "mock" ? chalk.dim("Mock fallback") : "TypeSafe Jev"],
  );

  console.log(`\n${chalk.bold.cyan("JOB RISK ANALYZER")}\n`);
  console.log(table.toString());
  if (profile.source === "mock") {
    console.log(chalk.dim("\nSet JEV_API_KEY to replace the mock with a live Jev evaluation."));
  }
}

const program = new Command()
  .name("job-risk-analyzer")
  .description("Evaluate an occupation's AI layoff risk and future trajectory")
  .requiredOption("--title <job>", "occupation or job title")
  .option("--desc <details>", "optional role description")
  .showHelpAfterError();

program.parse();
const options = program.opts<CliOptions>();

try {
  const profile = await analyzeOccupation({
    title: options.title,
    ...(options.desc ? { description: options.desc } : {}),
  });
  renderProfile(profile);
} catch (error) {
  const message = error instanceof Error ? error.message : "Unknown analysis error";
  console.error(chalk.red(`Analysis failed: ${message}`));
  process.exitCode = 1;
}

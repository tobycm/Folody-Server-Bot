import { execSync } from "child_process";

export function secondsToTime(rawSeconds: number, colons?: true, doubleZeroInMinute?: true, day?: true): string {
  rawSeconds = Math.round(rawSeconds); // cho chắc

  const days = day ? Math.floor(rawSeconds / 86400) : 0;
  const hours = Math.floor((rawSeconds - days * 86400) / 3600);
  const minutes = Math.floor((rawSeconds - hours * 3600) / 60);
  const seconds = rawSeconds - hours * 3600 - minutes * 60;

  let output = "";

  if (days > 0) output += `${days}d `;
  if (hours > 0) output += `${hours}${colons ? ":" : "h "}`;
  if (minutes < 10 && doubleZeroInMinute) output += "0";
  output += minutes;
  output += colons ? ":" : "m ";
  if (seconds < 10) output += "0";
  output += seconds;
  if (!colons) output += "s";

  return output;
}

export function randomString(length: number) {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) result += characters.charAt(Math.floor(Math.random() * characters.length));
  return result;
}

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function getCurrentGitHash() {
  return execSync("git rev-parse HEAD").toString().trim();
}

export function getCurrentGitBranch() {
  return execSync("git rev-parse --abbrev-ref HEAD").toString().trim();
}

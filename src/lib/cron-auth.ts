import { NextRequest } from "next/server";

const CRON_SECRET = process.env.CRON_SECRET;

export function validateCronAuth(req: NextRequest): boolean {
  if (!CRON_SECRET) {
    console.error("CRON_SECRET environment variable is not set");
    return false;
  }
  const header = req.headers.get("x-cron-secret");
  const url = new URL(req.url);
  const query = url.searchParams.get("secret");
  return header === CRON_SECRET || query === CRON_SECRET;
}

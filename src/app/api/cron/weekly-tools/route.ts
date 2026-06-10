import { NextRequest, NextResponse } from "next/server";
import { validateCronAuth } from "@/lib/cron-auth";
import { generateTools } from "@/lib/content-generator";
import pool from "@/lib/db";

export async function GET(req: NextRequest) {
  if (!validateCronAuth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    console.log("[cron:weekly-tools] Generating tools...");
    const tools = await generateTools(5);
    let inserted = 0;

    for (const t of tools) {
      try {
        await pool.query(
          `INSERT INTO tools (name, slug, url, description, description_zh, category, tags, pricing, logo, featured, source) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'ai_generated')`,
          [t.name, t.slug, t.url, t.description, t.description_zh, t.category, JSON.stringify(t.tags), t.pricing, t.logo, t.featured]
        );
        inserted++;
        console.log(`[cron:weekly-tools] ✓ ${t.name}`);
      } catch (err: any) {
        if (err.code === "ER_DUP_ENTRY") { console.log(`[cron:weekly-tools] Skip dup: ${t.slug}`); continue; }
        console.error(`[cron:weekly-tools] ✗ ${err.message}`);
      }
    }

    return NextResponse.json({ success: true, generated: tools.length, inserted, timestamp: new Date().toISOString() });
  } catch (error: any) {
    return NextResponse.json({ error: "Generation failed", detail: error.message }, { status: 500 });
  }
}

export { GET as POST };

import { NextRequest, NextResponse } from "next/server";
import { validateCronAuth } from "@/lib/cron-auth";
import { generateArticles } from "@/lib/content-generator";
import pool from "@/lib/db";

export async function GET(req: NextRequest) {
  if (!validateCronAuth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    console.log("[cron:daily-news] Generating articles...");
    const articles = await generateArticles(3);
    let inserted = 0;

    for (const a of articles) {
      try {
        await pool.query(
          `INSERT INTO news (title, slug, date, category, excerpt, tags, content, source) VALUES (?, ?, ?, ?, ?, ?, ?, 'ai_generated')`,
          [a.title, a.slug, a.date, a.category, a.excerpt, JSON.stringify(a.tags), a.content]
        );
        inserted++;
        console.log(`[cron:daily-news] ✓ ${a.title}`);
      } catch (err: any) {
        if (err.code === "ER_DUP_ENTRY") { console.log(`[cron:daily-news] Skip dup: ${a.slug}`); continue; }
        console.error(`[cron:daily-news] ✗ ${err.message}`);
      }
    }

    return NextResponse.json({ success: true, generated: articles.length, inserted, timestamp: new Date().toISOString() });
  } catch (error: any) {
    return NextResponse.json({ error: "Generation failed", detail: error.message }, { status: 500 });
  }
}

export { GET as POST };

/**
 * AITools Global - Content Generation Script
 * Run by GitHub Actions to generate new tools and news articles.
 * Updates JSON data files, then commits and pushes changes.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const TOOLS_FILE = path.join(__dirname, "..", "src", "data", "tools.json");
const NEWS_FILE = path.join(__dirname, "..", "src", "data", "news.json");

const API_KEY = process.env.LLM_API_KEY;
const BASE_URL = process.env.LLM_BASE_URL || "https://api.deepseek.com/v1";
const MODEL = process.env.LLM_MODEL || "deepseek-chat";
const MODE = process.argv[2] || "news"; // "news" | "tools" | "both"

if (!API_KEY) { console.error("LLM_API_KEY required"); process.exit(1); }

async function callLLM(prompt) {
  const res = await fetch(`${BASE_URL}/chat/completions`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${API_KEY}` },
    body: JSON.stringify({ model: MODEL, messages: [
      { role: "system", content: "You are a JSON data generator. Output ONLY valid JSON, no markdown." },
      { role: "user", content: prompt + "\n\nOutput pure JSON, no markdown fences." }
    ], temperature: 0.8, max_tokens: 4096, response_format: { type: "json_object" } })
  });
  const data = await res.json();
  const text = data.choices[0]?.message?.content || "{}";
  return JSON.parse(text.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/i, ""));
}

async function generateNews(count = 3) {
  const today = new Date().toISOString().split("T")[0];
  console.log(`Generating ${count} news articles...`);
  const result = await callLLM(`Write ${count} AI industry news articles dated ${today}. Each has: title, slug, date, category, excerpt, tags[], content (Markdown, 500-800 words). Diverse topics. Output: {"articles": [...]}`);
  return (result.articles || []).map(a => ({ ...a, date: today }));
}

async function generateTools(count = 3) {
  console.log(`Generating ${count} AI tools...`);
  const result = await callLLM(`Recommend ${count} real AI tools (global, not China-only). Each has: id (unique-slug), name, url (real URL), description, descriptionZh (Chinese), category, tags[], pricing (Free/Freemium/Paid/Open Source), logo (single emoji), featured (boolean). Output: {"tools": [...]}`);
  return result.tools || [];
}

async function main() {
  if (MODE === "news" || MODE === "both") {
    const existingNews = JSON.parse(fs.readFileSync(NEWS_FILE, "utf-8"));
    const newArticles = await generateNews(3);
    const existingSlugs = new Set(existingNews.map(n => n.slug));
    const added = newArticles.filter(a => { if (existingSlugs.has(a.slug)) { console.log(`Skip dup: ${a.slug}`); return false; } return true; });
    if (added.length > 0) {
      const updated = [...added, ...existingNews];
      fs.writeFileSync(NEWS_FILE, JSON.stringify(updated, null, 2) + "\n");
      console.log(`Added ${added.length} articles. Total: ${updated.length}`);
    }
  }

  if (MODE === "tools" || MODE === "both") {
    const existingTools = JSON.parse(fs.readFileSync(TOOLS_FILE, "utf-8"));
    const newTools = await generateTools(3);
    const existingIds = new Set(existingTools.map(t => t.id));
    const added = newTools.filter(t => { if (existingIds.has(t.id)) { console.log(`Skip dup: ${t.id}`); return false; } return true; });
    if (added.length > 0) {
      const updated = [...existingTools, ...added];
      fs.writeFileSync(TOOLS_FILE, JSON.stringify(updated, null, 2) + "\n");
      console.log(`Added ${added.length} tools. Total: ${updated.length}`);
    }
  }
}

main().catch(e => { console.error(e.message); process.exit(1); });

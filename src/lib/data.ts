import pool from "./db";
import { tools as staticTools, categories as staticCategories } from "@/data/tools";
import { newsArticles as staticNews } from "@/data/news";
import type { Tool as StaticTool } from "@/data/tools";
import type { NewsArticle } from "@/data/news";

// ---- Types (DB versions include DB fields) ----

export interface DBTool {
  id: number;
  name: string;
  slug: string;
  url: string;
  description: string;
  description_zh: string;
  category: string;
  tags: string;
  pricing: string;
  logo: string;
  featured: number;
  source: string;
}

export interface DBCategory {
  slug: string;
  name: string;
  nameZh: string;
  icon: string;
  count: number;
}

const categoryMap: Record<string, { name: string; nameZh: string; icon: string }> = {
  "text-generation": { name: "Text & Chat", nameZh: "文本对话", icon: "💬" },
  "image-generation": { name: "Image Generation", nameZh: "图像生成", icon: "🎨" },
  "code-assistant": { name: "Code Assistant", nameZh: "代码助手", icon: "💻" },
  "video-generation": { name: "Video Generation", nameZh: "视频生成", icon: "🎬" },
  "voice-ai": { name: "Voice & Audio", nameZh: "语音音频", icon: "🎙️" },
  productivity: { name: "Productivity", nameZh: "效率工具", icon: "⚡" },
  "data-analysis": { name: "Data & Analytics", nameZh: "数据分析", icon: "📊" },
  "design-tool": { name: "Design Tools", nameZh: "设计工具", icon: "✏️" },
};

function formatTool(t: DBTool): StaticTool {
  let tags: string[] = [];
  try { tags = JSON.parse(t.tags); } catch { tags = []; }
  return {
    id: t.slug,
    name: t.name,
    url: t.url,
    description: t.description,
    descriptionZh: t.description_zh,
    category: t.category,
    tags,
    pricing: t.pricing as StaticTool["pricing"],
    logo: t.logo,
    featured: t.featured === 1,
  };
}

// ---- DB Readers (with static fallback) ----

async function dbReady(): Promise<boolean> {
  try {
    await pool.query("SELECT 1");
    return true;
  } catch {
    return false;
  }
}

// Tools
export async function getAllTools(): Promise<StaticTool[]> {
  if (!(await dbReady())) return staticTools;
  try {
    const [rows] = await pool.query("SELECT * FROM tools ORDER BY featured DESC, created_at DESC") as any;
    return rows.map(formatTool);
  } catch { return staticTools; }
}

export async function getFeaturedTools(): Promise<StaticTool[]> {
  if (!(await dbReady())) return staticTools.filter((t) => t.featured);
  try {
    const [rows] = await pool.query("SELECT * FROM tools WHERE featured = 1 ORDER BY created_at DESC") as any;
    return (rows as DBTool[]).map(formatTool);
  } catch { return staticTools.filter((t) => t.featured); }
}

export async function getToolsByCategory(category: string): Promise<StaticTool[]> {
  if (!(await dbReady())) return staticTools.filter((t) => t.category === category);
  try {
    const [rows] = await pool.query("SELECT * FROM tools WHERE category = ? ORDER BY featured DESC", [category]) as any;
    return (rows as DBTool[]).map(formatTool);
  } catch { return staticTools.filter((t) => t.category === category); }
}

export async function searchTools(query: string): Promise<StaticTool[]> {
  if (!(await dbReady())) {
    const q = query.toLowerCase();
    return staticTools.filter((t) =>
      t.name.toLowerCase().includes(q) || t.description.toLowerCase().includes(q) || t.descriptionZh.includes(q) ||
      t.tags.some((tag) => tag.toLowerCase().includes(q)) || t.category.includes(q)
    );
  }
  try {
    const [rows] = await pool.query(
      "SELECT * FROM tools WHERE name LIKE ? OR description LIKE ? OR description_zh LIKE ? OR category LIKE ?",
      [`%${query}%`, `%${query}%`, `%${query}%`, `%${query}%`]
    ) as any;
    return (rows as DBTool[]).map(formatTool);
  } catch { return []; }
}

export async function getCategories(): Promise<DBCategory[]> {
  if (!(await dbReady())) return staticCategories.map((c) => ({ ...c }));
  try {
    const [rows] = await pool.query(
      "SELECT category, COUNT(*) as count FROM tools GROUP BY category"
    ) as any;
    return (rows as any[]).map((r: any) => ({
      slug: r.category,
      name: categoryMap[r.category]?.name || r.category,
      nameZh: categoryMap[r.category]?.nameZh || r.category,
      icon: categoryMap[r.category]?.icon || "🔧",
      count: r.count,
    }));
  } catch { return staticCategories.map((c) => ({ slug: c.slug, name: c.name, nameZh: c.nameZh, icon: c.icon, count: c.count })); }
}

// News
export async function getAllNews(): Promise<NewsArticle[]> {
  if (!(await dbReady())) return staticNews;
  try {
    const [rows] = await pool.query("SELECT * FROM news ORDER BY date DESC") as any;
    return (rows as any[]).map((r: any) => ({
      slug: r.slug,
      title: r.title,
      date: typeof r.date === "string" ? r.date : r.date.toISOString().split("T")[0],
      category: r.category,
      excerpt: r.excerpt,
      tags: JSON.parse(r.tags || "[]"),
      content: r.content,
    }));
  } catch { return staticNews; }
}

export async function getNewsBySlug(slug: string): Promise<NewsArticle | undefined> {
  if (!(await dbReady())) return staticNews.find((a) => a.slug === slug);
  try {
    const [rows] = await pool.query("SELECT * FROM news WHERE slug = ?", [slug]) as any;
    if (!(rows as any[]).length) return undefined;
    const r = (rows as any[])[0];
    return {
      slug: r.slug, title: r.title,
      date: typeof r.date === "string" ? r.date : r.date.toISOString().split("T")[0],
      category: r.category, excerpt: r.excerpt,
      tags: JSON.parse(r.tags || "[]"), content: r.content,
    };
  } catch { return staticNews.find((a) => a.slug === slug); }
}

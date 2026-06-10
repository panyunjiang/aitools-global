import toolsData from "@/data/tools.json";
import newsData from "@/data/news.json";
import type { NewsArticle } from "@/data/news";

export interface Tool {
  id: string;
  name: string;
  url: string;
  description: string;
  descriptionZh: string;
  category: string;
  tags: string[];
  pricing: "Free" | "Freemium" | "Paid" | "Open Source";
  logo: string;
  featured: boolean;
}

export interface Category {
  slug: string;
  name: string;
  nameZh: string;
  icon: string;
  count: number;
}

const categoryMeta: Record<string, { name: string; nameZh: string; icon: string }> = {
  "text-generation": { name: "Text & Chat", nameZh: "文本对话", icon: "💬" },
  "image-generation": { name: "Image Generation", nameZh: "图像生成", icon: "🎨" },
  "code-assistant": { name: "Code Assistant", nameZh: "代码助手", icon: "💻" },
  "video-generation": { name: "Video Generation", nameZh: "视频生成", icon: "🎬" },
  "voice-ai": { name: "Voice & Audio", nameZh: "语音音频", icon: "🎙️" },
  productivity: { name: "Productivity", nameZh: "效率工具", icon: "⚡" },
  "data-analysis": { name: "Data & Analytics", nameZh: "数据分析", icon: "📊" },
  "design-tool": { name: "Design Tools", nameZh: "设计工具", icon: "✏️" },
};

const tools: Tool[] = toolsData as Tool[];
const news: NewsArticle[] = newsData as NewsArticle[];

export function getAllTools(): Tool[] { return tools; }
export function getFeaturedTools(): Tool[] { return tools.filter((t) => t.featured); }
export function getToolsByCategory(category: string): Tool[] { return tools.filter((t) => t.category === category); }

export function searchTools(query: string): Tool[] {
  const q = query.toLowerCase();
  return tools.filter((t) =>
    t.name.toLowerCase().includes(q) || t.description.toLowerCase().includes(q) ||
    t.descriptionZh.includes(q) || t.tags.some((tag) => tag.toLowerCase().includes(q)) ||
    t.category.includes(q)
  );
}

export function getCategories(): Category[] {
  const counts: Record<string, number> = {};
  tools.forEach((t) => { counts[t.category] = (counts[t.category] || 0) + 1; });
  return Object.entries(counts).map(([slug, count]) => ({
    slug, count, ...(categoryMeta[slug] || { name: slug, nameZh: slug, icon: "🔧" }),
  }));
}

export function getAllNews(): NewsArticle[] { return news; }
export function getNewsBySlug(slug: string): NewsArticle | undefined { return news.find((a) => a.slug === slug); }

import { generateJSON } from "./llm";

// ---- 工具生成 ----

interface RawTool {
  name: string;
  slug: string;
  url: string;
  description: string;
  description_zh: string;
  category: string;
  tags: string[];
  pricing: string;
  logo: string;
  featured: boolean;
}

export async function generateTools(count = 5): Promise<RawTool[]> {
  const prompt = `推荐${count}个2026年值得关注的AI工具（国际产品，非中国特供）。
每个工具包含：
- name: 工具名称
- slug: URL友好的英文标识（如 chatgpt, claude-ai）
- url: 官方网站URL（必须真实存在）
- description: 英文简介，50-100字
- description_zh: 中文简介，50-100字
- category: 分类（text-generation / image-generation / code-assistant / video-generation / voice-ai / productivity / data-analysis / design-tool）
- tags: 3-5个英文标签数组
- pricing: Free / Freemium / Paid / Open Source
- logo: 单一emoji表情作为图标
- featured: 是否推荐为精选（1-2个为true，其余false）

只推荐真实存在的AI工具。`;

  const result = await generateJSON<{ tools: RawTool[] }>(
    prompt + '\n格式：{"tools": [...]}'
  );
  return result.tools || [];
}

// ---- 文章生成 ----

interface RawArticle {
  title: string;
  slug: string;
  date: string;
  category: string;
  excerpt: string;
  tags: string[];
  content: string;
}

export async function generateArticles(count = 3): Promise<RawArticle[]> {
  const today = new Date().toISOString().split("T")[0];
  const prompt = `写${count}篇AI行业英文资讯文章（也可含中文摘要），日期为${today}。
每篇包含：
- title: 英文标题（吸引人，15-25词）
- slug: URL slug
- date: "${today}"
- category: OpenAI / Anthropic / Google / DevTools / AI Art / Open Source / Trends 之一
- excerpt: 英文摘要，50-80词
- tags: 3-5个标签
- content: 完整Markdown文章，800-1500词，H2/H3标题，列表等

主题多样化，有深度。输出纯JSON。`;

  const result = await generateJSON<{ articles: RawArticle[] }>(
    prompt + '\n格式：{"articles": [...]}'
  );
  return result.articles || [];
}

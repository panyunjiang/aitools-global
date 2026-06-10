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

export const categories: Category[] = [
  { slug: "text-generation", name: "Text & Chat", nameZh: "文本对话", icon: "💬", count: 12 },
  { slug: "image-generation", name: "Image Generation", nameZh: "图像生成", icon: "🎨", count: 8 },
  { slug: "code-assistant", name: "Code Assistant", nameZh: "代码助手", icon: "💻", count: 10 },
  { slug: "video-generation", name: "Video Generation", nameZh: "视频生成", icon: "🎬", count: 6 },
  { slug: "voice-ai", name: "Voice & Audio", nameZh: "语音音频", icon: "🎙️", count: 5 },
  { slug: "productivity", name: "Productivity", nameZh: "效率工具", icon: "⚡", count: 9 },
  { slug: "data-analysis", name: "Data & Analytics", nameZh: "数据分析", icon: "📊", count: 7 },
  { slug: "design-tool", name: "Design Tools", nameZh: "设计工具", icon: "✏️", count: 6 },
];

export const tools: Tool[] = [
  {
    id: "chatgpt",
    name: "ChatGPT",
    url: "https://chat.openai.com",
    description: "OpenAI's flagship conversational AI with GPT-5 Turbo, 256K context, multimodal vision, and real-time voice.",
    descriptionZh: "OpenAI 旗舰对话 AI，GPT-5 Turbo 模型，256K 上下文，多模态视觉和实时语音。",
    category: "text-generation",
    tags: ["Chatbot", "Multimodal", "Writing", "Coding"],
    pricing: "Freemium",
    logo: "🤖",
    featured: true,
  },
  {
    id: "claude",
    name: "Claude",
    url: "https://claude.ai",
    description: "Anthropic's safe and reliable AI assistant with Opus 4.8 for deep reasoning and long-form content.",
    descriptionZh: "Anthropic 安全可靠的 AI 助手，Opus 4.8 支持深度推理和长文内容。",
    category: "text-generation",
    tags: ["Chatbot", "Research", "Writing", "Coding"],
    pricing: "Freemium",
    logo: "🧠",
    featured: true,
  },
  {
    id: "midjourney",
    name: "Midjourney",
    url: "https://midjourney.com",
    description: "Industry-leading AI image generator with v7 model, cinematic quality, and precise style control.",
    descriptionZh: "业界领先 AI 图像生成器，v7 模型支持电影级画质和精确风格控制。",
    category: "image-generation",
    tags: ["Image", "Art", "Design", "Creative"],
    pricing: "Paid",
    logo: "🖼️",
    featured: true,
  },
  {
    id: "cursor",
    name: "Cursor",
    url: "https://cursor.sh",
    description: "AI-first code editor built on VS Code with Agent mode, whole-codebase context, and autonomous refactoring.",
    descriptionZh: "AI 优先代码编辑器，基于 VS Code，Agent 模式支持全代码库理解和自主重构。",
    category: "code-assistant",
    tags: ["IDE", "Coding", "Agent", "Developer"],
    pricing: "Freemium",
    logo: "⌨️",
    featured: true,
  },
  {
    id: "github-copilot",
    name: "GitHub Copilot",
    url: "https://github.com/features/copilot",
    description: "GitHub's AI pair programmer with multi-model support, code review, and deep GitHub ecosystem integration.",
    descriptionZh: "GitHub AI 结对编程助手，多模型支持、代码审查和深度 GitHub 生态集成。",
    category: "code-assistant",
    tags: ["GitHub", "Coding", "IDE", "Enterprise"],
    pricing: "Paid",
    logo: "🐙",
    featured: false,
  },
  {
    id: "runway",
    name: "Runway Gen-4",
    url: "https://runwayml.com",
    description: "Next-gen AI video generation with precise motion control, multi-shot editing, and cinematic quality output.",
    descriptionZh: "下一代 AI 视频生成，精确运动控制、多镜头编辑和电影级输出。",
    category: "video-generation",
    tags: ["Video", "Creative", "Film", "Motion"],
    pricing: "Freemium",
    logo: "🎥",
    featured: true,
  },
  {
    id: "elevenlabs",
    name: "ElevenLabs",
    url: "https://elevenlabs.io",
    description: "State-of-the-art AI voice synthesis with 29 languages, voice cloning, and real-time streaming TTS.",
    descriptionZh: "最先进的 AI 语音合成，支持 29 种语言、声音克隆和实时流式 TTS。",
    category: "voice-ai",
    tags: ["Voice", "TTS", "Cloning", "Audio"],
    pricing: "Freemium",
    logo: "🎤",
    featured: false,
  },
  {
    id: "notion-ai",
    name: "Notion AI",
    url: "https://notion.so/product/ai",
    description: "AI-powered workspace with smart writing, auto-fill databases, Q&A on your docs, and project automation.",
    descriptionZh: "AI 驱动的工作空间，智能写作、自动填充数据库、文档问答和项目自动化。",
    category: "productivity",
    tags: ["Workspace", "Writing", "Database", "Team"],
    pricing: "Paid",
    logo: "📝",
    featured: true,
  },
  {
    id: "dalle",
    name: "DALL·E 4",
    url: "https://openai.com/dall-e-4",
    description: "OpenAI's latest image generation model with photorealistic rendering, inpainting, and style-preserving edits.",
    descriptionZh: "OpenAI 最新图像生成模型，支持照片级渲染、局部重绘和风格保持编辑。",
    category: "image-generation",
    tags: ["Image", "OpenAI", "Design", "Creative"],
    pricing: "Paid",
    logo: "🎨",
    featured: false,
  },
  {
    id: "v0",
    name: "v0 by Vercel",
    url: "https://v0.dev",
    description: "Generate production-ready UI components with shadcn/ui and Tailwind from text prompts or images.",
    descriptionZh: "从文本提示或图片生成生产级 UI 组件，基于 shadcn/ui 和 Tailwind。",
    category: "code-assistant",
    tags: ["UI", "Frontend", "Design", "React"],
    pricing: "Freemium",
    logo: "🖌️",
    featured: false,
  },
  {
    id: "perplexity",
    name: "Perplexity AI",
    url: "https://perplexity.ai",
    description: "AI-powered search engine with real-time citations, deep research mode, and multi-source fact-checking.",
    descriptionZh: "AI 搜索引擎，实时引用、深度研究模式和多源事实核查。",
    category: "productivity",
    tags: ["Search", "Research", "Citations", "Knowledge"],
    pricing: "Freemium",
    logo: "🔍",
    featured: true,
  },
  {
    id: "gemini",
    name: "Google Gemini",
    url: "https://gemini.google.com",
    description: "Google's multimodal AI with 2M token context, Deep Research, and seamless Google Workspace integration.",
    descriptionZh: "Google 多模态 AI，200万 token 上下文、深度研究和 Google Workspace 无缝集成。",
    category: "text-generation",
    tags: ["Google", "Multimodal", "Research", "Workspace"],
    pricing: "Freemium",
    logo: "🌐",
    featured: true,
  },
  {
    id: "suno",
    name: "Suno v5",
    url: "https://suno.ai",
    description: "AI music generator creating full songs with vocals, instruments, and production in any genre or language.",
    descriptionZh: "AI 音乐生成器，可在任何风格和语言中生成包含人声和乐器的完整歌曲。",
    category: "voice-ai",
    tags: ["Music", "Audio", "Creative", "Generation"],
    pricing: "Freemium",
    logo: "🎵",
    featured: false,
  },
  {
    id: "replit",
    name: "Replit Agent",
    url: "https://replit.com",
    description: "Browser-based IDE with AI agent that builds full-stack apps from natural language descriptions.",
    descriptionZh: "浏览器 IDE，AI Agent 可从自然语言描述构建全栈应用。",
    category: "code-assistant",
    tags: ["IDE", "Full-stack", "Browser", "Agent"],
    pricing: "Freemium",
    logo: "🔄",
    featured: false,
  },
  {
    id: "stable-diffusion",
    name: "Stable Diffusion 4",
    url: "https://stability.ai",
    description: "Open-source image generation with SD4 model, superior composition, text rendering, and artistic control.",
    descriptionZh: "开源图像生成，SD4 模型在构图、文字渲染和艺术控制方面表现出色。",
    category: "image-generation",
    tags: ["Open Source", "Image", "Art", "Self-hosted"],
    pricing: "Open Source",
    logo: "🖌️",
    featured: false,
  },
  {
    id: "lovable",
    name: "Lovable",
    url: "https://lovable.dev",
    description: "AI full-stack app builder that generates complete React + Supabase applications from a single prompt.",
    descriptionZh: "AI 全栈应用构建器，从单句提示生成完整的 React + Supabase 应用。",
    category: "code-assistant",
    tags: ["Full-stack", "React", "Builder", "No-code"],
    pricing: "Freemium",
    logo: "💖",
    featured: false,
  },
];

export function getToolsByCategory(category: string): Tool[] {
  return tools.filter((t) => t.category === category);
}

export function getFeaturedTools(): Tool[] {
  return tools.filter((t) => t.featured);
}

export function getToolById(id: string): Tool | undefined {
  return tools.find((t) => t.id === id);
}

export function searchTools(query: string): Tool[] {
  const q = query.toLowerCase();
  return tools.filter(
    (t) =>
      t.name.toLowerCase().includes(q) ||
      t.description.toLowerCase().includes(q) ||
      t.descriptionZh.includes(q) ||
      t.tags.some((tag) => tag.toLowerCase().includes(q)) ||
      t.category.toLowerCase().includes(q)
  );
}

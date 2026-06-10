import type OpenAI from "openai";

let _client: OpenAI | null = null;

async function getClient(): Promise<OpenAI> {
  if (!_client) {
    const { default: OpenAIClass } = await import("openai");
    _client = new OpenAIClass({
      apiKey: process.env.LLM_API_KEY || "",
      baseURL: process.env.LLM_BASE_URL || "https://api.deepseek.com/v1",
      timeout: 120000,
    }) as OpenAI;
  }
  return _client;
}

export async function generateJSON<T>(prompt: string): Promise<T> {
  if (!process.env.LLM_API_KEY) throw new Error("LLM_API_KEY is required");

  const client = await getClient();
  const model = process.env.LLM_MODEL || "deepseek-chat";

  const response = await client.chat.completions.create({
    model,
    messages: [
      { role: "system", content: "你是一个JSON数据生成器。只输出有效的JSON，不包含任何解释或markdown标记。" },
      { role: "user", content: prompt + '\n\n输出纯JSON，不要markdown代码块。' },
    ],
    temperature: 0.8,
    max_tokens: 4096,
    response_format: { type: "json_object" },
  });

  const text = response.choices[0]?.message?.content || "{}";
  const cleaned = text.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/i, "");
  return JSON.parse(cleaned);
}

// lib/claude.ts
import Anthropic from "@anthropic-ai/sdk"
import type { GenerateArticleRequest, GenerateArticleResponse } from "@/types/post"

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

export async function generateArticle(
  request: GenerateArticleRequest
): Promise<GenerateArticleResponse> {
  const { topic, tone, wordCount } = request

  const systemPrompt = `คุณคือนักเขียนบทความมืออาชีพชาวไทย จงเขียนบทความภาษาไทยเกี่ยวกับหัวข้อที่กำหนด
โทนการเขียน: ${tone}
ความยาวประมาณ: ${wordCount} คำ
ตอบกลับเป็น JSON เท่านั้น ห้ามมี markdown code block หรือข้อความอื่น
ใช้ schema นี้:
{
  "title": string,
  "slug": string,
  "metaDescription": string,
  "content": string,
  "tags": string[],
  "readingTimeMinutes": number,
  "imageSearchKeyword": string
}

กฎสำคัญ:
- title: ชื่อบทความภาษาไทย SEO-friendly
- slug: kebab-case ภาษาอังกฤษ เช่น "how-to-learn-programming"
- metaDescription: ภาษาไทย ไม่เกิน 160 ตัวอักษร
- content: Markdown ภาษาไทย มี H2 และ H3 headers เนื้อหาครบถ้วนตาม wordCount ที่กำหนด
- tags: อาร์เรย์ 5 รายการ ภาษาไทย
- readingTimeMinutes: จำนวนนาทีในการอ่าน (ตัวเลขเต็ม)
- imageSearchKeyword: คำค้นหารูปภาษาอังกฤษ 2-4 คำ เช่น "thai cooking food"`

  const message = await client.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 4096,
    system: systemPrompt,
    messages: [
      {
        role: "user",
        content: `เขียนบทความเกี่ยวกับ: ${topic}`,
      },
    ],
  })

  const textContent = message.content.find((c) => c.type === "text")
  if (!textContent || textContent.type !== "text") {
    throw new Error("ไม่ได้รับข้อมูลจาก Claude API")
  }

  try {
    // Strip any accidental markdown fences
    const cleaned = textContent.text
      .replace(/```json\n?/g, "")
      .replace(/```\n?/g, "")
      .trim()
    const parsed = JSON.parse(cleaned) as GenerateArticleResponse
    return parsed
  } catch {
    throw new Error("ไม่สามารถแปลงข้อมูล JSON จาก Claude ได้ กรุณาลองใหม่")
  }
}

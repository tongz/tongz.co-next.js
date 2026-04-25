// app/api/generate-article/route.ts
import { NextRequest, NextResponse } from "next/server"
import { generateArticle } from "@/lib/claude"
import type { GenerateArticleRequest } from "@/types/post"

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as GenerateArticleRequest

    if (!body.topic?.trim()) {
      return NextResponse.json(
        { error: "กรุณาระบุหัวข้อบทความ" },
        { status: 400 }
      )
    }

    if (!body.tone) {
      return NextResponse.json(
        { error: "กรุณาเลือกโทนการเขียน" },
        { status: 400 }
      )
    }

    if (!body.wordCount) {
      return NextResponse.json(
        { error: "กรุณาเลือกความยาวบทความ" },
        { status: 400 }
      )
    }

    if (!process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json(
        { error: "ANTHROPIC_API_KEY ยังไม่ได้ตั้งค่า" },
        { status: 500 }
      )
    }

    const result = await generateArticle(body)

    return NextResponse.json(result)
  } catch (error) {
    console.error("Generate article error:", error)
    const message = error instanceof Error ? error.message : "เกิดข้อผิดพลาดไม่ทราบสาเหตุ"
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

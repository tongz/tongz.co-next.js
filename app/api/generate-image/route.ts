// app/api/generate-image/route.ts
import { NextRequest, NextResponse } from "next/server"
import { searchUnsplashImage } from "@/lib/unsplash"
import { generateImageWithAI } from "@/lib/imageGen"
import type { GenerateImageRequest } from "@/types/post"

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as GenerateImageRequest

    if (!body.keyword?.trim()) {
      return NextResponse.json(
        { error: "กรุณาระบุคำค้นหารูปภาพ" },
        { status: 400 }
      )
    }

    // 1. Try Unsplash first
    const unsplashResult = await searchUnsplashImage(body.keyword)
    if (unsplashResult) {
      return NextResponse.json(unsplashResult)
    }

    // 2. Fallback to AI generation
    const aiResult = await generateImageWithAI(body.keyword)
    return NextResponse.json(aiResult)
  } catch (error) {
    console.error("Generate image error:", error)
    return NextResponse.json(
      { error: "เกิดข้อผิดพลาดในการดึงรูปภาพ" },
      { status: 500 }
    )
  }
}

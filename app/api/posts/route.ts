// app/api/posts/route.ts
import { NextRequest, NextResponse } from "next/server"
import { v4 as uuidv4 } from "uuid"
import { savePost, getAllPosts, getPublishedPosts } from "@/lib/db"
import type { Post, PostInput } from "@/types/post"

// GET /api/posts - list all posts (admin) or published only (public)
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const onlyPublished = searchParams.get("published") === "true"

  try {
    const posts = onlyPublished ? await getPublishedPosts() : await getAllPosts()
    return NextResponse.json(posts)
  } catch (error) {
    return NextResponse.json({ error: "ไม่สามารถดึงข้อมูลบทความได้" }, { status: 500 })
  }
}

// POST /api/posts - create a new post
export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as PostInput

    if (!body.title?.trim()) {
      return NextResponse.json({ error: "กรุณาระบุชื่อบทความ" }, { status: 400 })
    }
    if (!body.content?.trim()) {
      return NextResponse.json({ error: "กรุณาระบุเนื้อหาบทความ" }, { status: 400 })
    }
    if (!body.slug?.trim()) {
      return NextResponse.json({ error: "กรุณาระบุ slug" }, { status: 400 })
    }

    const now = new Date().toISOString()
    const post: Post = {
      ...body,
      id: uuidv4(),
      createdAt: now,
      updatedAt: now,
    }

    await savePost(post)
    return NextResponse.json(post, { status: 201 })
  } catch (error) {
    console.error("Create post error:", error)
    return NextResponse.json({ error: "ไม่สามารถสร้างบทความได้" }, { status: 500 })
  }
}

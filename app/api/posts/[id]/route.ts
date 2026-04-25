// app/api/posts/[id]/route.ts
import { NextRequest, NextResponse } from "next/server"
import { getPost, updatePost, deletePost } from "@/lib/db"
import type { Post } from "@/types/post"

interface Params {
  params: { id: string }
}

// GET /api/posts/[id]
export async function GET(_req: NextRequest, { params }: Params) {
  const post = await getPost(params.id)
  if (!post) {
    return NextResponse.json({ error: "ไม่พบบทความ" }, { status: 404 })
  }
  return NextResponse.json(post)
}

// PATCH /api/posts/[id]
export async function PATCH(req: NextRequest, { params }: Params) {
  try {
    const body = (await req.json()) as Partial<Post>
    const updated = await updatePost(params.id, body)
    if (!updated) {
      return NextResponse.json({ error: "ไม่พบบทความ" }, { status: 404 })
    }
    return NextResponse.json(updated)
  } catch (error) {
    return NextResponse.json({ error: "ไม่สามารถแก้ไขบทความได้" }, { status: 500 })
  }
}

// DELETE /api/posts/[id]
export async function DELETE(_req: NextRequest, { params }: Params) {
  const success = await deletePost(params.id)
  if (!success) {
    return NextResponse.json({ error: "ไม่พบบทความ" }, { status: 404 })
  }
  return NextResponse.json({ message: "ลบบทความสำเร็จ" })
}

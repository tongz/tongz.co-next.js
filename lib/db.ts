// lib/db.ts
// Vercel KV (Redis) wrapper for storing blog posts
// Falls back to in-memory store for local development without KV credentials

import type { Post } from "@/types/post"

// ---- In-memory fallback (used when KV is not configured) ----
const memoryStore: Map<string, Post> = new Map()

function isKVConfigured(): boolean {
  return !!(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN)
}

async function getKV() {
  if (!isKVConfigured()) return null
  const { kv } = await import("@vercel/kv")
  return kv
}

const POST_PREFIX = "post:"
const POST_INDEX = "posts:index" // sorted set: slug -> score (createdAt timestamp)

// ---- Core CRUD ----

export async function savePost(post: Post): Promise<void> {
  const kv = await getKV()
  if (kv) {
    await kv.set(`${POST_PREFIX}${post.id}`, JSON.stringify(post))
    await kv.zadd(POST_INDEX, {
      score: new Date(post.createdAt).getTime(),
      member: post.id,
    })
  } else {
    memoryStore.set(post.id, post)
  }
}

export async function getPost(id: string): Promise<Post | null> {
  const kv = await getKV()
  if (kv) {
    const raw = await kv.get<string>(`${POST_PREFIX}${id}`)
    if (!raw) return null
    return typeof raw === "string" ? JSON.parse(raw) : (raw as Post)
  } else {
    return memoryStore.get(id) ?? null
  }
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const all = await getAllPosts()
  return all.find((p) => p.slug === slug) ?? null
}

export async function getAllPosts(): Promise<Post[]> {
  const kv = await getKV()
  if (kv) {
    // Get all post IDs ordered by creation time (newest first)
    const ids = await kv.zrange(POST_INDEX, 0, -1, { rev: true })
    if (!ids || ids.length === 0) return []

    const posts = await Promise.all(
      ids.map(async (id) => {
        const raw = await kv.get<string>(`${POST_PREFIX}${id}`)
        if (!raw) return null
        return typeof raw === "string" ? (JSON.parse(raw) as Post) : (raw as Post)
      })
    )
    return posts.filter(Boolean) as Post[]
  } else {
    return Array.from(memoryStore.values()).sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
  }
}

export async function getPublishedPosts(): Promise<Post[]> {
  const all = await getAllPosts()
  return all.filter((p) => p.status === "published")
}

export async function updatePost(id: string, updates: Partial<Post>): Promise<Post | null> {
  const existing = await getPost(id)
  if (!existing) return null

  const updated: Post = {
    ...existing,
    ...updates,
    id,
    updatedAt: new Date().toISOString(),
  }
  await savePost(updated)
  return updated
}

export async function deletePost(id: string): Promise<boolean> {
  const kv = await getKV()
  if (kv) {
    await kv.del(`${POST_PREFIX}${id}`)
    await kv.zrem(POST_INDEX, id)
    return true
  } else {
    return memoryStore.delete(id)
  }
}

export async function getPostsByTag(tag: string): Promise<Post[]> {
  const published = await getPublishedPosts()
  return published.filter((p) => p.tags.includes(tag))
}

export async function searchPosts(query: string): Promise<Post[]> {
  const published = await getPublishedPosts()
  const q = query.toLowerCase()
  return published.filter(
    (p) =>
      p.title.toLowerCase().includes(q) ||
      p.content.toLowerCase().includes(q) ||
      p.tags.some((t) => t.toLowerCase().includes(q)) ||
      p.metaDescription.toLowerCase().includes(q)
  )
}

export async function getDashboardStats() {
  const all = await getAllPosts()
  return {
    total: all.length,
    published: all.filter((p) => p.status === "published").length,
    draft: all.filter((p) => p.status === "draft").length,
  }
}

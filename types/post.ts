// types/post.ts

export interface CoverImage {
  url: string
  source: "unsplash" | "ai-generated"
  photographer?: string
  photographerUrl?: string
}

export interface Post {
  id: string
  title: string             // ภาษาไทย
  slug: string              // kebab-case EN
  metaDescription: string   // ภาษาไทย ไม่เกิน 160 ตัวอักษร
  content: string           // Markdown ภาษาไทย
  tags: string[]            // ภาษาไทย
  coverImage: CoverImage
  readingTimeMinutes: number
  status: "draft" | "published"
  createdAt: string         // ISO 8601
  updatedAt: string         // ISO 8601
}

export type PostInput = Omit<Post, "id" | "createdAt" | "updatedAt">

export interface GenerateArticleRequest {
  topic: string
  tone: "ทางการ" | "ทั่วไป" | "เทคนิค" | "บันเทิง"
  wordCount: 300 | 500 | 1000 | 2000
}

export interface GenerateArticleResponse {
  title: string
  slug: string
  metaDescription: string
  content: string
  tags: string[]
  readingTimeMinutes: number
  imageSearchKeyword: string
}

export interface GenerateImageRequest {
  keyword: string
}

export interface GenerateImageResponse {
  url: string
  source: "unsplash" | "ai-generated"
  photographer?: string
  photographerUrl?: string
}

export interface DashboardStats {
  total: number
  published: number
  draft: number
}

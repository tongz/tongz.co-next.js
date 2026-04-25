// lib/unsplash.ts
import type { GenerateImageResponse } from "@/types/post"

const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY

interface UnsplashPhoto {
  id: string
  urls: {
    regular: string
    full: string
  }
  user: {
    name: string
    links: {
      html: string
    }
  }
  alt_description: string | null
}

interface UnsplashSearchResponse {
  results: UnsplashPhoto[]
  total: number
}

export async function searchUnsplashImage(
  keyword: string
): Promise<GenerateImageResponse | null> {
  if (!UNSPLASH_ACCESS_KEY) {
    console.warn("UNSPLASH_ACCESS_KEY ไม่ได้ตั้งค่า")
    return null
  }

  try {
    const url = new URL("https://api.unsplash.com/search/photos")
    url.searchParams.set("query", keyword)
    url.searchParams.set("per_page", "1")
    url.searchParams.set("orientation", "landscape")
    url.searchParams.set("content_filter", "high")

    const response = await fetch(url.toString(), {
      headers: {
        Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
      },
      next: { revalidate: 3600 }, // Cache 1 hour
    })

    if (!response.ok) {
      console.error("Unsplash API error:", response.status)
      return null
    }

    const data = (await response.json()) as UnsplashSearchResponse

    if (!data.results || data.results.length === 0) {
      return null
    }

    const photo = data.results[0]
    const photographerUrl = `${photo.user.links.html}?utm_source=personal_blog&utm_medium=referral`
    const imageUrl = `${photo.urls.regular}?utm_source=personal_blog&utm_medium=referral`

    return {
      url: imageUrl,
      source: "unsplash",
      photographer: photo.user.name,
      photographerUrl,
    }
  } catch (error) {
    console.error("เกิดข้อผิดพลาดในการเรียก Unsplash API:", error)
    return null
  }
}

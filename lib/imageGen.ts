// lib/imageGen.ts
import type { GenerateImageResponse } from "@/types/post"

const STABILITY_API_KEY = process.env.STABILITY_API_KEY

export async function generateImageWithAI(
  keyword: string
): Promise<GenerateImageResponse> {
  // If no Stability AI key, return a beautiful placeholder gradient
  if (!STABILITY_API_KEY) {
    return getFallbackPlaceholder(keyword)
  }

  try {
    const prompt = `Abstract artistic illustration of ${keyword}, digital art style, no faces, no readable text, vibrant colors, modern design`

    const response = await fetch(
      "https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0/text-to-image",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${STABILITY_API_KEY}`,
        },
        body: JSON.stringify({
          text_prompts: [{ text: prompt, weight: 1 }],
          cfg_scale: 7,
          height: 576,
          width: 1024,
          steps: 30,
          samples: 1,
          style_preset: "digital-art",
        }),
      }
    )

    if (!response.ok) {
      console.error("Stability AI error:", response.status)
      return getFallbackPlaceholder(keyword)
    }

    const data = await response.json()
    const base64Image = data.artifacts?.[0]?.base64

    if (!base64Image) {
      return getFallbackPlaceholder(keyword)
    }

    // Convert base64 to data URL
    const dataUrl = `data:image/png;base64,${base64Image}`

    return {
      url: dataUrl,
      source: "ai-generated",
    }
  } catch (error) {
    console.error("เกิดข้อผิดพลาดในการสร้างรูปภาพด้วย AI:", error)
    return getFallbackPlaceholder(keyword)
  }
}

// Fallback: gradient placeholder using picsum
function getFallbackPlaceholder(keyword: string): GenerateImageResponse {
  // Use picsum with a seed based on keyword for consistent images
  const seed = keyword.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0)
  return {
    url: `https://picsum.photos/seed/${seed}/1200/630`,
    source: "ai-generated",
  }
}

// app/api/og/[slug]/route.ts
import { NextRequest, NextResponse } from "next/server"
import { getPostBySlug } from "@/lib/db"
import { getSiteName } from "@/lib/utils"

export async function GET(
  _req: NextRequest,
  { params }: { params: { slug: string } }
) {
  const post = await getPostBySlug(params.slug)
  const siteName = getSiteName()

  const title = post?.title ?? siteName
  const desc = post?.metaDescription ?? "บล็อกส่วนตัว"
  const imageUrl = post?.coverImage?.url ?? ""

  // Return SVG as OG image
  const svg = `
<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0f172a"/>
      <stop offset="100%" style="stop-color:#1e293b"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect x="60" y="60" width="6" height="510" fill="#6366f1" rx="3"/>
  <text x="100" y="200" font-family="serif" font-size="52" font-weight="bold" fill="white" xml:space="preserve">${escapeXml(truncate(title, 40))}</text>
  <text x="100" y="270" font-family="sans-serif" font-size="28" fill="#94a3b8" xml:space="preserve">${escapeXml(truncate(desc, 80))}</text>
  <text x="100" y="540" font-family="sans-serif" font-size="24" fill="#6366f1">${escapeXml(siteName)}</text>
</svg>`

  return new NextResponse(svg, {
    headers: {
      "Content-Type": "image/svg+xml",
      "Cache-Control": "public, max-age=86400",
    },
  })
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
}

function truncate(str: string, n: number): string {
  return str.length > n ? str.slice(0, n - 1) + "…" : str
}

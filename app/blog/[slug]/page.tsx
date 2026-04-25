// app/(public)/blog/[slug]/page.tsx
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import Link from "next/link"
import { getPostBySlug, getPublishedPosts } from "@/lib/db"
import { CoverImage } from "@/components/CoverImage"
import { MarkdownRenderer } from "@/components/MarkdownRenderer"
import { TagBadge } from "@/components/TagBadge"
import { ShareButton } from "@/components/ShareButton"
import { formatThaiDate, getSiteUrl, getSiteName } from "@/lib/utils"
import { Clock, Calendar, ArrowLeft } from "lucide-react"

interface Props {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPostBySlug(params.slug)
  if (!post) return { title: "ไม่พบบทความ" }

  const siteUrl = getSiteUrl()
  const siteName = getSiteName()

  return {
    title: post.title,
    description: post.metaDescription,
    openGraph: {
      title: post.title,
      description: post.metaDescription,
      type: "article",
      publishedTime: post.createdAt,
      tags: post.tags,
      images: [
        {
          url: `${siteUrl}/api/og/${post.slug}`,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      siteName,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.metaDescription,
    },
  }
}

export async function generateStaticParams() {
  const posts = await getPublishedPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

export const revalidate = 60

export default async function BlogPostPage({ params }: Props) {
  const post = await getPostBySlug(params.slug)
  if (!post) notFound()
  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      {/* Back button */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 text-sm mb-8 transition-colors group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        กลับหน้าแรก
      </Link>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-5">
        {post.tags.map((tag) => (
          <TagBadge key={tag} tag={tag} href={`/blog/tag/${encodeURIComponent(tag)}`} />
        ))}
      </div>

      {/* Title */}
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white leading-tight mb-6">
        {post.title}
      </h1>

      {/* Meta */}
      <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 dark:text-slate-400 mb-8 pb-8 border-b border-slate-200 dark:border-slate-700">
        <span className="flex items-center gap-1.5">
          <Calendar className="w-4 h-4" />
          {formatThaiDate(post.createdAt)}
        </span>
        <span className="flex items-center gap-1.5">
          <Clock className="w-4 h-4" />
          อ่าน {post.readingTimeMinutes} นาที
        </span>
        <div className="ml-auto">
          <ShareButton title={post.title} />
        </div>
      </div>

      {/* Cover image */}
      <div className="mb-10 max-w-3xl">
        <CoverImage image={post.coverImage} title={post.title} priority variant="standard" />
      </div>

      {/* Meta description / lead */}
      <p className="text-lg text-slate-600 dark:text-slate-300 italic border-l-4 border-indigo-400 pl-5 py-1 mb-10 leading-relaxed">
        {post.metaDescription}
      </p>

      {/* Content */}
      <MarkdownRenderer content={post.content} />

      {/* Bottom tags */}
      <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-700">
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-3">แท็กที่เกี่ยวข้อง</p>
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <TagBadge key={tag} tag={tag} href={`/blog/tag/${encodeURIComponent(tag)}`} />
          ))}
        </div>
      </div>
    </article>
  )
}

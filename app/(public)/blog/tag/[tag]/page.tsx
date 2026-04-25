// app/(public)/blog/tag/[tag]/page.tsx
import type { Metadata } from "next"
import { getPostsByTag } from "@/lib/db"
import { ArticleCard } from "@/components/ArticleCard"
import { TagBadge } from "@/components/TagBadge"
import { Tag, ArrowLeft } from "lucide-react"
import Link from "next/link"

interface Props {
  params: { tag: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const tag = decodeURIComponent(params.tag)
  return {
    title: `บทความแท็ก: ${tag}`,
    description: `รวมบทความที่แท็กด้วย "${tag}"`,
  }
}

export const revalidate = 60

export default async function TagPage({ params }: Props) {
  const tag = decodeURIComponent(params.tag)
  const posts = await getPostsByTag(tag)

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 text-sm mb-8 transition-colors group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        กลับหน้าแรก
      </Link>

      <div className="flex items-center gap-3 mb-3">
        <Tag className="w-6 h-6 text-indigo-500" />
        <h1 className="text-3xl font-bold text-slate-800 dark:text-white">
          แท็ก: {tag}
        </h1>
      </div>
      <p className="text-slate-500 dark:text-slate-400 mb-10 text-sm">
        พบ {posts.length} บทความ
      </p>

      {posts.length === 0 ? (
        <div className="text-center py-20 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700">
          <p className="text-slate-500 dark:text-slate-400">ไม่พบบทความสำหรับแท็กนี้</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <ArticleCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  )
}

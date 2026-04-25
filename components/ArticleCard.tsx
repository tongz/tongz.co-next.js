// components/ArticleCard.tsx
import Link from "next/link"
import Image from "next/image"
import type { Post } from "@/types/post"
import { formatThaiDate, truncate } from "@/lib/utils"
import { Clock, Calendar } from "lucide-react"

interface ArticleCardProps {
  post: Post
}

export function ArticleCard({ post }: ArticleCardProps) {
  return (
    <article className="group bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 dark:border-slate-700 flex flex-col">
      {/* Cover Image */}
      <Link href={`/blog/${post.slug}`} className="block overflow-hidden relative h-48">
        <Image
          src={post.coverImage.url}
          alt={post.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {post.coverImage.source === "ai-generated" && (
          <span className="absolute top-3 right-3 text-xs bg-black/60 text-white px-2 py-1 rounded-full backdrop-blur-sm">
            ภาพสร้างโดย AI
          </span>
        )}
      </Link>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-3">
          {post.tags.slice(0, 3).map((tag) => (
            <Link
              key={tag}
              href={`/blog/tag/${encodeURIComponent(tag)}`}
              className="text-xs bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 px-2 py-0.5 rounded-full hover:bg-indigo-100 transition-colors"
            >
              {tag}
            </Link>
          ))}
        </div>

        {/* Title */}
        <Link href={`/blog/${post.slug}`}>
          <h2 className="text-lg font-bold text-slate-800 dark:text-white mb-2 line-clamp-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors leading-snug">
            {post.title}
          </h2>
        </Link>

        {/* Meta description */}
        <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 mb-4 leading-relaxed flex-1">
          {truncate(post.metaDescription, 120)}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between text-xs text-slate-400 dark:text-slate-500 mt-auto pt-4 border-t border-slate-100 dark:border-slate-700">
          <span className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" />
            {formatThaiDate(post.createdAt)}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            {post.readingTimeMinutes} นาที
          </span>
        </div>
      </div>
    </article>
  )
}

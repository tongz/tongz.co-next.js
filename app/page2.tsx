// app/(public)/page.tsx
import Link from "next/link"
import { getPublishedPosts } from "@/lib/db"
import { ArticleCard } from "@/components/ArticleCard"
import { SearchBar } from "@/components/SearchBar"
import { getSiteName } from "@/lib/utils"
import { Sparkles, ArrowRight, BookOpen } from "lucide-react"

export const revalidate = 60

export default async function HomePage() {
  const posts = await getPublishedPosts()
  const latestPosts = posts.slice(0, 6)
  const siteName = getSiteName()

  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-violet-50 dark:from-slate-900 dark:via-slate-900 dark:to-indigo-950 border-b border-slate-200/60 dark:border-slate-700/40">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-indigo-200/40 dark:bg-indigo-900/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-violet-200/40 dark:bg-violet-900/20 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-20 md:py-28">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 text-sm font-medium mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              เขียนด้วย AI · อ่านโดยมนุษย์
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white leading-tight mb-6">
              {siteName}
              <span className="block text-indigo-600 dark:text-indigo-400 mt-1">
                บล็อกภาษาไทย
              </span>
            </h1>

            <p className="text-lg text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
              แหล่งรวมบทความคุณภาพภาษาไทย ครอบคลุมเทคโนโลยี ไลฟ์สไตล์ และความรู้รอบตัว
              สร้างสรรค์ด้วยปัญญาประดิษฐ์ เพื่อประสบการณ์การอ่านที่ดีที่สุด
            </p>

            <div className="flex flex-col sm:flex-row gap-4 items-start">
              <SearchBar placeholder="ค้นหาบทความที่คุณสนใจ..." />
              <Link
                href="/about"
                className="flex items-center gap-2 px-5 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-800 transition-colors text-sm whitespace-nowrap"
              >
                <BookOpen className="w-4 h-4" />
                เกี่ยวกับบล็อก
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Articles */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-white">
              บทความล่าสุด
            </h2>
            <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm">
              {posts.length} บทความทั้งหมด
            </p>
          </div>
          {posts.length > 6 && (
            <Link
              href="/blog/all"
              className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 text-sm font-medium transition-colors"
            >
              ดูบทความทั้งหมด
              <ArrowRight className="w-4 h-4" />
            </Link>
          )}
        </div>

        {latestPosts.length === 0 ? (
          <div className="text-center py-24 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700">
            <BookOpen className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-600 dark:text-slate-400 mb-2">
              ยังไม่มีบทความ
            </h3>
            <p className="text-slate-400 text-sm mb-6">
              เริ่มสร้างบทความแรกของคุณด้วย AI ได้เลย!
            </p>
            <Link
              href="/admin/generate"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm transition-colors"
            >
              <Sparkles className="w-4 h-4" />
              สร้างบทความแรก
            </Link>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {latestPosts.map((post) => (
                <ArticleCard key={post.id} post={post} />
              ))}
            </div>

            {posts.length > 6 && (
              <div className="text-center mt-12">
                <Link
                  href="/blog/all"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl border-2 border-indigo-200 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 font-medium transition-colors"
                >
                  ดูบทความทั้งหมด ({posts.length} บทความ)
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            )}
          </>
        )}
      </section>
    </div>
  )
}

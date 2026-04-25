// app/(public)/blog/search/page.tsx
import type { Metadata } from "next"
import { searchPosts } from "@/lib/db"
import { ArticleCard } from "@/components/ArticleCard"
import { SearchBar } from "@/components/SearchBar"
import { Search } from "lucide-react"

interface Props {
  searchParams: { q?: string }
}

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const q = searchParams.q ?? ""
  return {
    title: q ? `ค้นหา: ${q}` : "ค้นหาบทความ",
    description: `ผลการค้นหาสำหรับ "${q}"`,
  }
}

export const revalidate = 0

export default async function SearchPage({ searchParams }: Props) {
  const query = searchParams.q?.trim() ?? ""
  const posts = query ? await searchPosts(query) : []

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
      <div className="max-w-2xl mx-auto mb-12">
        <div className="flex items-center gap-3 mb-6">
          <Search className="w-6 h-6 text-indigo-500" />
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white">ค้นหาบทความ</h1>
        </div>
        <SearchBar defaultValue={query} placeholder="พิมพ์คำค้นหา แล้วกด Enter..." />
      </div>

      {query && (
        <div>
          <p className="text-slate-500 dark:text-slate-400 text-sm mb-8">
            ผลการค้นหาสำหรับ "<strong className="text-slate-700 dark:text-slate-300">{query}</strong>"{" "}
            — พบ {posts.length} บทความ
          </p>

          {posts.length === 0 ? (
            <div className="text-center py-20 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700">
              <Search className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
              <p className="text-slate-500 dark:text-slate-400 font-medium">ไม่พบบทความที่ตรงกัน</p>
              <p className="text-slate-400 text-sm mt-2">ลองค้นหาด้วยคำอื่น</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <ArticleCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </div>
      )}

      {!query && (
        <div className="text-center py-20 text-slate-400 dark:text-slate-500">
          <p>พิมพ์คำค้นหาเพื่อเริ่มต้น</p>
        </div>
      )}
    </div>
  )
}

// app/admin/posts/page.tsx
import Link from "next/link"
import { getAllPosts } from "@/lib/db"
import { PostsTable } from "@/components/PostsTable"
import { FileText, Plus } from "lucide-react"

export const metadata = { title: "จัดการบทความ" }
export const revalidate = 0

export default async function AdminPostsPage() {
  const posts = await getAllPosts()

  return (
    <div>
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <FileText className="w-6 h-6 text-indigo-600" />
            <h1 className="text-2xl font-bold text-slate-800 dark:text-white">จัดการบทความ</h1>
          </div>
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            บทความทั้งหมด {posts.length} รายการ
          </p>
        </div>
        <Link
          href="/admin/generate"
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium transition-colors"
        >
          <Plus className="w-4 h-4" />
          สร้างบทความใหม่
        </Link>
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-24 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700">
          <FileText className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
          <p className="text-slate-500 dark:text-slate-400 font-medium mb-4">ยังไม่มีบทความ</p>
          <Link
            href="/admin/generate"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm transition-colors"
          >
            <Plus className="w-4 h-4" />
            สร้างบทความแรก
          </Link>
        </div>
      ) : (
        <PostsTable posts={posts} />
      )}
    </div>
  )
}

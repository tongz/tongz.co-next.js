// app/admin/page.tsx
import Link from "next/link"
import { getDashboardStats, getPublishedPosts, getAllPosts } from "@/lib/db"
import { formatThaiDate } from "@/lib/utils"
import {
  LayoutDashboard,
  FileText,
  CheckCircle,
  Edit3,
  Sparkles,
  ArrowRight,
  TrendingUp,
} from "lucide-react"

export const revalidate = 0

export default async function AdminDashboardPage() {
  const [stats, recentPosts] = await Promise.all([
    getDashboardStats(),
    getAllPosts().then((p) => p.slice(0, 5)),
  ])

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <LayoutDashboard className="w-6 h-6 text-indigo-600" />
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Dashboard</h1>
        </div>
        <p className="text-slate-500 dark:text-slate-400 text-sm">ภาพรวมของบล็อกทั้งหมด</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-100 dark:border-slate-700 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900/40 rounded-xl flex items-center justify-center">
              <FileText className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            </div>
            <TrendingUp className="w-4 h-4 text-slate-300 dark:text-slate-600" />
          </div>
          <p className="text-3xl font-bold text-slate-800 dark:text-white">{stats.total}</p>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">บทความทั้งหมด</p>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-100 dark:border-slate-700 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-green-100 dark:bg-green-900/40 rounded-xl flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
          </div>
          <p className="text-3xl font-bold text-slate-800 dark:text-white">{stats.published}</p>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">เผยแพร่แล้ว</p>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-100 dark:border-slate-700 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-amber-100 dark:bg-amber-900/40 rounded-xl flex items-center justify-center">
              <Edit3 className="w-5 h-5 text-amber-600 dark:text-amber-400" />
            </div>
          </div>
          <p className="text-3xl font-bold text-slate-800 dark:text-white">{stats.draft}</p>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">ร่าง</p>
        </div>
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
        <Link
          href="/admin/generate"
          className="group bg-gradient-to-br from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 rounded-2xl p-6 text-white transition-all shadow-lg shadow-indigo-200 dark:shadow-indigo-900/40 hover:shadow-xl"
        >
          <div className="flex items-center justify-between mb-3">
            <Sparkles className="w-6 h-6" />
            <ArrowRight className="w-5 h-5 opacity-60 group-hover:translate-x-1 transition-transform" />
          </div>
          <h3 className="font-bold text-lg mb-1">สร้างบทความใหม่</h3>
          <p className="text-indigo-200 text-sm">ใช้ AI ช่วยเขียนบทความภาษาไทย</p>
        </Link>

        <Link
          href="/admin/posts"
          className="group bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-md transition-all"
        >
          <div className="flex items-center justify-between mb-3">
            <FileText className="w-6 h-6 text-slate-500" />
            <ArrowRight className="w-5 h-5 text-slate-400 group-hover:translate-x-1 transition-transform" />
          </div>
          <h3 className="font-bold text-lg text-slate-800 dark:text-white mb-1">จัดการบทความ</h3>
          <p className="text-slate-500 dark:text-slate-400 text-sm">แก้ไข ลบ หรือเปลี่ยนสถานะบทความ</p>
        </Link>
      </div>

      {/* Recent posts */}
      {recentPosts.length > 0 && (
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-700">
            <h2 className="font-bold text-slate-800 dark:text-white">บทความล่าสุด</h2>
            <Link
              href="/admin/posts"
              className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              ดูทั้งหมด
            </Link>
          </div>
          <div className="divide-y divide-slate-100 dark:divide-slate-700">
            {recentPosts.map((post) => (
              <div
                key={post.id}
                className="flex items-center justify-between px-6 py-4 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-slate-800 dark:text-white text-sm truncate">
                    {post.title}
                  </p>
                  <p className="text-xs text-slate-400 mt-0.5">{formatThaiDate(post.createdAt)}</p>
                </div>
                <span
                  className={`ml-4 text-xs px-2.5 py-1 rounded-full font-medium shrink-0 ${
                    post.status === "published"
                      ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                      : "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400"
                  }`}
                >
                  {post.status === "published" ? "เผยแพร่" : "ร่าง"}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

// components/PostsTable.tsx
"use client"

import { useState, useTransition } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import type { Post } from "@/types/post"
import { formatThaiDate } from "@/lib/utils"
import {
  Edit,
  Trash2,
  Eye,
  EyeOff,
  ExternalLink,
  Clock,
  Loader2,
  AlertTriangle,
} from "lucide-react"

interface PostsTableProps {
  posts: Post[]
}

export function PostsTable({ posts: initialPosts }: PostsTableProps) {
  const [posts, setPosts] = useState(initialPosts)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [togglingId, setTogglingId] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  async function handleDelete(post: Post) {
    if (!confirm(`ยืนยันการลบบทความ "${post.title}"?`)) return
    setDeletingId(post.id)
    setError(null)
    try {
      const res = await fetch(`/api/posts/${post.id}`, { method: "DELETE" })
      if (!res.ok) throw new Error("ลบบทความไม่สำเร็จ")
      setPosts((prev) => prev.filter((p) => p.id !== post.id))
    } catch (err) {
      setError(err instanceof Error ? err.message : "เกิดข้อผิดพลาด")
    } finally {
      setDeletingId(null)
    }
  }

  async function handleToggleStatus(post: Post) {
    setTogglingId(post.id)
    setError(null)
    const newStatus = post.status === "published" ? "draft" : "published"
    try {
      const res = await fetch(`/api/posts/${post.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      })
      if (!res.ok) throw new Error("อัปเดตสถานะไม่สำเร็จ")
      const updated = await res.json()
      setPosts((prev) => prev.map((p) => (p.id === post.id ? updated : p)))
    } catch (err) {
      setError(err instanceof Error ? err.message : "เกิดข้อผิดพลาด")
    } finally {
      setTogglingId(null)
    }
  }

  return (
    <div>
      {error && (
        <div className="flex items-center gap-3 p-4 rounded-xl bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 text-sm mb-4">
          <AlertTriangle className="w-5 h-5 shrink-0" />
          {error}
        </div>
      )}

      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm overflow-hidden">
        {/* Desktop table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60">
                <th className="text-left px-6 py-3.5 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  บทความ
                </th>
                <th className="text-left px-4 py-3.5 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider w-28">
                  สถานะ
                </th>
                <th className="text-left px-4 py-3.5 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider w-36">
                  วันที่
                </th>
                <th className="px-4 py-3.5 w-40"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
              {posts.map((post) => (
                <tr
                  key={post.id}
                  className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-slate-800 dark:text-white text-sm line-clamp-1">
                        {post.title}
                      </p>
                      <p className="text-xs text-slate-400 mt-0.5 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {post.readingTimeMinutes} นาที · /{post.slug}
                      </p>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                        post.status === "published"
                          ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                          : "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400"
                      }`}
                    >
                      {post.status === "published" ? "เผยแพร่" : "ร่าง"}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-xs text-slate-500 dark:text-slate-400">
                    {formatThaiDate(post.createdAt)}
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center justify-end gap-1">
                      {post.status === "published" && (
                        <Link
                          href={`/blog/${post.slug}`}
                          target="_blank"
                          className="p-2 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                          title="ดูบทความ"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Link>
                      )}
                      <button
                        onClick={() => handleToggleStatus(post)}
                        disabled={togglingId === post.id}
                        className="p-2 rounded-lg text-slate-400 hover:text-amber-600 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors disabled:opacity-50"
                        title={post.status === "published" ? "ซ่อนบทความ" : "เผยแพร่"}
                      >
                        {togglingId === post.id ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : post.status === "published" ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                      <Link
                        href={`/admin/posts/${post.id}/edit`}
                        className="p-2 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                        title="แก้ไข"
                      >
                        <Edit className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => handleDelete(post)}
                        disabled={deletingId === post.id}
                        className="p-2 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors disabled:opacity-50"
                        title="ลบ"
                      >
                        {deletingId === post.id ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Trash2 className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile cards */}
        <div className="md:hidden divide-y divide-slate-100 dark:divide-slate-700">
          {posts.map((post) => (
            <div key={post.id} className="p-4">
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-slate-800 dark:text-white text-sm line-clamp-2">
                    {post.title}
                  </p>
                  <p className="text-xs text-slate-400 mt-1">{formatThaiDate(post.createdAt)}</p>
                </div>
                <span
                  className={`shrink-0 text-xs px-2 py-1 rounded-full font-medium ${
                    post.status === "published"
                      ? "bg-green-100 text-green-700"
                      : "bg-amber-100 text-amber-700"
                  }`}
                >
                  {post.status === "published" ? "เผยแพร่" : "ร่าง"}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleToggleStatus(post)}
                  disabled={togglingId === post.id}
                  className="flex-1 py-1.5 rounded-lg text-xs border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors disabled:opacity-50"
                >
                  {post.status === "published" ? "ซ่อน" : "เผยแพร่"}
                </button>
                <Link
                  href={`/admin/posts/${post.id}/edit`}
                  className="flex-1 py-1.5 rounded-lg text-xs border border-slate-200 dark:border-slate-700 text-center text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                >
                  แก้ไข
                </Link>
                <button
                  onClick={() => handleDelete(post)}
                  disabled={deletingId === post.id}
                  className="flex-1 py-1.5 rounded-lg text-xs border border-red-200 dark:border-red-800 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors disabled:opacity-50"
                >
                  ลบ
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// components/MarkdownEditor.tsx
"use client"

import { useState } from "react"
import { MarkdownRenderer } from "@/components/MarkdownRenderer"
import { Eye, Edit } from "lucide-react"

interface MarkdownEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  rows?: number
}

export function MarkdownEditor({
  value,
  onChange,
  placeholder = "เขียนเนื้อหาบทความที่นี่ (รองรับ Markdown)...",
  rows = 20,
}: MarkdownEditorProps) {
  const [tab, setTab] = useState<"edit" | "preview">("edit")

  return (
    <div className="border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden">
      {/* Tab bar */}
      <div className="flex border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
        <button
          onClick={() => setTab("edit")}
          className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-colors ${
            tab === "edit"
              ? "text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-600 dark:border-indigo-400 -mb-px bg-white dark:bg-slate-800"
              : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
          }`}
        >
          <Edit className="w-4 h-4" />
          แก้ไข
        </button>
        <button
          onClick={() => setTab("preview")}
          className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-colors ${
            tab === "preview"
              ? "text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-600 dark:border-indigo-400 -mb-px bg-white dark:bg-slate-800"
              : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
          }`}
        >
          <Eye className="w-4 h-4" />
          ดูตัวอย่าง
        </button>
      </div>

      {/* Editor / Preview */}
      {tab === "edit" ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={rows}
          className="w-full px-4 py-4 font-mono text-sm text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-900 placeholder:text-slate-400 focus:outline-none resize-y"
        />
      ) : (
        <div className="min-h-[400px] p-6 bg-white dark:bg-slate-900">
          {value ? (
            <MarkdownRenderer content={value} />
          ) : (
            <p className="text-slate-400 italic">ยังไม่มีเนื้อหา</p>
          )}
        </div>
      )}
    </div>
  )
}

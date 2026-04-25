// components/MarkdownRenderer.tsx
"use client"

import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { cn } from "@/lib/utils"

interface MarkdownRendererProps {
  content: string
  className?: string
}

export function MarkdownRenderer({ content, className }: MarkdownRendererProps) {
  return (
    <div
      className={cn(
        "prose prose-slate dark:prose-invert max-w-none",
        "prose-headings:font-bold prose-headings:text-slate-800 dark:prose-headings:text-white",
        "prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-h2:border-b prose-h2:border-slate-200 dark:prose-h2:border-slate-700 prose-h2:pb-2",
        "prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3 prose-h3:text-indigo-700 dark:prose-h3:text-indigo-400",
        "prose-p:text-slate-600 dark:prose-p:text-slate-300 prose-p:leading-relaxed prose-p:text-base",
        "prose-a:text-indigo-600 dark:prose-a:text-indigo-400 prose-a:no-underline hover:prose-a:underline",
        "prose-strong:text-slate-800 dark:prose-strong:text-white",
        "prose-code:bg-slate-100 dark:prose-code:bg-slate-800 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:text-indigo-700 dark:prose-code:text-indigo-300",
        "prose-pre:bg-slate-900 dark:prose-pre:bg-slate-950 prose-pre:rounded-xl prose-pre:shadow-lg",
        "prose-blockquote:border-indigo-400 prose-blockquote:bg-indigo-50 dark:prose-blockquote:bg-indigo-900/20 prose-blockquote:rounded-r-xl prose-blockquote:py-1",
        "prose-ul:text-slate-600 dark:prose-ul:text-slate-300",
        "prose-ol:text-slate-600 dark:prose-ol:text-slate-300",
        "prose-li:my-1",
        "prose-img:rounded-xl prose-img:shadow-md",
        className
      )}
    >
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </div>
  )
}

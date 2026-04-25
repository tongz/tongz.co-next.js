// components/TagBadge.tsx
import Link from "next/link"
import { cn } from "@/lib/utils"

interface TagBadgeProps {
  tag: string
  href?: string
  active?: boolean
  className?: string
}

export function TagBadge({ tag, href, active, className }: TagBadgeProps) {
  const base = cn(
    "inline-flex items-center px-3 py-1 rounded-full text-sm font-medium transition-colors",
    active
      ? "bg-indigo-600 text-white"
      : "bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100 dark:hover:bg-indigo-900/50",
    className
  )

  if (href) {
    return (
      <Link href={href} className={base}>
        #{tag}
      </Link>
    )
  }
  return <span className={base}>#{tag}</span>
}

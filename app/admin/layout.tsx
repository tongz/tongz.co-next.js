// app/admin/layout.tsx
import Link from "next/link"
import { getSiteName } from "@/lib/utils"
import {
  LayoutDashboard,
  Sparkles,
  FileText,
  BookOpen,
  ExternalLink,
} from "lucide-react"

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/generate", label: "สร้างบทความ AI", icon: Sparkles },
  { href: "/admin/posts", label: "จัดการบทความ", icon: FileText },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const siteName = getSiteName()

  return (
    <div className="min-h-screen flex bg-slate-50 dark:bg-slate-900">
      {/* Sidebar */}
      <aside className="w-64 shrink-0 bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 hidden md:flex flex-col">
        {/* Logo */}
        <div className="h-16 flex items-center px-6 border-b border-slate-200 dark:border-slate-700">
          <Link href="/admin" className="flex items-center gap-2.5 font-bold text-slate-800 dark:text-white">
            <BookOpen className="w-5 h-5 text-indigo-600" />
            <span className="text-sm">{siteName}</span>
            <span className="text-xs bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 px-1.5 py-0.5 rounded font-medium">
              Admin
            </span>
          </Link>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors group"
            >
              <item.icon className="w-4 h-4 shrink-0 group-hover:text-indigo-500 transition-colors" />
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-700">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            ดูบล็อกสาธารณะ
          </Link>
        </div>
      </aside>

      {/* Mobile top bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-40 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 h-14 flex items-center px-4 gap-4">
        <Link href="/admin" className="flex items-center gap-2 font-bold text-slate-800 dark:text-white text-sm">
          <BookOpen className="w-4 h-4 text-indigo-600" />
          Admin
        </Link>
        <nav className="flex items-center gap-1 ml-auto">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="p-2 rounded-lg text-slate-500 hover:text-indigo-600 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
              title={item.label}
            >
              <item.icon className="w-4 h-4" />
            </Link>
          ))}
        </nav>
      </div>

      {/* Main content */}
      <main className="flex-1 overflow-auto md:p-8 p-4 mt-14 md:mt-0">
        <div className="max-w-5xl mx-auto">{children}</div>
      </main>
    </div>
  )
}

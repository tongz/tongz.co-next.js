// app/(public)/layout.tsx
import Link from "next/link"
import { getSiteName } from "@/lib/utils"
import { SearchBar } from "@/components/SearchBar"
import { BookOpen, PenSquare, Home, Info } from "lucide-react"

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  const siteName = getSiteName()

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <header className="sticky top-0 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200/60 dark:border-slate-700/60">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 font-bold text-lg text-slate-800 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors shrink-0"
          >
            <BookOpen className="w-5 h-5 text-indigo-600" />
            {siteName}
          </Link>

          {/* Search - hidden on mobile */}
          <div className="hidden md:block flex-1 max-w-sm">
            <SearchBar />
          </div>

          {/* Nav links */}
          <nav className="flex items-center gap-1">
            <Link
              href="/"
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <Home className="w-4 h-4" />
              <span className="hidden sm:inline">หน้าแรก</span>
            </Link>
            <Link
              href="/about"
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <Info className="w-4 h-4" />
              <span className="hidden sm:inline">เกี่ยวกับ</span>
            </Link>
            <Link
              href="/admin"
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm bg-indigo-600 hover:bg-indigo-700 text-white transition-colors ml-1"
            >
              <PenSquare className="w-4 h-4" />
              <span className="hidden sm:inline">Admin</span>
            </Link>
          </nav>
        </div>

        {/* Mobile search */}
        <div className="md:hidden px-4 pb-3">
          <SearchBar />
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700 mt-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
              <BookOpen className="w-4 h-4 text-indigo-500" />
              <span className="font-semibold">{siteName}</span>
            </div>
            <p className="text-sm text-slate-400 dark:text-slate-500">
              สร้างด้วย Next.js + Claude AI · รูปภาพจาก{" "}
              <a
                href="https://unsplash.com?utm_source=personal_blog&utm_medium=referral"
                className="text-indigo-500 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Unsplash
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

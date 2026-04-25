// app/(public)/about/page.tsx
import type { Metadata } from "next"
import { BookOpen, Sparkles, Heart, Mail } from "lucide-react"
import { getSiteName } from "@/lib/utils"

export const metadata: Metadata = {
  title: "เกี่ยวกับบล็อก",
  description: "รู้จักกับบล็อกส่วนตัวของเราให้มากขึ้น",
}

export default function AboutPage() {
  const siteName = getSiteName()

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
      {/* Header */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 dark:bg-indigo-900/40 rounded-2xl mb-6">
          <BookOpen className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
        </div>
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
          เกี่ยวกับ {siteName}
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
          บล็อกส่วนตัวที่รวมบทความคุณภาพ เขียนด้วยความรักและปัญญาประดิษฐ์
        </p>
      </div>

      {/* Cards */}
      <div className="grid gap-6 mb-16">
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-100 dark:border-slate-700 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-violet-100 dark:bg-violet-900/40 rounded-xl flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5 text-violet-600 dark:text-violet-400" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-800 dark:text-white mb-2">
                เขียนด้วย AI
              </h2>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                บทความทุกชิ้นสร้างขึ้นด้วยความช่วยเหลือจาก Claude AI ของ Anthropic
                ทำให้ได้เนื้อหาที่ครบถ้วน ถูกต้อง และอ่านง่ายในภาษาไทย
                พร้อมรูปภาพสวยงามจาก Unsplash
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-100 dark:border-slate-700 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-pink-100 dark:bg-pink-900/40 rounded-xl flex items-center justify-center shrink-0">
              <Heart className="w-5 h-5 text-pink-600 dark:text-pink-400" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-800 dark:text-white mb-2">
                เนื้อหาหลากหลาย
              </h2>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                ครอบคลุมหลากหลายหัวข้อ ทั้งเทคโนโลยี การพัฒนาตัวเอง ไลฟ์สไตล์ สุขภาพ
                และอื่นๆ อีกมากมาย อัปเดตเนื้อหาใหม่สม่ำเสมอ
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-100 dark:border-slate-700 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-green-100 dark:bg-green-900/40 rounded-xl flex items-center justify-center shrink-0">
              <Mail className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-800 dark:text-white mb-2">
                เทคโนโลยีที่ใช้
              </h2>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                สร้างด้วย Next.js 14 (App Router) + TypeScript, ใช้ Tailwind CSS
                สำหรับ styling, Claude API สำหรับสร้างเนื้อหา, Unsplash API สำหรับรูปภาพ
                และ Vercel KV สำหรับจัดเก็บข้อมูล Deploy บน Vercel
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Tech stack badges */}
      <div className="text-center">
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">สร้างด้วย</p>
        <div className="flex flex-wrap justify-center gap-2">
          {["Next.js 14", "TypeScript", "Tailwind CSS", "Claude AI", "Unsplash", "Vercel KV", "Vercel"].map(
            (tech) => (
              <span
                key={tech}
                className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-sm font-medium border border-slate-200 dark:border-slate-700"
              >
                {tech}
              </span>
            )
          )}
        </div>
      </div>
    </div>
  )
}

// app/admin/generate/page.tsx
import { ArticleGenerator } from "@/components/ArticleGenerator"
import { Sparkles } from "lucide-react"

export const metadata = {
  title: "สร้างบทความด้วย AI",
}

export default function AdminGeneratePage() {
  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <Sparkles className="w-6 h-6 text-indigo-600" />
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white">สร้างบทความด้วย AI</h1>
        </div>
        <p className="text-slate-500 dark:text-slate-400 text-sm">
          ระบุหัวข้อ เลือกโทนและความยาว แล้วให้ AI สร้างบทความภาษาไทยให้คุณ
        </p>
      </div>

      <ArticleGenerator />
    </div>
  )
}

// components/ArticleGenerator.tsx
"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import type { GenerateArticleResponse, GenerateImageResponse, Post } from "@/types/post"
import { MarkdownRenderer } from "@/components/MarkdownRenderer"
import { CoverImage } from "@/components/CoverImage"
import {
  Sparkles,
  Eye,
  Save,
  Send,
  Loader2,
  AlertCircle,
  ChevronDown,
} from "lucide-react"

const TONES = ["ทางการ", "ทั่วไป", "เทคนิค", "บันเทิง"] as const
const WORD_COUNTS = [300, 500, 1000, 2000] as const

type Tone = (typeof TONES)[number]
type WordCount = (typeof WORD_COUNTS)[number]

type Step = "form" | "generating" | "preview"

export function ArticleGenerator() {
  const router = useRouter()

  // Form state
  const [topic, setTopic] = useState("")
  const [tone, setTone] = useState<Tone>("ทั่วไป")
  const [wordCount, setWordCount] = useState<WordCount>(500)

  // Generation state
  const [step, setStep] = useState<Step>("form")
  const [loadingMsg, setLoadingMsg] = useState("")
  const [error, setError] = useState<string | null>(null)

  // Result state
  const [generatedArticle, setGeneratedArticle] = useState<GenerateArticleResponse | null>(null)
  const [coverImageData, setCoverImageData] = useState<GenerateImageResponse | null>(null)

  // Saving state
  const [isSaving, setIsSaving] = useState(false)

  async function handleGenerate() {
    if (!topic.trim()) {
      setError("กรุณาระบุหัวข้อบทความ")
      return
    }
    setError(null)
    setStep("generating")
    setLoadingMsg("กำลังสร้างบทความด้วย AI...")

    try {
      // Step 1: Generate article content
      const articleRes = await fetch("/api/generate-article", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic, tone, wordCount }),
      })
      const articleData = await articleRes.json()
      if (!articleRes.ok) throw new Error(articleData.error ?? "สร้างบทความไม่สำเร็จ")

      setGeneratedArticle(articleData)
      setLoadingMsg("กำลังค้นหารูปภาพประกอบ...")

      // Step 2: Fetch cover image
      const imageRes = await fetch("/api/generate-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ keyword: articleData.imageSearchKeyword }),
      })
      const imageData = await imageRes.json()
      if (imageRes.ok) {
        setCoverImageData(imageData)
      }

      setStep("preview")
    } catch (err) {
      setError(err instanceof Error ? err.message : "เกิดข้อผิดพลาด กรุณาลองใหม่")
      setStep("form")
    }
  }

  async function handleSave(status: "draft" | "published") {
    if (!generatedArticle || !coverImageData) return
    setIsSaving(true)
    setError(null)

    try {
      const postBody: Omit<Post, "id" | "createdAt" | "updatedAt"> = {
        title: generatedArticle.title,
        slug: generatedArticle.slug,
        metaDescription: generatedArticle.metaDescription,
        content: generatedArticle.content,
        tags: generatedArticle.tags,
        coverImage: coverImageData,
        readingTimeMinutes: generatedArticle.readingTimeMinutes,
        status,
      }

      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(postBody),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error ?? "บันทึกบทความไม่สำเร็จ")
      }

      router.push("/admin/posts")
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : "บันทึกไม่สำเร็จ")
    } finally {
      setIsSaving(false)
    }
  }

  // ---- Render ----
  if (step === "generating") {
    return (
      <div className="flex flex-col items-center justify-center py-32 gap-6">
        <div className="relative">
          <div className="w-20 h-20 rounded-full border-4 border-indigo-100 dark:border-indigo-900 animate-spin border-t-indigo-600"></div>
          <Sparkles className="w-8 h-8 text-indigo-600 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        </div>
        <p className="text-slate-600 dark:text-slate-400 text-lg font-medium">{loadingMsg}</p>
        <p className="text-slate-400 text-sm">อาจใช้เวลา 15-30 วินาที</p>
      </div>
    )
  }

  if (step === "preview" && generatedArticle) {
    return (
      <div className="space-y-8">
        {/* Preview header */}
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white">ตัวอย่างบทความ</h2>
            <p className="text-slate-500 text-sm mt-1">ตรวจสอบบทความก่อนเผยแพร่</p>
          </div>
          <div className="flex gap-3 flex-wrap">
            <button
              onClick={() => setStep("form")}
              className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 text-sm transition-colors"
            >
              ← แก้ไขหัวข้อ
            </button>
            <button
              onClick={() => handleSave("draft")}
              disabled={isSaving}
              className="flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 text-sm transition-colors disabled:opacity-50"
            >
              {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              บันทึกเป็นร่าง
            </button>
            <button
              onClick={() => handleSave("published")}
              disabled={isSaving}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm transition-colors disabled:opacity-50"
            >
              {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              เผยแพร่บทความ
            </button>
          </div>
        </div>

        {error && (
          <div className="flex items-center gap-3 p-4 rounded-xl bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 text-sm">
            <AlertCircle className="w-5 h-5 shrink-0" />
            {error}
          </div>
        )}

        {/* Article preview */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden">
          {coverImageData && (
            <div className="p-6 pb-0">
              <CoverImage image={coverImageData} title={generatedArticle.title} priority variant="standard" />
            </div>
          )}
          <div className="p-6 md:p-10">
            <div className="flex flex-wrap gap-2 mb-4">
              {generatedArticle.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 px-2 py-0.5 rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white mb-4 leading-tight">
              {generatedArticle.title}
            </h1>
            <p className="text-slate-500 mb-2 text-sm">
              อ่าน {generatedArticle.readingTimeMinutes} นาที · slug: <code className="bg-slate-100 dark:bg-slate-700 px-1 rounded">{generatedArticle.slug}</code>
            </p>
            <p className="text-slate-600 dark:text-slate-400 italic border-l-4 border-indigo-300 pl-4 mb-8">
              {generatedArticle.metaDescription}
            </p>
            <MarkdownRenderer content={generatedArticle.content} />
          </div>
        </div>
      </div>
    )
  }

  // ---- Form ----
  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 p-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900/40 rounded-xl flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-800 dark:text-white">สร้างบทความใหม่</h2>
            <p className="text-slate-500 text-sm">ให้ AI ช่วยเขียนบทความภาษาไทยให้คุณ</p>
          </div>
        </div>

        {error && (
          <div className="flex items-center gap-3 p-4 rounded-xl bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 text-sm mb-6">
            <AlertCircle className="w-5 h-5 shrink-0" />
            {error}
          </div>
        )}

        <div className="space-y-6">
          {/* Topic */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              หัวข้อบทความ <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="เช่น การปลูกผักไฮโดรโพนิกส์ที่บ้าน, Tips เพิ่ม Productivity..."
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-sm"
              onKeyDown={(e) => e.key === "Enter" && handleGenerate()}
            />
          </div>

          {/* Tone */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              โทนการเขียน
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {TONES.map((t) => (
                <button
                  key={t}
                  onClick={() => setTone(t)}
                  className={`py-2.5 rounded-xl text-sm font-medium transition-all ${
                    tone === t
                      ? "bg-indigo-600 text-white shadow-md shadow-indigo-200 dark:shadow-indigo-900"
                      : "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Word count */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              ความยาวโดยประมาณ
            </label>
            <div className="grid grid-cols-4 gap-2">
              {WORD_COUNTS.map((wc) => (
                <button
                  key={wc}
                  onClick={() => setWordCount(wc)}
                  className={`py-2.5 rounded-xl text-sm font-medium transition-all ${
                    wordCount === wc
                      ? "bg-indigo-600 text-white shadow-md shadow-indigo-200 dark:shadow-indigo-900"
                      : "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600"
                  }`}
                >
                  {wc.toLocaleString()} คำ
                </button>
              ))}
            </div>
          </div>

          {/* Submit */}
          <button
            onClick={handleGenerate}
            className="w-full flex items-center justify-center gap-3 py-4 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white font-semibold text-base transition-all shadow-lg shadow-indigo-200 dark:shadow-indigo-900/40 hover:shadow-xl"
          >
            <Sparkles className="w-5 h-5" />
            กำลังสร้างบทความ...
          </button>

          <p className="text-xs text-slate-400 text-center">
            ใช้ Claude AI · รูปภาพจาก Unsplash · เนื้อหาภาษาไทย
          </p>
        </div>
      </div>
    </div>
  )
}

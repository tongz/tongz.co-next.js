// components/CoverImage.tsx
import Image from "next/image"
import type { CoverImage as CoverImageType } from "@/types/post"

interface CoverImageProps {
  image: CoverImageType
  title: string
  priority?: boolean
  /** "wide" = 21:9 (homepage card), "standard" = 16:9 (article page) */
  variant?: "wide" | "standard"
}

export function CoverImage({ image, title, priority = false, variant = "standard" }: CoverImageProps) {
  return (
    <div
      className={`relative w-full rounded-2xl overflow-hidden bg-slate-200 dark:bg-slate-700 ${
        variant === "wide" ? "aspect-[21/9]" : "aspect-[16/9] max-h-[480px]"
      }`}
    >
      <Image
        src={image.url}
        alt={title}
        fill
        priority={priority}
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 1200px"
      />

      {/* Attribution overlay */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent px-4 py-3">
        {image.source === "unsplash" && image.photographer ? (
          <p className="text-white/80 text-xs">
            ภาพจาก{" "}
            <a
              href="https://unsplash.com?utm_source=personal_blog&utm_medium=referral"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-white"
            >
              Unsplash
            </a>{" "}
            โดย{" "}
            <a
              href={image.photographerUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-white"
            >
              {image.photographer}
            </a>
          </p>
        ) : (
          <p className="text-white/80 text-xs">ภาพสร้างโดย AI</p>
        )}
      </div>
    </div>
  )
}

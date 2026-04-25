// app/layout.tsx
import type { Metadata } from "next"
import { Noto_Sans_Thai } from "next/font/google"
import "./globals.css"
import { getSiteName, getSiteUrl } from "@/lib/utils"

const notoSansThai = Noto_Sans_Thai({
  subsets: ["thai", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-noto-thai",
  display: "swap",
})

export const metadata: Metadata = {
  title: {
    default: process.env.NEXT_PUBLIC_SITE_NAME ?? "บล็อกส่วนตัว",
    template: `%s | ${process.env.NEXT_PUBLIC_SITE_NAME ?? "บล็อกส่วนตัว"}`,
  },
  description: "บล็อกส่วนตัวที่เขียนด้วยความรัก สร้างด้วย Next.js และ AI",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  openGraph: {
    type: "website",
    locale: "th_TH",
    siteName: process.env.NEXT_PUBLIC_SITE_NAME ?? "บล็อกส่วนตัว",
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="th" className={notoSansThai.variable}>
      <body className="font-sans bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 antialiased min-h-screen">
        {children}
      </body>
    </html>
  )
}

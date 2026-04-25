import { notFound } from "next/navigation"
import type { Metadata } from "next"
import Link from "next/link"
import { getAllPosts, getPostBySlug } from "@/lib/posts"
import { MDXRemote } from "next-mdx-remote/rsc"
import { Callout } from "@/components/Callout"

const components = { Callout }

interface Props {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPostBySlug(params.slug)
  if (!post) return { title: "ไม่พบบทความ" }
  return {
    title: `${post.title} | tongz.co`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      url: `https://tongz.co/blog/${params.slug}`,
      siteName: "tongz.co",
    },
  }
}

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

export default function BlogPost({ params }: Props) {
  const post = getPostBySlug(params.slug)
  if (!post) notFound()

  return (
    <main className="min-h-screen bg-white">
      <article className="max-w-3xl mx-auto px-4 py-12">
        {/* Back */}
        <Link href="/" className="text-sm text-slate-500 hover:text-blue-600 mb-8 inline-block">
          ← กลับหน้าแรก
        </Link>

        {/* Category */}
        <div className="text-xs font-medium text-blue-600 uppercase tracking-wide mb-2">
          {post.category}
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-slate-900 leading-tight mb-4">
          {post.title}
        </h1>

        {/* Date */}
        <div className="text-sm text-slate-400 mb-8 pb-8 border-b border-slate-100">
          {post.date}
        </div>

        {/* Content */}
        <div className="prose prose-slate max-w-none">
          <MDXRemote source={post.content} components={components} />
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-slate-100">
          <Link href="/" className="text-sm text-blue-600 hover:underline">
            ← ดูบทความทั้งหมด
          </Link>
        </div>
      </article>
    </main>
  )
}

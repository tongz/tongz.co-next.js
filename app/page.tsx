import { getAllPosts } from "@/lib/posts";
import Link from "next/link";

export default function Home() {
  const posts = getAllPosts();

  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-slate-900 text-white py-16 px-4 text-center">
        <h1 className="text-4xl font-bold mb-3">tongz.co</h1>
        <p className="text-slate-300 text-lg">บันทึกเรื่องราว เทคโนโลยี และชีวิต</p>
      </section>

      {/* Posts */}
      <section className="max-w-3xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-slate-800 mb-8">บทความล่าสุด</h2>
        <div className="space-y-8">
          {posts.map((post) => (
            <article key={post.slug} className="border-b border-slate-100 pb-8">
              <span className="text-xs font-medium text-blue-600 uppercase tracking-wide">
                {post.category}
              </span>
              <h2 className="text-xl font-bold text-slate-900 mt-1 mb-2">
                <Link href={`/blog/${post.slug}`} className="hover:text-blue-600 transition-colors">
                  {post.title}
                </Link>
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed mb-3">{post.excerpt}</p>
              <time className="text-xs text-slate-400">{post.date}</time>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

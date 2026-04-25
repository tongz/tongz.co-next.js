import { getAllPosts } from "@/lib/posts";

export default function Home() {
  const posts = getAllPosts();

  return (
    <>
      <h1 style={{ fontSize: "1.1rem", color: "var(--muted)", marginBottom: "2rem", fontWeight: 400 }}>
        บันทึกเรื่องราว เทคโนโลยี และชีวิต
      </h1>
      <ul className="post-list">
        {posts.map((post) => (
          <li key={post.slug} className="post-item">
            <div className="post-category">{post.category}</div>
            <h2 className="post-title">
              <a href={`/blog/${post.slug}`}>{post.title}</a>
            </h2>
            <p className="post-excerpt">{post.excerpt}</p>
            <div className="post-date">{post.date}</div>
          </li>
        ))}
      </ul>
    </>
  );
}

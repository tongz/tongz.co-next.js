import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "เกี่ยวกับ | tongz.co",
  description: "เกี่ยวกับ tongz.co",
};

export default function About() {
  return (
    <article>
      <div className="article-header">
        <h1 className="article-title">เกี่ยวกับ</h1>
      </div>
      <div className="article-body">
        <p>สวัสดีครับ ผมชื่อ Tongz ยินดีต้อนรับสู่ tongz.co</p>
        <p>
          Blog นี้เป็นพื้นที่บันทึกเรื่องราวต่างๆ ทั้งเรื่องส่วนตัว
          เทคโนโลยี AI และความรู้ IT ที่สนใจครับ
        </p>
        <h2>ติดต่อ</h2>
        <p>สามารถติดต่อได้ทาง...</p>
      </div>
      <a href="/" className="back-link">← กลับหน้าแรก</a>
    </article>
  );
}

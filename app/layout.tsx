import type { Metadata } from "next";
import { Sarabun } from "next/font/google";
import "./globals.css";

const sarabun = Sarabun({
  subsets: ["thai", "latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "tongz.co",
  description: "Blog เรื่องราวทั่วไป เทคโนโลยี และ AI",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="th">
      <body className={sarabun.className}>
        <header>
          <div className="header-inner">
            <a href="/" className="logo">tongz.co</a>
            <nav>
              <a href="/">หน้าแรก</a>
              <a href="/about">เกี่ยวกับ</a>
            </nav>
          </div>
        </header>
        <main>{children}</main>
        <footer>
          <p>© 2025 tongz.co</p>
        </footer>
      </body>
    </html>
  );
}

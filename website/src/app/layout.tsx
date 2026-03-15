import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI沉浸式研学系统 - 下一代沉浸式学习体验",
  description: "融合人工智能与研学教育，打造下一代沉浸式学习体验。提供智能剧本生成、实时数据分析、AI对话辅导等核心能力。",
  keywords: "AI研学, 沉浸式学习, 研学系统, 教育科技, 智能教育",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className={inter.className}>
        <Navigation />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
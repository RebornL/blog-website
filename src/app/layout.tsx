import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Reborn's Blog",
  description: "Notes on software, systems, and learning.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-white text-zinc-900">
        {children}
      </body>
    </html>
  );
}

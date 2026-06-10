import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: { default: "AITools Global - Discover the Best AI Tools", template: "%s | AITools Global" },
  description:
    "Discover 16+ curated AI tools across 8 categories. Find the perfect AI tool for writing, coding, design, video, voice, and more. Updated daily.",
  keywords: ["AI tools", "AI directory", "ChatGPT", "Claude", "Midjourney", "AI writing", "AI coding", "AI导航"],
  openGraph: { type: "website", locale: "en_US", siteName: "AITools Global", title: "AITools Global", description: "Curated AI tools directory. 16+ tools, 8 categories, updated daily." },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <body className="min-h-screen flex flex-col bg-[#F8F8F9]">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

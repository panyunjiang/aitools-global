import Link from "next/link";
import { ArrowRight, Sparkles, Search } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-[#111439]">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#111439] via-[#1a1d4e] to-[#F8F8F9]" />

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(#F8F8F9 1px, transparent 1px), linear-gradient(90deg, #F8F8F9 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 md:px-6 pt-20 pb-32 md:pt-28 md:pb-40 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F8F8F9]/10 border border-[#F8F8F9]/15 text-[#F8F8F9] text-sm mb-8 backdrop-blur-sm">
          <Sparkles size={14} className="text-[#b8bcd8]" />
          <span>Curated · Updated Daily</span>
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-[#F8F8F9] mb-6 max-w-4xl mx-auto">
          Discover the Best{" "}
          <span className="gradient-text">AI Tools</span>
          <br />
          for Everything
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-[#b8bcd8] max-w-2xl mx-auto mb-10">
          探索 16+ 精选 AI 工具，覆盖写作、编程、设计、视频、音频等 8 大领域。
          <br />
          Find the perfect AI tool for every task — curated, compared, and updated daily.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <Link
            href="/category"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-[#F8F8F9] text-[#111439] font-semibold hover:bg-white transition-colors shadow-lg shadow-[#111439]/30"
          >
            <Search size={18} />
            Browse All Tools
            <ArrowRight size={18} />
          </Link>
          <Link
            href="/news"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl border border-[#F8F8F9]/20 text-[#F8F8F9] font-medium hover:bg-[#F8F8F9]/5 transition-colors"
          >
            Read AI News →
          </Link>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-center gap-8 md:gap-12 text-[#b8bcd8]">
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-[#F8F8F9]">16+</div>
            <div className="text-sm">Tools / 工具</div>
          </div>
          <div className="w-px h-10 bg-[#2a2b5a]" />
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-[#F8F8F9]">8</div>
            <div className="text-sm">Categories / 分类</div>
          </div>
          <div className="w-px h-10 bg-[#2a2b5a]" />
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-[#F8F8F9]">Daily</div>
            <div className="text-sm">Updates / 日更</div>
          </div>
        </div>
      </div>
    </section>
  );
}

import Link from "next/link";
import { ArrowRight, Sparkles, TrendingUp, Globe } from "lucide-react";
import { HeroSection } from "@/components/hero-section";
import { ToolCard } from "@/components/tool-card";
import { getFeaturedTools, getAllTools, getCategories, getAllNews } from "@/lib/data";

export default async function Home() {
  const [featuredTools, allTools, categories, newsArticles] = await Promise.all([
    getFeaturedTools(),
    getAllTools(),
    getCategories(),
    getAllNews(),
  ]);
  const recentTools = allTools.filter((t) => !t.featured).slice(0, 4);

  return (
    <>
      <HeroSection />

      <div className="max-w-7xl mx-auto px-4 md:px-6 -mt-16 relative z-10">
        {/* === Featured Tools: Bento Grid === */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-[#111439]">Featured AI Tools</h2>
              <p className="text-[#6b6e8a] mt-1">精选推荐 · Most popular this week</p>
            </div>
            <Link
              href="/category"
              className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium text-[#111439] hover:underline"
            >
              View All <ArrowRight size={14} />
            </Link>
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-auto">
            {featuredTools.map((tool, i) => (
              <ToolCard key={tool.id} tool={tool} size={i === 0 ? "large" : "normal"} />
            ))}
          </div>
        </section>

        {/* === Categories === */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-[#111439] mb-2">Browse by Category</h2>
          <p className="text-[#6b6e8a] mb-8">按分类浏览 · 8 categories</p>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/category?c=${cat.slug}`}
                className="group flex items-center gap-3 p-4 rounded-2xl bg-white border border-[#e2e3ea] hover:border-[#111439]/20 hover:shadow-sm transition-all"
              >
                <span className="text-2xl group-hover:scale-110 transition-transform">{cat.icon}</span>
                <div>
                  <div className="font-medium text-[#111439] text-sm">{cat.name}</div>
                  <div className="text-xs text-[#6b6e8a]">{cat.nameZh} · {cat.count}</div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* === More Tools === */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-[#111439] mb-2">Recently Added</h2>
          <p className="text-[#6b6e8a] mb-8">最新收录 · Updated daily</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {recentTools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        </section>

        {/* === Why AITools Global === */}
        <section className="mb-16 bg-[#111439] rounded-3xl p-8 md:p-12 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-[#F8F8F9] mb-4">
            Why AITools Global?
          </h2>
          <p className="text-[#b8bcd8] mb-10 max-w-2xl mx-auto">
            The AI landscape changes every day. We track, curate, and compare the best tools so you don't have to.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            {[
              { icon: <Sparkles size={24} />, title: "Daily Updates", desc: "New tools and reviews added every day. Stay ahead of the AI curve." },
              { icon: <Globe size={24} />, title: "Global Coverage", desc: "Tools from around the world. English + Chinese descriptions for broader reach." },
              { icon: <TrendingUp size={24} />, title: "Honest Reviews", desc: "Real comparisons based on actual usage. No sponsored rankings, no hidden bias." },
            ].map((item) => (
              <div key={item.title} className="flex gap-4 p-4">
                <div className="w-10 h-10 rounded-xl bg-[#F8F8F9]/10 flex items-center justify-center text-[#F8F8F9] shrink-0">
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-[#F8F8F9] mb-1">{item.title}</h3>
                  <p className="text-sm text-[#9498b8] leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* === AI News Teaser === */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-[#111439]">Latest AI News</h2>
              <p className="text-[#6b6e8a] mt-1">AI资讯 · Stay informed</p>
            </div>
            <Link
              href="/news"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#111439] hover:underline"
            >
              Read More <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {newsArticles.slice(0, 3).map((news) => (
              <Link
                key={news.slug}
                href={`/news/${news.slug}`}
                className="group block p-5 rounded-2xl bg-white border border-[#e2e3ea] hover:border-[#111439]/20 hover:shadow-sm transition-all"
              >
                <span className="text-[10px] font-semibold uppercase tracking-wider text-[#9498b8] mb-2 block">
                  {news.category} · {news.date}
                </span>
                <h3 className="font-medium text-[#111439] group-hover:text-[#3b3f6e] transition-colors leading-snug">
                  {news.title}
                </h3>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}

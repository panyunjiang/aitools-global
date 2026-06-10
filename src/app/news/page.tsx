import Link from "next/link";
import { getAllNews } from "@/lib/data";

export default async function NewsPage() {
  const articles = await getAllNews();

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-6 py-8">
      <Link href="/" className="text-sm text-[#6b6e8a] hover:text-[#111439] mb-4 inline-block">← Back to Home</Link>
      <h1 className="text-2xl md:text-3xl font-bold text-[#111439] mb-2">AI News & Updates</h1>
      <p className="text-[#6b6e8a] mb-10">AI资讯 · Stay informed about the latest AI developments</p>

      <div className="space-y-4">
        {articles.map((article) => (
          <Link key={article.slug} href={`/news/${article.slug}`}
            className="group block p-6 rounded-2xl bg-white border border-[#e2e3ea] hover:border-[#111439]/20 hover:shadow-sm transition-all">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#9498b8]">{article.category}</span>
              <span className="text-xs text-[#b8bcd8]">·</span>
              <time className="text-xs text-[#9498b8]">{article.date}</time>
            </div>
            <h2 className="text-lg font-semibold text-[#111439] group-hover:text-[#3b3f6e] transition-colors mb-2">{article.title}</h2>
            <p className="text-sm text-[#6b6e8a] leading-relaxed mb-3">{article.excerpt}</p>
            <div className="flex flex-wrap gap-1.5">
              {article.tags.map((tag) => (
                <span key={tag} className="text-[11px] px-2 py-0.5 rounded-md bg-[#F8F8F9] text-[#6b6e8a] border border-[#e2e3ea]">{tag}</span>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

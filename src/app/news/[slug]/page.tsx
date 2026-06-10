import Link from "next/link";
import { notFound } from "next/navigation";
import { getNewsBySlug, getAllNews } from "@/lib/data";
import type { Metadata } from "next";

interface Props { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  const articles = await getAllNews();
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = await getNewsBySlug(slug);
  if (!article) return { title: "Not Found" };
  return { title: article.title, description: article.excerpt };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = await getNewsBySlug(slug);
  if (!article) notFound();

  return (
    <div className="max-w-3xl mx-auto px-4 md:px-6 py-8">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/news" className="text-sm text-[#6b6e8a] hover:text-[#111439]">← All News</Link>
        <Link href="/" className="text-sm text-[#6b6e8a] hover:text-[#111439]">Home</Link>
      </div>

      <header className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full bg-[#111439] text-[#F8F8F9]">{article.category}</span>
          <time className="text-sm text-[#9498b8]">{article.date}</time>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-[#111439] mb-4 leading-tight">{article.title}</h1>
        <p className="text-lg text-[#6b6e8a] leading-relaxed">{article.excerpt}</p>
        <div className="flex flex-wrap gap-1.5 mt-4">
          {article.tags.map((tag) => (<span key={tag} className="text-xs px-2.5 py-1 rounded-md bg-[#F8F8F9] text-[#6b6e8a] border border-[#e2e3ea]">#{tag}</span>))}
        </div>
      </header>

      <hr className="border-[#e2e3ea] mb-8" />

      <article className="prose-custom">
        {article.content.split("\n").map((line, i) => {
          if (line.startsWith("## ")) return <h2 key={i} className="text-xl font-bold text-[#111439] mt-10 mb-4">{line.replace("## ", "")}</h2>;
          if (line.startsWith("### ")) return <h3 key={i} className="text-lg font-semibold text-[#111439] mt-8 mb-3">{line.replace("### ", "")}</h3>;
          if (line.startsWith("- **")) {
            const match = line.match(/- \*\*(.+?)\*\*:?(.*)/);
            if (match) return <li key={i} className="ml-4 list-disc text-[#3b3f6e] mb-1"><strong className="text-[#111439]">{match[1]}</strong>{match[2]}</li>;
            return <li key={i} className="ml-4 list-disc text-[#3b3f6e] mb-1">{line.replace("- ", "")}</li>;
          }
          if (line.startsWith("- ")) return <li key={i} className="ml-4 list-disc text-[#3b3f6e] mb-1">{line.replace("- ", "")}</li>;
          if (line.startsWith("| ")) return null;
          if (line.trim() === "") return <div key={i} className="h-2" />;
          return <p key={i} className="text-[#3b3f6e] leading-relaxed mb-1.5">{line}</p>;
        })}
      </article>

      <hr className="border-[#e2e3ea] mt-12 mb-6" />
      <div className="flex items-center justify-between">
        <Link href="/news" className="text-sm font-medium text-[#111439] hover:underline">← Back to News</Link>
        <Link href="/" className="text-sm font-medium text-[#111439] hover:underline">Go to Homepage →</Link>
      </div>
    </div>
  );
}

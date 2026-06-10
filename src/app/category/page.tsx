import Link from "next/link";
import { getToolsByCategory, getAllTools, getCategories } from "@/lib/data";
import { ToolCard } from "@/components/tool-card";

interface Props { searchParams: Promise<{ c?: string }> }

export default async function CategoryPage({ searchParams }: Props) {
  const { c } = await searchParams;
  const [filteredTools, allTools, categories] = await Promise.all([
    c ? getToolsByCategory(c) : getAllTools(),
    getAllTools(),
    getCategories(),
  ]);

  const current = categories.find((cat) => cat.slug === c);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
      <Link href="/" className="text-sm text-[#6b6e8a] hover:text-[#111439] mb-4 inline-block">
        ← Back to Home
      </Link>

      <h1 className="text-2xl font-bold text-[#111439] mb-2">
        {current ? `${current.icon} ${current.name}` : "All Categories"}
      </h1>
      <p className="text-[#6b6e8a] mb-8">
        {current ? current.name : "Browse all AI tools by category"} · {filteredTools.length} tools
      </p>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2 mb-10">
        <Link
          href="/category"
          className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
            !c ? "bg-[#111439] text-[#F8F8F9]" : "bg-white border border-[#e2e3ea] text-[#6b6e8a] hover:border-[#111439]/20"
          }`}
        >
          All ({allTools.length})
        </Link>
        {categories.map((cat) => (
          <Link
            key={cat.slug}
            href={`/category?c=${cat.slug}`}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              c === cat.slug ? "bg-[#111439] text-[#F8F8F9]" : "bg-white border border-[#e2e3ea] text-[#6b6e8a] hover:border-[#111439]/20"
            }`}
          >
            {cat.icon} {cat.name} ({cat.count})
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTools.map((tool) => (<ToolCard key={tool.id} tool={tool} />))}
      </div>
    </div>
  );
}

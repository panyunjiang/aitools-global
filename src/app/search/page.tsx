import Link from "next/link";
import { searchTools } from "@/lib/data";
import { ToolCard } from "@/components/tool-card";
import { Search } from "lucide-react";

interface Props { searchParams: Promise<{ q?: string }> }

export default async function SearchPage({ searchParams }: Props) {
  const { q } = await searchParams;
  const query = q || "";
  const results = query ? await searchTools(query) : [];

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
      <Link href="/" className="text-sm text-[#6b6e8a] hover:text-[#111439] mb-4 inline-block">← Back to Home</Link>
      <h1 className="text-2xl font-bold text-[#111439] mb-2">Search: &ldquo;{query}&rdquo;</h1>
      <p className="text-[#6b6e8a] mb-8">{results.length} tool{results.length !== 1 ? "s" : ""} found</p>

      {results.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {results.map((tool) => (<ToolCard key={tool.id} tool={tool} />))}
        </div>
      ) : (
        <div className="text-center py-20">
          <Search size={48} className="mx-auto text-[#e2e3ea] mb-4" />
          <p className="text-[#6b6e8a] text-lg">{query ? `No results for "${query}"` : "Enter a search term"}</p>
        </div>
      )}
    </div>
  );
}

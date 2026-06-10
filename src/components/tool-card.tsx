import Link from "next/link";
import type { Tool } from "@/data/tools";

const pricingColor: Record<Tool["pricing"], string> = {
  Free: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Freemium: "bg-blue-50 text-blue-700 border-blue-200",
  Paid: "bg-violet-50 text-violet-700 border-violet-200",
  "Open Source": "bg-amber-50 text-amber-700 border-amber-200",
};

export function ToolCard({ tool, size = "normal" }: { tool: Tool; size?: "normal" | "large" }) {
  return (
    <Link
      href={tool.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`tool-card group block bg-white border border-[#e2e3ea] rounded-2xl p-5 hover:border-[#111439]/20 ${
        size === "large" ? "md:col-span-2 md:row-span-2" : ""
      }`}
    >
      <div className="flex items-start gap-4">
        {/* Logo / Icon */}
        <div className="w-12 h-12 rounded-xl bg-[#F8F8F9] flex items-center justify-center text-2xl shrink-0 group-hover:scale-110 transition-transform">
          {tool.logo}
        </div>

        <div className="flex-1 min-w-0">
          {/* Title row */}
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <h3 className="font-semibold text-[#111439] text-base">{tool.name}</h3>
            <span
              className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ${pricingColor[tool.pricing]}`}
            >
              {tool.pricing}
            </span>
            {tool.featured && (
              <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-[#111439] text-[#F8F8F9]">
                Featured
              </span>
            )}
          </div>

          {/* Description */}
          <p className="text-sm text-[#6b6e8a] line-clamp-2 mb-3 leading-relaxed">
            {tool.descriptionZh}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5">
            {tool.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-[11px] px-2 py-0.5 rounded-md bg-[#F8F8F9] text-[#6b6e8a] border border-[#e2e3ea]"
              >
                {tag}
              </span>
            ))}
            {tool.tags.length > 3 && (
              <span className="text-[11px] text-[#9498b8]">+{tool.tags.length - 3}</span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}

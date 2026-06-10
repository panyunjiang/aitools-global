import Link from "next/link";

const footerLinks = [
  { href: "/category", label: "Categories" },
  { href: "/news", label: "AI News" },
  { href: "https://bs.aiv.yn.cn", label: "AI百事通" },
  { href: "https://prompt.aiv.yn.cn", label: "PromptHub" },
];

export function Footer() {
  return (
    <footer className="bg-[#111439] border-t border-[#2a2b5a] mt-20">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <span className="text-2xl">🤖</span>
            <span className="font-bold text-[#F8F8F9]">AITools</span>
            <span className="text-sm text-[#9498b8]">· Global Directory</span>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6">
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-[#9498b8] hover:text-[#F8F8F9] transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-[#2a2b5a] text-center text-sm text-[#6b6e8a]">
          © {new Date().getFullYear()} AITools Global. Curated with care. Updated daily.
        </div>
      </div>
    </footer>
  );
}

"use client";

import Link from "next/link";
import { useState } from "react";
import { Search, Menu, X } from "lucide-react";
import { useRouter } from "next/navigation";

const navLinks = [
  { href: "/", label: "Home", labelZh: "首页" },
  { href: "/category", label: "Categories", labelZh: "分类" },
  { href: "/news", label: "AI News", labelZh: "AI资讯" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-[#111439]/95 backdrop-blur-md border-b border-[#2a2b5a]">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <span className="text-2xl">🤖</span>
            <span className="font-bold text-lg text-[#F8F8F9]">AITools</span>
            <span className="hidden sm:inline text-sm text-[#9498b8]">· Global</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 rounded-lg text-[#b8bcd8] hover:text-[#F8F8F9] hover:bg-[#1a1d4e] transition-colors text-sm font-medium"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Search */}
          <form onSubmit={handleSearch} className="hidden md:flex items-center">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9498b8]" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search AI tools..."
                className="w-56 pl-9 pr-4 py-2 bg-[#0a0b1e] border border-[#2a2b5a] rounded-lg text-sm text-[#F8F8F9] placeholder:text-[#6b6e8a] focus:outline-none focus:border-[#9498b8] transition-colors"
              />
            </div>
          </form>

          {/* Mobile menu button */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-[#F8F8F9] p-2"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="md:hidden pb-4 border-t border-[#2a2b5a] pt-4 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="block px-3 py-2 rounded-lg text-[#b8bcd8] hover:text-[#F8F8F9] hover:bg-[#1a1d4e] transition-colors text-sm"
              >
                {link.labelZh} / {link.label}
              </Link>
            ))}
            <form onSubmit={handleSearch} className="px-3">
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9498b8]" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search AI tools..."
                  className="w-full pl-9 pr-4 py-2 bg-[#0a0b1e] border border-[#2a2b5a] rounded-lg text-sm text-[#F8F8F9] placeholder:text-[#6b6e8a] focus:outline-none focus:border-[#9498b8]"
                />
              </div>
            </form>
          </div>
        )}
      </div>
    </nav>
  );
}

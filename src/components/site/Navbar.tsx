import { useEffect, useState } from "react";
import { Command } from "lucide-react";

const links = [
  { label: "Control", href: "#control" },
  { label: "Pipeline", href: "#pipeline" },
  { label: "Agents", href: "#agents" },
  { label: "Studio", href: "#studio" },
  { label: "Reels", href: "#reels" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header className="fixed top-0 inset-x-0 z-50 flex justify-center px-4 pt-4">
      <nav
        className={`flex items-center gap-2 sm:gap-6 px-3 sm:px-4 h-12 rounded-full transition-all duration-500 ${
          scrolled
            ? "glass-strong shadow-[0_8px_30px_rgba(0,0,0,0.3)] w-full max-w-3xl"
            : "w-full max-w-2xl bg-white/95 border border-white/6"
        }`}
      >
        <a href="#top" className="flex items-center gap-2 pl-2 group">
          <span className="relative flex h-6 w-6 items-center justify-center">
            <span className="absolute inset-0 rounded-md bg-iris/40 blur-md group-hover:bg-iris/60 transition" />
            <span className="relative h-2 w-2 rounded-full bg-iris pulse-dot" />
          </span>
          <span className="text-sm font-medium tracking-tight">PulseAI</span>
        </a>
        <ul className="hidden md:flex items-center gap-1 ml-2 text-sm text-muted-foreground">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="px-3 py-1.5 rounded-full hover:text-foreground hover:bg-white/5 transition-colors"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="ml-auto flex items-center gap-1.5">
          <a
            href="#ask"
            className="hidden sm:inline-flex h-8 items-center gap-1.5 px-3 rounded-full text-xs text-muted-foreground hover:text-foreground hover:bg-white/5 transition border border-white/8"
            aria-label="Open command palette"
          >
            <Command className="h-3 w-3" /> Ask{" "}
            <kbd className="font-mono text-[10px] opacity-70">⌘K</kbd>
          </a>
          <a
            href="#cta"
            className="inline-flex h-10 items-center px-4 rounded-full bg-gradient-to-r from-iris to-fuchsia-600 text-white text-sm font-semibold shadow-lg ring-2 ring-iris/20 hover:scale-105 transform transition"
            aria-label="Get early access"
          >
            Get Early Access
          </a>
        </div>
      </nav>
    </header>
  );
}

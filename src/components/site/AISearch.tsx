import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Search, Mic, Sparkles, TrendingUp, Globe } from "lucide-react";

const prompts = [
  "Latest SpaceX mission",
  "Explain AGI in 30 seconds",
  "What did NASA discover today?",
  "Top robotics breakthroughs this week",
];

const trending = ["#Europa", "#GPT-6", "#NeuralLace", "#FusionIgnition", "#Mars2026"];
const langs = [
  { code: "EN", label: "English", sample: "Europa shows signs of liquid water." },
  { code: "NE", label: "नेपाली", sample: "युरोपामा तरल पानीको संकेत भेटियो।" },
  { code: "HI", label: "हिन्दी", sample: "यूरोपा पर तरल पानी के संकेत मिले।" },
];

export function AISearch() {
  const [typed, setTyped] = useState("");
  const [pi, setPi] = useState(0);
  const [lang, setLang] = useState(0);
  const ref = useRef(0);

  useEffect(() => {
    const target = prompts[pi];
    const id = setInterval(() => {
      ref.current += 1;
      if (ref.current <= target.length) {
        setTyped(target.slice(0, ref.current));
      } else if (ref.current > target.length + 12) {
        ref.current = 0;
        setTyped("");
        setPi((p) => (p + 1) % prompts.length);
      }
    }, 70);
    return () => clearInterval(id);
  }, [pi]);

  return (
    <section id="ask" className="relative py-28 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.2em] text-iris/80 mb-3">
            <Sparkles className="h-3 w-3" /> Ask PulseAI
          </div>
          <h2 className="text-4xl sm:text-5xl font-display tracking-tight">
            Ask anything. <span className="text-muted-foreground">Get a reel.</span>
          </h2>
        </div>

        <div className="glass-strong rounded-2xl p-2 iris-glow">
          <div className="flex items-center gap-3 px-4 py-3.5">
            <Search className="h-4 w-4 text-muted-foreground" />
            <div className="flex-1 text-base font-mono">
              <span>{typed}</span>
              <span className="inline-block w-[2px] h-4 bg-iris align-middle ml-0.5 animate-pulse" />
            </div>
            <kbd className="hidden sm:inline-flex h-6 items-center px-1.5 rounded border border-white/10 bg-white/5 text-[10px] font-mono text-muted-foreground">
              ⌘K
            </kbd>
            <button
              aria-label="Voice search"
              className="h-8 w-8 grid place-items-center rounded-full bg-iris/15 border border-iris/30 text-iris hover:bg-iris/25 transition"
            >
              <Mic className="h-3.5 w-3.5" />
            </button>
          </div>

          <div className="border-t border-white/8 px-2 py-2 grid sm:grid-cols-2 gap-1">
            {prompts.map((p) => (
              <button
                key={p}
                className="text-left px-3 py-2 rounded-lg hover:bg-white/5 text-sm flex items-center gap-2 transition"
              >
                <Sparkles className="h-3 w-3 text-iris/70" />
                <span className="text-foreground/85">{p}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-5 flex items-center gap-2 flex-wrap">
          <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-muted-foreground flex items-center gap-1.5">
            <TrendingUp className="h-3 w-3" /> trending
          </div>
          {trending.map((t) => (
            <span
              key={t}
              className="px-2.5 py-1 rounded-full text-xs bg-white/[0.04] border border-white/8 text-muted-foreground hover:text-foreground hover:bg-white/[0.07] cursor-pointer transition"
            >
              {t}
            </span>
          ))}
        </div>

        {/* Multi-language */}
        <div className="mt-10 grid sm:grid-cols-[auto_1fr] gap-4 items-center glass rounded-2xl p-5">
          <div className="flex items-center gap-2">
            <Globe className="h-4 w-4 text-iris" />
            <div className="flex rounded-full bg-white/[0.04] border border-white/8 p-1">
              {langs.map((l, i) => (
                <button
                  key={l.code}
                  onClick={() => setLang(i)}
                  className={`px-3 py-1 text-xs font-mono rounded-full transition ${lang === i ? "bg-iris text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
                >
                  {l.code}
                </button>
              ))}
            </div>
          </div>
          <motion.div
            key={lang}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm sm:text-base text-foreground/90"
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground mr-2">
              subtitle
            </span>
            {langs[lang].sample}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

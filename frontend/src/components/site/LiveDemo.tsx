import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Wand2, Film, Send } from "lucide-react";

const stages = [
  { id: 0, label: "Headline ingested", icon: Sparkles, text: "NASA's Europa Clipper detects plumes near Jupiter's icy moon." },
  { id: 1, label: "AI summarizing", icon: Wand2, text: "Drafting 38s narration · ne-NP · grade-9 reading level" },
  { id: 2, label: "Storyboard rendering", icon: Film, text: "7 scenes · captions · b-roll matched" },
  { id: 3, label: "Reel ready", icon: Send, text: "Queued · TikTok · Reels · Shorts" },
];

export function LiveDemo() {
  const [step, setStep] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setStep((s) => (s + 1) % stages.length), 2400);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="demo" className="relative py-28 px-4 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.2em] text-iris/80 mb-3">
            <span className="h-1.5 w-1.5 rounded-full bg-iris pulse-dot" /> Live demo
          </div>
          <h2 className="text-4xl sm:text-5xl font-display tracking-tight text-balance">
            Watch a headline become a reel.
          </h2>
          <p className="mt-3 text-muted-foreground max-w-xl mx-auto">A real run, sped up. No edits, no humans in the loop.</p>
        </div>

        <div className="grid lg:grid-cols-[1.4fr_1fr] gap-4">
          {/* Pipeline */}
          <div className="glass rounded-2xl p-6 relative">
            <div className="space-y-3">
              {stages.map((s, i) => {
                const active = step === i;
                const done = step > i;
                const Icon = s.icon;
                return (
                  <div
                    key={s.id}
                    className={`flex items-start gap-3 rounded-xl border p-4 transition-all duration-500 ${
                      active ? "border-iris/40 bg-iris/5" : done ? "border-white/8 bg-white/[0.015]" : "border-white/5 bg-white/[0.01] opacity-60"
                    }`}
                  >
                    <span className={`mt-0.5 flex h-7 w-7 items-center justify-center rounded-md border ${active ? "border-iris/50 bg-iris/15" : "border-white/10 bg-white/5"}`}>
                      <Icon className={`h-3.5 w-3.5 ${active ? "text-iris" : done ? "text-iris-soft" : "text-muted-foreground"}`} />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between">
                        <div className="text-sm font-medium">{s.label}</div>
                        <div className="text-[10px] font-mono text-muted-foreground">
                          {done ? "✓ done" : active ? "running…" : "queued"}
                        </div>
                      </div>
                      <AnimatePresence mode="wait">
                        {active && (
                          <motion.div
                            key={s.id}
                            initial={{ opacity: 0, y: 4 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="text-xs text-muted-foreground mt-1"
                          >
                            {s.text}
                          </motion.div>
                        )}
                      </AnimatePresence>
                      {active && (
                        <div className="mt-2 h-0.5 w-full overflow-hidden rounded-full bg-white/5">
                          <div className="h-full w-1/2 shimmer-line" />
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Phone preview */}
          <div className="flex items-center justify-center">
            <div className="relative w-[260px] h-[520px] rounded-[36px] border border-white/10 bg-black overflow-hidden iris-glow">
              <div className="absolute inset-0 bg-gradient-to-b from-iris/30 via-transparent to-cyan-glow/20" />
              <div className="absolute top-3 left-1/2 -translate-x-1/2 h-5 w-24 rounded-full bg-black/80" />
              <div className="absolute inset-x-4 top-12 flex items-center justify-between text-[10px] font-mono text-white/70">
                <span>PulseAI</span>
                <span className="flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-iris pulse-dot" /> live</span>
              </div>
              <div className="absolute inset-x-4 bottom-20 text-white">
                <div className="text-[11px] font-mono uppercase tracking-[0.18em] text-white/60">Scene {Math.min(step + 1, stages.length)}/4</div>
                <div className="font-display text-2xl leading-tight mt-1 text-balance">
                  {stages[step].text.split(" ").slice(0, 7).join(" ")}…
                </div>
              </div>
              <div className="absolute inset-x-4 bottom-12 h-0.5 rounded-full bg-white/10 overflow-hidden">
                <motion.div
                  key={step}
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 2.4, ease: "linear" }}
                  className="h-full bg-white"
                />
              </div>
              <div className="absolute right-3 bottom-24 flex flex-col items-center gap-3 text-white/80 text-[10px]">
                {["♥", "↗", "✚"].map((g, i) => (
                  <div key={i} className="h-9 w-9 rounded-full glass-strong grid place-items-center text-base">{g}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
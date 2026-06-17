import { motion } from "motion/react";
import heroDash from "@/assets/hero-dashboard.jpg";

export function Hero() {
  return (
    <section id="top" className="relative pt-36 sm:pt-44 pb-24 overflow-hidden noise">
      <div className="absolute inset-0 grid-bg pointer-events-none" />
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-[420px] w-[820px] rounded-full bg-iris/20 blur-[120px] pointer-events-none" />

      <div className="relative mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center"
        >
          <div className="glass inline-flex items-center gap-2 rounded-full pl-1.5 pr-3 py-1 text-xs text-muted-foreground">
            <span className="rounded-full bg-iris/15 text-iris-soft px-2 py-0.5 text-[10px] font-medium tracking-wide">
              NEW
            </span>
            Live news pipeline · v0.4 in private beta
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.05 }}
          className="mt-6 text-center text-balance text-5xl sm:text-6xl md:text-7xl leading-[1.02] tracking-tight"
        >
          From global breakthroughs
          <br />
          to <span className="font-display italic text-iris-soft">60-second</span> learning.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mt-6 mx-auto max-w-xl text-center text-base sm:text-lg text-muted-foreground text-balance"
        >
          PulseAI distills frontier news in AI, space and robotics into short-form reels — built for
          the next generation of curious minds.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="mt-9 flex items-center justify-center gap-3"
        >
          <a
            href="#analytics"
            className="group inline-flex h-11 items-center gap-2 rounded-full bg-foreground px-5 text-sm font-medium text-background hover:bg-foreground/90 transition"
          >
            <span className="relative flex h-5 w-5 items-center justify-center rounded-full bg-iris/20">
              <svg viewBox="0 0 24 24" className="h-3 w-3 fill-background">
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
            Watch demo
          </a>
          <a
            href="#pipeline"
            className="inline-flex h-11 items-center gap-2 rounded-full glass px-5 text-sm font-medium hover:bg-white/[0.06] transition"
          >
            Explore pipeline
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4 stroke-current"
              fill="none"
              strokeWidth="1.6"
            >
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </a>
        </motion.div>

        {/* Dashboard preview */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, delay: 0.35, ease: [0.2, 0.8, 0.2, 1] }}
          className="relative mt-20"
        >
          <div className="absolute -inset-4 rounded-[28px] bg-gradient-to-b from-iris/20 via-transparent to-transparent blur-2xl" />
          <div className="relative rounded-2xl glass-strong iris-glow overflow-hidden">
            {/* mock window chrome */}
            <div className="flex items-center gap-2 px-4 h-9 border-b border-white/5">
              <span className="h-2 w-2 rounded-full bg-white/20" />
              <span className="h-2 w-2 rounded-full bg-white/20" />
              <span className="h-2 w-2 rounded-full bg-white/20" />
              <div className="ml-4 text-[11px] text-muted-foreground font-mono">
                pulse.ai/orchestrator
              </div>
              <div className="ml-auto flex items-center gap-1.5 text-[11px] text-muted-foreground">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 pulse-dot" />
                live
              </div>
            </div>
            <div className="relative">
              <img
                src={heroDash}
                alt="PulseAI orchestrator dashboard"
                width={1600}
                height={1100}
                className="w-full h-auto block opacity-95"
              />
              {/* Overlay floating cards to mask garbled text & add product feel */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/30 to-background/95" />
              <div className="hidden sm:block absolute left-6 top-6 glass rounded-xl p-3 w-56 animate-float-slow">
                <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
                  <span className="h-1.5 w-1.5 rounded-full bg-iris pulse-dot" />
                  Curation agent
                </div>
                <div className="mt-2 text-sm font-medium leading-snug">
                  DeepMind unveils Gemini 3 reasoning model
                </div>
                <div className="mt-3 flex items-center justify-between text-[10px] text-muted-foreground">
                  <span>scoring · 0.94</span>
                  <span>2m ago</span>
                </div>
              </div>
              <div
                className="hidden sm:block absolute right-6 top-12 glass rounded-xl p-3 w-52 animate-float-slow"
                style={{ animationDelay: "1.2s" }}
              >
                <div className="text-[11px] text-muted-foreground">Reels generated · today</div>
                <div className="mt-1 flex items-end gap-1">
                  <span className="text-2xl font-medium">128</span>
                  <span className="text-[11px] text-emerald-400 mb-1">+24%</span>
                </div>
                <div className="mt-2 h-8 flex items-end gap-0.5">
                  {[12, 18, 9, 22, 15, 28, 20, 32, 26, 38, 30, 42].map((h, i) => (
                    <span
                      key={i}
                      className="w-1.5 rounded-sm bg-iris/60"
                      style={{ height: `${h}px` }}
                    />
                  ))}
                </div>
              </div>
              <div className="hidden md:block absolute left-1/2 -translate-x-1/2 bottom-6 glass rounded-full px-3 py-1.5 text-[11px] flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-iris pulse-dot" />4 agents synchronized
                · pipeline healthy
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

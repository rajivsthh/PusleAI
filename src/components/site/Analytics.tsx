import { motion } from "motion/react";

const trending = [
  { tag: "Gemini 3", delta: "+312%" },
  { tag: "Starship", delta: "+148%" },
  { tag: "Humanoids", delta: "+96%" },
  { tag: "Quantum", delta: "+71%" },
  { tag: "AlphaFold", delta: "+54%" },
];

function Spark({ values, color = "var(--iris)" }: { values: number[]; color?: string }) {
  const max = Math.max(...values);
  const pts = values
    .map((v, i) => `${(i / (values.length - 1)) * 100},${100 - (v / max) * 100}`)
    .join(" ");
  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-16">
      <defs>
        <linearGradient id="sg" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor={color} stopOpacity="0.4" />
          <stop offset="1" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polyline points={pts} fill="none" stroke={color} strokeWidth="1.5" />
      <polygon points={`0,100 ${pts} 100,100`} fill="url(#sg)" />
    </svg>
  );
}

export function Analytics() {
  return (
    <section id="analytics" className="relative py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-2xl">
          <div className="text-xs text-iris-soft tracking-wider uppercase">Analytics</div>
          <h2 className="mt-2 text-3xl sm:text-4xl tracking-tight">
            A newsroom you can actually measure.
          </h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-12 rounded-3xl glass-strong overflow-hidden"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/5">
            <div className="p-6">
              <div className="text-xs text-muted-foreground">Daily videos</div>
              <div className="mt-2 flex items-end gap-2">
                <span className="text-4xl font-medium tracking-tight">128</span>
                <span className="text-xs text-emerald-400 mb-1.5">+24%</span>
              </div>
              <Spark values={[6, 12, 9, 18, 14, 22, 20, 28, 24, 32, 30, 38, 35, 42]} />
            </div>
            <div className="p-6">
              <div className="text-xs text-muted-foreground">Engagement rate</div>
              <div className="mt-2 flex items-end gap-2">
                <span className="text-4xl font-medium tracking-tight">
                  14.2<span className="text-lg text-muted-foreground">%</span>
                </span>
                <span className="text-xs text-emerald-400 mb-1.5">+3.1%</span>
              </div>
              <Spark
                values={[8, 9, 11, 10, 12, 11, 13, 12, 14, 13, 14, 13, 15, 14]}
                color="oklch(0.82 0.10 220)"
              />
            </div>
            <div className="p-6">
              <div className="text-xs text-muted-foreground">Avg. retention</div>
              <div className="mt-2 flex items-end gap-2">
                <span className="text-4xl font-medium tracking-tight">
                  82<span className="text-lg text-muted-foreground">%</span>
                </span>
                <span className="text-xs text-emerald-400 mb-1.5">+6%</span>
              </div>
              <Spark values={[60, 64, 62, 68, 70, 72, 74, 76, 78, 79, 80, 81, 82, 82]} />
            </div>
          </div>

          <div className="border-t border-white/5 p-6">
            <div className="flex items-center justify-between">
              <div className="text-sm">Topics trending · last 24h</div>
              <div className="text-[11px] text-muted-foreground flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 pulse-dot" />{" "}
                auto-refreshing
              </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {trending.map((t) => (
                <div
                  key={t.tag}
                  className="group inline-flex items-center gap-2 rounded-full glass px-3 py-1.5 text-xs hover:bg-white/[0.06] transition"
                >
                  <span>#{t.tag}</span>
                  <span className="text-emerald-400">{t.delta}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

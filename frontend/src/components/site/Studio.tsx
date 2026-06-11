import { CheckCircle2, Clock, Flame, MoreHorizontal } from "lucide-react";

const queue = [
  { title: "Europa Clipper detects plumes", score: 98, status: "ready", time: "now" },
  { title: "GPT-6 internal benchmarks leak", score: 84, status: "review", time: "12m" },
  { title: "Boston Dynamics Atlas v3", score: 95, status: "ready", time: "1h" },
  { title: "China's Tiangong refuel test", score: 91, status: "scheduled", time: "18:40" },
  { title: "Fusion: net-positive milestone", score: 97, status: "ready", time: "2h" },
];

export function Studio() {
  return (
    <section id="studio" className="relative py-28 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.2em] text-iris/80 mb-3">
            <span className="h-1.5 w-1.5 rounded-full bg-iris" /> Creator Studio
          </div>
          <h2 className="text-4xl sm:text-5xl font-display tracking-tight">Approve. Edit. Ship.</h2>
          <p className="mt-3 text-muted-foreground max-w-xl mx-auto">A calm dashboard for the chaos of breaking tech news.</p>
        </div>

        <div className="glass-strong rounded-2xl p-1.5 iris-glow">
          <div className="rounded-xl bg-background/60 backdrop-blur-sm overflow-hidden">
            {/* toolbar */}
            <div className="flex items-center justify-between px-4 h-11 border-b border-white/5">
              <div className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                <span className="ml-3 text-xs font-mono text-muted-foreground">studio.pulseai · queue</span>
              </div>
              <div className="text-[10px] font-mono text-muted-foreground">5 queued · 2 scheduled</div>
            </div>

            <div className="grid md:grid-cols-[1fr_280px]">
              {/* queue */}
              <div className="divide-y divide-white/5">
                {queue.map((q) => (
                  <div key={q.title} className="px-5 py-3.5 flex items-center gap-4 hover:bg-white/[0.02] transition">
                    <div className="h-10 w-10 rounded-md bg-gradient-to-br from-iris/30 to-cyan-glow/20 border border-white/10 shrink-0" />
                    <div className="min-w-0 flex-1">
                      <div className="text-sm font-medium truncate">{q.title}</div>
                      <div className="flex items-center gap-3 mt-0.5 text-[11px] text-muted-foreground font-mono">
                        <span className="flex items-center gap-1"><CheckCircle2 className="h-3 w-3 text-iris" /> {q.score}% confidence</span>
                        <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {q.time}</span>
                      </div>
                    </div>
                    <span className={`text-[10px] font-mono uppercase tracking-[0.15em] px-2 py-1 rounded-full border ${
                      q.status === "ready" ? "border-iris/30 text-iris bg-iris/5" :
                      q.status === "review" ? "border-amber-300/30 text-amber-200 bg-amber-300/5" :
                      "border-white/10 text-muted-foreground bg-white/[0.02]"
                    }`}>{q.status}</span>
                    <button className="text-muted-foreground hover:text-foreground"><MoreHorizontal className="h-4 w-4" /></button>
                  </div>
                ))}
              </div>

              {/* sidebar */}
              <aside className="border-l border-white/5 p-5 space-y-5 bg-white/[0.01]">
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-muted-foreground mb-2">Today</div>
                  <div className="flex items-end gap-1.5 h-16">
                    {[24, 38, 52, 30, 64, 42, 70, 58, 80, 66, 90, 74].map((h, i) => (
                      <div key={i} className="flex-1 rounded-sm bg-gradient-to-t from-iris/40 to-iris/80" style={{ height: `${h}%` }} />
                    ))}
                  </div>
                  <div className="flex justify-between text-[10px] font-mono text-muted-foreground mt-1.5">
                    <span>00</span><span>06</span><span>12</span><span>18</span><span>24</span>
                  </div>
                </div>

                <div>
                  <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-muted-foreground mb-2 flex items-center gap-1.5">
                    <Flame className="h-3 w-3 text-iris" /> Trending heatmap
                  </div>
                  <div className="grid grid-cols-12 gap-1">
                    {Array.from({ length: 48 }).map((_, i) => {
                      const v = (Math.sin(i * 1.2) + 1) / 2;
                      return <div key={i} className="aspect-square rounded-sm" style={{ background: `oklch(0.72 0.16 285 / ${0.08 + v * 0.55})` }} />;
                    })}
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
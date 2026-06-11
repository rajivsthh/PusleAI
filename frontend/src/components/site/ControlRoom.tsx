import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Activity, Cpu, ShieldCheck, Radio, Sparkles, Globe2 } from "lucide-react";

const agents = [
  { name: "Research", task: "Crawling arXiv · NASA · IEEE", color: "oklch(0.78 0.14 285)" },
  { name: "FactCheck", task: "Cross-verifying 4 sources", color: "oklch(0.82 0.10 220)" },
  { name: "Narration", task: "Drafting 42s script · ne-NP", color: "oklch(0.85 0.12 165)" },
  { name: "Visual Director", task: "Storyboarding 7 scenes", color: "oklch(0.84 0.13 60)" },
  { name: "Distribution", task: "Queued for TikTok · 18:40", color: "oklch(0.78 0.14 330)" },
];

function Stat({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="rounded-xl border border-white/8 bg-white/[0.02] p-4">
      <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground font-mono">{label}</div>
      <div className="mt-1.5 text-2xl font-display tracking-tight">{value}</div>
      {sub && <div className="text-xs text-muted-foreground mt-1">{sub}</div>}
    </div>
  );
}

export function ControlRoom() {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 1800);
    return () => clearInterval(id);
  }, []);
  return (
    <section id="control" className="relative py-28 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-end justify-between mb-10 gap-6 flex-wrap">
          <div>
            <div className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.2em] text-iris/80 mb-3">
              <span className="h-1.5 w-1.5 rounded-full bg-iris pulse-dot" /> Control Room · Live
            </div>
            <h2 className="text-4xl sm:text-5xl font-display tracking-tight">The AI operating system <br/>for media intelligence.</h2>
          </div>
          <div className="text-xs text-muted-foreground font-mono">SYS · v2.6.1 · uptime 99.998%</div>
        </div>

        <div className="grid lg:grid-cols-3 gap-3">
          {/* Left: Agent feed */}
          <div className="glass rounded-2xl p-5 lg:col-span-1">
            <div className="flex items-center justify-between mb-4">
              <div className="text-xs font-mono uppercase tracking-[0.18em] text-muted-foreground">Agent Activity</div>
              <Activity className="h-3.5 w-3.5 text-iris" />
            </div>
            <ul className="space-y-3">
              {agents.map((a, i) => (
                <motion.li
                  key={a.name}
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className="flex items-start gap-3 rounded-xl border border-white/5 bg-white/[0.015] p-3"
                >
                  <span className="relative mt-1 h-2 w-2 rounded-full" style={{ background: a.color, boxShadow: `0 0 12px ${a.color}` }} />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{a.name}</span>
                      <span className="text-[10px] font-mono text-muted-foreground">{(120 + i * 37 + (tick % 9) * 4)}ms</span>
                    </div>
                    <div className="text-xs text-muted-foreground truncate">{a.task}</div>
                  </div>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Middle: Pipeline status */}
          <div className="glass rounded-2xl p-5 lg:col-span-2 relative overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <div className="text-xs font-mono uppercase tracking-[0.18em] text-muted-foreground">Pipeline Status</div>
              <div className="flex items-center gap-2 text-[10px] font-mono text-muted-foreground">
                <Radio className="h-3 w-3 text-iris" /> streaming
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
              <Stat label="Latency" value="412ms" sub="-18% vs 24h" />
              <Stat label="Verification" value="98.4%" sub="3 sources avg" />
              <Stat label="Active sources" value="142" sub="NASA · ESA · arXiv" />
              <Stat label="Trending" value="AGI" sub="+312% in 6h" />
            </div>

            <div className="rounded-xl border border-white/8 bg-black/30 p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2 text-xs">
                  <Sparkles className="h-3.5 w-3.5 text-iris" />
                  <span className="font-mono text-muted-foreground">job_</span>
                  <span className="font-mono">a91f · Generating video…</span>
                </div>
                <span className="text-[10px] font-mono text-iris">72%</span>
              </div>
              <div className="h-1 w-full overflow-hidden rounded-full bg-white/5">
                <motion.div
                  className="h-full bg-gradient-to-r from-iris to-cyan-glow"
                  initial={{ width: "10%" }}
                  whileInView={{ width: "72%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.6, ease: "easeOut" }}
                />
              </div>
              <div className="mt-3 grid grid-cols-5 gap-2 text-[10px] font-mono text-muted-foreground">
                {["fetch", "summarize", "storyboard", "render", "publish"].map((s, i) => (
                  <div key={s} className="flex items-center gap-1.5">
                    <span className={`h-1.5 w-1.5 rounded-full ${i < 3 ? "bg-iris" : i === 3 ? "bg-iris/60 pulse-dot" : "bg-white/15"}`} />
                    <span className={i <= 3 ? "text-foreground/80" : ""}>{s}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Node graph */}
            <div className="mt-5 rounded-xl border border-white/8 bg-white/[0.015] p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="text-[11px] font-mono uppercase tracking-[0.18em] text-muted-foreground">Agent Mesh</div>
                <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground"><Cpu className="h-3 w-3" /> 5 nodes</div>
              </div>
              <NodeGraph />
            </div>
          </div>
        </div>

        <div className="mt-3 grid sm:grid-cols-3 gap-3">
          <Badge icon={<ShieldCheck className="h-3.5 w-3.5" />} label="AI Verified" />
          <Badge icon={<Globe2 className="h-3.5 w-3.5" />} label="Source Checked" />
          <Badge icon={<Sparkles className="h-3.5 w-3.5" />} label="Generated Transparently" />
        </div>
      </div>
    </section>
  );
}

function Badge({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="glass rounded-xl px-4 py-3 flex items-center gap-2.5 text-sm">
      <span className="text-iris">{icon}</span>
      <span className="font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">{label}</span>
    </div>
  );
}

function NodeGraph() {
  const nodes = [
    { x: 10, y: 50, l: "R" },
    { x: 30, y: 18, l: "F" },
    { x: 50, y: 60, l: "N" },
    { x: 72, y: 22, l: "V" },
    { x: 92, y: 55, l: "D" },
  ];
  return (
    <svg viewBox="0 0 100 80" className="w-full h-32">
      <defs>
        <linearGradient id="ln" x1="0" x2="1">
          <stop offset="0" stopColor="oklch(0.72 0.16 285)" stopOpacity="0.1" />
          <stop offset="0.5" stopColor="oklch(0.72 0.16 285)" stopOpacity="0.7" />
          <stop offset="1" stopColor="oklch(0.82 0.10 220)" stopOpacity="0.1" />
        </linearGradient>
      </defs>
      {nodes.slice(0, -1).map((n, i) => {
        const m = nodes[i + 1];
        return <line key={i} x1={n.x} y1={n.y} x2={m.x} y2={m.y} stroke="url(#ln)" strokeWidth="0.4" />;
      })}
      {nodes.map((n, i) => (
        <g key={i}>
          <circle cx={n.x} cy={n.y} r="3" fill="oklch(0.18 0.012 260)" stroke="oklch(0.72 0.16 285)" strokeWidth="0.5" />
          <circle cx={n.x} cy={n.y} r="1.2" fill="oklch(0.72 0.16 285)">
            <animate attributeName="opacity" values="0.4;1;0.4" dur={`${1.2 + i * 0.2}s`} repeatCount="indefinite" />
          </circle>
          <text x={n.x} y={n.y + 0.8} textAnchor="middle" fontSize="2" fill="white" fontFamily="monospace">{n.l}</text>
        </g>
      ))}
    </svg>
  );
}
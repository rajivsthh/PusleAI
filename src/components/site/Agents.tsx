import { motion } from "motion/react";
import { Compass, ShieldCheck, Clapperboard, Send } from "lucide-react";

const agents = [
  { icon: Compass, name: "Curation", role: "Detects what matters today", x: "10%", y: "20%" },
  { icon: ShieldCheck, name: "Verification", role: "Cross-checks every claim", x: "70%", y: "12%" },
  { icon: Clapperboard, name: "Generation", role: "Produces the visual reel", x: "18%", y: "70%" },
  { icon: Send, name: "Distribution", role: "Ships to every platform", x: "72%", y: "72%" },
];

export function Agents() {
  return (
    <section id="agents" className="relative py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-2xl">
          <div className="text-xs text-iris-soft tracking-wider uppercase">
            Multi-agent orchestration
          </div>
          <h2 className="mt-2 text-3xl sm:text-4xl tracking-tight">
            Four agents, one continuous newsroom.
          </h2>
          <p className="mt-4 text-muted-foreground">
            Each agent owns one job, talks to the others, and hands off context. The result is a
            tireless editorial team that never sleeps.
          </p>
        </div>

        <div className="relative mt-14 rounded-3xl glass overflow-hidden">
          <div className="relative h-[460px] sm:h-[520px] grid-bg">
            {/* center node */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="relative h-24 w-24 rounded-2xl glass-strong iris-glow flex items-center justify-center">
                <div
                  className="absolute -inset-3 rounded-3xl border border-iris/30 animate-ping"
                  style={{ animationDuration: "3s" }}
                />
                <div className="text-center">
                  <div className="text-[10px] text-muted-foreground tracking-wider">PULSE</div>
                  <div className="text-sm font-medium">Core</div>
                </div>
              </div>
            </div>

            {/* connecting lines */}
            <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
              <defs>
                <linearGradient id="lg" x1="0" x2="1">
                  <stop offset="0" stopColor="oklch(0.72 0.16 285)" stopOpacity="0" />
                  <stop offset="0.5" stopColor="oklch(0.72 0.16 285)" stopOpacity="0.6" />
                  <stop offset="1" stopColor="oklch(0.72 0.16 285)" stopOpacity="0" />
                </linearGradient>
              </defs>
              {agents.map((a, i) => (
                <line
                  key={i}
                  x1={a.x}
                  y1={a.y}
                  x2="50%"
                  y2="50%"
                  stroke="url(#lg)"
                  strokeWidth="1"
                  strokeDasharray="3 5"
                >
                  <animate
                    attributeName="stroke-dashoffset"
                    from="0"
                    to="-16"
                    dur="1.4s"
                    repeatCount="indefinite"
                  />
                </line>
              ))}
            </svg>

            {agents.map((a, i) => (
              <motion.div
                key={a.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                style={{ left: a.x, top: a.y }}
                className="absolute -translate-x-1/2 -translate-y-1/2"
              >
                <div className="glass rounded-2xl p-3.5 w-[180px] hover:bg-white/[0.06] transition">
                  <div className="flex items-center gap-2.5">
                    <span className="h-8 w-8 rounded-lg bg-iris/15 flex items-center justify-center">
                      <a.icon className="h-4 w-4 text-iris-soft" strokeWidth={1.5} />
                    </span>
                    <div>
                      <div className="text-sm font-medium">{a.name}</div>
                      <div className="text-[10px] text-muted-foreground">Agent</div>
                    </div>
                  </div>
                  <div className="mt-2.5 text-[11px] text-muted-foreground">{a.role}</div>
                  <div className="mt-2.5 flex items-center gap-1.5 text-[10px]">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 pulse-dot" />
                    <span className="text-muted-foreground">
                      active · {Math.floor(20 + Math.random() * 80)} ops/min
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

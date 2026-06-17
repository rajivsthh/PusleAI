import { motion } from "motion/react";

type Card = {
  topic: string;
  title: string;
  duration: string;
  confidence: number;
  ago: string;
  hue: string;
};

const cards: Card[] = [
  {
    topic: "AI",
    title: "OpenAI's o4 hits PhD-level on FrontierMath",
    duration: "0:58",
    confidence: 96,
    ago: "2m ago",
    hue: "from-iris/30 to-transparent",
  },
  {
    topic: "Space",
    title: "SpaceX catches Starship booster on third try",
    duration: "1:12",
    confidence: 99,
    ago: "8m ago",
    hue: "from-cyan-glow/25 to-transparent",
  },
  {
    topic: "Robotics",
    title: "Figure 02 humanoid does a full warehouse shift",
    duration: "0:46",
    confidence: 92,
    ago: "14m ago",
    hue: "from-iris/25 to-transparent",
  },
  {
    topic: "Bio",
    title: "AlphaFold 4 designs a custom enzyme for plastic",
    duration: "1:03",
    confidence: 94,
    ago: "22m ago",
    hue: "from-iris-soft/25 to-transparent",
  },
  {
    topic: "Chips",
    title: "TSMC tapes out a 1.4nm test node early",
    duration: "0:51",
    confidence: 89,
    ago: "31m ago",
    hue: "from-cyan-glow/20 to-transparent",
  },
  {
    topic: "AI",
    title: "Anthropic publishes a model welfare framework",
    duration: "1:08",
    confidence: 91,
    ago: "44m ago",
    hue: "from-iris/20 to-transparent",
  },
];

function Tile({ c }: { c: Card }) {
  return (
    <div className="group relative shrink-0 w-[260px] rounded-2xl glass overflow-hidden hover:-translate-y-1 transition-all duration-500 hover:bg-white/[0.05]">
      <div className={`relative aspect-[9/14] bg-gradient-to-b ${c.hue}`}>
        <div className="absolute inset-0 grid-bg opacity-50" />
        <div className="absolute top-3 left-3 flex items-center gap-1.5">
          <span className="rounded-md bg-black/40 backdrop-blur px-2 py-0.5 text-[10px] font-medium tracking-wide">
            {c.topic}
          </span>
          <span className="rounded-md bg-iris/20 text-iris-soft backdrop-blur px-2 py-0.5 text-[10px] font-medium tracking-wide">
            AI · {c.confidence}%
          </span>
        </div>
        <div className="absolute top-3 right-3 rounded-md bg-black/40 backdrop-blur px-2 py-0.5 text-[10px] font-mono">
          {c.duration}
        </div>
        <div className="absolute inset-x-3 bottom-3">
          <div className="text-[13px] font-medium leading-snug line-clamp-3">{c.title}</div>
          <div className="mt-2 flex items-center justify-between text-[10px] text-muted-foreground">
            <span className="flex items-center gap-1">
              <span className="h-1 w-1 rounded-full bg-iris pulse-dot" /> Generated {c.ago}
            </span>
            <span className="opacity-0 group-hover:opacity-100 transition">→</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function TrendingFeed() {
  const loop = [...cards, ...cards];
  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex items-end justify-between gap-6">
          <div>
            <div className="text-xs text-iris-soft tracking-wider uppercase">Live feed</div>
            <h2 className="mt-2 text-3xl sm:text-4xl tracking-tight">
              Trending on PulseAI right now
            </h2>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-xs text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 pulse-dot" /> Streaming · 12
            sources
          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mt-10 marquee-mask overflow-hidden"
      >
        <div className="flex gap-4 w-max animate-scroll-x px-6">
          {loop.map((c, i) => (
            <Tile key={i} c={c} />
          ))}
        </div>
      </motion.div>
    </section>
  );
}

import { motion } from "motion/react";
import { Heart, MessageCircle, Send, Music2 } from "lucide-react";
import r1 from "@/assets/reel-1.jpg";
import r2 from "@/assets/reel-2.jpg";
import r3 from "@/assets/reel-3.jpg";

const reels = [
  {
    img: r1,
    title: "Why JWST just rewrote the timeline of galaxies",
    handle: "@pulse.space",
    likes: "124K",
    comments: "2.4K",
    music: "Ambient 528Hz · PulseAI",
  },
  {
    img: r2,
    title: "Figure 02 worked an entire BMW shift. Here's how.",
    handle: "@pulse.robotics",
    likes: "318K",
    comments: "9.1K",
    music: "Lo-fi pulse · PulseAI",
  },
  {
    img: r3,
    title: "Gemini 3 explained — in 60 seconds",
    handle: "@pulse.ai",
    likes: "512K",
    comments: "12.7K",
    music: "Synth wave · PulseAI",
  },
];

function Phone({ r, i }: { r: (typeof reels)[number]; i: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: i * 0.1, ease: [0.2, 0.8, 0.2, 1] }}
      className={`relative mx-auto ${i === 1 ? "md:-mt-10" : "md:mt-6"}`}
    >
      <div className="relative w-[260px] rounded-[42px] p-2.5 glass-strong shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)]">
        <div className="absolute inset-0 -z-10 rounded-[42px] bg-iris/10 blur-2xl" />
        <div className="relative aspect-[9/19] rounded-[34px] overflow-hidden bg-black">
          <img
            src={r.img}
            alt={r.title}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" />
          {/* notch */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 h-5 w-20 rounded-full bg-black" />
          {/* right rail */}
          <div className="absolute right-3 bottom-28 flex flex-col items-center gap-4 text-white">
            <div className="flex flex-col items-center gap-1">
              <Heart className="h-5 w-5 fill-white" />
              <span className="text-[10px]">{r.likes}</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <MessageCircle className="h-5 w-5" />
              <span className="text-[10px]">{r.comments}</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <Send className="h-5 w-5" />
              <span className="text-[10px]">share</span>
            </div>
          </div>
          {/* bottom info */}
          <div className="absolute inset-x-3 bottom-3 text-white">
            <div className="text-[11px] opacity-80">{r.handle}</div>
            <div className="mt-1 text-[13px] font-medium leading-snug line-clamp-3">{r.title}</div>
            <div className="mt-2 flex items-center gap-1.5 text-[10px] opacity-80">
              <Music2 className="h-3 w-3" /> {r.music}
            </div>
          </div>
          {/* progress */}
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/20">
            <div className="h-full bg-white/80" style={{ width: `${30 + i * 25}%` }} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function Reels() {
  return (
    <section id="reels" className="relative py-28 overflow-hidden">
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 mx-auto h-[400px] max-w-3xl rounded-full bg-iris/15 blur-[120px] pointer-events-none" />
      <div className="relative mx-auto max-w-6xl px-6">
        <div className="text-center max-w-2xl mx-auto">
          <div className="text-xs text-iris-soft tracking-wider uppercase">In the wild</div>
          <h2 className="mt-2 text-3xl sm:text-4xl tracking-tight">
            Built for the feed Gen Z already lives in.
          </h2>
        </div>
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {reels.map((r, i) => (
            <Phone key={i} r={r} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

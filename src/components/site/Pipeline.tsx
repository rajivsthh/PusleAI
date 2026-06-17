import { motion } from "motion/react";
import { Search, ShieldCheck, FileText, Sparkles, AudioLines, Film } from "lucide-react";

const stages = [
  { icon: Search, title: "Research", desc: "Crawl 1,200+ frontier sources continuously." },
  { icon: ShieldCheck, title: "Verification", desc: "Cross-reference, flag uncertainty, score." },
  { icon: FileText, title: "Script", desc: "Draft a Gen-Z native 60-second narrative." },
  { icon: Sparkles, title: "AI Visuals", desc: "Compose b-roll, motion graphics, captions." },
  { icon: AudioLines, title: "Voice", desc: "Native Nepali + English voice synthesis." },
  { icon: Film, title: "Reel", desc: "Publish to TikTok, Reels and Shorts." },
];

export function Pipeline() {
  return (
    <section id="pipeline" className="relative py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex items-end justify-between gap-6">
          <div>
            <div className="text-xs text-iris-soft tracking-wider uppercase">How it works</div>
            <h2 className="mt-2 text-3xl sm:text-4xl tracking-tight max-w-xl">
              A six-stage pipeline, end to end automated.
            </h2>
          </div>
          <p className="hidden md:block text-sm text-muted-foreground max-w-xs">
            Every stage is an autonomous agent — observable, replayable, and overridable by a human.
          </p>
        </div>

        <div className="relative mt-14">
          <div className="absolute left-0 right-0 top-[34px] h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          <div className="absolute left-0 right-0 top-[34px] h-px shimmer-line opacity-60" />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-x-2 gap-y-10">
            {stages.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="group relative flex flex-col items-center text-center"
              >
                <div className="relative h-[68px] w-[68px] rounded-2xl glass flex items-center justify-center transition-all duration-500 group-hover:bg-white/[0.06] group-hover:-translate-y-1">
                  <div className="absolute inset-0 rounded-2xl bg-iris/0 group-hover:bg-iris/10 blur-xl transition-all" />
                  <s.icon className="relative h-5 w-5 text-iris-soft" strokeWidth={1.5} />
                </div>
                <div className="mt-4 text-[10px] tracking-[0.2em] text-muted-foreground">
                  0{i + 1}
                </div>
                <div className="mt-1 text-sm font-medium">{s.title}</div>
                <div className="mt-1 text-xs text-muted-foreground leading-relaxed max-w-[160px]">
                  {s.desc}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

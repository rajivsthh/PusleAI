import { motion } from "motion/react";
import { ScanSearch, Eye, Stamp, UserCheck } from "lucide-react";

const items = [
  {
    icon: ScanSearch,
    title: "Fact-checking",
    desc: "Every claim is grounded in 2+ independent primary sources before publish.",
  },
  {
    icon: Eye,
    title: "AI transparency",
    desc: "Each reel ships with a visible model card and a confidence score.",
  },
  {
    icon: Stamp,
    title: "Ethical watermarking",
    desc: "Cryptographic C2PA watermarks on every generated frame.",
  },
  {
    icon: UserCheck,
    title: "Human oversight",
    desc: "Editors can pause, override, or annotate any agent in real time.",
  },
];

export function Trust() {
  return (
    <section id="trust" className="relative py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-2xl">
          <div className="text-xs text-iris-soft tracking-wider uppercase">Responsible AI</div>
          <h2 className="mt-2 text-3xl sm:text-4xl tracking-tight">
            Trust, designed in — not bolted on.
          </h2>
        </div>
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {items.map((it, i) => (
            <motion.div
              key={it.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="group relative rounded-2xl glass p-6 hover:bg-white/[0.05] transition-all duration-500"
            >
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.04] border border-white/5">
                <it.icon className="h-4 w-4 text-iris-soft" strokeWidth={1.5} />
              </span>
              <div className="mt-5 text-base font-medium">{it.title}</div>
              <div className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{it.desc}</div>
              <div className="mt-6 text-[11px] text-muted-foreground flex items-center gap-1.5">
                <span className="h-1 w-1 rounded-full bg-iris" /> built-in
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

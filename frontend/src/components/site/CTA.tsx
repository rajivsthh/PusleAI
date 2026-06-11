import { motion } from "motion/react";

export function CTA() {
  return (
    <section id="cta" className="relative py-32">
      <div className="mx-auto max-w-4xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative rounded-3xl glass-strong overflow-hidden p-10 sm:p-16 text-center"
        >
          <div className="absolute inset-0 grid-bg opacity-60" />
          <div className="absolute -inset-20 -z-10 rounded-full bg-iris/15 blur-[100px]" />
          <div className="relative">
            <h2 className="text-balance text-4xl sm:text-5xl md:text-6xl tracking-tight leading-[1.05]">
              Turn scrolling into<br />
              <span className="font-display italic text-iris-soft">learning.</span>
            </h2>
            <p className="mt-5 mx-auto max-w-md text-muted-foreground">
              Join the early waitlist and help shape the future of tech literacy in Nepal.
            </p>
            <form className="mt-8 mx-auto max-w-md flex flex-col sm:flex-row gap-2" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="you@frontier.dev"
                className="flex-1 h-12 rounded-full glass px-5 text-sm placeholder:text-muted-foreground/70 outline-none focus:ring-2 focus:ring-ring transition"
              />
              <button
                type="submit"
                className="h-12 rounded-full bg-foreground text-background px-6 text-sm font-medium hover:bg-foreground/90 transition"
              >
                Join the future
              </button>
            </form>
            <div className="mt-5 text-[11px] text-muted-foreground">
              No spam. One email when we open. Unsubscribe in one click.
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-white/5">
      <div className="mx-auto max-w-6xl px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-iris pulse-dot" />
          <span>PulseAI · Kathmandu, Nepal</span>
        </div>
        <div className="flex items-center gap-5">
          <a href="#" className="hover:text-foreground transition">Manifesto</a>
          <a href="#" className="hover:text-foreground transition">Privacy</a>
          <a href="#" className="hover:text-foreground transition">Press kit</a>
        </div>
        <div>© 2026 PulseAI Labs</div>
      </div>
    </footer>
  );
}

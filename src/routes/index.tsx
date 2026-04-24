import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Cloud, KeyRound, Layers, Lock, Network } from "lucide-react";

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    meta: [
      { title: "ZeroKeep — Cloud zero-knowledge italiano" },
      {
        name: "description",
        content:
          "Il primo cloud italiano completamente criptato con architettura zero-knowledge. I tuoi file, frammentati e invisibili a chiunque tranne te.",
      },
      { property: "og:title", content: "ZeroKeep — Cloud zero-knowledge" },
      {
        property: "og:description",
        content: "Cloud italiano end-to-end. Frammentato. Invisibile. Tuo.",
      },
    ],
  }),
});

const TERMINAL_LINES = [
  { p: "$", c: "zerokeep upload contratto.pdf", d: 22 },
  { p: ">", c: "encrypting AES-256-GCM ............ ok", d: 14 },
  { p: ">", c: "splitting → 7 shards (Reed-Solomon)", d: 14 },
  { p: ">", c: "dispatching to nodes [IT · DE · FR · NL]", d: 14 },
  { p: ">", c: "server view: ░░░░░░░░ noise ░░░░░░░░", d: 14 },
  { p: "✓", c: "stored. zero servers can read it.", d: 14 },
];

function Typewriter() {
  const [lineIdx, setLineIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);

  useEffect(() => {
    if (lineIdx >= TERMINAL_LINES.length) {
      const t = setTimeout(() => {
        setLineIdx(0);
        setCharIdx(0);
      }, 2800);
      return () => clearTimeout(t);
    }
    const line = TERMINAL_LINES[lineIdx];
    if (charIdx < line.c.length) {
      const t = setTimeout(() => setCharIdx((i) => i + 1), line.d);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => {
      setLineIdx((i) => i + 1);
      setCharIdx(0);
    }, 280);
    return () => clearTimeout(t);
  }, [lineIdx, charIdx]);

  return (
    <div className="font-mono text-[13px] leading-relaxed text-foreground/90">
      {TERMINAL_LINES.slice(0, lineIdx + 1).map((line, i) => {
        const isCurrent = i === lineIdx && lineIdx < TERMINAL_LINES.length;
        const text = isCurrent ? line.c.slice(0, charIdx) : line.c;
        return (
          <div key={i} className="flex gap-3">
            <span
              className={
                line.p === "✓"
                  ? "text-primary"
                  : line.p === "$"
                    ? "text-primary"
                    : "text-muted-foreground"
              }
            >
              {line.p}
            </span>
            <span className="break-all">
              {text}
              {isCurrent && <span className="animate-pulse">▍</span>}
            </span>
          </div>
        );
      })}
    </div>
  );
}

function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const blob1Ref = useRef<HTMLDivElement>(null);
  const blob2Ref = useRef<HTMLDivElement>(null);
  const spotRef = useRef<HTMLDivElement>(null);
  const heroInnerRef = useRef<HTMLDivElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const manifestoBlobRef = useRef<HTMLDivElement>(null);
  const manifestoTextRef = useRef<HTMLDivElement | null>(null);
  const haloRef = useRef<HTMLDivElement>(null);
  const dotsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let mx = 0, my = 0, tx = 0, ty = 0;
    let sy = window.scrollY;
    let raf = 0;
    let pending = false;
    const hero = heroRef.current;

    const tick = () => {
      pending = false;
      tx += (mx - tx) * 0.12;
      ty += (my - ty) * 0.12;
      if (gridRef.current) gridRef.current.style.transform = `translate3d(${tx * -8}px, ${sy * 0.08 + ty * -8}px, 0)`;
      if (blob1Ref.current) blob1Ref.current.style.transform = `translate3d(${tx * 20}px, ${sy * -0.18 + ty * 20}px, 0)`;
      if (blob2Ref.current) blob2Ref.current.style.transform = `translate3d(${tx * -24}px, ${sy * -0.28 + ty * -14}px, 0)`;
      if (spotRef.current) {
        const px = (tx + 1) * 50, py = (ty + 1) * 50;
        spotRef.current.style.background = `radial-gradient(600px circle at ${px}% ${py}%, color-mix(in oklab, var(--primary) 14%, transparent), transparent 60%)`;
      }
      if (heroInnerRef.current) heroInnerRef.current.style.transform = `translate3d(0, ${sy * -0.04}px, 0)`;
      if (terminalRef.current) terminalRef.current.style.transform = `translate3d(${tx * 8}px, ${ty * 8 + sy * -0.08}px, 0)`;
      if (manifestoBlobRef.current) manifestoBlobRef.current.style.transform = `translate(-50%, calc(-50% + ${(sy - 1800) * -0.05}px))`;
      if (manifestoTextRef.current) manifestoTextRef.current.style.transform = `translate3d(${(sy - 1500) * 0.1}px, 0, 0)`;
      if (haloRef.current) {
        haloRef.current.style.transform = `translate3d(${tx * 12}px, ${ty * 12 + sy * -0.1}px, 0)`;
        haloRef.current.style.opacity = String(Math.max(0, 1 - sy / 700));
      }
      if (dotsRef.current) {
        dotsRef.current.style.transform = `translate3d(${tx * -6}px, ${ty * -6 + sy * 0.04}px, 0)`;
        dotsRef.current.style.opacity = String(Math.max(0, 0.55 - sy / 900));
      }
      // continue easing while not settled
      if (Math.abs(mx - tx) > 0.001 || Math.abs(my - ty) > 0.001) schedule();
    };
    const schedule = () => {
      if (pending) return;
      pending = true;
      raf = requestAnimationFrame(tick);
    };
    const onMove = (e: MouseEvent) => {
      if (!hero) return;
      const r = hero.getBoundingClientRect();
      mx = ((e.clientX - r.left) / r.width - 0.5) * 2;
      my = ((e.clientY - r.top) / r.height - 0.5) * 2;
      schedule();
    };
    const onScroll = () => { sy = window.scrollY; schedule(); };

    hero?.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    schedule();

    return () => {
      cancelAnimationFrame(raf);
      hero?.removeEventListener("mousemove", onMove);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // Reveal-on-scroll
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const els = document.querySelectorAll<HTMLElement>(".reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const el = e.target as HTMLElement;
            const delay = Number(el.dataset.delay ?? 0);
            el.style.animationDelay = `${delay}ms`;
            el.classList.add("in-view");
            io.unobserve(el);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      {/* NAV — Apple-style floating, transparent, clean */}
      <header className="sticky top-3 z-50 px-3 sm:top-4 sm:px-6">
        <div
          className="mx-auto flex h-12 max-w-5xl items-center justify-between rounded-full border border-border/40 bg-background/55 pl-5 pr-2 shadow-[0_1px_0_0_rgba(255,255,255,0.04)_inset,0_8px_32px_-12px_rgba(0,0,0,0.18)] backdrop-blur-2xl backdrop-saturate-150 supports-[backdrop-filter]:bg-background/40"
        >
          <Link to={"/" as string} className="flex items-center gap-2">
            <Cloud className="h-5 w-5 text-primary" strokeWidth={2.5} />
            <span className="text-[15px] font-semibold tracking-tight">ZeroKeep</span>
          </Link>
          <nav className="hidden items-center gap-7 md:flex">
            <a href="#how" className="text-[13px] font-medium text-muted-foreground transition hover:text-foreground">
              Funzionalità
            </a>
            <a href="#layers" className="text-[13px] font-medium text-muted-foreground transition hover:text-foreground">
              Sicurezza
            </a>
            <a href="#manifesto" className="text-[13px] font-medium text-muted-foreground transition hover:text-foreground">
              Manifesto
            </a>
            <Link to={"/" as string} className="text-[13px] font-medium text-muted-foreground transition hover:text-foreground">
              Pricing
            </Link>
          </nav>
          <div className="flex items-center gap-1">
            <Link
              to="/login"
              className="hidden rounded-full px-3 py-1.5 text-[13px] font-medium text-muted-foreground transition hover:text-foreground sm:inline-block"
            >
              Accedi
            </Link>
            <Link
              to="/login"
              className="inline-flex items-center gap-1 rounded-full bg-foreground/90 px-3.5 py-1.5 text-[13px] font-semibold text-background transition hover:bg-foreground"
            >
              Inizia gratis
            </Link>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section
        ref={heroRef}
        className="relative overflow-hidden border-b border-border/60"
      >
        <div
          ref={gridRef}
          className="pointer-events-none absolute inset-0 will-change-transform"
          style={{
            backgroundImage:
              "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
            backgroundPosition: "center",
          }}
        />
        <div
          ref={blob1Ref}
          className="pointer-events-none absolute -top-20 -left-20 h-[420px] w-[420px] rounded-full bg-primary/15 blur-3xl will-change-transform"
        />
        <div
          ref={blob2Ref}
          className="pointer-events-none absolute -bottom-32 right-0 h-[460px] w-[460px] rounded-full bg-primary/10 blur-3xl will-change-transform"
        />

        {/* spotlight */}
        <div ref={spotRef} className="pointer-events-none absolute inset-0" />
        {/* soft halo behind hero */}
        <div
          ref={haloRef}
          className="pointer-events-none absolute left-1/2 top-1/3 -ml-[280px] h-[560px] w-[560px] rounded-full will-change-transform"
          style={{
            background:
              "radial-gradient(circle, color-mix(in oklab, var(--primary) 12%, transparent), transparent 65%)",
            filter: "blur(40px)",
          }}
        />
        {/* particle dots */}
        <div
          ref={dotsRef}
          className="pointer-events-none absolute inset-0 will-change-transform"
          style={{
            backgroundImage:
              "radial-gradient(color-mix(in oklab, var(--foreground) 25%, transparent) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
            maskImage:
              "radial-gradient(ellipse at center, black 30%, transparent 75%)",
            WebkitMaskImage:
              "radial-gradient(ellipse at center, black 30%, transparent 75%)",
          }}
        />
        {/* edge fades */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,var(--background)_85%)]" />

        <div
          ref={heroInnerRef}
          className="relative mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 py-20 lg:grid-cols-12 lg:py-28 will-change-transform"
        >
          <div className="lg:col-span-7">
            <h1 className="font-extrabold tracking-tight text-foreground">
              <span className="block text-5xl leading-[0.95] sm:text-6xl lg:text-7xl">
                I tuoi file.
              </span>
              <span className="block text-5xl leading-[0.95] sm:text-6xl lg:text-7xl">
                <span className="relative inline-block">
                  Frammentati.
                  <svg
                    className="absolute -bottom-2 left-0 h-3 w-full text-primary"
                    viewBox="0 0 300 12"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M2 8 Q 75 2, 150 7 T 298 6"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </span>
              <span className="block text-5xl leading-[0.95] text-muted-foreground sm:text-6xl lg:text-7xl">
                Invisibili.
              </span>
            </h1>

            <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground">
              ZeroKeep è il cloud italiano dove{" "}
              <span className="text-foreground">nessuno</span> può leggere i tuoi dati. Nemmeno noi.
              Crittografia client-side, frammentazione distribuita, zero log.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <Link
                to="/login"
                className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background transition hover:bg-foreground/90"
              >
                Crea il tuo vault
                <ArrowUpRight className="h-4 w-4" />
              </Link>
              <a
                href="#how"
                className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/40 px-6 py-3 text-sm font-medium text-foreground backdrop-blur transition hover:bg-card"
              >
                Scopri di più
              </a>
            </div>

            {/* Stats inline */}
            <div className="mt-14 grid max-w-lg grid-cols-3 gap-6 border-t border-border/60 pt-8">
              {[
                { v: "256", l: "bit AES" },
                { v: "100%", l: "Zero-knowledge" },
                { v: "0", l: "Log conservati" },
              ].map((s) => (
                <div key={s.l}>
                  <div className="text-3xl font-semibold tracking-tight text-foreground">
                    {s.v}
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground">
                    {s.l}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Terminal card */}
          <div className="lg:col-span-5">
            <div ref={terminalRef} className="relative will-change-transform">
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-br from-primary/30 via-primary/0 to-primary/15 opacity-60 blur-2xl" />
              <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-card/80 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.35)] backdrop-blur-xl">
                <div className="flex items-center justify-between border-b border-border/60 px-4 py-3">
                  <div className="flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-primary/70" />
                    <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/30" />
                    <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/30" />
                  </div>
                  <span className="font-mono text-[11px] text-muted-foreground">
                    ~/zerokeep
                  </span>
                  <span className="h-2 w-2 rounded-full bg-primary" />
                </div>
                <div className="min-h-[280px] p-5">
                  <Typewriter />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* HOW IT WORKS */}
      <section id="how" className="relative border-b border-border/60">
        <div className="mx-auto max-w-7xl px-6 py-28">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
              Tre passi. Nessun compromesso.
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-lg text-muted-foreground">
              Tutto avviene sul tuo dispositivo prima che un solo byte tocchi internet. Il server vede solo rumore.
            </p>
          </div>

          <div className="mt-20 grid grid-cols-1 gap-6 md:grid-cols-3">
            {[
              {
                n: "01",
                icon: Lock,
                t: "Crittografi",
                d: "AES-256 sul tuo device. Le chiavi non lasciano mai il tuo browser.",
              },
              {
                n: "02",
                icon: Layers,
                t: "Frammenti",
                d: "Il file diventa shards illeggibili tramite Reed-Solomon. Ognuno è inutile da solo.",
              },
              {
                n: "03",
                icon: Network,
                t: "Distribuisci",
                d: "Gli shards viaggiano su nodi indipendenti in Europa. Nessuno li ricomporrà.",
              },
            ].map((step) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.n}
                  className="group relative overflow-hidden rounded-3xl border border-border/50 bg-card/60 p-8 backdrop-blur-xl transition hover:bg-card/80"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-foreground/5 text-foreground transition group-hover:bg-primary/10 group-hover:text-primary">
                    <Icon className="h-5 w-5" strokeWidth={1.75} />
                  </div>
                  <h3 className="mt-10 text-2xl font-semibold tracking-tight">{step.t}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">{step.d}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* LAYERS */}
      <section id="layers" className="relative border-b border-border/60 bg-card/20">
        <div className="mx-auto max-w-7xl px-6 py-28">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
              Cinque strati. Uno scopo.
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-lg text-muted-foreground">
              Ogni livello è invalicabile da solo. Insieme formano una superficie d'attacco praticamente nulla.
            </p>
          </div>

          <ol className="mx-auto mt-16 max-w-4xl">
            {[
              {
                t: "La tua password",
                d: "Non lascia mai il tuo dispositivo. Il server riceve solo un'impronta matematica.",
              },
              {
                t: "Crittografia file",
                d: "AES-256-GCM sul tuo device. Senza la tua chiave, è rumore casuale.",
              },
              {
                t: "Chiave personale",
                d: "Una chiave master derivata localmente. Solo tu la possiedi, nessun backdoor.",
              },
              {
                t: "Frammentazione",
                d: "Reed-Solomon spezza il file in shards ridondanti. Recuperi tutto anche se perdi nodi.",
              },
              {
                t: "Rete distribuita",
                d: "Nodi indipendenti in più giurisdizioni europee. Tor-ready by design.",
              },
            ].map((l, i) => (
              <li
                key={l.t}
                className="group flex gap-8 border-t border-border/50 py-8 first:border-t-0 lg:py-10"
              >
                <div className="w-10 flex-shrink-0 pt-1 text-sm tabular-nums text-muted-foreground">
                  0{i + 1}
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold tracking-tight transition group-hover:text-foreground">
                    {l.t}
                  </h3>
                  <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-muted-foreground">
                    {l.d}
                  </p>
                </div>
                <KeyRound
                  className="hidden h-5 w-5 self-center text-muted-foreground/30 transition group-hover:text-primary md:block"
                  strokeWidth={1.75}
                />
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* MANIFESTO */}
      <section id="manifesto" className="relative overflow-hidden border-b border-border/60">
        {/* parallax decorative blob */}
        <div
          ref={manifestoBlobRef}
          className="pointer-events-none absolute left-1/2 top-1/2 -z-0 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-3xl will-change-transform"
        />
        <div className="relative mx-auto max-w-5xl px-6 py-32 text-center">
          <p className="text-balance text-3xl font-semibold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
            Crediamo che la <span className="text-primary">privacy</span> non sia una feature.
            <br />
            È il prerequisito per usare il cloud.
          </p>
          <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Niente promesse di marketing. Solo matematica: se non possediamo la chiave, non possiamo leggere i tuoi dati. Né noi, né un governo, né un attaccante.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="border-b border-border/60">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <div className="relative overflow-hidden rounded-[2rem] border border-border/50 bg-card/60 p-12 backdrop-blur-2xl sm:p-20">
            <div className="absolute -right-32 -top-32 h-80 w-80 rounded-full bg-primary/20 blur-3xl" />
            <div className="absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
            <div className="relative mx-auto max-w-2xl text-center">
              <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
                Pronto a sparire dai radar?
              </h2>
              <p className="mx-auto mt-5 max-w-md text-lg text-muted-foreground">
                10 GB gratuiti, per sempre. Senza carta di credito. Senza scadenza.
              </p>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
                <Link
                  to="/login"
                  className="inline-flex items-center gap-2 rounded-full bg-foreground px-7 py-3.5 text-[15px] font-semibold text-background transition hover:bg-foreground/90"
                >
                  Crea il vault
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
                <a
                  href="#how"
                  className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/40 px-7 py-3.5 text-[15px] font-medium text-foreground backdrop-blur transition hover:bg-background"
                >
                  Scopri di più
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-background">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-6 py-10 sm:flex-row sm:items-center">
          <div className="flex items-center gap-2">
            <Cloud className="h-5 w-5 text-primary" strokeWidth={2.5} />
            <span className="font-bold">ZeroKeep</span>
            <span className="ml-2 font-mono text-xs text-muted-foreground">
              © {new Date().getFullYear()}
            </span>
          </div>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <a href="#" className="transition hover:text-foreground">
              Privacy
            </a>
            <a href="#" className="transition hover:text-foreground">
              Termini
            </a>
            <a href="#" className="transition hover:text-foreground">
              GitHub
            </a>
            <a href="#" className="transition hover:text-foreground">
              Contatti
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  Cloud,
  Fingerprint,
  KeyRound,
  Layers,
  Lock,
  Network,
  ShieldCheck,
  Sparkles,
  Terminal,
} from "lucide-react";

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

function Marquee() {
  const items = [
    "AES-256-GCM",
    "PBKDF2 · 600K",
    "ZERO-KNOWLEDGE",
    "REED-SOLOMON",
    "TOR-READY",
    "EU NODES",
    "OPEN AUDIT",
    "NO LOGS",
  ];
  return (
    <div className="relative flex w-full overflow-hidden border-y border-border/60 bg-card/40 py-4">
      <div className="flex shrink-0 animate-[marquee_28s_linear_infinite] gap-12 pr-12">
        {[...items, ...items].map((it, i) => (
          <div key={i} className="flex items-center gap-3 whitespace-nowrap">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            <span className="font-mono text-xs tracking-[0.2em] text-muted-foreground">{it}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const el = heroRef.current;
    const onMove = (e: MouseEvent) => {
      if (!el) return;
      const r = el.getBoundingClientRect();
      setMouse({
        x: (e.clientX - r.left) / r.width,
        y: (e.clientY - r.top) / r.height,
      });
    };
    const onScroll = () => setScrollY(window.scrollY);
    el?.addEventListener("mousemove", onMove);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      el?.removeEventListener("mousemove", onMove);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const pMouseX = (mouse.x - 0.5) * 2;
  const pMouseY = (mouse.y - 0.5) * 2;

  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      {/* NAV */}
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/70 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <Link to={"/" as string} className="flex items-center gap-2">
            <Cloud className="h-6 w-6 text-primary" strokeWidth={2.5} />
            <span className="text-lg font-extrabold tracking-tight">ZeroKeep</span>
            <span className="ml-2 rounded-full border border-border px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              v1.0
            </span>
          </Link>
          <nav className="hidden items-center gap-8 md:flex">
            <a href="#how" className="text-sm text-muted-foreground transition hover:text-foreground">
              Come funziona
            </a>
            <a
              href="#layers"
              className="text-sm text-muted-foreground transition hover:text-foreground"
            >
              Sicurezza
            </a>
            <a
              href="#manifesto"
              className="text-sm text-muted-foreground transition hover:text-foreground"
            >
              Manifesto
            </a>
          </nav>
          <div className="flex items-center gap-2">
            <Link
              to="/login"
              className="hidden rounded-full px-4 py-2 text-sm text-muted-foreground transition hover:text-foreground sm:inline-block"
            >
              Accedi
            </Link>
            <Link
              to="/login"
              className="group inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
            >
              Inizia gratis
              <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
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
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
            backgroundPosition: "center",
            transform: `translate3d(${pMouseX * -12}px, ${scrollY * 0.15 + pMouseY * -12}px, 0)`,
            willChange: "transform",
          }}
        />
        <div
          className="pointer-events-none absolute -top-20 -left-20 h-[420px] w-[420px] rounded-full bg-primary/15 blur-3xl"
          style={{ transform: `translate3d(${pMouseX * 30}px, ${scrollY * -0.25 + pMouseY * 30}px, 0)` }}
        />
        <div
          className="pointer-events-none absolute -bottom-32 right-0 h-[460px] w-[460px] rounded-full bg-primary/10 blur-3xl"
          style={{ transform: `translate3d(${pMouseX * -40}px, ${scrollY * -0.4 + pMouseY * -20}px, 0)` }}
        />

        {/* spotlight */}
        <div
          className="pointer-events-none absolute inset-0 transition-[background] duration-300"
          style={{
            background: `radial-gradient(600px circle at ${mouse.x * 100}% ${mouse.y * 100}%, color-mix(in oklab, var(--primary) 18%, transparent), transparent 60%)`,
          }}
        />
        {/* edge fades */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,var(--background)_85%)]" />

        <div
          className="relative mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 py-20 lg:grid-cols-12 lg:py-28"
          style={{ transform: `translate3d(0, ${scrollY * -0.06}px, 0)` }}
        >
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground backdrop-blur">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
              </span>
              Beta pubblica · Made in Italy
            </div>

            <h1 className="mt-6 font-extrabold tracking-tight text-foreground">
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

            <p className="mt-8 max-w-xl text-lg text-muted-foreground">
              ZeroKeep è il cloud italiano dove{" "}
              <span className="text-foreground">nessuno</span> può leggere i tuoi dati. Nemmeno noi.
              Crittografia client-side, frammentazione distribuita, zero log.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <Link
                to="/login"
                className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/30 transition hover:bg-primary/90"
              >
                Crea il tuo vault
                <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
              <a
                href="#how"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card/40 px-6 py-3 text-sm font-medium text-foreground backdrop-blur transition hover:bg-card"
              >
                <Terminal className="h-4 w-4" />
                Vedi come funziona
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
                  <div className="font-mono text-3xl font-bold tracking-tight text-foreground">
                    {s.v}
                  </div>
                  <div className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">
                    {s.l}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Terminal card */}
          <div className="lg:col-span-5">
            <div
              className="relative"
              style={{
                transform: `translate3d(${pMouseX * 14}px, ${pMouseY * 14 + scrollY * -0.12}px, 0) rotateX(${pMouseY * -3}deg) rotateY(${pMouseX * 3}deg)`,
                transformStyle: "preserve-3d",
                transition: "transform 120ms ease-out",
              }}
            >
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-primary/40 via-primary/0 to-primary/20 opacity-60 blur-xl" />
              <div className="relative overflow-hidden rounded-2xl border border-border bg-card shadow-2xl">
                <div className="flex items-center justify-between border-b border-border/60 px-4 py-3">
                  <div className="flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-primary/70" />
                    <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/30" />
                    <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/30" />
                  </div>
                  <span className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                    ~/zerokeep
                  </span>
                  <span className="h-2 w-2 rounded-full bg-primary shadow-[0_0_8px_var(--primary)]" />
                </div>
                <div className="min-h-[260px] p-5">
                  <Typewriter />
                </div>
                <div className="grid grid-cols-3 border-t border-border/60 text-center font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  <div className="border-r border-border/60 px-3 py-2.5">enc client-side</div>
                  <div className="border-r border-border/60 px-3 py-2.5">7 shards</div>
                  <div className="px-3 py-2.5 text-primary">verified</div>
                </div>
              </div>

              {/* floating chip */}
              <div className="absolute -bottom-5 -left-5 hidden rotate-[-4deg] rounded-xl border border-border bg-card px-4 py-3 shadow-xl sm:block">
                <div className="flex items-center gap-2">
                  <Fingerprint className="h-4 w-4 text-primary" />
                  <span className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                    chiave: solo tua
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Marquee />

      {/* HOW IT WORKS */}
      <section id="how" className="relative border-b border-border/60">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-primary">
                <Sparkles className="h-3.5 w-3.5" />
                Architettura
              </div>
              <h2 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
                Tre passi. Nessun compromesso.
              </h2>
            </div>
            <p className="max-w-md text-muted-foreground">
              Tutto avviene sul tuo dispositivo prima che un solo byte tocchi internet. Il server
              vede solo rumore.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-3">
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
                  className="group relative bg-card p-8 transition hover:bg-card/60"
                >
                  <div className="flex items-start justify-between">
                    <span className="font-mono text-xs tracking-[0.25em] text-muted-foreground">
                      {step.n}
                    </span>
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition group-hover:bg-primary group-hover:text-primary-foreground">
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>
                  <h3 className="mt-12 text-2xl font-semibold">{step.t}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{step.d}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* LAYERS */}
      <section id="layers" className="relative border-b border-border/60 bg-card/30">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
            <div className="lg:col-span-4 lg:sticky lg:top-24 lg:self-start">
              <div className="font-mono text-xs uppercase tracking-[0.25em] text-primary">
                Sicurezza
              </div>
              <h2 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
                Cinque strati. Uno scopo.
              </h2>
              <p className="mt-6 text-muted-foreground">
                Ogni livello è invalicabile da solo. Insieme formano una superficie d'attacco
                praticamente nulla.
              </p>
              <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-xs font-medium">
                <ShieldCheck className="h-4 w-4 text-primary" />
                Audit pubblico programmato
              </div>
            </div>

            <ol className="lg:col-span-8 lg:space-y-0">
              {[
                {
                  t: "La tua password",
                  d: "Non lascia mai il tuo dispositivo. Il server riceve solo un'impronta matematica.",
                  tags: ["PBKDF2", "600K iter", "Client-side"],
                },
                {
                  t: "Crittografia file",
                  d: "AES-256-GCM sul tuo device. Senza la tua chiave, è rumore casuale.",
                  tags: ["AES-256", "GCM", "Zero-access"],
                },
                {
                  t: "Chiave personale",
                  d: "Una chiave master derivata localmente. Solo tu la possiedi, nessun backdoor.",
                  tags: ["Argon2", "Master key"],
                },
                {
                  t: "Frammentazione",
                  d: "Reed-Solomon spezza il file in shards ridondanti. Recuperi tutto anche se perdi nodi.",
                  tags: ["7-of-10", "Self-heal"],
                },
                {
                  t: "Rete distribuita",
                  d: "Nodi indipendenti in più giurisdizioni europee. Tor-ready by design.",
                  tags: ["EU only", "Tor-ready"],
                },
              ].map((l, i) => (
                <li
                  key={l.t}
                  className="group flex gap-6 border-t border-border/60 py-8 first:border-t-0 lg:py-10"
                >
                  <div className="flex-shrink-0 font-mono text-sm text-muted-foreground">
                    0{i + 1}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-semibold transition group-hover:text-primary">
                      {l.t}
                    </h3>
                    <p className="mt-2 max-w-xl text-muted-foreground">{l.d}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {l.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-border bg-background px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <KeyRound className="hidden h-5 w-5 text-muted-foreground/40 transition group-hover:text-primary md:block" />
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* MANIFESTO */}
      <section id="manifesto" className="relative overflow-hidden border-b border-border/60">
        <div className="mx-auto max-w-5xl px-6 py-28 text-center">
          <div className="font-mono text-xs uppercase tracking-[0.25em] text-primary">
            Manifesto
          </div>
          <p className="mt-8 text-balance text-3xl font-medium leading-tight tracking-tight sm:text-4xl lg:text-5xl">
            Crediamo che la <span className="text-primary">privacy</span> non sia una feature.
            <br />
            È il <span className="italic">prerequisito</span> per usare il cloud.
          </p>
          <p className="mx-auto mt-8 max-w-2xl text-muted-foreground">
            Niente promesse di marketing. Niente "ci fidiamo di noi". Solo matematica: se non
            possediamo la chiave, non possiamo leggere i tuoi dati. Né noi, né un governo, né un
            attaccante.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="border-b border-border/60">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <div className="relative overflow-hidden rounded-3xl border border-border bg-card p-10 sm:p-16">
            <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-primary/30 blur-3xl" />
            <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
            <div className="relative grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
              <div>
                <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
                  Pronto a sparire dai radar?
                </h2>
                <p className="mt-4 max-w-md text-muted-foreground">
                  10 GB gratuiti, per sempre. Senza carta di credito. Senza tracker. Senza
                  scadenza.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3 lg:justify-end">
                <Link
                  to="/login"
                  className="group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-4 text-base font-semibold text-primary-foreground shadow-lg shadow-primary/40 transition hover:bg-primary/90"
                >
                  Crea il vault
                  <ArrowUpRight className="h-5 w-5 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
                <a
                  href="#how"
                  className="inline-flex items-center gap-2 rounded-full border border-border px-7 py-4 text-base font-medium text-foreground transition hover:bg-background"
                >
                  Documentazione
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

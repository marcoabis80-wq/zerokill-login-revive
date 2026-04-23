import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, ArrowRight, Cloud, Eye, EyeOff, Lock, User, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

export const Route = createFileRoute("/login")({
  component: LoginPage,
  head: () => ({
    meta: [
      { title: "Accedi — ZeroKeep" },
      { name: "description", content: "Accedi al tuo account ZeroKeep per continuare." },
    ],
  }),
});

function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [mode, setMode] = useState<"login" | "device">("login");

  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      {/* Soft background blobs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 left-1/2 h-[420px] w-[680px] -translate-x-1/2 rounded-full bg-primary/15 blur-3xl" />
        <div className="absolute top-1/3 -left-40 h-[320px] w-[420px] rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-32 right-0 h-[360px] w-[460px] rounded-full bg-primary/10 blur-3xl" />
      </div>

      {/* Top bar */}
      <div className="relative z-10 flex items-center justify-between px-6 py-5">
        <Link
          to={"/" as string}
          className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-foreground shadow-sm transition hover:bg-accent"
        >
          <ArrowLeft className="h-4 w-4" />
          Torna alla Home
        </Link>
        <div className="rounded-md border border-border bg-card px-3 py-1.5 text-xs font-semibold text-foreground shadow-sm">
          EN
        </div>
      </div>

      {/* Main */}
      <main className="relative z-10 mx-auto flex w-full max-w-md flex-col items-center px-6 pb-16 pt-6">
        {/* Logo */}
        <div className="mb-8 flex items-center gap-2">
          <Cloud className="h-8 w-8 text-foreground" strokeWidth={2.5} />
          <span className="text-3xl font-extrabold tracking-tight text-foreground">ZeroKeep</span>
        </div>

        {/* Card */}
        <div className="w-full rounded-2xl border border-border bg-card p-8 shadow-xl shadow-primary/5">
          <h1 className="text-center text-3xl font-bold tracking-tight text-foreground">
            Bentornato
          </h1>
          <p className="mt-2 text-center text-sm text-muted-foreground">
            Inserisci le tue credenziali per continuare
          </p>

          {mode === "login" ? (
            <form
              className="mt-8 space-y-5"
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <div className="space-y-2">
                <Label htmlFor="username" className="text-sm font-semibold">
                  Username
                </Label>
                <div className="relative">
                  <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="username"
                    type="text"
                    placeholder="Inserisci il tuo username"
                    className="h-12 rounded-lg border-transparent bg-secondary pl-10 text-foreground placeholder:text-muted-foreground"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-semibold">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Inserisci la tua password"
                    className="h-12 rounded-lg border-transparent bg-secondary px-10 text-foreground placeholder:text-muted-foreground"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition hover:text-foreground"
                    aria-label={showPassword ? "Nascondi password" : "Mostra password"}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex cursor-pointer items-center gap-2 text-foreground">
                  <Checkbox id="remember" />
                  <span>Ricordami</span>
                </label>
                <a href="#" className="font-medium text-primary hover:underline">
                  Password dimenticata?
                </a>
              </div>

              <Button
                type="submit"
                className="h-12 w-full rounded-lg bg-primary text-base font-semibold text-primary-foreground shadow-lg shadow-primary/30 hover:bg-primary/90"
              >
                Accedi
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>

              <div className="relative py-2">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-card px-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    oppure
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setMode("device")}
                className="flex h-12 w-full items-center justify-center gap-2 rounded-lg border border-border bg-card text-sm font-semibold text-foreground transition hover:bg-accent"
              >
                <Smartphone className="h-4 w-4" />
                Accedi da dispositivo approvato
              </button>

              <p className="pt-2 text-center text-sm text-muted-foreground">
                Non hai ancora un account?{" "}
                <a href="#" className="font-semibold text-primary hover:underline">
                  Registrati gratis
                </a>
              </p>
            </form>
          ) : (
            <div className="mt-8 space-y-6 text-center">
              <p className="text-sm text-muted-foreground">
                Inquadra il codice QR con la fotocamera del tuo telefono (dove hai già effettuato
                l'accesso):
              </p>
              <div className="mx-auto flex h-52 w-52 items-center justify-center rounded-xl border border-border bg-secondary">
                <div
                  className="h-44 w-44 rounded-md"
                  style={{
                    backgroundImage:
                      "linear-gradient(45deg, var(--foreground) 25%, transparent 25%), linear-gradient(-45deg, var(--foreground) 25%, transparent 25%)",
                    backgroundSize: "12px 12px",
                  }}
                />
              </div>
              <p className="text-sm font-medium text-muted-foreground">In attesa di approvazione…</p>
              <button
                type="button"
                onClick={() => setMode("login")}
                className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
              >
                <ArrowLeft className="h-4 w-4" />
                Torna al login
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

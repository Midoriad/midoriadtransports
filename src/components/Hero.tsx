import Link from "next/link";
import { ArrowRight, PackageCheck, ShieldCheck, Clock3, Star } from "lucide-react";
import { Reveal } from "./Reveal";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-mesh text-white">
      <div className="absolute inset-0 bg-hero-grid [background-size:26px_26px] opacity-40" />
      <div className="absolute -left-24 top-1/3 h-72 w-72 animate-float rounded-full bg-brand-500/20 blur-3xl" />
      <div className="absolute -right-20 -top-10 h-72 w-72 rounded-full bg-gold-500/10 blur-3xl" />

      <div className="container-px relative grid gap-12 py-20 lg:grid-cols-[1.05fr_0.95fr] lg:py-28">
        <div className="flex flex-col justify-center">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-white/90 backdrop-blur">
              <Star className="h-3.5 w-3.5 text-gold-400" />
              Transport · Logistique · Livraison express
            </span>
          </Reveal>

          <Reveal delay={1}>
            <h1 className="mt-6 text-balance text-4xl font-extrabold leading-[1.05] sm:text-5xl lg:text-6xl">
              Transport Express, Logistique et Livraison{" "}
              <span className="bg-gradient-to-r from-gold-300 to-gold-500 bg-clip-text text-transparent">
                sur mesure
              </span>
            </h1>
          </Reveal>

          <Reveal delay={2}>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/75">
              Livraisons urgentes, tournées régulières, déménagements, transport de
              marchandises : des véhicules adaptés à chaque besoin, partout en France
              et à l'international.
            </p>
          </Reveal>

          <Reveal delay={3}>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href="/commande" className="btn-gold text-base">
                Commander maintenant
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/devis"
                className="btn border border-white/25 bg-white/5 text-white backdrop-blur hover:bg-white/15"
              >
                Obtenir un devis
              </Link>
            </div>
          </Reveal>

          <Reveal delay={4}>
            <dl className="mt-12 grid max-w-lg grid-cols-3 gap-6">
              {[
                { icon: Clock3, k: "7j/7", v: "Disponibilité" },
                { icon: PackageCheck, k: "Direct", v: "Sans rupture de charge" },
                { icon: ShieldCheck, k: "100 %", v: "Suivi & sécurité" },
              ].map((s) => (
                <div key={s.v}>
                  <s.icon className="h-5 w-5 text-gold-400" />
                  <dt className="mt-2 font-display text-xl font-bold">{s.k}</dt>
                  <dd className="text-xs text-white/60">{s.v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        {/* Carte visuelle */}
        <Reveal delay={2} className="hidden lg:block">
          <div className="relative h-full min-h-[420px]">
            <div className="absolute inset-0 rounded-[2rem] border border-white/15 bg-white/5 backdrop-blur-sm" />
            <div className="absolute inset-6 overflow-hidden rounded-3xl bg-gradient-to-br from-brand-600/40 to-ink/60 ring-1 ring-white/10">
              <div className="absolute inset-0 bg-hero-grid [background-size:20px_20px] opacity-40" />
              <RouteVisual />
            </div>

            <div className="absolute -left-6 bottom-10 w-64 rounded-2xl bg-white p-4 text-ink shadow-card">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-600 text-white">
                  <PackageCheck className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-sm font-bold">Course confirmée</p>
                  <p className="text-xs text-ink/60">Départ immédiat · suivi en direct</p>
                </div>
              </div>
              <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-ink/10">
                <div className="h-full w-3/4 rounded-full bg-gradient-to-r from-brand-500 to-gold-500" />
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function RouteVisual() {
  return (
    <svg
      viewBox="0 0 400 400"
      className="h-full w-full"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M60 320 C 140 260, 120 160, 220 150 S 360 120, 340 70"
        stroke="url(#g)"
        strokeWidth="3"
        strokeDasharray="2 10"
        strokeLinecap="round"
      />
      <circle cx="60" cy="320" r="10" fill="#dcc078" />
      <circle cx="60" cy="320" r="18" fill="#dcc078" opacity="0.25" />
      <g transform="translate(330 60)">
        <circle r="10" fill="#12b065" />
        <circle r="18" fill="#12b065" opacity="0.25" />
      </g>
      <defs>
        <linearGradient id="g" x1="0" y1="400" x2="400" y2="0">
          <stop stopColor="#dcc078" />
          <stop offset="1" stopColor="#12b065" />
        </linearGradient>
      </defs>
    </svg>
  );
}

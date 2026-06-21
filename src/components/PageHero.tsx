import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Reveal } from "./Reveal";

export function PageHero({
  eyebrow,
  title,
  subtitle,
  breadcrumb,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  breadcrumb: string;
}) {
  return (
    <section className="relative overflow-hidden bg-mesh text-white">
      <div className="absolute inset-0 bg-hero-grid [background-size:26px_26px] opacity-40" />
      <div className="absolute -right-16 top-0 h-64 w-64 rounded-full bg-gold-500/10 blur-3xl" />
      <div className="container-px relative py-16 lg:py-20">
        <Reveal>
          <nav className="mb-4 flex items-center gap-1.5 text-sm text-white/55" aria-label="Fil d'Ariane">
            <Link href="/" className="hover:text-white">
              Accueil
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-white/80">{breadcrumb}</span>
          </nav>
          {eyebrow ? (
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-white/90">
              {eyebrow}
            </span>
          ) : null}
          <h1 className="mt-5 max-w-3xl text-balance text-4xl font-extrabold leading-tight sm:text-5xl">
            {title}
          </h1>
          {subtitle ? (
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/75">
              {subtitle}
            </p>
          ) : null}
        </Reveal>
      </div>
    </section>
  );
}

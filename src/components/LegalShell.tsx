import type { ReactNode } from "react";
import { PageHero } from "./PageHero";

export function LegalShell({
  title,
  breadcrumb,
  updated,
  children,
}: {
  title: string;
  breadcrumb: string;
  updated: string;
  children: ReactNode;
}) {
  return (
    <>
      <PageHero breadcrumb={breadcrumb} eyebrow="Informations légales" title={title} />
      <section className="container-px py-16 lg:py-20">
        <div className="prose-legal mx-auto max-w-3xl">
          <p className="text-sm text-ink/50">Dernière mise à jour : {updated}</p>
          {children}
        </div>
      </section>
    </>
  );
}

/** Encadré signalant une information à personnaliser par l'entreprise. */
export function ToComplete({ children }: { children: ReactNode }) {
  return (
    <span className="rounded bg-gold-300/40 px-1.5 py-0.5 font-medium text-ink/80">
      {children}
    </span>
  );
}

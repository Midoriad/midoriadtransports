import type { Metadata } from "next";
import { Clock3, ShieldCheck, Wallet } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { QuoteForm } from "@/components/forms/QuoteForm";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Obtenir un devis",
  description:
    "Demandez un devis gratuit et sans engagement pour votre transport, déménagement ou tournée régulière. Réponse rapide par l'équipe Midoriad Transports.",
  alternates: { canonical: "/devis" },
};

const perks = [
  { icon: Clock3, title: "Réponse rapide", text: "Une estimation claire dans les meilleurs délais." },
  { icon: Wallet, title: "Sans engagement", text: "Devis gratuit et personnalisé selon votre besoin." },
  { icon: ShieldCheck, title: "Tarif transparent", text: "Aucun frais caché : tout est détaillé." },
];

export default function DevisPage() {
  return (
    <>
      <PageHero
        breadcrumb="Devis"
        eyebrow="Devis gratuit"
        title="Obtenez votre devis personnalisé"
        subtitle="Décrivez votre besoin : nous revenons vers vous avec une proposition claire et adaptée. Pour un tarif immédiat, utilisez aussi notre configurateur de commande."
      />
      <section className="container-px py-16 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.6fr]">
          <div className="space-y-4">
            {perks.map((p, i) => (
              <Reveal key={p.title} delay={i}>
                <div className="card flex items-start gap-4 p-5">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-700">
                    <p.icon className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="font-bold text-ink">{p.title}</h3>
                    <p className="mt-1 text-sm text-ink/65">{p.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={1}>
            <div className="card p-6 sm:p-8">
              <h2 className="text-2xl font-bold text-ink">Votre demande de devis</h2>
              <p className="mt-1 text-sm text-ink/60">
                Les champs marqués d'un astérisque (*) sont obligatoires.
              </p>
              <div className="mt-6">
                <QuoteForm />
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { SectorCard } from "@/components/SectorCard";
import { CTASection } from "@/components/CTASection";
import { sectors } from "@/lib/sectors";

export const metadata: Metadata = {
  title: "Nos secteurs d'activité",
  description:
    "Santé et laboratoires, industrie, logistique, professionnels et particuliers : Midoriad Transports met son expertise au service de chaque secteur.",
  alternates: { canonical: "/secteurs" },
};

export default function SecteursPage() {
  return (
    <>
      <PageHero
        breadcrumb="Secteurs d'activité"
        eyebrow="Nos secteurs d'activité"
        title="Une réponse adaptée aux exigences de votre métier"
        subtitle="Du transport de prélèvements médicaux à la distribution nationale, nous maîtrisons les protocoles et contraintes propres à chaque secteur."
      />
      <section className="container-px py-16 lg:py-20">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {sectors.map((s, i) => (
            <SectorCard key={s.id} sector={s} index={i} />
          ))}
        </div>
      </section>
      <CTASection />
    </>
  );
}

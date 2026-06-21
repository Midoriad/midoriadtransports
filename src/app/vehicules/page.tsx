import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { VehicleCard } from "@/components/VehicleCard";
import { Reveal } from "@/components/Reveal";
import { vehicles } from "@/lib/vehicles";

export const metadata: Metadata = {
  title: "Nos véhicules",
  description:
    "Moto 125 cc, moto 1200 cc, utilitaires Trafic, Boxer, Master et camion 20 m³ avec hayon. Découvrez la flotte Midoriad Transports et ses capacités.",
  alternates: { canonical: "/vehicules" },
};

export default function VehiculesPage() {
  return (
    <>
      <PageHero
        breadcrumb="Nos véhicules"
        eyebrow="Notre flotte"
        title="Le bon véhicule pour chaque marchandise"
        subtitle="De la livraison express en deux-roues au camion avec hayon, sélectionnez la capacité idéale. Chaque fiche détaille les limites de poids, de volume et de distance."
      />
      <section className="container-px py-16 lg:py-20">
        <div className="grid gap-7 md:grid-cols-2 xl:grid-cols-3">
          {vehicles.map((v, i) => (
            <VehicleCard key={v.id} vehicle={v} index={i} />
          ))}
        </div>

        <Reveal>
          <div className="mt-14 flex flex-col items-center justify-between gap-5 rounded-3xl bg-brand-50/60 p-8 text-center sm:flex-row sm:text-left">
            <div>
              <h2 className="text-xl font-bold text-ink">
                Vous hésitez sur le véhicule adapté ?
              </h2>
              <p className="mt-1 text-sm text-ink/65">
                Notre configurateur vérifie automatiquement la compatibilité poids /
                volume / distance et vous recommande la meilleure option.
              </p>
            </div>
            <Link href="/commande" className="btn-primary shrink-0">
              Lancer le configurateur
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}

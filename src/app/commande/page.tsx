import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { OrderConfigurator } from "@/components/configurator/OrderConfigurator";
import { vehiclesById, type VehicleId } from "@/lib/vehicles";

export const metadata: Metadata = {
  title: "Commander un transport",
  description:
    "Configurez votre transport en quelques clics : véhicule, itinéraire sur carte interactive, volume et tarif calculé en temps réel. Validation intelligente de compatibilité.",
  alternates: { canonical: "/commande" },
};

export default function CommandePage({
  searchParams,
}: {
  searchParams: { vehicle?: string };
}) {
  const param = searchParams.vehicle;
  const initialVehicle =
    param && param in vehiclesById ? (param as VehicleId) : undefined;

  return (
    <>
      <PageHero
        breadcrumb="Commander"
        eyebrow="Configurateur de transport"
        title="Composez votre course et obtenez le prix en temps réel"
        subtitle="Choisissez votre véhicule, tracez l'itinéraire, indiquez le volume : le tarif s'actualise instantanément. Notre système vérifie automatiquement la compatibilité."
      />
      <section className="container-px py-14 lg:py-16">
        <OrderConfigurator initialVehicle={initialVehicle} />
      </section>
    </>
  );
}

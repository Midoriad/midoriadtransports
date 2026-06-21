import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { ServiceCard } from "@/components/ServiceCard";
import { CTASection } from "@/components/CTASection";
import { services } from "@/lib/services";

export const metadata: Metadata = {
  title: "Nos services",
  description:
    "Transport léger, livraison moto, déménagement, transport urgent instantané, transport de véhicule et logistique. Découvrez toutes les prestations Midoriad Transports.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        breadcrumb="Nos services"
        eyebrow="Nos services"
        title="Des prestations complètes, du pli urgent au déménagement"
        subtitle="Chaque carte se déploie pour révéler le détail de la prestation. Choisissez la solution qui correspond exactement à votre besoin."
      />
      <section className="container-px py-16 lg:py-20">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <ServiceCard key={s.id} service={s} />
          ))}
        </div>
      </section>
      <CTASection />
    </>
  );
}

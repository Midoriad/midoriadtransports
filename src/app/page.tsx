import Link from "next/link";
import { ArrowRight, MousePointerClick, MapPinned, BadgeCheck } from "lucide-react";
import { Hero } from "@/components/Hero";
import { Engagements } from "@/components/Engagements";
import { StatsBar } from "@/components/StatsBar";
import { CTASection } from "@/components/CTASection";
import { SectionHeader } from "@/components/SectionHeader";
import { ServiceCard } from "@/components/ServiceCard";
import { SectorCard } from "@/components/SectorCard";
import { Reveal } from "@/components/Reveal";
import { services } from "@/lib/services";
import { sectors } from "@/lib/sectors";

const steps = [
  {
    icon: MousePointerClick,
    title: "Choisissez votre véhicule",
    text: "De la moto 125 au camion 20 m³ avec hayon, sélectionnez la solution adaptée à votre envoi.",
  },
  {
    icon: MapPinned,
    title: "Indiquez vos adresses",
    text: "La distance et la durée sont calculées automatiquement sur la carte interactive.",
  },
  {
    icon: BadgeCheck,
    title: "Validez votre tarif",
    text: "Le prix s'affiche en temps réel. Confirmez, nous prenons le relais immédiatement.",
  },
];

export default function HomePage() {
  return (
    <>
      <Hero />
      <Engagements />
      <StatsBar />

      {/* Services */}
      <section className="container-px py-20 lg:py-24">
        <SectionHeader
          eyebrow="Nos services"
          title="Des solutions de transport pour chaque besoin"
          subtitle="Cliquez sur une prestation pour découvrir le détail. Du pli urgent au déménagement complet, nous avons le véhicule et l'expertise."
        />
        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <ServiceCard key={s.id} service={s} />
          ))}
        </div>
      </section>

      {/* Comment ça marche */}
      <section className="bg-brand-50/50 py-20 lg:py-24">
        <div className="container-px">
          <SectionHeader
            eyebrow="Comment ça marche"
            title="Commandez votre transport en 3 étapes"
            subtitle="Une expérience pensée pour être simple, fluide et transparente."
          />
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {steps.map((s, i) => (
              <Reveal key={s.title} delay={i} as="article">
                <div className="card relative h-full p-7">
                  <span className="absolute right-6 top-6 font-display text-5xl font-extrabold text-brand-100">
                    0{i + 1}
                  </span>
                  <span className="grid h-14 w-14 place-items-center rounded-2xl bg-brand-600 text-white shadow-soft">
                    <s.icon className="h-7 w-7" />
                  </span>
                  <h3 className="mt-6 text-xl font-bold text-ink">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink/65">{s.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link href="/commande" className="btn-primary text-base">
              Commencer ma commande
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Secteurs */}
      <section className="container-px py-20 lg:py-24">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeader
            align="left"
            eyebrow="Nos secteurs d'activité"
            title="Une expertise reconnue dans des domaines exigeants"
          />
          <Link
            href="/secteurs"
            className="btn-outline shrink-0"
          >
            Tous nos secteurs
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {sectors.slice(0, 3).map((s, i) => (
            <SectorCard key={s.id} sector={s} index={i} />
          ))}
        </div>
      </section>

      <CTASection />
    </>
  );
}

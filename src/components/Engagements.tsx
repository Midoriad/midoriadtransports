import { Gauge, ShieldCheck, PackageCheck, Globe2 } from "lucide-react";
import { Reveal } from "./Reveal";
import { SectionHeader } from "./SectionHeader";

const engagements = [
  {
    icon: Gauge,
    title: "Rapidité",
    text: "Livraison urgente partout en France.",
  },
  {
    icon: ShieldCheck,
    title: "Fiabilité",
    text: "Suivi en temps réel et respect des délais.",
  },
  {
    icon: PackageCheck,
    title: "Sécurité",
    text: "Marchandises transportées avec soin.",
  },
  {
    icon: Globe2,
    title: "Disponibilité",
    text: "Service national et international.",
  },
];

export function Engagements() {
  return (
    <section className="container-px py-20 lg:py-24">
      <SectionHeader
        eyebrow="Nos engagements"
        title="Une exigence à chaque étape de la livraison"
        subtitle="Nous mettons la performance et la rigueur au service de vos envois, du premier kilomètre jusqu'à la remise."
      />

      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {engagements.map((e, i) => (
          <Reveal key={e.title} delay={i} as="article">
            <div className="card group h-full p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-card">
              <span className="grid h-14 w-14 place-items-center rounded-2xl bg-brand-50 text-brand-700 transition-colors group-hover:bg-brand-600 group-hover:text-white">
                <e.icon className="h-7 w-7" />
              </span>
              <h3 className="mt-6 text-xl font-bold text-ink">{e.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/65">{e.text}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

import type { Metadata } from "next";
import {
  Target,
  Zap,
  TrendingUp,
  HeartHandshake,
  CheckCircle2,
} from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { SectionHeader } from "@/components/SectionHeader";
import { Reveal } from "@/components/Reveal";
import { ApplicationForm } from "@/components/forms/ApplicationForm";

export const metadata: Metadata = {
  title: "Recrutement — Rejoignez-nous",
  description:
    "Coursier, chauffeur, sous-traitant ou logistique : rejoignez l'aventure Midoriad Transports. Déposez votre candidature en ligne (CV + lettre de motivation).",
  alternates: { canonical: "/recrutement" },
};

const profiles = [
  {
    icon: Target,
    title: "Obsession du travail bien fait",
    traits: ["Passion", "Culture du service", "Responsabilité", "Partenariat"],
  },
  {
    icon: Zap,
    title: "Prêts à toutes les éventualités",
    traits: ["Adaptabilité", "Réactivité", "Savoir-faire", "Expertise métier"],
  },
  {
    icon: TrendingUp,
    title: "Animés par l'envie d'aller plus loin",
    traits: ["Excellence", "Ambition", "Esprit de conquête", "Performance"],
  },
  {
    icon: HeartHandshake,
    title: "Inspirés par l'humain",
    traits: ["Confiance", "Reconnaissance", "Respect", "Esprit d'équipe"],
  },
];

const priorities = [
  "Emploi stable",
  "Diversité",
  "Égalité",
  "Inclusion",
  "Développement des compétences",
];

export default function RecrutementPage() {
  return (
    <>
      <PageHero
        breadcrumb="Recrutement"
        eyebrow="Carrières"
        title="Rejoignez l'aventure Midoriad Transports"
        subtitle="Nous recherchons des professionnels passionnés prêts à participer au développement d'une entreprise ambitieuse."
      />

      {/* Profils recherchés */}
      <section className="container-px py-20 lg:py-24">
        <SectionHeader
          eyebrow="Les profils recherchés"
          title="Les valeurs qui nous rassemblent"
          subtitle="Au-delà des compétences, nous recherchons des personnalités qui partagent notre état d'esprit."
        />
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {profiles.map((p, i) => (
            <Reveal key={p.title} delay={i} as="article">
              <div className="card h-full p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-card">
                <span className="grid h-14 w-14 place-items-center rounded-2xl bg-brand-600 text-white shadow-soft">
                  <p.icon className="h-7 w-7" />
                </span>
                <h3 className="mt-6 text-lg font-bold text-ink">{p.title}</h3>
                <ul className="mt-4 space-y-2">
                  {p.traits.map((t) => (
                    <li key={t} className="flex items-center gap-2 text-sm text-ink/70">
                      <span className="h-1.5 w-1.5 rounded-full bg-gold-500" />
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Message RH + engagement */}
      <section className="bg-brand-50/50 py-20 lg:py-24">
        <div className="container-px grid gap-12 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <span className="eyebrow">Message RH</span>
            <blockquote className="mt-5 space-y-4 text-lg leading-relaxed text-ink/80">
              <p>
                Chez Midoriad Transports, nous croyons que l'excellence de notre
                service repose avant tout sur les femmes et les hommes qui composent
                nos équipes.
              </p>
              <p>
                Nous recherchons des personnalités motivées, ambitieuses et prêtes à
                évoluer avec nous.
              </p>
              <p className="font-semibold text-ink">
                Le potentiel, l'engagement et l'envie d'apprendre sont aussi importants
                que l'expérience.
              </p>
            </blockquote>
          </Reveal>

          <Reveal delay={1}>
            <div className="card p-8">
              <h3 className="text-xl font-bold text-ink">Notre engagement</h3>
              <p className="mt-2 text-sm text-ink/65">
                Créer un modèle de transport performant, durable et responsable. Nos
                priorités :
              </p>
              <ul className="mt-6 space-y-3">
                {priorities.map((p) => (
                  <li key={p} className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-brand-600" />
                    <span className="font-medium text-ink">{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Formulaire de candidature */}
      <section className="container-px py-20 lg:py-24">
        <div className="mx-auto max-w-3xl">
          <SectionHeader
            eyebrow="Formulaire de candidature"
            title="Déposez votre candidature"
            subtitle="Joignez votre CV (et votre lettre de motivation si vous le souhaitez). Tous les profils sont étudiés avec attention."
          />
          <Reveal delay={1}>
            <div className="card mt-12 p-6 sm:p-8">
              <ApplicationForm />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

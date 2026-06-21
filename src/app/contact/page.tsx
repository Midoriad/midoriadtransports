import type { Metadata } from "next";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { ContactForm } from "@/components/forms/ContactForm";
import { Reveal } from "@/components/Reveal";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contactez Midoriad Transports par téléphone, e-mail ou via notre formulaire. Service disponible 7j/7 pour vos transports urgents partout en France.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        breadcrumb="Contact"
        eyebrow="Contact"
        title="Parlons de votre projet de transport"
        subtitle="Une question, une urgence, un partenariat ? Notre équipe vous répond rapidement. Choisissez le canal qui vous convient."
      />

      <section className="container-px py-16 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.5fr]">
          {/* Coordonnées */}
          <div className="space-y-4">
            <Reveal>
              <a
                href={`tel:${site.phoneHref}`}
                className="card flex items-start gap-4 p-5 transition-shadow hover:shadow-card"
              >
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-700">
                  <Phone className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-bold text-ink">Téléphone</h3>
                  <p className="mt-1 text-sm text-ink/70">{site.phone}</p>
                  <p className="text-xs text-ink/50">Urgences 7j/7</p>
                </div>
              </a>
            </Reveal>

            <Reveal delay={1}>
              <a
                href={`mailto:${site.email}`}
                className="card flex items-start gap-4 p-5 transition-shadow hover:shadow-card"
              >
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-700">
                  <Mail className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-bold text-ink">Email</h3>
                  <p className="mt-1 break-all text-sm text-ink/70">{site.email}</p>
                  <p className="text-xs text-ink/50">Réponse rapide</p>
                </div>
              </a>
            </Reveal>

            <Reveal delay={2}>
              <div className="card flex items-start gap-4 p-5">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-700">
                  <MapPin className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-bold text-ink">Zone d'intervention</h3>
                  <p className="mt-1 text-sm text-ink/70">{site.address}</p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={3}>
              <div className="card p-5">
                <div className="flex items-center gap-3">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-700">
                    <Clock className="h-5 w-5" />
                  </span>
                  <h3 className="font-bold text-ink">Horaires</h3>
                </div>
                <dl className="mt-4 space-y-2 text-sm">
                  {site.hours.map((h) => (
                    <div key={h.d} className="flex justify-between gap-4">
                      <dt className="text-ink/65">{h.d}</dt>
                      <dd className="font-medium text-ink">{h.h}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </Reveal>
          </div>

          {/* Formulaire */}
          <Reveal delay={1}>
            <div className="card p-6 sm:p-8">
              <h2 className="text-2xl font-bold text-ink">Écrivez-nous</h2>
              <p className="mt-1 text-sm text-ink/60">
                Nous vous répondons dans les meilleurs délais.
              </p>
              <div className="mt-6">
                <ContactForm />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Carte */}
      <section className="container-px pb-20">
        <Reveal>
          <div className="overflow-hidden rounded-3xl border border-ink/10 shadow-soft">
            <iframe
              title="Zone d'intervention Midoriad Transports"
              className="h-[400px] w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.openstreetmap.org/export/embed.html?bbox=-5.5%2C42.0%2C9.0%2C51.5&layer=mapnik"
            />
          </div>
        </Reveal>
      </section>
    </>
  );
}

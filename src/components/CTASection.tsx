import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { Reveal } from "./Reveal";
import { site } from "@/lib/site";

export function CTASection() {
  return (
    <section className="container-px py-20">
      <Reveal>
        <div className="relative overflow-hidden rounded-[2.5rem] bg-mesh px-8 py-16 text-center text-white sm:px-16">
          <div className="absolute inset-0 bg-hero-grid [background-size:24px_24px] opacity-40" />
          <div className="relative mx-auto max-w-2xl">
            <h2 className="text-balance text-3xl font-extrabold sm:text-4xl">
              Un envoi à organiser&nbsp;? Obtenez votre prix en quelques clics.
            </h2>
            <p className="mt-4 text-lg text-white/75">
              Configurez votre transport, visualisez le tarif en temps réel et
              validez votre commande. Simple, rapide et transparent.
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link href="/commande" className="btn-gold text-base">
                Commander maintenant
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href={`tel:${site.phoneHref}`}
                className="btn border border-white/25 bg-white/5 text-white hover:bg-white/15"
              >
                <Phone className="h-4 w-4" />
                {site.phone}
              </a>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

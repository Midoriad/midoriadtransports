import Link from "next/link";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { Logo } from "./Logo";
import { legalNav, mainNav, site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="bg-ink text-white/70">
      <div className="container-px py-14">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div className="max-w-sm">
            <Logo variant="light" />
            <p className="mt-5 text-sm leading-relaxed text-white/60">
              {site.name} — Transport express, logistique et livraison sur mesure,
              partout en France et à l'international. Rapidité, fiabilité et
              sécurité pour chacun de vos envois.
            </p>
            <Link href="/commande" className="btn-gold mt-6">
              Commander un transport
            </Link>
          </div>

          <nav aria-label="Navigation pied de page">
            <h3 className="text-sm font-semibold uppercase tracking-widest text-white">
              Navigation
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {mainNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-white/60 transition-colors hover:text-gold-400"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/devis"
                  className="text-white/60 transition-colors hover:text-gold-400"
                >
                  Demander un devis
                </Link>
              </li>
            </ul>
          </nav>

          <nav aria-label="Informations légales">
            <h3 className="text-sm font-semibold uppercase tracking-widest text-white">
              Légal
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {legalNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-white/60 transition-colors hover:text-gold-400"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-white">
              Contact
            </h3>
            <ul className="mt-4 space-y-3.5 text-sm">
              <li className="flex items-start gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-brand-400" />
                <a href={`tel:${site.phoneHref}`} className="hover:text-gold-400">
                  {site.phone}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-brand-400" />
                <a href={`mailto:${site.email}`} className="break-all hover:text-gold-400">
                  {site.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-400" />
                <span>{site.address}</span>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-brand-400" />
                <span>Urgences 7j/7 — réponse rapide</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-7 text-xs text-white/45 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {site.name}. Tous droits réservés.
          </p>
          <p>
            Conçu pour la performance — Next.js · TypeScript · Conforme RGPD.
          </p>
        </div>
      </div>
    </footer>
  );
}

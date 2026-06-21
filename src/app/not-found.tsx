import Link from "next/link";
import { Home, Phone } from "lucide-react";
import { site } from "@/lib/site";

export default function NotFound() {
  return (
    <section className="bg-mesh text-white">
      <div className="container-px grid min-h-[70vh] place-items-center py-20 text-center">
        <div className="max-w-lg">
          <p className="font-display text-7xl font-extrabold text-gold-400">404</p>
          <h1 className="mt-4 text-3xl font-bold">Page introuvable</h1>
          <p className="mt-3 text-white/70">
            La page que vous recherchez a été déplacée ou n'existe plus. Revenez à
            l'accueil ou contactez-nous directement.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/" className="btn-gold">
              <Home className="h-4 w-4" />
              Retour à l'accueil
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
    </section>
  );
}

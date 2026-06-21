"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Phone } from "lucide-react";
import { Logo } from "./Logo";
import { mainNav, site } from "@/lib/site";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-ink/10 bg-white/85 backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <div className="container-px flex h-18 items-center justify-between py-3">
        <Logo />

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Navigation principale">
          {mainNav.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-full px-3.5 py-2 text-sm font-medium transition-colors ${
                  active
                    ? "bg-brand-50 text-brand-700"
                    : "text-ink/70 hover:bg-ink/5 hover:text-ink"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={`tel:${site.phoneHref}`}
            className="inline-flex items-center gap-2 text-sm font-semibold text-ink/80 hover:text-brand-700"
          >
            <Phone className="h-4 w-4" />
            {site.phone}
          </a>
          <Link href="/devis" className="btn-gold">
            Obtenir un devis
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="grid h-11 w-11 place-items-center rounded-xl border border-ink/10 text-ink lg:hidden"
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Menu mobile */}
      <div
        className={`lg:hidden ${open ? "block" : "hidden"} border-t border-ink/10 bg-white`}
      >
        <nav className="container-px flex flex-col gap-1 py-4" aria-label="Navigation mobile">
          {mainNav.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-xl px-4 py-3 text-base font-medium ${
                  active ? "bg-brand-50 text-brand-700" : "text-ink/80"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          <div className="mt-3 flex flex-col gap-2">
            <a href={`tel:${site.phoneHref}`} className="btn-outline w-full">
              <Phone className="h-4 w-4" /> {site.phone}
            </a>
            <Link href="/devis" className="btn-gold w-full">
              Obtenir un devis
            </Link>
            <Link href="/commande" className="btn-primary w-full">
              Commander maintenant
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}

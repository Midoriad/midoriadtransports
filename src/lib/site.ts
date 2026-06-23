export const site = {
  name: "Midoriad Transports",
  shortName: "Midoriad",
  tagline: "Transport Express, Logistique et Livraison sur mesure",
  description:
    "Midoriad Transports — Livraisons urgentes, tournées régulières, déménagements et transport de marchandises partout en France et à l'international. Devis immédiat, suivi en temps réel.",
  email: process.env.NEXT_PUBLIC_EMAIL ?? "midoriadtransports@hotmail.com",
  phone: process.env.NEXT_PUBLIC_PHONE ?? "06 08 48 31 37",
  phoneHref: (process.env.NEXT_PUBLIC_PHONE ?? "+33608483137").replace(/\s+/g, ""),
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://midoriadtransport.vercel.app",
  address: "18 av. du Général de Gaulle, 95100 Argenteuil — Service national & international",
  hours: [
    { d: "Lundi – Vendredi", h: "6h00 – 22h00" },
    { d: "Samedi", h: "7h00 – 20h00" },
    { d: "Dimanche & jours fériés", h: "Sur demande (urgences 7j/7)" },
  ],
  social: {
    linkedin: "#",
    facebook: "#",
    instagram: "#",
  },
} as const;

export type NavItem = { label: string; href: string };

export const mainNav: NavItem[] = [
  { label: "Accueil", href: "/" },
  { label: "Nos services", href: "/services" },
  { label: "Secteurs", href: "/secteurs" },
  { label: "Nos véhicules", href: "/vehicules" },
  { label: "Commander", href: "/commande" },
  { label: "Recrutement", href: "/recrutement" },
  { label: "Contact", href: "/contact" },
];

export const legalNav: NavItem[] = [
  { label: "Mentions légales", href: "/mentions-legales" },
  { label: "Politique de confidentialité", href: "/politique-confidentialite" },
  { label: "Politique de cookies", href: "/politique-cookies" },
  { label: "CGU", href: "/cgu" },
  { label: "CGV", href: "/cgv" },
  { label: "Politique de remboursement", href: "/politique-remboursement" },
];

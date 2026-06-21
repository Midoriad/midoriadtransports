import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url.replace(/\/$/, "");
  const now = new Date();

  const routes: { path: string; priority: number; freq: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
    { path: "/", priority: 1, freq: "weekly" },
    { path: "/services", priority: 0.9, freq: "monthly" },
    { path: "/secteurs", priority: 0.8, freq: "monthly" },
    { path: "/vehicules", priority: 0.9, freq: "monthly" },
    { path: "/commande", priority: 0.95, freq: "monthly" },
    { path: "/devis", priority: 0.9, freq: "monthly" },
    { path: "/recrutement", priority: 0.7, freq: "monthly" },
    { path: "/contact", priority: 0.7, freq: "monthly" },
    { path: "/mentions-legales", priority: 0.2, freq: "yearly" },
    { path: "/politique-confidentialite", priority: 0.2, freq: "yearly" },
    { path: "/politique-cookies", priority: 0.2, freq: "yearly" },
    { path: "/cgu", priority: 0.2, freq: "yearly" },
    { path: "/cgv", priority: 0.2, freq: "yearly" },
    { path: "/politique-remboursement", priority: 0.2, freq: "yearly" },
  ];

  return routes.map((r) => ({
    url: `${base}${r.path}`,
    lastModified: now,
    changeFrequency: r.freq,
    priority: r.priority,
  }));
}

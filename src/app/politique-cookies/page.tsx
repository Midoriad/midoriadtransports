import type { Metadata } from "next";
import { LegalShell } from "@/components/LegalShell";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Politique de cookies",
  description:
    "Politique de gestion des cookies du site Midoriad Transports, conforme au RGPD et aux recommandations de la CNIL.",
  alternates: { canonical: "/politique-cookies" },
  robots: { index: false, follow: true },
};

export default function PolitiqueCookiesPage() {
  return (
    <LegalShell title="Politique de cookies" breadcrumb="Politique de cookies" updated="19 juin 2026">
      <h2>1. Qu'est-ce qu'un cookie ?</h2>
      <p>
        Un cookie est un petit fichier texte déposé sur votre terminal (ordinateur,
        tablette, smartphone) lors de la consultation d'un site. Il permet notamment de
        mémoriser vos préférences et de mesurer l'audience.
      </p>

      <h2>2. Cookies utilisés sur ce site</h2>
      <ul>
        <li>
          <strong>Cookies strictement nécessaires</strong> : indispensables au
          fonctionnement du site (mémorisation de votre choix de consentement,
          sécurité). Ils ne requièrent pas votre consentement.
        </li>
        <li>
          <strong>Cookies de mesure d'audience</strong> : statistiques de fréquentation
          anonymisées, déposés uniquement avec votre consentement.{" "}
          <em>(Le cas échéant, selon les outils mis en place.)</em>
        </li>
      </ul>
      <p>
        Le site enregistre votre choix de consentement via un stockage local
        (« {`midoriad-cookie-consent`} »). Les cartes sont fournies par OpenStreetMap.
      </p>

      <h2>3. Votre consentement</h2>
      <p>
        Lors de votre première visite, un bandeau vous permet d'<strong>accepter</strong>{" "}
        ou de <strong>refuser</strong> les cookies non essentiels. Vous pouvez modifier
        votre choix à tout moment en supprimant les données de navigation de votre
        navigateur, puis en rechargeant le site.
      </p>

      <h2>4. Paramétrer votre navigateur</h2>
      <p>
        Vous pouvez configurer votre navigateur pour accepter ou refuser les cookies :
      </p>
      <ul>
        <li>Chrome : Paramètres → Confidentialité et sécurité → Cookies.</li>
        <li>Firefox : Paramètres → Vie privée et sécurité.</li>
        <li>Safari : Préférences → Confidentialité.</li>
        <li>Edge : Paramètres → Cookies et autorisations de site.</li>
      </ul>
      <p>
        Le refus de certains cookies peut altérer votre expérience de navigation.
      </p>

      <h2>5. Contact</h2>
      <p>
        Pour toute question relative aux cookies, écrivez-nous à{" "}
        <a href={`mailto:${site.email}`}>{site.email}</a>. Voir aussi notre{" "}
        <a href="/politique-confidentialite">Politique de confidentialité</a>.
      </p>
    </LegalShell>
  );
}

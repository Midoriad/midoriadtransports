import type { Metadata } from "next";
import { LegalShell, ToComplete } from "@/components/LegalShell";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description:
    "Politique de confidentialité et de protection des données personnelles de Midoriad Transports, conforme au RGPD.",
  alternates: { canonical: "/politique-confidentialite" },
  robots: { index: false, follow: true },
};

export default function PolitiqueConfidentialitePage() {
  return (
    <LegalShell
      title="Politique de confidentialité"
      breadcrumb="Politique de confidentialité"
      updated="19 juin 2026"
    >
      <p>
        La présente politique décrit la manière dont {site.name} collecte, utilise et
        protège vos données à caractère personnel, conformément au Règlement (UE)
        2016/679 (RGPD) et à la loi « Informatique et Libertés » modifiée.
      </p>

      <h2>1. Responsable du traitement</h2>
      <p>
        Le responsable du traitement est <strong>MIDORIAD TRANSPORTS</strong> (SAS),
        18 avenue du Général de Gaulle, 95100 Argenteuil. Pour toute question relative
        à vos données, vous pouvez
        nous écrire à <a href={`mailto:${site.email}`}>{site.email}</a>.
      </p>

      <h2>2. Données collectées</h2>
      <p>Nous collectons uniquement les données nécessaires à nos services :</p>
      <ul>
        <li>
          <strong>Identité & contact</strong> : nom, prénom, adresse, e-mail,
          téléphone.
        </li>
        <li>
          <strong>Données de commande / devis</strong> : adresses de prise en charge
          et de livraison, type de véhicule, nature et volume de la marchandise,
          dates.
        </li>
        <li>
          <strong>Candidatures</strong> : CV, lettre de motivation et informations
          professionnelles communiquées.
        </li>
        <li>
          <strong>Données techniques</strong> : adresse IP, journaux de connexion,
          cookies (voir notre <a href="/politique-cookies">Politique de cookies</a>).
        </li>
      </ul>

      <h2>3. Finalités & bases légales</h2>
      <ul>
        <li>
          Répondre aux demandes de devis, de contact et traiter les commandes —{" "}
          <em>exécution de mesures précontractuelles / contrat</em>.
        </li>
        <li>
          Gérer les candidatures et le recrutement — <em>mesures précontractuelles /
          intérêt légitime</em>.
        </li>
        <li>
          Améliorer le site et mesurer l'audience — <em>consentement</em> (cookies non
          essentiels).
        </li>
        <li>
          Respecter nos obligations légales et comptables — <em>obligation légale</em>.
        </li>
      </ul>

      <h2>4. Destinataires</h2>
      <p>
        Vos données sont destinées aux services habilités de {site.name}. Elles
        peuvent être transmises à nos sous-traitants techniques (hébergement, envoi
        d'e-mails) agissant sur instruction et tenus à la confidentialité. Aucune
        donnée n'est vendue à des tiers.
      </p>

      <h2>5. Durée de conservation</h2>
      <ul>
        <li>Demandes de contact / devis : jusqu'à 3 ans après le dernier contact.</li>
        <li>Données contractuelles : durée de la relation + délais légaux (jusqu'à 10 ans).</li>
        <li>Candidatures non retenues : 2 ans maximum, sauf opposition.</li>
        <li>Cookies : 13 mois maximum.</li>
      </ul>

      <h2>6. Vos droits</h2>
      <p>
        Vous disposez d'un droit d'accès, de rectification, d'effacement, de limitation,
        d'opposition et de portabilité, ainsi que du droit de définir des directives
        relatives au sort de vos données après votre décès. Pour les exercer,
        contactez-nous à <a href={`mailto:${site.email}`}>{site.email}</a> (une preuve
        d'identité pourra être demandée).
      </p>
      <p>
        Vous pouvez également introduire une réclamation auprès de la CNIL —{" "}
        <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer">
          www.cnil.fr
        </a>
        .
      </p>

      <h2>7. Sécurité</h2>
      <p>
        Nous mettons en œuvre des mesures techniques et organisationnelles appropriées
        (chiffrement des échanges, contrôle des accès, protection anti-spam des
        formulaires) pour préserver la sécurité et la confidentialité de vos données.
      </p>

      <h2>8. Modifications</h2>
      <p>
        La présente politique peut être mise à jour à tout moment. La version en
        vigueur est celle publiée sur cette page.
      </p>
    </LegalShell>
  );
}

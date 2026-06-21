import type { Metadata } from "next";
import { LegalShell, ToComplete } from "@/components/LegalShell";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: "Mentions légales du site Midoriad Transports.",
  alternates: { canonical: "/mentions-legales" },
  robots: { index: false, follow: true },
};

export default function MentionsLegalesPage() {
  return (
    <LegalShell title="Mentions légales" breadcrumb="Mentions légales" updated="19 juin 2026">
      <p>
        Conformément aux dispositions des articles 6-III et 19 de la loi n° 2004-575
        du 21 juin 2004 pour la Confiance dans l'économie numérique (LCEN), il est
        porté à la connaissance des utilisateurs du site les présentes mentions
        légales.
      </p>

      <h2>1. Éditeur du site</h2>
      <p>
        Le site <strong>{site.name}</strong> est édité par :
      </p>
      <ul>
        <li>Dénomination sociale : <ToComplete>[à compléter : raison sociale]</ToComplete></li>
        <li>Forme juridique : <ToComplete>[à compléter : SARL, SAS, EI…]</ToComplete></li>
        <li>Capital social : <ToComplete>[à compléter]</ToComplete></li>
        <li>Siège social : <ToComplete>[à compléter : adresse complète]</ToComplete></li>
        <li>SIRET : <ToComplete>[à compléter]</ToComplete> — RCS : <ToComplete>[à compléter]</ToComplete></li>
        <li>N° TVA intracommunautaire : <ToComplete>[à compléter]</ToComplete></li>
        <li>
          Licence de transport / inscription au registre des transporteurs :{" "}
          <ToComplete>[à compléter le cas échéant]</ToComplete>
        </li>
        <li>Adresse e-mail : <a href={`mailto:${site.email}`}>{site.email}</a></li>
        <li>Téléphone : {site.phone}</li>
        <li>Directeur de la publication : <ToComplete>[à compléter : nom du représentant légal]</ToComplete></li>
      </ul>

      <h2>2. Hébergement</h2>
      <p>
        Le site est hébergé par <ToComplete>[à compléter : nom de l'hébergeur]</ToComplete>,{" "}
        <ToComplete>[adresse de l'hébergeur]</ToComplete>,{" "}
        <ToComplete>[téléphone de l'hébergeur]</ToComplete>.
      </p>

      <h2>3. Propriété intellectuelle</h2>
      <p>
        L'ensemble des éléments composant le site (textes, graphismes, logos, icônes,
        images, structure) est la propriété exclusive de l'éditeur ou fait l'objet
        d'une autorisation d'utilisation. Toute reproduction, représentation,
        modification ou exploitation, totale ou partielle, sans autorisation écrite
        préalable, est interdite et constituerait une contrefaçon sanctionnée par les
        articles L.335-2 et suivants du Code de la propriété intellectuelle.
      </p>

      <h2>4. Responsabilité</h2>
      <p>
        L'éditeur s'efforce d'assurer l'exactitude et la mise à jour des informations
        diffusées sur le site. Les estimations tarifaires et de distance fournies par
        le configurateur sont indicatives et ne constituent pas un engagement
        contractuel ; seul un devis confirmé par l'entreprise fait foi. L'éditeur ne
        saurait être tenu responsable des erreurs, d'une absence de disponibilité des
        informations ou de la présence de virus sur son site.
      </p>

      <h2>5. Données personnelles & cookies</h2>
      <p>
        Le traitement des données personnelles est détaillé dans notre{" "}
        <a href="/politique-confidentialite">Politique de confidentialité</a> et notre{" "}
        <a href="/politique-cookies">Politique de cookies</a>.
      </p>

      <h2>6. Cartographie</h2>
      <p>
        Les fonctionnalités de cartographie et de calcul d'itinéraire s'appuient sur
        les données <strong>OpenStreetMap</strong> (© contributeurs OpenStreetMap,
        sous licence ODbL) et les services associés.
      </p>

      <h2>7. Droit applicable</h2>
      <p>
        Les présentes mentions légales sont régies par le droit français. En cas de
        litige, et à défaut de résolution amiable, les tribunaux français sont seuls
        compétents.
      </p>
    </LegalShell>
  );
}

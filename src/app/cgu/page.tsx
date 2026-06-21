import type { Metadata } from "next";
import { LegalShell } from "@/components/LegalShell";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Conditions générales d'utilisation",
  description: "Conditions générales d'utilisation du site Midoriad Transports.",
  alternates: { canonical: "/cgu" },
  robots: { index: false, follow: true },
};

export default function CGUPage() {
  return (
    <LegalShell
      title="Conditions générales d'utilisation"
      breadcrumb="CGU"
      updated="19 juin 2026"
    >
      <h2>1. Objet</h2>
      <p>
        Les présentes Conditions Générales d'Utilisation (CGU) régissent l'accès et
        l'utilisation du site {site.name} (ci-après « le Site »). En accédant au Site,
        l'utilisateur accepte sans réserve les présentes CGU.
      </p>

      <h2>2. Accès au site</h2>
      <p>
        Le Site est accessible gratuitement à tout utilisateur disposant d'un accès à
        Internet. Les coûts liés à l'accès (matériel, connexion) sont à la charge de
        l'utilisateur. L'éditeur s'efforce d'assurer la disponibilité du Site 7j/7 mais
        ne saurait être tenu responsable d'une interruption, notamment pour maintenance
        ou cas de force majeure.
      </p>

      <h2>3. Services proposés</h2>
      <p>Le Site permet notamment de :</p>
      <ul>
        <li>découvrir les services et véhicules de transport ;</li>
        <li>obtenir une estimation tarifaire via le configurateur de commande ;</li>
        <li>demander un devis, commander un transport ou nous contacter ;</li>
        <li>déposer une candidature.</li>
      </ul>
      <p>
        Les estimations de prix, de distance et de durée sont fournies à titre
        indicatif. Elles ne constituent pas une offre ferme ; seul un devis ou une
        confirmation écrite de l'entreprise a valeur d'engagement.
      </p>

      <h2>4. Obligations de l'utilisateur</h2>
      <p>L'utilisateur s'engage à :</p>
      <ul>
        <li>fournir des informations exactes dans les formulaires ;</li>
        <li>ne pas utiliser le Site à des fins illicites ou frauduleuses ;</li>
        <li>
          ne pas perturber le fonctionnement du Site (tentatives d'intrusion, envois
          massifs automatisés, etc.).
        </li>
      </ul>

      <h2>5. Propriété intellectuelle</h2>
      <p>
        L'ensemble des contenus du Site est protégé par le droit de la propriété
        intellectuelle. Toute reproduction non autorisée est interdite (voir nos{" "}
        <a href="/mentions-legales">Mentions légales</a>).
      </p>

      <h2>6. Responsabilité</h2>
      <p>
        L'éditeur ne saurait être tenu responsable des dommages directs ou indirects
        résultant de l'utilisation du Site, ni de l'usage fait par l'utilisateur des
        estimations fournies. Les liens externes éventuels n'engagent pas la
        responsabilité de l'éditeur.
      </p>

      <h2>7. Données personnelles</h2>
      <p>
        Le traitement des données est décrit dans la{" "}
        <a href="/politique-confidentialite">Politique de confidentialité</a>.
      </p>

      <h2>8. Modification des CGU</h2>
      <p>
        L'éditeur se réserve le droit de modifier les présentes CGU à tout moment. La
        version applicable est celle en vigueur au moment de la consultation.
      </p>

      <h2>9. Droit applicable</h2>
      <p>
        Les présentes CGU sont soumises au droit français. Tout litige relève des
        tribunaux français compétents.
      </p>
    </LegalShell>
  );
}

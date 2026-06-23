import type { Metadata } from "next";
import { LegalShell, ToComplete } from "@/components/LegalShell";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Conditions générales de vente",
  description:
    "Conditions générales de vente des prestations de transport et de logistique de Midoriad Transports.",
  alternates: { canonical: "/cgv" },
  robots: { index: false, follow: true },
};

export default function CGVPage() {
  return (
    <LegalShell
      title="Conditions générales de vente"
      breadcrumb="CGV"
      updated="19 juin 2026"
    >
      <p>
        Les présentes Conditions Générales de Vente (CGV) s'appliquent à l'ensemble des
        prestations de transport, de livraison, de déménagement et de logistique
        proposées par {site.name} (ci-après « le Transporteur ») à ses clients
        (ci-après « le Client »).
      </p>

      <h2>1. Devis & commande</h2>
      <p>
        Toute prestation fait l'objet d'un devis ou d'une confirmation de commande. Les
        estimations affichées sur le configurateur en ligne sont indicatives. La
        commande est ferme après confirmation écrite du Transporteur. Le Client garantit
        l'exactitude des informations communiquées (adresses, nature, poids et volume de
        la marchandise, contraintes d'accès).
      </p>

      <h2>2. Prix</h2>
      <p>
        Les prix sont exprimés en euros. Ils tiennent compte de la distance, du temps,
        du type de véhicule et, le cas échéant, des majorations (urgence, nuit,
        week-end / jours fériés) et des péages. Toute prestation supplémentaire non
        prévue (attente, manutention additionnelle, étage sans ascenseur, retour à
        vide…) pourra faire l'objet d'une facturation complémentaire. Sauf mention
        contraire, les prix s'entendent toutes taxes comprises (TVA au taux en vigueur ;
        n° de TVA intracommunautaire FR 17 104 376 108).
      </p>

      <h2>3. Modalités de paiement</h2>
      <p>
        Sauf accord particulier, le paiement s'effectue{" "}
        <ToComplete>[à compléter : à la commande / à réception de facture sous X jours]</ToComplete>.
        En cas de retard de paiement, des pénalités au taux légal en vigueur ainsi
        qu'une indemnité forfaitaire de recouvrement de 40 € (art. L.441-10 du Code de
        commerce) seront exigibles, sans mise en demeure préalable.
      </p>

      <h2>4. Exécution de la prestation</h2>
      <p>
        Le Transporteur s'engage à mettre en œuvre tous les moyens nécessaires au bon
        acheminement de la marchandise. Les délais annoncés sont donnés à titre
        indicatif et tiennent compte des conditions de circulation. Le Client doit
        assurer l'accessibilité des lieux de prise en charge et de livraison.
      </p>

      <h2>5. Marchandises exclues</h2>
      <p>
        Sont notamment exclus du transport, sauf accord exprès : les marchandises
        dangereuses, illicites, les valeurs (espèces, bijoux), les denrées nécessitant
        une chaîne du froid non prévue, les animaux vivants et tout bien dont le
        transport est réglementé sans habilitation correspondante. Le poids et le volume
        doivent respecter les limites du véhicule choisi.
      </p>

      <h2>6. Responsabilité & assurance</h2>
      <p>
        La responsabilité du Transporteur s'exerce dans les conditions et limites
        prévues par le contrat type applicable et le Code des transports. Les
        indemnisations en cas de perte ou d'avarie sont plafonnées conformément à la
        réglementation en vigueur, sauf souscription d'une assurance complémentaire
        « ad valorem ». Le Transporteur est couvert par une assurance de responsabilité
        professionnelle <ToComplete>[à compléter : compagnie & n° de police]</ToComplete>.
      </p>

      <h2>7. Réclamations</h2>
      <p>
        Toute réserve relative à l'état de la marchandise doit être formulée à la
        livraison sur le document de transport, puis confirmée par écrit au Transporteur
        dans les délais légaux (en principe 3 jours hors jours fériés). Passé ce délai,
        aucune réclamation ne pourra être prise en compte.
      </p>

      <h2>8. Annulation</h2>
      <p>
        Les conditions d'annulation et de remboursement sont précisées dans notre{" "}
        <a href="/politique-remboursement">Politique de remboursement</a>.
      </p>

      <h2>9. Médiation de la consommation</h2>
      <p>
        Conformément aux articles L.612-1 et suivants du Code de la consommation, le
        Client consommateur peut recourir gratuitement à un médiateur de la
        consommation :{" "}
        <ToComplete>[à compléter : nom et coordonnées du médiateur]</ToComplete>.
      </p>

      <h2>10. Droit applicable & litiges</h2>
      <p>
        Les présentes CGV sont régies par le droit français. À défaut de résolution
        amiable, le litige sera porté devant les tribunaux compétents.
      </p>
    </LegalShell>
  );
}

import type { Metadata } from "next";
import { LegalShell, ToComplete } from "@/components/LegalShell";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Politique de remboursement",
  description:
    "Conditions d'annulation et de remboursement des prestations de transport Midoriad Transports.",
  alternates: { canonical: "/politique-remboursement" },
  robots: { index: false, follow: true },
};

export default function PolitiqueRemboursementPage() {
  return (
    <LegalShell
      title="Politique de remboursement"
      breadcrumb="Politique de remboursement"
      updated="19 juin 2026"
    >
      <p>
        La présente politique précise les conditions d'annulation, de modification et de
        remboursement des prestations de transport réservées auprès de {site.name}.
      </p>

      <h2>1. Annulation par le Client</h2>
      <p>Sauf conditions particulières mentionnées au devis :</p>
      <ul>
        <li>
          <strong>Annulation plus de 24 h avant</strong> la prise en charge :
          remboursement intégral ou prestation reportée sans frais.
        </li>
        <li>
          <strong>Annulation entre 24 h et 4 h avant</strong> : une retenue de{" "}
          <ToComplete>[à compléter : ex. 30 %]</ToComplete> du montant pourra être
          appliquée pour couvrir les frais d'organisation.
        </li>
        <li>
          <strong>Annulation moins de 4 h avant</strong> ou course déjà engagée (départ
          du véhicule) : la prestation est due en totalité.
        </li>
      </ul>

      <h2>2. Modification de commande</h2>
      <p>
        Toute demande de modification (adresse, horaire, véhicule, volume) doit nous
        être communiquée au plus tôt. Elle est soumise à disponibilité et peut entraîner
        un réajustement tarifaire conforme à nos{" "}
        <a href="/cgv">Conditions générales de vente</a>.
      </p>

      <h2>3. Annulation par le Transporteur</h2>
      <p>
        En cas d'impossibilité d'exécuter la prestation du fait du Transporteur (panne,
        indisponibilité), le Client se voit proposer un report ou un remboursement
        intégral des sommes versées, sans autre indemnité.
      </p>

      <h2>4. Prestation non conforme</h2>
      <p>
        En cas de non-conformité avérée et signalée dans les délais (voir l'article
        « Réclamations » des <a href="/cgv">CGV</a>), un remboursement total ou partiel,
        ou un geste commercial, pourra être accordé après examen du dossier.
      </p>

      <h2>5. Droit de rétractation</h2>
      <p>
        Conformément à l'article L.221-28 du Code de la consommation, le droit de
        rétractation ne s'applique pas aux prestations de transport de biens exécutées à
        une date ou selon une périodicité déterminée. Lorsque l'exécution commence,
        avec l'accord du consommateur, avant la fin du délai de rétractation, le Client
        reste redevable des prestations déjà réalisées.
      </p>

      <h2>6. Modalités de remboursement</h2>
      <p>
        Les remboursements sont effectués par le même moyen de paiement que celui utilisé
        lors de la commande, dans un délai maximal de{" "}
        <ToComplete>[à compléter : ex. 14 jours]</ToComplete> à compter de l'accord de
        remboursement.
      </p>

      <h2>7. Contact</h2>
      <p>
        Pour toute demande d'annulation ou de remboursement, contactez-nous à{" "}
        <a href={`mailto:${site.email}`}>{site.email}</a> ou au {site.phone}.
      </p>
    </LegalShell>
  );
}

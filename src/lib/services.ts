export type Service = {
  id: string;
  title: string;
  short: string;
  details: string[];
  icon:
    | "Truck"
    | "Bike"
    | "Sofa"
    | "Zap"
    | "Car"
    | "Warehouse";
  accent: string;
};

export const services: Service[] = [
  {
    id: "transport-leger",
    title: "Transport léger",
    short:
      "Solution idéale pour les colis, documents, matériels informatiques, fournitures et marchandises légères.",
    details: [
      "Interventions rapides en ville et sur courtes distances.",
      "Véhicules utilitaires légers adaptés aux livraisons du quotidien.",
      "Prise en charge sur rendez-vous ou en express.",
    ],
    icon: "Truck",
    accent: "from-brand-500/15 to-brand-700/15",
  },
  {
    id: "livraison-moto",
    title: "Livraison Moto",
    short:
      "Solution ultra rapide pour les plis urgents, colis légers et livraisons express dans les centres-villes.",
    details: [
      "Parfait pour Paris et les zones urbaines denses.",
      "Évite les embouteillages, délais maîtrisés.",
      "Idéal documents juridiques, échantillons et pièces urgentes.",
    ],
    icon: "Bike",
    accent: "from-gold-400/15 to-gold-600/15",
  },
  {
    id: "demenagement",
    title: "Déménagement",
    short:
      "Transport sécurisé de meubles, électroménager et effets personnels.",
    details: [
      "Service pour particuliers et professionnels.",
      "Matériel de protection et manutention soignée.",
      "Du studio au grand volume, avec ou sans hayon.",
    ],
    icon: "Sofa",
    accent: "from-brand-500/15 to-brand-700/15",
  },
  {
    id: "transport-urgent",
    title: "Transport urgent instantané",
    short:
      "Prise en charge immédiate de vos marchandises avec départ direct sans rupture de charge.",
    details: [
      "Course dédiée : votre marchandise ne quitte jamais le véhicule.",
      "Disponibilité réactive, 7j/7.",
      "Traçabilité de bout en bout.",
    ],
    icon: "Zap",
    accent: "from-gold-400/15 to-gold-600/15",
  },
  {
    id: "transport-vehicule",
    title: "Transport de véhicule",
    short:
      "Transport de voitures, motos et véhicules utilitaires partout en France et à l'international.",
    details: [
      "Acheminement sécurisé, assuré et tracé.",
      "Solutions pour particuliers, garages et professionnels.",
      "France entière et international.",
    ],
    icon: "Car",
    accent: "from-brand-500/15 to-brand-700/15",
  },
  {
    id: "transport-logistique",
    title: "Transport logistique",
    short:
      "Gestion des tournées, livraisons régulières et distribution professionnelle.",
    details: [
      "Tournées planifiées et optimisées.",
      "Sous-traitance logistique sur-mesure.",
      "Distribution régionale et nationale.",
    ],
    icon: "Warehouse",
    accent: "from-gold-400/15 to-gold-600/15",
  },
];

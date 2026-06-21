export type Sector = {
  id: string;
  title: string;
  icon: "HeartPulse" | "Factory" | "Network" | "Briefcase" | "Users";
  points: string[];
};

export const sectors: Sector[] = [
  {
    id: "sante",
    title: "Santé et laboratoires",
    icon: "HeartPulse",
    points: [
      "Transport de prélèvements",
      "Transport de matériel médical",
      "Livraison sécurisée",
      "Respect des protocoles",
    ],
  },
  {
    id: "industrie",
    title: "Industrie",
    icon: "Factory",
    points: [
      "Livraison de pièces",
      "Approvisionnement des sites industriels",
      "Transport urgent de composants",
    ],
  },
  {
    id: "logistique",
    title: "Logistique et transport",
    icon: "Network",
    points: [
      "Sous-traitance logistique",
      "Organisation de tournées",
      "Distribution régionale et nationale",
    ],
  },
  {
    id: "professionnels",
    title: "Professionnels",
    icon: "Briefcase",
    points: ["Livraisons B2B", "Documents urgents", "Marchandises diverses"],
  },
  {
    id: "particuliers",
    title: "Particuliers",
    icon: "Users",
    points: ["Déménagements", "Transport de meubles", "Livraisons volumineuses"],
  },
];

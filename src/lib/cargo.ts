export type CargoId =
  | "documents"
  | "petit-colis"
  | "colis-moyen"
  | "palette"
  | "meuble"
  | "demenagement";

export type CargoType = {
  id: CargoId;
  label: string;
  /** Poids estimé d'une unité (kg). */
  weightKg: number;
  /** Volume estimé d'une unité (litres). */
  volumeL: number;
  hint: string;
  icon: "FileText" | "Package" | "Boxes" | "Layers" | "Sofa" | "Home";
};

export const cargoTypes: CargoType[] = [
  {
    id: "documents",
    label: "Documents",
    weightKg: 0.5,
    volumeL: 3,
    hint: "Plis, contrats, dossiers",
    icon: "FileText",
  },
  {
    id: "petit-colis",
    label: "Petit colis",
    weightKg: 3,
    volumeL: 20,
    hint: "Jusqu'à la taille d'un carton à chaussures",
    icon: "Package",
  },
  {
    id: "colis-moyen",
    label: "Colis moyen",
    weightKg: 10,
    volumeL: 60,
    hint: "Carton standard, matériel informatique",
    icon: "Boxes",
  },
  {
    id: "palette",
    label: "Palette",
    weightKg: 300,
    volumeL: 1500,
    hint: "Palette Europe (80 × 120 cm)",
    icon: "Layers",
  },
  {
    id: "meuble",
    label: "Meuble",
    weightKg: 80,
    volumeL: 2000,
    hint: "Canapé, armoire, électroménager",
    icon: "Sofa",
  },
  {
    id: "demenagement",
    label: "Déménagement complet",
    weightKg: 900,
    volumeL: 20000,
    hint: "Logement entier (T2/T3)",
    icon: "Home",
  },
];

export const cargoById: Record<CargoId, CargoType> = cargoTypes.reduce(
  (acc, c) => {
    acc[c.id] = c;
    return acc;
  },
  {} as Record<CargoId, CargoType>,
);

export type VehicleId =
  | "moto125"
  | "moto1200"
  | "trafic"
  | "boxer"
  | "master"
  | "hayon20";

export type Vehicle = {
  id: VehicleId;
  name: string;
  category: "Moto" | "Utilitaire" | "Camion";
  /** Nom de l'icône Lucide associée. */
  icon: "Bike" | "Truck" | "Package";
  tagline: string;
  description: string;
  /** Capacités maximales utilisées par la validation intelligente. */
  capacity: {
    maxWeightKg: number;
    /** Volume utile maximal exprimé en litres (1 m³ = 1000 L). */
    maxVolumeL: number;
    /** Distance maximale en km (null = pas de limite de distance). */
    maxDistanceKm: number | null;
  };
  /** Moteur tarifaire : prix = base + perKm × distance. */
  pricing: {
    base: number;
    perKm: number;
  };
  advantages: string[];
  uses: string[];
  /** Texte des limites affiché sur la fiche véhicule. */
  limits: string;
};

export const vehicles: Vehicle[] = [
  {
    id: "moto125",
    name: "Moto 125 cc",
    category: "Moto",
    icon: "Bike",
    tagline: "L'express intra-muros",
    description:
      "Parfaite pour les documents, petits colis et livraisons en cœur de ville. Rapidité exceptionnelle, évite les embouteillages, solution économique.",
    capacity: { maxWeightKg: 10, maxVolumeL: 40, maxDistanceKm: 30 },
    pricing: { base: 15, perKm: 1.1 },
    advantages: [
      "Rapidité exceptionnelle",
      "Évite les embouteillages",
      "Livraison économique",
    ],
    uses: ["Documents", "Petits colis", "Livraison intra-muros Paris"],
    limits: "Maximum 10 kg · 40 litres de volume · 30 km. Au-delà, véhicule indisponible.",
  },
  {
    id: "moto1200",
    name: "Moto 1200 cc",
    category: "Moto",
    icon: "Bike",
    tagline: "L'express régional",
    description:
      "Conçue pour les livraisons express régionales. Très rapide, grande autonomie, idéale pour les envois urgents sur moyenne distance.",
    capacity: { maxWeightKg: 20, maxVolumeL: 60, maxDistanceKm: 150 },
    pricing: { base: 25, perKm: 1.3 },
    advantages: ["Très rapide", "Grande autonomie", "Livraison urgente"],
    uses: ["Plis urgents", "Colis légers", "Express régional"],
    limits: "Maximum 20 kg · 60 litres · 150 km.",
  },
  {
    id: "trafic",
    name: "Utilitaire type Trafic",
    category: "Utilitaire",
    icon: "Truck",
    tagline: "Le polyvalent du quotidien",
    description:
      "Volume jusqu'à 6 m³ et 1 000 kg. Idéal pour les colis volumineux et les petits déménagements.",
    capacity: { maxWeightKg: 1000, maxVolumeL: 6000, maxDistanceKm: null },
    pricing: { base: 35, perKm: 1.6 },
    advantages: ["Maniable en ville", "Chargement rapide", "Excellent rapport volume/prix"],
    uses: ["Colis volumineux", "Petits déménagements", "Approvisionnement"],
    limits: "Jusqu'à 6 m³ · 1 000 kg.",
  },
  {
    id: "boxer",
    name: "Utilitaire type Boxer",
    category: "Utilitaire",
    icon: "Truck",
    tagline: "Le grand volume agile",
    description:
      "Volume jusqu'à 14 m³ et 1 500 kg. Conçu pour les déménagements moyens et le transport professionnel.",
    capacity: { maxWeightKg: 1500, maxVolumeL: 14000, maxDistanceKm: null },
    pricing: { base: 45, perKm: 1.9 },
    advantages: ["Grand volume", "Polyvalent", "Confort de chargement"],
    uses: ["Déménagements moyens", "Transport professionnel", "Mobilier"],
    limits: "Jusqu'à 14 m³ · 1 500 kg.",
  },
  {
    id: "master",
    name: "Utilitaire type Master",
    category: "Utilitaire",
    icon: "Truck",
    tagline: "Le maxi-volume",
    description:
      "Volume jusqu'à 17 m³ et 1 700 kg. Pensé pour les gros déménagements et le transport logistique.",
    capacity: { maxWeightKg: 1700, maxVolumeL: 17000, maxDistanceKm: null },
    pricing: { base: 55, perKm: 2.2 },
    advantages: ["Très grand volume", "Robuste", "Idéal longues distances"],
    uses: ["Gros déménagements", "Transport logistique", "Distribution"],
    limits: "Jusqu'à 17 m³ · 1 700 kg.",
  },
  {
    id: "hayon20",
    name: "Camion 20 m³ avec hayon",
    category: "Camion",
    icon: "Package",
    tagline: "La puissance avec hayon élévateur",
    description:
      "Volume jusqu'à 20 m³ et 1 000 à 1 200 kg. Pour meubles lourds, machines et palettes. Chargement facilité grâce au hayon et sécurité renforcée.",
    capacity: { maxWeightKg: 1200, maxVolumeL: 20000, maxDistanceKm: null },
    pricing: { base: 80, perKm: 2.8 },
    advantages: [
      "Chargement facilité grâce au hayon",
      "Sécurité renforcée",
      "Idéal charges lourdes",
    ],
    uses: ["Meubles lourds", "Machines", "Palettes"],
    limits: "Jusqu'à 20 m³ · 1 000 à 1 200 kg.",
  },
];

export const vehiclesById: Record<VehicleId, Vehicle> = vehicles.reduce(
  (acc, v) => {
    acc[v.id] = v;
    return acc;
  },
  {} as Record<VehicleId, Vehicle>,
);

export function getVehicle(id: VehicleId): Vehicle {
  return vehiclesById[id];
}

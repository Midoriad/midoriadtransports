import { cargoById, type CargoId } from "./cargo";
import { getVehicle, type Vehicle, type VehicleId } from "./vehicles";

/** Majorations appliquées au tarif de base (en pourcentage). */
export const SURCHARGES = {
  urgence: { label: "Urgence (départ immédiat)", rate: 0.25 },
  nuit: { label: "Nuit (22h – 6h)", rate: 0.2 },
  weekend: { label: "Week-end / jour férié", rate: 0.15 },
} as const;

export type SurchargeKey = keyof typeof SURCHARGES;

/** Estimation indicative des péages : ~0,09 €/km sur la portion > 40 km. */
export function estimateTolls(distanceKm: number): number {
  const autorouteKm = Math.max(0, distanceKm - 40);
  return Math.round(autorouteKm * 0.09 * 100) / 100;
}

export type CargoSelection = { id: CargoId; quantity: number };

export type CargoTotals = { weightKg: number; volumeL: number };

export function computeCargoTotals(selection: CargoSelection[]): CargoTotals {
  return selection.reduce<CargoTotals>(
    (acc, item) => {
      const cargo = cargoById[item.id];
      if (!cargo) return acc;
      const qty = Math.max(0, item.quantity);
      acc.weightKg += cargo.weightKg * qty;
      acc.volumeL += cargo.volumeL * qty;
      return acc;
    },
    { weightKg: 0, volumeL: 0 },
  );
}

export type CompatibilityResult = {
  ok: boolean;
  reasons: string[];
  /** Véhicule(s) recommandé(s) si incompatibilité. */
  suggestion?: VehicleId;
};

/**
 * Validation intelligente : vérifie poids, volume et distance.
 */
export function checkCompatibility(
  vehicleId: VehicleId,
  totals: CargoTotals,
  distanceKm: number,
): CompatibilityResult {
  const vehicle = getVehicle(vehicleId);
  const reasons: string[] = [];
  const { maxWeightKg, maxVolumeL, maxDistanceKm } = vehicle.capacity;

  if (totals.weightKg > maxWeightKg) {
    reasons.push(
      `Poids estimé ${Math.round(totals.weightKg)} kg > maximum ${maxWeightKg} kg.`,
    );
  }
  if (totals.volumeL > maxVolumeL) {
    reasons.push(
      `Volume estimé ${formatVolume(totals.volumeL)} > maximum ${formatVolume(maxVolumeL)}.`,
    );
  }
  if (maxDistanceKm !== null && distanceKm > maxDistanceKm) {
    reasons.push(
      `Distance ${Math.round(distanceKm)} km > maximum ${maxDistanceKm} km pour ce véhicule.`,
    );
  }

  if (reasons.length === 0) return { ok: true, reasons: [] };

  const suggestion = suggestVehicle(totals, distanceKm);
  return { ok: false, reasons, suggestion };
}

/** Renvoie le plus petit véhicule (par volume) capable de transporter la charge. */
export function suggestVehicle(
  totals: CargoTotals,
  distanceKm: number,
): VehicleId | undefined {
  const ordered = [...listVehiclesByCapacity()];
  const match = ordered.find((v) => {
    const okWeight = totals.weightKg <= v.capacity.maxWeightKg;
    const okVolume = totals.volumeL <= v.capacity.maxVolumeL;
    const okDistance =
      v.capacity.maxDistanceKm === null || distanceKm <= v.capacity.maxDistanceKm;
    return okWeight && okVolume && okDistance;
  });
  return match?.id;
}

function listVehiclesByCapacity(): Vehicle[] {
  return [
    getVehicle("moto125"),
    getVehicle("moto1200"),
    getVehicle("trafic"),
    getVehicle("boxer"),
    getVehicle("master"),
    getVehicle("hayon20"),
  ];
}

export type QuoteInput = {
  vehicleId: VehicleId;
  distanceKm: number;
  durationMin?: number;
  surcharges?: SurchargeKey[];
  /** Montant de péages à inclure (réel ou estimé). */
  tolls?: number;
};

export type QuoteBreakdown = {
  base: number;
  distance: number;
  subtotal: number;
  surcharges: { key: SurchargeKey; label: string; amount: number }[];
  surchargesTotal: number;
  tolls: number;
  total: number;
};

/**
 * Moteur de calcul tarifaire.
 * Prix = (base + perKm × distance) × (1 + Σ majorations) + péages.
 * Les coûts d'exploitation (carburant, usure, assurance, charges, main d'œuvre,
 * marge) sont intégrés au forfait de base et au tarif kilométrique de chaque véhicule.
 */
export function computeQuote(input: QuoteInput): QuoteBreakdown {
  const vehicle = getVehicle(input.vehicleId);
  const distanceKm = Math.max(0, input.distanceKm);

  const base = vehicle.pricing.base;
  const distance = round2(vehicle.pricing.perKm * distanceKm);
  const subtotal = round2(base + distance);

  const surcharges = (input.surcharges ?? []).map((key) => ({
    key,
    label: SURCHARGES[key].label,
    amount: round2(subtotal * SURCHARGES[key].rate),
  }));
  const surchargesTotal = round2(
    surcharges.reduce((sum, s) => sum + s.amount, 0),
  );

  const tolls = round2(Math.max(0, input.tolls ?? 0));
  const total = round2(subtotal + surchargesTotal + tolls);

  return {
    base,
    distance,
    subtotal,
    surcharges,
    surchargesTotal,
    tolls,
    total,
  };
}

export function round2(n: number): number {
  return Math.round((n + Number.EPSILON) * 100) / 100;
}

export function formatEUR(n: number): string {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
  }).format(n);
}

export function formatVolume(liters: number): string {
  if (liters >= 1000) {
    return `${round2(liters / 1000)} m³`;
  }
  return `${Math.round(liters)} L`;
}

export function formatDuration(minutes: number): string {
  const m = Math.round(minutes);
  if (m < 60) return `${m} min`;
  const h = Math.floor(m / 60);
  const rest = m % 60;
  return rest === 0 ? `${h} h` : `${h} h ${rest.toString().padStart(2, "0")}`;
}

import Link from "next/link";
import { ArrowRight, Check, Gauge, Weight, Box, Ruler } from "lucide-react";
import { Media } from "./Media";
import { Reveal } from "./Reveal";
import { formatEUR, formatVolume } from "@/lib/pricing";
import type { Vehicle } from "@/lib/vehicles";

export function VehicleCard({ vehicle, index = 0 }: { vehicle: Vehicle; index?: number }) {
  const { capacity, pricing } = vehicle;
  const specs = [
    { icon: Weight, label: "Poids max", value: `${capacity.maxWeightKg} kg` },
    { icon: Box, label: "Volume max", value: formatVolume(capacity.maxVolumeL) },
    {
      icon: Ruler,
      label: "Distance",
      value: capacity.maxDistanceKm ? `${capacity.maxDistanceKm} km max` : "Sans limite",
    },
  ];

  return (
    <Reveal delay={index} as="article">
      <div className="card flex h-full flex-col overflow-hidden">
        <div className="relative">
          <Media
            alt={`${vehicle.name} — Midoriad Transports`}
            icon={vehicle.icon}
            label={vehicle.name}
            rounded="rounded-none"
            className="h-56 w-full"
          />
          <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-brand-700 backdrop-blur">
            {vehicle.category}
          </span>
          <span className="absolute right-4 top-4 rounded-full bg-ink/80 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
            dès {formatEUR(pricing.base)}
          </span>
        </div>

        <div className="flex flex-1 flex-col p-6">
          <h3 className="text-xl font-bold text-ink">{vehicle.name}</h3>
          <p className="mt-1 text-sm font-medium text-brand-700">{vehicle.tagline}</p>
          <p className="mt-3 text-sm leading-relaxed text-ink/65">
            {vehicle.description}
          </p>

          <dl className="mt-5 grid grid-cols-3 gap-2">
            {specs.map((s) => (
              <div
                key={s.label}
                className="rounded-xl border border-ink/10 bg-brand-50/40 p-3 text-center"
              >
                <s.icon className="mx-auto h-4 w-4 text-brand-600" />
                <dt className="mt-1 text-[0.65rem] uppercase tracking-wide text-ink/50">
                  {s.label}
                </dt>
                <dd className="text-xs font-bold text-ink">{s.value}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-ink/50">
                Parfait pour
              </p>
              <ul className="mt-2 space-y-1.5">
                {vehicle.uses.map((u) => (
                  <li key={u} className="flex items-start gap-2 text-sm text-ink/70">
                    <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-600" />
                    {u}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-ink/50">
                Avantages
              </p>
              <ul className="mt-2 space-y-1.5">
                {vehicle.advantages.map((a) => (
                  <li key={a} className="flex items-start gap-2 text-sm text-ink/70">
                    <Gauge className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold-500" />
                    {a}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-5 rounded-xl bg-ink/5 px-4 py-3 text-xs text-ink/60">
            <span className="font-semibold text-ink/75">Limites :</span> {vehicle.limits}
          </div>

          <div className="mt-6 flex items-center justify-between gap-3 border-t border-ink/10 pt-5">
            <p className="text-sm text-ink/60">
              <span className="font-bold text-ink">{formatEUR(pricing.base)}</span>{" "}
              + {formatEUR(pricing.perKm)}/km
            </p>
            <Link
              href={`/commande?vehicle=${vehicle.id}`}
              className="btn-primary text-sm"
            >
              Choisir ce mode de transport
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

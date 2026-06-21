"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import {
  AlertTriangle,
  ArrowRight,
  Check,
  Loader2,
  MapPin,
  Route as RouteIcon,
  Timer,
  Wand2,
} from "lucide-react";
import { AddressInput } from "./AddressInput";
import { Icon } from "@/components/Icon";
import { getRoute, type GeoPoint, type RouteResult } from "@/lib/geo";
import { vehicles, vehiclesById, type VehicleId } from "@/lib/vehicles";
import { cargoTypes, type CargoId } from "@/lib/cargo";
import {
  checkCompatibility,
  computeCargoTotals,
  computeQuote,
  estimateTolls,
  formatDuration,
  formatEUR,
  formatVolume,
  SURCHARGES,
  type SurchargeKey,
} from "@/lib/pricing";

const MapRoute = dynamic(() => import("./MapRoute"), {
  ssr: false,
  loading: () => (
    <div className="grid h-full min-h-[320px] place-items-center bg-brand-50/50 text-sm text-ink/50">
      <span className="inline-flex items-center gap-2">
        <Loader2 className="h-4 w-4 animate-spin" /> Chargement de la carte…
      </span>
    </div>
  ),
});

type ContactInfo = {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  notes: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function OrderConfigurator({
  initialVehicle,
}: {
  initialVehicle?: VehicleId;
}) {
  const [vehicleId, setVehicleId] = useState<VehicleId | null>(
    initialVehicle ?? null,
  );
  const [from, setFrom] = useState<GeoPoint | null>(null);
  const [to, setTo] = useState<GeoPoint | null>(null);
  const [route, setRoute] = useState<RouteResult | null>(null);
  const [routeLoading, setRouteLoading] = useState(false);
  const [routeError, setRouteError] = useState<string | null>(null);

  const [quantities, setQuantities] = useState<Record<CargoId, number>>(
    {} as Record<CargoId, number>,
  );
  const [surcharges, setSurcharges] = useState<Set<SurchargeKey>>(new Set());
  const [tolls, setTolls] = useState(0);
  const [tollsTouched, setTollsTouched] = useState(false);

  const [contact, setContact] = useState<ContactInfo>({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    notes: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitOk, setSubmitOk] = useState<boolean | null>(null);
  const startedAt = useRef(Date.now());

  // ── Calcul d'itinéraire ──
  useEffect(() => {
    if (!from || !to) {
      setRoute(null);
      setRouteError(null);
      return;
    }
    const controller = new AbortController();
    setRouteLoading(true);
    setRouteError(null);
    getRoute(from, to, controller.signal)
      .then((r) => setRoute(r))
      .catch((e: unknown) => {
        if ((e as Error).name !== "AbortError") {
          setRoute(null);
          setRouteError(
            "Impossible de calculer l'itinéraire. Vérifiez les adresses et réessayez.",
          );
        }
      })
      .finally(() => setRouteLoading(false));
    return () => controller.abort();
  }, [from, to]);

  const distanceKm = route?.distanceKm ?? 0;

  // Estimation automatique des péages tant que l'utilisateur n'a pas saisi de valeur.
  useEffect(() => {
    if (!tollsTouched) setTolls(estimateTolls(distanceKm));
  }, [distanceKm, tollsTouched]);

  const cargoSelection = useMemo(
    () =>
      (Object.entries(quantities) as [CargoId, number][])
        .filter(([, q]) => q > 0)
        .map(([id, quantity]) => ({ id, quantity })),
    [quantities],
  );

  const totals = useMemo(
    () => computeCargoTotals(cargoSelection),
    [cargoSelection],
  );

  const compatibility = useMemo(
    () => (vehicleId ? checkCompatibility(vehicleId, totals, distanceKm) : null),
    [vehicleId, totals, distanceKm],
  );

  const quote = useMemo(() => {
    if (!vehicleId || !route) return null;
    return computeQuote({
      vehicleId,
      distanceKm,
      durationMin: route.durationMin,
      surcharges: [...surcharges],
      tolls,
    });
  }, [vehicleId, route, distanceKm, surcharges, tolls]);

  const canSubmit =
    !!vehicleId &&
    !!route &&
    !!compatibility?.ok &&
    contact.name.trim().length > 1 &&
    EMAIL_RE.test(contact.email) &&
    contact.phone.trim().length >= 6 &&
    !submitting;

  function setQty(id: CargoId, q: number) {
    setQuantities((prev) => ({ ...prev, [id]: Math.max(0, q) }));
  }

  function toggleSurcharge(key: SurchargeKey) {
    setSurcharges((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }

  async function submit() {
    if (!canSubmit || !vehicleId || !route || !quote) return;
    setSubmitting(true);
    setSubmitOk(null);
    try {
      const res = await fetch("/api/commande", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          _t: startedAt.current,
          vehicle: vehiclesById[vehicleId].name,
          from: from?.label,
          to: to?.label,
          distanceKm: Math.round(distanceKm * 10) / 10,
          durationMin: Math.round(route.durationMin),
          cargo: cargoSelection.map((c) => {
            const t = cargoTypes.find((x) => x.id === c.id);
            return { label: t?.label, quantity: c.quantity };
          }),
          weightKg: Math.round(totals.weightKg),
          volume: formatVolume(totals.volumeL),
          surcharges: [...surcharges].map((s) => SURCHARGES[s].label),
          tolls,
          total: quote.total,
          contact,
        }),
      });
      setSubmitOk(res.ok);
    } catch {
      setSubmitOk(false);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1.55fr_1fr]">
      <div className="space-y-8">
        {/* ÉTAPE 1 — Véhicule */}
        <StepCard step={1} title="Choix du véhicule" icon="Truck">
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {vehicles.map((v) => {
              const active = v.id === vehicleId;
              return (
                <button
                  key={v.id}
                  type="button"
                  onClick={() => setVehicleId(v.id)}
                  className={`flex items-start gap-3 rounded-2xl border p-4 text-left transition-all ${
                    active
                      ? "border-brand-500 bg-brand-50 ring-2 ring-brand-500/30"
                      : "border-ink/12 bg-white hover:border-brand-300 hover:bg-brand-50/40"
                  }`}
                >
                  <span
                    className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl ${
                      active ? "bg-brand-600 text-white" : "bg-brand-50 text-brand-700"
                    }`}
                  >
                    <Icon name={v.icon} className="h-5 w-5" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm font-bold text-ink">{v.name}</span>
                    <span className="block text-xs text-ink/55">
                      {v.capacity.maxWeightKg} kg · {formatVolume(v.capacity.maxVolumeL)}
                    </span>
                    <span className="mt-1 block text-xs font-semibold text-brand-700">
                      dès {formatEUR(v.pricing.base)} + {formatEUR(v.pricing.perKm)}/km
                    </span>
                  </span>
                  {active ? (
                    <Check className="ml-auto h-5 w-5 shrink-0 text-brand-600" />
                  ) : null}
                </button>
              );
            })}
          </div>
        </StepCard>

        {/* ÉTAPE 2 — Itinéraire */}
        <StepCard step={2} title="Adresses & itinéraire" icon="MapPin">
          <div className="grid gap-4 sm:grid-cols-2">
            <AddressInput
              id="addr-from"
              badge="A"
              label="Adresse de départ"
              placeholder="N°, rue, code postal, ville"
              value={from}
              onSelect={setFrom}
            />
            <AddressInput
              id="addr-to"
              badge="B"
              label="Adresse d'arrivée"
              placeholder="N°, rue, code postal, ville"
              value={to}
              onSelect={setTo}
            />
          </div>

          <div className="mt-4 overflow-hidden rounded-2xl border border-ink/10">
            <div className="h-72">
              <MapRoute
                from={from}
                to={to}
                geometry={route?.geometry ?? null}
              />
            </div>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-ink/10 bg-brand-50/40 px-4 py-3 text-sm">
              {routeLoading ? (
                <span className="inline-flex items-center gap-2 text-ink/60">
                  <Loader2 className="h-4 w-4 animate-spin" /> Calcul de l'itinéraire…
                </span>
              ) : route ? (
                <>
                  <span className="inline-flex items-center gap-2 font-semibold text-ink">
                    <RouteIcon className="h-4 w-4 text-brand-600" />
                    {distanceKm.toFixed(1)} km
                  </span>
                  <span className="inline-flex items-center gap-2 font-semibold text-ink">
                    <Timer className="h-4 w-4 text-brand-600" />
                    {formatDuration(route.durationMin)}
                  </span>
                </>
              ) : (
                <span className="inline-flex items-center gap-2 text-ink/55">
                  <MapPin className="h-4 w-4" /> Renseignez les deux adresses pour
                  calculer la distance.
                </span>
              )}
            </div>
          </div>
          {routeError ? (
            <p className="mt-3 text-sm font-medium text-red-600">{routeError}</p>
          ) : null}
        </StepCard>

        {/* ÉTAPE 3 — Volume */}
        <StepCard step={3} title="Volume à transporter" icon="Boxes">
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {cargoTypes.map((c) => {
              const qty = quantities[c.id] ?? 0;
              return (
                <div
                  key={c.id}
                  className={`rounded-2xl border p-4 transition-colors ${
                    qty > 0 ? "border-brand-400 bg-brand-50/60" : "border-ink/12 bg-white"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-700">
                      <Icon name={c.icon} className="h-5 w-5" />
                    </span>
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-ink">{c.label}</p>
                      <p className="text-xs text-ink/55">{c.hint}</p>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-xs text-ink/50">
                      ≈ {c.weightKg} kg · {formatVolume(c.volumeL)}
                    </span>
                    <Stepper value={qty} onChange={(v) => setQty(c.id, v)} />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-4 flex flex-wrap gap-x-6 gap-y-1 rounded-xl bg-ink/5 px-4 py-3 text-sm text-ink/70">
            <span>
              Poids estimé : <strong className="text-ink">{Math.round(totals.weightKg)} kg</strong>
            </span>
            <span>
              Volume estimé :{" "}
              <strong className="text-ink">{formatVolume(totals.volumeL)}</strong>
            </span>
          </div>

          {/* Validation intelligente */}
          {vehicleId && compatibility && !compatibility.ok ? (
            <div className="mt-4 rounded-2xl border border-red-200 bg-red-50 p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-red-600" />
                <div className="text-sm">
                  <p className="font-bold text-red-700">
                    Le volume sélectionné n'est pas compatible avec ce véhicule.
                  </p>
                  <p className="mt-1 text-red-700/80">
                    Veuillez sélectionner un véhicule plus adapté.
                  </p>
                  <ul className="mt-2 list-disc space-y-0.5 pl-5 text-red-700/70">
                    {compatibility.reasons.map((r) => (
                      <li key={r}>{r}</li>
                    ))}
                  </ul>
                  {compatibility.suggestion ? (
                    <button
                      type="button"
                      onClick={() => setVehicleId(compatibility.suggestion!)}
                      className="mt-3 inline-flex items-center gap-2 rounded-full bg-brand-600 px-4 py-2 text-xs font-semibold text-white hover:bg-brand-700"
                    >
                      <Wand2 className="h-3.5 w-3.5" />
                      Choisir : {vehiclesById[compatibility.suggestion].name}
                    </button>
                  ) : (
                    <p className="mt-2 text-xs font-medium text-red-700">
                      Aucun véhicule standard ne couvre ce volume — contactez-nous pour
                      une solution sur mesure.
                    </p>
                  )}
                </div>
              </div>
            </div>
          ) : null}
        </StepCard>

        {/* ÉTAPE 4 — Options & coordonnées */}
        <StepCard step={4} title="Options & coordonnées" icon="Zap">
          <p className="text-sm font-semibold text-ink">Majorations</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {(Object.keys(SURCHARGES) as SurchargeKey[]).map((key) => {
              const active = surcharges.has(key);
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => toggleSurcharge(key)}
                  className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                    active
                      ? "border-gold-500 bg-gold-500 text-ink"
                      : "border-ink/15 bg-white text-ink/70 hover:border-gold-400"
                  }`}
                >
                  {SURCHARGES[key].label}
                </button>
              );
            })}
          </div>

          <div className="mt-4 max-w-xs">
            <label htmlFor="tolls" className="mb-1.5 block text-sm font-semibold text-ink">
              Péages (€){" "}
              <span className="font-normal text-ink/50">— estimation, modifiable</span>
            </label>
            <input
              id="tolls"
              type="number"
              min={0}
              step="0.5"
              value={tolls}
              onChange={(e) => {
                setTollsTouched(true);
                setTolls(Math.max(0, Number(e.target.value)));
              }}
              className="w-full rounded-xl border border-ink/15 bg-white px-4 py-3 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/30"
            />
          </div>

          <div className="mt-6 grid gap-4 border-t border-ink/10 pt-6 sm:grid-cols-2">
            <Field
              id="c-name"
              label="Nom complet"
              value={contact.name}
              onChange={(v) => setContact((c) => ({ ...c, name: v }))}
              required
            />
            <Field
              id="c-email"
              label="Email"
              type="email"
              value={contact.email}
              onChange={(v) => setContact((c) => ({ ...c, email: v }))}
              required
            />
            <Field
              id="c-phone"
              label="Téléphone"
              type="tel"
              value={contact.phone}
              onChange={(v) => setContact((c) => ({ ...c, phone: v }))}
              required
            />
            <div className="grid grid-cols-2 gap-3">
              <Field
                id="c-date"
                label="Date souhaitée"
                type="date"
                value={contact.date}
                onChange={(v) => setContact((c) => ({ ...c, date: v }))}
              />
              <Field
                id="c-time"
                label="Heure"
                type="time"
                value={contact.time}
                onChange={(v) => setContact((c) => ({ ...c, time: v }))}
              />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="c-notes" className="mb-1.5 block text-sm font-semibold text-ink">
                Précisions (étage, accès, fragile…)
              </label>
              <textarea
                id="c-notes"
                rows={3}
                value={contact.notes}
                onChange={(e) => setContact((c) => ({ ...c, notes: e.target.value }))}
                className="w-full rounded-xl border border-ink/15 bg-white px-4 py-3 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/30"
              />
            </div>
          </div>
        </StepCard>
      </div>

      {/* Récapitulatif tarifaire — sticky */}
      <aside className="lg:sticky lg:top-24 lg:self-start">
        <PriceSummary
          vehicleName={vehicleId ? vehiclesById[vehicleId].name : null}
          route={route}
          quote={quote}
          compatibility={compatibility}
          canSubmit={canSubmit}
          submitting={submitting}
          submitOk={submitOk}
          onSubmit={submit}
        />
      </aside>
    </div>
  );
}

/* ── Sous-composants ── */

function StepCard({
  step,
  title,
  icon,
  children,
}: {
  step: number;
  title: string;
  icon: Parameters<typeof Icon>[0]["name"];
  children: React.ReactNode;
}) {
  return (
    <section className="card p-6 sm:p-7">
      <div className="mb-5 flex items-center gap-3">
        <span className="grid h-9 w-9 place-items-center rounded-full bg-brand-600 text-sm font-bold text-white">
          {step}
        </span>
        <h3 className="flex items-center gap-2 text-lg font-bold text-ink">
          <Icon name={icon} className="h-5 w-5 text-brand-600" />
          {title}
        </h3>
      </div>
      {children}
    </section>
  );
}

function Stepper({
  value,
  onChange,
}: {
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="inline-flex items-center rounded-full border border-ink/15 bg-white">
      <button
        type="button"
        aria-label="Diminuer"
        onClick={() => onChange(value - 1)}
        className="grid h-8 w-8 place-items-center rounded-full text-ink/60 hover:text-brand-700"
      >
        −
      </button>
      <span className="w-6 text-center text-sm font-bold text-ink">{value}</span>
      <button
        type="button"
        aria-label="Augmenter"
        onClick={() => onChange(value + 1)}
        className="grid h-8 w-8 place-items-center rounded-full text-ink/60 hover:text-brand-700"
      >
        +
      </button>
    </div>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  type = "text",
  required = false,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-ink">
        {label} {required ? <span className="text-brand-600">*</span> : null}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        required={required}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-ink/15 bg-white px-4 py-3 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/30"
      />
    </div>
  );
}

function PriceSummary({
  vehicleName,
  route,
  quote,
  compatibility,
  canSubmit,
  submitting,
  submitOk,
  onSubmit,
}: {
  vehicleName: string | null;
  route: RouteResult | null;
  quote: ReturnType<typeof computeQuote> | null;
  compatibility: ReturnType<typeof checkCompatibility> | null;
  canSubmit: boolean;
  submitting: boolean;
  submitOk: boolean | null;
  onSubmit: () => void;
}) {
  return (
    <div className="card overflow-hidden">
      <div className="bg-mesh p-6 text-white">
        <p className="text-sm font-semibold uppercase tracking-widest text-white/70">
          Estimation en temps réel
        </p>
        <p className="mt-2 font-display text-4xl font-extrabold">
          {quote ? formatEUR(quote.total) : "—"}
        </p>
        <p className="mt-1 text-sm text-white/65">
          {vehicleName ?? "Sélectionnez un véhicule"} · TTC indicatif
        </p>
      </div>

      <div className="space-y-3 p-6">
        {quote ? (
          <dl className="space-y-2.5 text-sm">
            <Row label="Forfait de base" value={formatEUR(quote.base)} />
            <Row
              label={`Distance${route ? ` (${route.distanceKm.toFixed(1)} km)` : ""}`}
              value={formatEUR(quote.distance)}
            />
            {quote.surcharges.map((s) => (
              <Row key={s.key} label={s.label} value={`+ ${formatEUR(s.amount)}`} muted />
            ))}
            {quote.tolls > 0 ? (
              <Row label="Péages (estim.)" value={`+ ${formatEUR(quote.tolls)}`} muted />
            ) : null}
            <div className="my-2 border-t border-ink/10" />
            <Row label="Total estimé" value={formatEUR(quote.total)} strong />
          </dl>
        ) : (
          <p className="text-sm text-ink/55">
            Renseignez le véhicule et l'itinéraire pour afficher le tarif détaillé.
          </p>
        )}

        {compatibility && !compatibility.ok ? (
          <p className="flex items-start gap-2 rounded-xl bg-red-50 px-3 py-2 text-xs font-medium text-red-700">
            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
            Véhicule incompatible avec le volume sélectionné.
          </p>
        ) : null}

        <button
          type="button"
          onClick={onSubmit}
          disabled={!canSubmit}
          className="btn-primary w-full text-base"
        >
          {submitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Envoi…
            </>
          ) : (
            <>
              Valider ma commande <ArrowRight className="h-4 w-4" />
            </>
          )}
        </button>

        {submitOk === true ? (
          <p className="flex items-start gap-2 rounded-xl bg-brand-50 px-3 py-2.5 text-sm font-medium text-brand-700">
            <Check className="mt-0.5 h-4 w-4 shrink-0" />
            Commande envoyée ! Notre équipe vous recontacte rapidement pour confirmer.
          </p>
        ) : null}
        {submitOk === false ? (
          <p className="rounded-xl bg-red-50 px-3 py-2.5 text-sm font-medium text-red-700">
            Une erreur est survenue. Réessayez ou appelez-nous directement.
          </p>
        ) : null}

        <p className="text-center text-xs text-ink/45">
          Estimation indicative — un conseiller confirme le tarif définitif.
        </p>
      </div>
    </div>
  );
}

function Row({
  label,
  value,
  strong = false,
  muted = false,
}: {
  label: string;
  value: string;
  strong?: boolean;
  muted?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <dt className={muted ? "text-ink/55" : "text-ink/70"}>{label}</dt>
      <dd
        className={
          strong ? "font-display text-lg font-extrabold text-ink" : "font-semibold text-ink"
        }
      >
        {value}
      </dd>
    </div>
  );
}

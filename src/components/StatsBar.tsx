import { Globe2, CalendarClock, Timer, Truck } from "lucide-react";
import { Reveal } from "./Reveal";

const stats = [
  { icon: Globe2, value: "National & international", label: "Couverture des livraisons" },
  { icon: CalendarClock, value: "7j/7", label: "Disponibilité du service" },
  { icon: Timer, value: "Réponse rapide", label: "Devis & prise en charge" },
  { icon: Truck, value: "6 véhicules", label: "Adaptés à tous les besoins" },
];

export function StatsBar() {
  return (
    <section className="bg-ink text-white">
      <div className="container-px py-14">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i}>
              <div className="flex items-center gap-4">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-white/10 text-gold-400 ring-1 ring-white/15">
                  <s.icon className="h-6 w-6" />
                </span>
                <div>
                  <p className="font-display text-lg font-bold leading-tight">
                    {s.value}
                  </p>
                  <p className="text-sm text-white/60">{s.label}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

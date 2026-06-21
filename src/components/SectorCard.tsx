import { Check } from "lucide-react";
import { Icon } from "./Icon";
import { Reveal } from "./Reveal";
import type { Sector } from "@/lib/sectors";

export function SectorCard({ sector, index = 0 }: { sector: Sector; index?: number }) {
  return (
    <Reveal delay={index} as="article">
      <div className="card group relative h-full overflow-hidden p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-card">
        <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-brand-50 transition-transform duration-500 group-hover:scale-150" />
        <div className="relative">
          <span className="grid h-14 w-14 place-items-center rounded-2xl bg-brand-600 text-white shadow-soft">
            <Icon name={sector.icon} className="h-7 w-7" />
          </span>
          <h3 className="mt-6 text-xl font-bold text-ink">{sector.title}</h3>
          <ul className="mt-4 space-y-2.5">
            {sector.points.map((p) => (
              <li key={p} className="flex items-start gap-2.5 text-sm text-ink/70">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
                {p}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Reveal>
  );
}

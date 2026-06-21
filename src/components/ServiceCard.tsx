"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, ArrowRight } from "lucide-react";
import { Icon } from "./Icon";
import { Media } from "./Media";
import type { Service } from "@/lib/services";

export function ServiceCard({ service }: { service: Service }) {
  const [open, setOpen] = useState(false);
  const panelId = `service-panel-${service.id}`;

  return (
    <article className="card group flex h-full flex-col overflow-hidden transition-shadow duration-300 hover:shadow-card">
      <Media
        alt={`${service.title} — Midoriad Transports`}
        icon={service.icon}
        label={service.title}
        rounded="rounded-none"
        className="h-48 w-full"
      />

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-50 text-brand-700">
            <Icon name={service.icon} className="h-5 w-5" />
          </span>
          <h3 className="text-lg font-bold text-ink">{service.title}</h3>
        </div>

        <p className="mt-4 text-sm leading-relaxed text-ink/65">{service.short}</p>

        <AnimatePresence initial={false}>
          {open ? (
            <motion.div
              id={panelId}
              key="content"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <ul className="mt-4 space-y-2 border-t border-ink/10 pt-4 text-sm text-ink/70">
                {service.details.map((d) => (
                  <li key={d} className="flex gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
                    {d}
                  </li>
                ))}
              </ul>
            </motion.div>
          ) : null}
        </AnimatePresence>

        <div className="mt-5 flex items-center justify-between gap-3 pt-1">
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls={panelId}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 hover:text-brand-800"
          >
            {open ? "Réduire" : "En savoir plus"}
            <ChevronDown
              className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`}
            />
          </button>
          <Link
            href="/devis"
            className="inline-flex items-center gap-1 text-sm font-medium text-ink/55 transition-colors hover:text-brand-700"
          >
            Devis
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import { MapPin, Loader2 } from "lucide-react";
import { searchAddress, type GeoPoint } from "@/lib/geo";

export function AddressInput({
  id,
  label,
  placeholder,
  value,
  onSelect,
  badge,
}: {
  id: string;
  label: string;
  placeholder: string;
  value: GeoPoint | null;
  onSelect: (point: GeoPoint | null) => void;
  badge: string;
}) {
  const [query, setQuery] = useState(value?.label ?? "");
  const [results, setResults] = useState<GeoPoint[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (value) setQuery(value.label);
  }, [value]);

  useEffect(() => {
    if (query.trim().length < 3 || (value && query === value.label)) {
      setResults([]);
      return;
    }
    const controller = new AbortController();
    setLoading(true);
    const t = setTimeout(async () => {
      try {
        const res = await searchAddress(query, controller.signal);
        setResults(res);
        setOpen(true);
      } catch {
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 450);
    return () => {
      controller.abort();
      clearTimeout(t);
    };
  }, [query, value]);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (boxRef.current && !boxRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <div ref={boxRef} className="relative">
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-ink">
        {label}
      </label>
      <div className="relative">
        <span className="pointer-events-none absolute left-3 top-1/2 grid h-6 w-6 -translate-y-1/2 place-items-center rounded-full bg-brand-600 text-[0.7rem] font-bold text-white">
          {badge}
        </span>
        <input
          id={id}
          type="text"
          autoComplete="off"
          value={query}
          placeholder={placeholder}
          onChange={(e) => {
            setQuery(e.target.value);
            if (value) onSelect(null);
          }}
          onFocus={() => results.length && setOpen(true)}
          className="w-full rounded-xl border border-ink/15 bg-white py-3 pl-12 pr-10 text-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/30"
        />
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-ink/40">
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <MapPin className="h-4 w-4" />
          )}
        </span>
      </div>

      {open && results.length > 0 ? (
        <ul className="absolute z-30 mt-2 max-h-64 w-full overflow-auto rounded-xl border border-ink/10 bg-white p-1.5 shadow-card">
          {results.map((r, i) => (
            <li key={`${r.lat}-${r.lon}-${i}`}>
              <button
                type="button"
                onClick={() => {
                  onSelect(r);
                  setQuery(r.label);
                  setOpen(false);
                }}
                className="flex w-full items-start gap-2 rounded-lg px-3 py-2 text-left text-sm text-ink/80 hover:bg-brand-50"
              >
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
                <span className="line-clamp-2">{r.label}</span>
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

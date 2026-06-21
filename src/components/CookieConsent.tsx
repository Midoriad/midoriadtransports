"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Cookie } from "lucide-react";

const STORAGE_KEY = "midoriad-cookie-consent";

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) setVisible(true);
    } catch {
      /* localStorage indisponible */
    }
  }, []);

  function decide(value: "accepted" | "refused") {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch {
      /* ignore */
    }
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Préférences de cookies"
      className="fixed inset-x-0 bottom-0 z-[60] p-4 sm:p-6"
    >
      <div className="container-px">
        <div className="card flex flex-col gap-4 p-5 shadow-card sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-700">
              <Cookie className="h-5 w-5" />
            </span>
            <p className="text-sm leading-relaxed text-ink/75">
              Nous utilisons des cookies pour améliorer votre expérience et mesurer
              l'audience. Vous pouvez accepter ou refuser les cookies non essentiels.{" "}
              <Link
                href="/politique-cookies"
                className="font-semibold text-brand-700 underline underline-offset-2"
              >
                En savoir plus
              </Link>
              .
            </p>
          </div>
          <div className="flex shrink-0 gap-2">
            <button onClick={() => decide("refused")} className="btn-outline">
              Refuser
            </button>
            <button onClick={() => decide("accepted")} className="btn-primary">
              Accepter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

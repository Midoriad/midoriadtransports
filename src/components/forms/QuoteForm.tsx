"use client";

import { useRef, useState } from "react";
import { Send } from "lucide-react";
import { Input, Textarea, Select, Honeypot, FormStatus, type FormState } from "./Fields";
import { services } from "@/lib/services";
import { vehicles } from "@/lib/vehicles";

export function QuoteForm() {
  const [state, setState] = useState<FormState>("idle");
  const startedAt = useRef(Date.now());

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("submitting");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    try {
      const res = await fetch("/api/devis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, _t: startedAt.current }),
      });
      if (!res.ok) throw new Error();
      setState("success");
      form.reset();
    } catch {
      setState("error");
    }
  }

  return (
    <form onSubmit={onSubmit} className="relative space-y-5">
      <Honeypot />
      <div className="grid gap-5 sm:grid-cols-2">
        <Input id="name" label="Nom / Société" required autoComplete="name" />
        <Input id="email" label="Email" type="email" required autoComplete="email" />
        <Input id="phone" label="Téléphone" type="tel" required autoComplete="tel" />
        <Select
          id="service"
          label="Type de prestation"
          required
          defaultValue=""
          options={[
            { value: "", label: "Sélectionnez…" },
            ...services.map((s) => ({ value: s.title, label: s.title })),
            { value: "Autre", label: "Autre / sur mesure" },
          ]}
        />
        <Input id="pickup" label="Lieu de prise en charge" placeholder="Ville / code postal" />
        <Input id="delivery" label="Lieu de livraison" placeholder="Ville / code postal" />
        <Select
          id="vehicle"
          label="Véhicule pressenti (optionnel)"
          defaultValue=""
          options={[
            { value: "", label: "Je ne sais pas encore" },
            ...vehicles.map((v) => ({ value: v.name, label: v.name })),
          ]}
        />
        <Input id="date" label="Date souhaitée" type="date" />
      </div>
      <Textarea
        id="message"
        label="Détails de votre besoin"
        placeholder="Nature et volume des marchandises, contraintes d'accès, horaires, fréquence…"
        rows={5}
      />

      <FormStatus
        state={state}
        successMsg="Votre demande de devis a bien été envoyée. Nous revenons vers vous très rapidement."
      />

      <button type="submit" disabled={state === "submitting"} className="btn-primary w-full sm:w-auto">
        <Send className="h-4 w-4" />
        {state === "submitting" ? "Envoi en cours…" : "Demander mon devis"}
      </button>
      <p className="text-xs text-ink/45">
        En envoyant ce formulaire, vous acceptez notre politique de confidentialité.
        Vos données ne sont utilisées que pour traiter votre demande.
      </p>
    </form>
  );
}

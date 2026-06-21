"use client";

import { useRef, useState } from "react";
import { Send } from "lucide-react";
import { Input, Textarea, Select, Honeypot, FormStatus, type FormState } from "./Fields";

export function ContactForm() {
  const [state, setState] = useState<FormState>("idle");
  const startedAt = useRef(Date.now());

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("submitting");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    try {
      const res = await fetch("/api/contact", {
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
        <Input id="name" label="Nom complet" required autoComplete="name" />
        <Input id="email" label="Email" type="email" required autoComplete="email" />
        <Input id="phone" label="Téléphone" type="tel" autoComplete="tel" />
        <Select
          id="subject"
          label="Objet"
          required
          defaultValue=""
          options={[
            { value: "", label: "Sélectionnez…" },
            { value: "Demande d'information", label: "Demande d'information" },
            { value: "Devis", label: "Devis" },
            { value: "Commande / course", label: "Commande / course" },
            { value: "Partenariat / sous-traitance", label: "Partenariat / sous-traitance" },
            { value: "Recrutement", label: "Recrutement" },
            { value: "Réclamation", label: "Réclamation" },
            { value: "Autre", label: "Autre" },
          ]}
        />
      </div>
      <Textarea id="message" label="Votre message" required rows={6} />

      <FormStatus
        state={state}
        successMsg="Merci ! Votre message a bien été envoyé. Notre équipe vous répond dans les meilleurs délais."
      />

      <button type="submit" disabled={state === "submitting"} className="btn-primary w-full sm:w-auto">
        <Send className="h-4 w-4" />
        {state === "submitting" ? "Envoi en cours…" : "Envoyer le message"}
      </button>
    </form>
  );
}

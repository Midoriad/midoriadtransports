"use client";

import { useRef, useState } from "react";
import { Send } from "lucide-react";
import {
  Input,
  Textarea,
  Select,
  FileInput,
  Honeypot,
  FormStatus,
  type FormState,
} from "./Fields";

export function ApplicationForm() {
  const [state, setState] = useState<FormState>("idle");
  const [error, setError] = useState<string | undefined>();
  const startedAt = useRef(Date.now());

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("submitting");
    setError(undefined);
    const form = e.currentTarget;
    const fd = new FormData(form);
    fd.append("_t", String(startedAt.current));
    try {
      const res = await fetch("/api/candidature", { method: "POST", body: fd });
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error);
      }
      setState("success");
      form.reset();
    } catch (err) {
      setError((err as Error).message || undefined);
      setState("error");
    }
  }

  return (
    <form onSubmit={onSubmit} className="relative space-y-5">
      <Honeypot />
      <div className="grid gap-5 sm:grid-cols-2">
        <Input id="lastName" label="Nom" required autoComplete="family-name" />
        <Input id="firstName" label="Prénom" required autoComplete="given-name" />
        <Input id="address" label="Adresse" autoComplete="street-address" />
        <Input id="phone" label="Téléphone" type="tel" required autoComplete="tel" />
        <Input id="email" label="Email" type="email" required autoComplete="email" />
        <Select
          id="type"
          label="Type de candidature"
          required
          defaultValue=""
          options={[
            { value: "", label: "Sélectionnez…" },
            { value: "Coursier", label: "Coursier" },
            { value: "Chauffeur", label: "Chauffeur" },
            { value: "Sous-traitant", label: "Sous-traitant" },
            { value: "Logistique", label: "Logistique" },
            { value: "Candidature spontanée", label: "Candidature spontanée" },
          ]}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <FileInput id="cv" label="CV (PDF, DOC — max 5 Mo)" accept=".pdf,.doc,.docx" required />
        <FileInput
          id="coverLetter"
          label="Lettre de motivation (optionnel)"
          accept=".pdf,.doc,.docx"
        />
      </div>

      <Textarea
        id="message"
        label="Message libre"
        rows={5}
        placeholder="Parlez-nous de votre parcours, vos disponibilités, votre zone géographique…"
      />

      <FormStatus
        state={state}
        successMsg="Votre candidature a bien été envoyée. Merci ! Nous étudions votre profil et revenons vers vous."
        errorMsg={error}
      />

      <button type="submit" disabled={state === "submitting"} className="btn-primary w-full sm:w-auto">
        <Send className="h-4 w-4" />
        {state === "submitting" ? "Envoi en cours…" : "Envoyer ma candidature"}
      </button>
      <p className="text-xs text-ink/45">
        Vos documents sont transmis uniquement à notre service recrutement et conservés
        le temps du traitement de votre candidature, conformément au RGPD.
      </p>
    </form>
  );
}

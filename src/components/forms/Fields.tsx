"use client";

import { CheckCircle2, AlertCircle } from "lucide-react";
import type { ReactNode } from "react";

const inputBase =
  "w-full rounded-xl border border-ink/15 bg-white px-4 py-3 text-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/30 disabled:opacity-60";

export function Label({
  htmlFor,
  children,
  required,
}: {
  htmlFor: string;
  children: ReactNode;
  required?: boolean;
}) {
  return (
    <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-semibold text-ink">
      {children} {required ? <span className="text-brand-600">*</span> : null}
    </label>
  );
}

export function Input({
  id,
  label,
  required,
  type = "text",
  ...rest
}: {
  id: string;
  label: string;
  required?: boolean;
  type?: string;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <Label htmlFor={id} required={required}>
        {label}
      </Label>
      <input id={id} name={id} type={type} required={required} className={inputBase} {...rest} />
    </div>
  );
}

export function Textarea({
  id,
  label,
  required,
  rows = 4,
  ...rest
}: {
  id: string;
  label: string;
  required?: boolean;
  rows?: number;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <div>
      <Label htmlFor={id} required={required}>
        {label}
      </Label>
      <textarea id={id} name={id} rows={rows} required={required} className={inputBase} {...rest} />
    </div>
  );
}

export function Select({
  id,
  label,
  required,
  options,
  ...rest
}: {
  id: string;
  label: string;
  required?: boolean;
  options: { value: string; label: string }[];
} & React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <div>
      <Label htmlFor={id} required={required}>
        {label}
      </Label>
      <select id={id} name={id} required={required} className={inputBase} {...rest}>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export function FileInput({
  id,
  label,
  accept,
  required,
}: {
  id: string;
  label: string;
  accept?: string;
  required?: boolean;
}) {
  return (
    <div>
      <Label htmlFor={id} required={required}>
        {label}
      </Label>
      <input
        id={id}
        name={id}
        type="file"
        accept={accept}
        required={required}
        className="w-full cursor-pointer rounded-xl border border-dashed border-ink/25 bg-brand-50/40 px-4 py-3 text-sm text-ink/70 file:mr-3 file:rounded-full file:border-0 file:bg-brand-600 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-brand-700"
      />
    </div>
  );
}

/** Champ piège anti-spam : invisible pour les humains, rempli par les bots. */
export function Honeypot() {
  return (
    <div className="absolute left-[-9999px] top-0" aria-hidden="true">
      <label htmlFor="website">Ne pas remplir</label>
      <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
    </div>
  );
}

export type FormState = "idle" | "submitting" | "success" | "error";

export function FormStatus({
  state,
  successMsg,
  errorMsg,
}: {
  state: FormState;
  successMsg: string;
  errorMsg?: string;
}) {
  if (state === "success") {
    return (
      <div className="flex items-start gap-3 rounded-xl border border-brand-200 bg-brand-50 px-4 py-3.5 text-sm font-medium text-brand-800">
        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" />
        {successMsg}
      </div>
    );
  }
  if (state === "error") {
    return (
      <div className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3.5 text-sm font-medium text-red-700">
        <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
        {errorMsg ?? "Une erreur est survenue. Merci de réessayer ou de nous appeler."}
      </div>
    );
  }
  return null;
}

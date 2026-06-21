import Link from "next/link";
import { site } from "@/lib/site";

export function Logo({
  className = "",
  variant = "dark",
}: {
  className?: string;
  variant?: "dark" | "light";
}) {
  const text = variant === "light" ? "text-white" : "text-ink";
  const sub = variant === "light" ? "text-white/60" : "text-ink/55";
  return (
    <Link
      href="/"
      aria-label={`${site.name} — accueil`}
      className={`group inline-flex items-center gap-2.5 ${className}`}
    >
      <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-600 shadow-soft transition-transform duration-300 group-hover:-rotate-6">
        <svg viewBox="0 0 64 64" className="h-6 w-6" aria-hidden="true">
          <path
            d="M14 44V20l9 12 9-12v24"
            stroke="#fff"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          <circle cx="46" cy="40" r="6" fill="#dcc078" />
        </svg>
      </span>
      <span className="flex flex-col leading-none">
        <span className={`font-display text-lg font-extrabold ${text}`}>
          Midoriad
        </span>
        <span
          className={`text-[0.62rem] font-semibold uppercase tracking-[0.28em] ${sub}`}
        >
          Transports
        </span>
      </span>
    </Link>
  );
}

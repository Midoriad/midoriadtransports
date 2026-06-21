import Image from "next/image";
import { Icon, type IconName } from "./Icon";

/**
 * Visuel d'illustration.
 * - Si `src` est fourni, affiche une vraie photo optimisée (next/image).
 * - Sinon, affiche un placeholder de marque (dégradé + icône) : aucune
 *   dépendance externe, aucun risque d'image cassée. Remplacez par vos photos
 *   professionnelles en passant simplement la prop `src`.
 */
export function Media({
  src,
  alt,
  icon,
  label,
  className = "",
  rounded = "rounded-2xl",
  priority = false,
}: {
  src?: string;
  alt: string;
  icon: IconName;
  label?: string;
  className?: string;
  rounded?: string;
  priority?: boolean;
}) {
  if (src) {
    return (
      <div className={`relative overflow-hidden ${rounded} ${className}`}>
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover"
          priority={priority}
        />
      </div>
    );
  }

  return (
    <div
      role="img"
      aria-label={alt}
      className={`relative grid place-items-center overflow-hidden ${rounded} bg-gradient-to-br from-brand-700 via-brand-800 to-ink ${className}`}
    >
      <div className="absolute inset-0 bg-hero-grid [background-size:22px_22px] opacity-50" />
      <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gold-400/20 blur-2xl" />
      <div className="relative flex flex-col items-center gap-3 px-6 text-center">
        <span className="grid h-16 w-16 place-items-center rounded-2xl bg-white/10 text-white ring-1 ring-white/20 backdrop-blur">
          <Icon name={icon} className="h-8 w-8" />
        </span>
        {label ? (
          <span className="text-sm font-semibold text-white/85">{label}</span>
        ) : null}
      </div>
    </div>
  );
}

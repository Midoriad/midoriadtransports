// Helpers de validation & anti-spam partagés par les routes API.

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isEmail(value: unknown): value is string {
  return typeof value === "string" && EMAIL_RE.test(value.trim());
}

export function str(value: unknown, max = 5000): string {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, max);
}

export function required(value: unknown): string | null {
  const s = str(value);
  return s.length > 0 ? s : null;
}

/**
 * Anti-spam :
 *  - champ « honeypot » qui doit rester vide ;
 *  - délai minimal entre l'affichage et l'envoi (les bots soumettent instantanément).
 */
export function isSpam(body: Record<string, unknown>): boolean {
  const honeypot = str(body._gotcha ?? body.website ?? "");
  if (honeypot.length > 0) return true;

  const startedAt = Number(body._t ?? 0);
  if (startedAt > 0) {
    const elapsed = Date.now() - startedAt;
    if (elapsed < 2500) return true; // soumission trop rapide
  }
  return false;
}

// Limitation de débit simple en mémoire (par IP).
const hits = new Map<string, { count: number; resetAt: number }>();

export function rateLimit(
  ip: string,
  limit = 6,
  windowMs = 60_000,
): { allowed: boolean; remaining: number } {
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || now > entry.resetAt) {
    hits.set(ip, { count: 1, resetAt: now + windowMs });
    return { allowed: true, remaining: limit - 1 };
  }
  entry.count += 1;
  return { allowed: entry.count <= limit, remaining: Math.max(0, limit - entry.count) };
}

export function clientIp(headers: Headers): string {
  return (
    headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    headers.get("x-real-ip") ||
    "unknown"
  );
}

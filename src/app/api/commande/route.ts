import { NextResponse } from "next/server";
import { sendMail } from "@/lib/mailer";
import { clientIp, isEmail, isSpam, rateLimit, str } from "@/lib/validation";

export const runtime = "nodejs";

type ContactPayload = {
  name?: string;
  email?: string;
  phone?: string;
  date?: string;
  time?: string;
  notes?: string;
};

export async function POST(request: Request) {
  const ip = clientIp(request.headers);
  if (!rateLimit(ip).allowed) {
    return NextResponse.json(
      { error: "Trop de requêtes. Merci de patienter." },
      { status: 429 },
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Requête invalide." }, { status: 400 });
  }

  if (isSpam(body)) return NextResponse.json({ ok: true });

  const contact = (body.contact ?? {}) as ContactPayload;
  const name = str(contact.name);
  const email = str(contact.email);
  const phone = str(contact.phone);
  if (!name || !isEmail(email) || phone.length < 6) {
    return NextResponse.json(
      { error: "Coordonnées incomplètes (nom, email valide, téléphone)." },
      { status: 400 },
    );
  }

  const cargo = Array.isArray(body.cargo)
    ? (body.cargo as { label?: string; quantity?: number }[])
        .map((c) => `${c.quantity}× ${c.label}`)
        .join(", ")
    : "—";
  const surcharges = Array.isArray(body.surcharges)
    ? (body.surcharges as string[]).join(", ")
    : "";

  const total = Number(body.total ?? 0);

  const text = [
    "NOUVELLE COMMANDE DE TRANSPORT",
    "════════════════════════════════",
    `Véhicule    : ${str(body.vehicle)}`,
    `Départ      : ${str(body.from)}`,
    `Arrivée     : ${str(body.to)}`,
    `Distance    : ${str(body.distanceKm)} km`,
    `Durée est.  : ${str(body.durationMin)} min`,
    "",
    `Marchandise : ${cargo || "—"}`,
    `Poids est.  : ${str(body.weightKg)} kg`,
    `Volume est. : ${str(body.volume)}`,
    `Majorations : ${surcharges || "Aucune"}`,
    `Péages      : ${str(body.tolls)} €`,
    "",
    `TOTAL ESTIMÉ: ${total.toFixed(2)} € TTC`,
    "════════════════════════════════",
    "Client :",
    `  Nom       : ${name}`,
    `  Email     : ${email}`,
    `  Téléphone : ${phone}`,
    `  Date/heure: ${str(contact.date)} ${str(contact.time)}`.trim(),
    "",
    "Précisions :",
    str(contact.notes) || "—",
  ].join("\n");

  const result = await sendMail({
    subject: `[Commande] ${str(body.vehicle)} — ${name} — ${total.toFixed(0)} €`,
    text,
    replyTo: email,
  });

  if (!result.ok) {
    return NextResponse.json({ error: "Envoi impossible." }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}

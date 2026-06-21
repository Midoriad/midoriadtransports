import { NextResponse } from "next/server";
import { sendMail } from "@/lib/mailer";
import {
  clientIp,
  isEmail,
  isSpam,
  rateLimit,
  required,
  str,
} from "@/lib/validation";

export const runtime = "nodejs";

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

  const name = required(body.name);
  const email = str(body.email);
  const phone = required(body.phone);
  if (!name || !isEmail(email) || !phone) {
    return NextResponse.json(
      { error: "Nom, email valide et téléphone sont requis." },
      { status: 400 },
    );
  }

  const fields = {
    Prestation: str(body.service),
    "Prise en charge": str(body.pickup),
    Livraison: str(body.delivery),
    Véhicule: str(body.vehicle),
    Date: str(body.date),
  };

  const text = [
    "Nouvelle demande de DEVIS",
    "────────────────────────────────",
    `Nom / Société : ${name}`,
    `Email         : ${email}`,
    `Téléphone     : ${phone}`,
    "",
    ...Object.entries(fields).map(([k, v]) => `${k.padEnd(14)}: ${v || "—"}`),
    "",
    "Détails :",
    str(body.message) || "—",
  ].join("\n");

  const result = await sendMail({
    subject: `[Devis] ${name} — ${fields.Prestation || "Demande"}`,
    text,
    replyTo: email,
  });

  if (!result.ok) {
    return NextResponse.json({ error: "Envoi impossible." }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}

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

  if (isSpam(body)) {
    return NextResponse.json({ ok: true }); // on ignore silencieusement les bots
  }

  const name = required(body.name);
  const email = str(body.email);
  const message = required(body.message);
  if (!name || !isEmail(email) || !message) {
    return NextResponse.json(
      { error: "Veuillez renseigner un nom, un email valide et un message." },
      { status: 400 },
    );
  }

  const phone = str(body.phone);
  const subject = str(body.subject) || "Demande de contact";

  const text = [
    "Nouveau message — Formulaire de contact",
    "────────────────────────────────",
    `Nom        : ${name}`,
    `Email      : ${email}`,
    `Téléphone  : ${phone || "—"}`,
    `Objet      : ${subject}`,
    "",
    "Message :",
    message,
  ].join("\n");

  const result = await sendMail({
    subject: `[Contact] ${subject} — ${name}`,
    text,
    replyTo: email,
  });

  if (!result.ok) {
    return NextResponse.json(
      { error: "Envoi impossible pour le moment." },
      { status: 502 },
    );
  }
  return NextResponse.json({ ok: true });
}

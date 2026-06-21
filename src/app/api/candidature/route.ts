import { NextResponse } from "next/server";
import { sendMail, type MailPayload } from "@/lib/mailer";
import { clientIp, isEmail, rateLimit } from "@/lib/validation";

export const runtime = "nodejs";

const MAX_FILE = 5 * 1024 * 1024; // 5 Mo
const ALLOWED = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

function clean(value: FormDataEntryValue | null, max = 2000): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

async function toAttachment(
  file: FormDataEntryValue | null,
  fallbackName: string,
): Promise<{ ok: true; att?: MailPayload["attachments"] } | { ok: false; error: string }> {
  if (!file || typeof file === "string" || file.size === 0) return { ok: true };
  if (file.size > MAX_FILE) {
    return { ok: false, error: "Fichier trop volumineux (5 Mo maximum)." };
  }
  if (file.type && !ALLOWED.includes(file.type)) {
    return { ok: false, error: "Format de fichier non accepté (PDF ou Word uniquement)." };
  }
  const buffer = Buffer.from(await file.arrayBuffer());
  return {
    ok: true,
    att: [
      {
        filename: file.name || fallbackName,
        content: buffer,
        contentType: file.type || "application/octet-stream",
      },
    ],
  };
}

export async function POST(request: Request) {
  const ip = clientIp(request.headers);
  if (!rateLimit(ip, 4).allowed) {
    return NextResponse.json(
      { error: "Trop de requêtes. Merci de patienter." },
      { status: 429 },
    );
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json({ error: "Requête invalide." }, { status: 400 });
  }

  // Anti-spam honeypot
  if (clean(form.get("website")).length > 0) {
    return NextResponse.json({ ok: true });
  }

  const lastName = clean(form.get("lastName"));
  const firstName = clean(form.get("firstName"));
  const email = clean(form.get("email"));
  const phone = clean(form.get("phone"));
  const type = clean(form.get("type"));

  if (!lastName || !firstName || !isEmail(email) || !phone || !type) {
    return NextResponse.json(
      { error: "Merci de compléter les champs obligatoires avec un email valide." },
      { status: 400 },
    );
  }

  const cv = await toAttachment(form.get("cv"), "cv.pdf");
  if (!cv.ok) return NextResponse.json({ error: cv.error }, { status: 400 });
  const letter = await toAttachment(form.get("coverLetter"), "lettre-motivation.pdf");
  if (!letter.ok) return NextResponse.json({ error: letter.error }, { status: 400 });

  const attachments = [...(cv.att ?? []), ...(letter.att ?? [])];

  const text = [
    "NOUVELLE CANDIDATURE",
    "────────────────────────────────",
    `Type        : ${type}`,
    `Nom         : ${lastName}`,
    `Prénom      : ${firstName}`,
    `Email       : ${email}`,
    `Téléphone   : ${phone}`,
    `Adresse     : ${clean(form.get("address")) || "—"}`,
    "",
    "Message :",
    clean(form.get("message"), 5000) || "—",
    "",
    `Pièces jointes : ${attachments.length ? attachments.map((a) => a.filename).join(", ") : "aucune"}`,
  ].join("\n");

  const result = await sendMail({
    subject: `[Recrutement] ${type} — ${firstName} ${lastName}`,
    text,
    replyTo: email,
    attachments: attachments.length ? attachments : undefined,
  });

  if (!result.ok) {
    return NextResponse.json({ error: "Envoi impossible." }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}

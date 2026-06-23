import "server-only";
import nodemailer from "nodemailer";

const CONTACT_EMAIL =
  process.env.CONTACT_EMAIL ?? "midoriadtransports@hotmail.com";

export type MailPayload = {
  subject: string;
  /** Corps en texte clair. */
  text: string;
  /** Corps HTML (optionnel). */
  html?: string;
  /** Adresse de l'expéditeur pour le « Reply-To ». */
  replyTo?: string;
  /** Pièces jointes (CV, lettre de motivation…). */
  attachments?: { filename: string; content: Buffer; contentType?: string }[];
};

export type SendResult =
  | { ok: true; delivered: boolean }
  | { ok: false; error: string };

/**
 * Envoie un e-mail vers l'adresse de réception des formulaires.
 *
 * Ordre de priorité :
 *   1. Resend (RESEND_API_KEY) — recommandé, le plus fiable.
 *   2. SMTP (SMTP_HOST/USER/PASSWORD) — ex. Outlook/Hotmail.
 *   3. Aucun configuré → journalise et renvoie delivered:false (l'UX n'est pas bloquée).
 */
export async function sendMail(payload: MailPayload): Promise<SendResult> {
  if (process.env.RESEND_API_KEY) {
    return sendViaResend(payload);
  }
  if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASSWORD) {
    return sendViaSmtp(payload);
  }
  console.warn(
    "[mailer] Aucun fournisseur d'e-mail configuré (RESEND_API_KEY ou SMTP). Sujet:",
    payload.subject,
  );
  console.info("[mailer] Contenu:\n", payload.text);
  return { ok: true, delivered: false };
}

/* ── 1. Resend (API HTTP, sans dépendance) ── */
async function sendViaResend(payload: MailPayload): Promise<SendResult> {
  const from =
    process.env.RESEND_FROM ?? "Midoriad Transports <onboarding@resend.dev>";

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [CONTACT_EMAIL],
        reply_to: payload.replyTo,
        subject: payload.subject,
        text: payload.text,
        html: payload.html,
        attachments: payload.attachments?.map((a) => ({
          filename: a.filename,
          content: a.content.toString("base64"),
        })),
      }),
    });

    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      console.error("[mailer] Resend a refusé l'envoi:", res.status, detail);
      return { ok: false, error: "Échec de l'envoi de l'e-mail." };
    }
    return { ok: true, delivered: true };
  } catch (err) {
    console.error("[mailer] Erreur Resend:", err);
    return { ok: false, error: "Échec de l'envoi de l'e-mail." };
  }
}

/* ── 2. SMTP (Nodemailer) ── */
async function sendViaSmtp(payload: MailPayload): Promise<SendResult> {
  const port = Number(process.env.SMTP_PORT ?? 587);
  const transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port,
    secure: process.env.SMTP_SECURE === "true" || port === 465,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASSWORD },
  });
  const from =
    process.env.SMTP_FROM ??
    `Midoriad Transports <${process.env.SMTP_USER ?? CONTACT_EMAIL}>`;

  try {
    await transport.sendMail({
      from,
      to: CONTACT_EMAIL,
      replyTo: payload.replyTo,
      subject: payload.subject,
      text: payload.text,
      html: payload.html,
      attachments: payload.attachments,
    });
    return { ok: true, delivered: true };
  } catch (err) {
    console.error("[mailer] Échec d'envoi SMTP:", err);
    return { ok: false, error: "Échec de l'envoi de l'e-mail." };
  }
}

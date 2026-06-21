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

function getTransport() {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT ?? 587);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASSWORD;

  if (!host || !user || !pass) return null;

  return nodemailer.createTransport({
    host,
    port,
    secure: process.env.SMTP_SECURE === "true" || port === 465,
    auth: { user, pass },
  });
}

export type SendResult =
  | { ok: true; delivered: boolean }
  | { ok: false; error: string };

/**
 * Envoie un e-mail vers l'adresse de réception des formulaires.
 * Si le SMTP n'est pas configuré, journalise le message et renvoie delivered:false
 * (le formulaire reste fonctionnel côté UX sans bloquer l'utilisateur).
 */
export async function sendMail(payload: MailPayload): Promise<SendResult> {
  const transport = getTransport();
  const from =
    process.env.SMTP_FROM ??
    `Midoriad Transports <${process.env.SMTP_USER ?? CONTACT_EMAIL}>`;

  if (!transport) {
    console.warn(
      "[mailer] SMTP non configuré — message non envoyé. Sujet:",
      payload.subject,
    );
    console.info("[mailer] Contenu:\n", payload.text);
    return { ok: true, delivered: false };
  }

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
    console.error("[mailer] Échec d'envoi:", err);
    return { ok: false, error: "Échec de l'envoi de l'e-mail." };
  }
}

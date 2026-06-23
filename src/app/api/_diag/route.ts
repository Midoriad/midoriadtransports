import { NextResponse } from "next/server";

export const runtime = "nodejs";

// Diagnostic temporaire : indique quel fournisseur d'e-mail est visible côté serveur.
// Ne révèle AUCUN secret (uniquement des booléens et des longueurs).
export async function GET() {
  const key = process.env.RESEND_API_KEY ?? "";
  return NextResponse.json({
    resendConfigured: key.length > 0,
    resendKeyLength: key.length,
    resendKeyPrefixOk: key.startsWith("re_"),
    smtpConfigured: Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASSWORD),
    contactEmailSet: Boolean(process.env.CONTACT_EMAIL),
    resendFromSet: Boolean(process.env.RESEND_FROM),
  });
}

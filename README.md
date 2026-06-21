# Midoriad Transports — Site web

Site vitrine **haut de gamme** pour une entreprise de transport express, logistique
et livraison. Configurateur de commande intelligent, calcul de tarif en temps réel,
formulaires sécurisés (devis, contact, candidature) et pages légales conformes RGPD.

## Stack technique

- **Next.js 14** (App Router) + **TypeScript**
- **Tailwind CSS** (design system vert premium « Midori »)
- **Framer Motion** (animations)
- **Leaflet + OpenStreetMap** (carte interactive, sans clé API)
- **OSRM / Nominatim** (distance, durée, géocodage — sans clé API)
- **Nodemailer** (envoi des formulaires par e-mail)

## Démarrage

```bash
npm install
cp .env.example .env.local   # puis renseignez vos variables
npm run dev                  # http://localhost:3000
```

### Build de production

```bash
npm run build
npm start
```

## Variables d'environnement (`.env.local`)

| Variable | Rôle |
| --- | --- |
| `CONTACT_EMAIL` | Adresse de réception des formulaires (par défaut `midoriadtransports@hotmail.com`) |
| `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE` | Serveur SMTP d'envoi |
| `SMTP_USER`, `SMTP_PASSWORD` | Identifiants SMTP (utilisez un **mot de passe d'application**) |
| `SMTP_FROM` | Expéditeur affiché |
| `NEXT_PUBLIC_SITE_URL` | URL publique (SEO, sitemap, Open Graph) |
| `NEXT_PUBLIC_PHONE`, `NEXT_PUBLIC_EMAIL` | Coordonnées affichées |

> **Sans configuration SMTP**, les formulaires restent fonctionnels côté utilisateur :
> le contenu est journalisé côté serveur (aucun e-mail n'est envoyé). Renseignez le SMTP
> pour activer l'envoi réel vers `CONTACT_EMAIL`.

### Exemple Outlook / Hotmail

```
SMTP_HOST=smtp-mail.outlook.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=midoriadtransports@hotmail.com
SMTP_PASSWORD=xxxxxxxxxxxx   # mot de passe d'application
```

## Structure

```
src/
├── app/                 # Pages (App Router) + routes API
│   ├── api/             # contact · devis · commande · candidature
│   ├── commande/        # Configurateur de transport
│   ├── (pages...)/      # services, secteurs, vehicules, recrutement, contact…
│   └── (légal)/         # mentions-legales, cgv, cgu, cookies, confidentialité…
├── components/          # UI (Header, Footer, cartes, formulaires, configurateur)
└── lib/                 # Données & logique (véhicules, tarifs, géo, mailer, validation)
```

## Personnalisation

### Tarifs & véhicules
Tout est centralisé dans [`src/lib/vehicles.ts`](src/lib/vehicles.ts) (capacités, prix de
base, prix au km) et [`src/lib/pricing.ts`](src/lib/pricing.ts) (majorations, péages,
règles de compatibilité).

### Types de marchandises
Voir [`src/lib/cargo.ts`](src/lib/cargo.ts) (poids et volumes estimés par type).

### Photos professionnelles
Par défaut, les visuels sont des **illustrations de marque** (dégradés + icônes) :
aucune dépendance externe, aucun risque d'image cassée. Pour utiliser de vraies photos,
passez la prop `src` au composant `Media` (ou aux cartes) avec l'URL de votre image.
Les domaines `images.unsplash.com` et `res.cloudinary.com` sont déjà autorisés dans
[`next.config.mjs`](next.config.mjs).

### Coordonnées & textes légaux
- Coordonnées et navigation : [`src/lib/site.ts`](src/lib/site.ts)
- Les mentions légales et CGV contiennent des champs **surlignés** « [à compléter] »
  (SIRET, hébergeur, assurance, médiateur…) à renseigner avant mise en ligne.

## Sécurité & conformité

- Formulaires protégés par **honeypot**, **délai minimal de soumission** et
  **limitation de débit** par IP.
- En-têtes de sécurité HTTP (`X-Frame-Options`, `X-Content-Type-Options`, etc.).
- Bandeau de **consentement cookies** et pages **RGPD** complètes.

## Déploiement

Compatible **Vercel** (recommandé) ou tout hébergeur Node. Pensez à définir les
variables d'environnement dans le tableau de bord de l'hébergeur.

---

© Midoriad Transports.

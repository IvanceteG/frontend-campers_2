# VanLife Rentals — Frontend

Landing pública de lloguer de furgonetes camper. Projecte de Sprint 1 (MVP visual + base de dades).

Construït amb **Next.js 16** (App Router) + **React 19** + **Tailwind CSS 4**.

## Stack

- **Next.js 16** amb React Compiler activat
- **React 19**
- **Tailwind CSS 4** (config inline a `globals.css`, sense `tailwind.config.js`)
- **Google Fonts** via `next/font`: Inter (UI) + Fraunces (display)
- **next/image** per a imatges optimitzades

## Estructura del projecte

Arquitectura **MVC** clarament separada:

```
src/
├── app/                        # App Router (rutes)
│   ├── layout.js               # Layout arrel + fonts + anti-FOUC del tema
│   ├── page.js                 # Home (landing)
│   ├── loading.js              # Estat de càrrega global
│   ├── error.js                # Boundary d'errors
│   ├── not-found.js            # 404
│   ├── globals.css             # Variables CSS + tema clar/fosc
│   └── models/[slug]/page.js   # Detall d'un model (SSG)
├── components/
│   ├── sections/               # Seccions de la landing
│   │   ├── Hero.js
│   │   ├── Models.js
│   │   ├── Reviews.js
│   │   └── ContactForm.js
│   └── ui/                     # Components reutilitzables
│       ├── Navbar.js           # Sticky + menú mòbil + toggle tema
│       ├── Footer.js           # Sempre fosc (independent del tema)
│       ├── ModelCard.js        # Targeta resum (Server Component)
│       ├── ModelCardImage.js   # Imatge amb fallback (Client Component)
│       ├── ModelsGrid.js       # Graella amb toggle "destacats/tots"
│       ├── ModelDetailImage.js # Imatge del detall amb fallback
│       ├── HeroImage.js        # Imatge del Hero amb fallback
│       ├── CamperIllustration.js  # Il·lustració SVG fallback
│       └── ThemeToggle.js      # Botó canvi tema clar/fosc
├── controllers/                # Lògica i normalització de respostes
│   └── modelsController.js
├── services/                   # Accés a dades (API o mock)
│   └── modelsService.js
└── data/                       # Mock temporal mentre no hi ha BD
    └── models.js

public/models/                  # Imatges dels models (.jpg)
```

### Flux de dades

```
data/models.js  →  services/modelsService.js  →  controllers/modelsController.js  →  components/sections/Models.js
   (mock)            (fetch a API o mock           (try/catch + format          (vista pura)
                      segons env var)               { ok, data, error })
```

Aquesta separació permet substituir el mock per una API real **sense tocar les vistes**, només canviant `modelsService.js`.

### Esquema de dades del model

Camps esperats (a alinear amb la BD del backend):

| Camp              | Tipus    | Descripció                                |
|-------------------|----------|-------------------------------------------|
| `id`              | number   | Identificador únic                        |
| `slug`            | string   | URL amigable (`volkswagen-california`)    |
| `name`            | string   | Nom comercial                             |
| `type`            | string   | Categoria (Compacta, Premium, etc.)       |
| `seats`           | number   | Nombre de places                          |
| `beds`            | number   | Nombre de llits                           |
| `bathroom`        | string   | Tipus de bany ("—" si no en té)           |
| `equipment`       | string   | Equipament d'assistència a la conducció   |
| `pricePerDay`     | number   | Preu per dia en euros                     |
| `description`     | string   | Descripció curta (per a targetes)         |
| `longDescription` | string   | Descripció ampliada (per a la pàgina detall) |
| `includes`        | string[] | Llista d'allò que inclou el lloguer       |
| `image`           | string   | Ruta a la imatge (`/models/slug.jpg`)     |
| `featured`        | boolean  | Si surt a la secció de destacats          |

## Configuració

### Variables d'entorn

Copia `.env.example` a `.env.local`:

```bash
cp .env.example .env.local
```

Si `NEXT_PUBLIC_API_URL` està definida, l'aplicació farà fetch a l'API real.
Sense ella, funciona en mode standalone amb dades mock.

## Posada en marxa

```bash
npm install      # Instal·lar dependències
npm run dev      # Servidor de desenvolupament (localhost:3000)
npm run build    # Build de producció
npm start        # Servir build de producció
npm run lint     # Linter
```

## Característiques implementades

- ✅ Mode clar / mode fosc amb toggle persistent (localStorage + `prefers-color-scheme`)
- ✅ Landing amb Hero, catàleg de models, ressenyes i formulari de contacte
- ✅ Disseny responsiu amb menú hamburguesa a mòbil
- ✅ Navbar sticky amb fons translúcid al fer scroll
- ✅ Catàleg amb toggle "veure només destacats / veure tota la flota"
- ✅ Pàgina de detall del model amb generació estàtica (`generateStaticParams`)
- ✅ Llista d&apos;allò que inclou el lloguer a la pàgina de detall
- ✅ Optimització d'imatges amb `next/image` + fallback a il·lustració SVG
- ✅ Formulari amb selector de model, validació de camps i dates coherents
- ✅ Accessibilitat: labels, `aria-live`, `aria-hidden` als SVG decoratius
- ✅ Estats `loading.js`, `error.js` i `not-found.js`
- ✅ SEO amb metadata dinàmica per ruta
- ✅ Footer sempre fosc, independent del tema

## Disseny

Paleta càlida (crema, terracota, olivo) amb tipografia serif display (Fraunces) per a títols i sans-serif (Inter) per al cos. Decoracions sutils amb blobs difuminats i textura granulada.

Totes les variables de color estan a `src/app/globals.css` sota `:root` (tema clar) i `.dark` (tema fosc).

## Següents passos (Sprint 2)

- [ ] Connectar `modelsService` al backend real
- [ ] Implementar enviament del formulari contra `POST /api/contact-requests`
- [ ] Filtres per tipus/preu al catàleg
- [ ] Sistema de reserves amb dates i disponibilitat

## Llicència

Projecte acadèmic — DAW 2.

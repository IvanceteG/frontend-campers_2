# VanLife Rentals 🚐

Landing page corporativa full-stack per a una empresa de lloguer de furgonetes camper, amb catàleg de models, comentaris autenticats i formulari de contacte.

Projecte **IA6** — M0613 DAW 2. Implementa el recorregut Next.js 16 (sessions S12–S15) amb arquitectura MVC, persistència PostgreSQL, autenticació amb Auth.js i control de rols.

## 🔗 Enllaços

- **Demo en producció:** _(afegir URL de Vercel després del desplegament)_
- **Repositori:** _(afegir URL del repo)_

## 🔑 Credencials de prova

| Rol    | Email                | Contrasenya |
|--------|----------------------|-------------|
| ADMIN  | `admin@vanlife.cat`  | `Admin123!` |
| EDITOR | `editor@vanlife.cat` | `Editor123!`|
| USER   | `user@vanlife.cat`   | `User123!`  |

També es pot crear un compte nou des de `/register` (rol USER per defecte).

## 🧱 Stack

| Capa              | Tecnologia                          |
|-------------------|-------------------------------------|
| Framework         | Next.js 16 (App Router)             |
| UI                | React 19 + Tailwind CSS 4           |
| ORM               | Prisma 6                            |
| Base de dades     | PostgreSQL (Supabase)               |
| Autenticació      | Auth.js v5 (next-auth) + JWT        |
| Hash contrasenyes | bcryptjs                            |
| Validació         | Zod                                 |
| Desplegament      | Vercel                              |

## 🏗️ Arquitectura MVC

```
src/
├── app/                          # App Router: rutes i vistes
│   ├── page.js                   # Landing pública (home)
│   ├── layout.js                 # Layout arrel + SessionProvider + tema
│   ├── login/ · register/        # Autenticació (UC-05)
│   ├── models/[slug]/            # Detall de model + comentaris (UC-02)
│   ├── admin/                    # Panell protegit (UC-08, UC-09, UC-10)
│   │   ├── page.js               # Resum / mètriques
│   │   ├── models/               # CRUD de models (EDITOR+)
│   │   ├── contact-requests/     # Sol·licituds rebudes (EDITOR+)
│   │   └── users/                # Gestió de rols (només ADMIN)
│   └── api/                      # ── CONTROLLERS (endpoints REST) ──
│       ├── models/               # GET llista i detall (UC-01, UC-02)
│       ├── models/[slug]/comments/  # GET públic, POST autenticat (UC-06, UC-07)
│       ├── contact-requests/     # POST públic (UC-03, UC-04)
│       ├── auth/[...nextauth]/   # Auth.js
│       ├── auth/register/        # Registre d'usuaris
│       └── admin/                # CRUD models + gestió usuaris (protegit)
├── components/                   # ── VIEW ──
│   ├── sections/                 # Hero, Models, Reviews, ContactForm
│   └── ui/                       # Navbar, Footer, ModelCard, CommentsSection...
├── controllers/                  # Normalització { ok, data, error }
│   └── modelsController.js
├── services/                     # ── MODEL (accés a dades via Prisma) ──
│   └── modelsService.js
├── lib/
│   ├── prisma.js                 # Client Prisma (singleton)
│   ├── auth.js                   # Configuració Auth.js + rols
│   └── validations.js            # Esquemes Zod compartits
└── middleware.js                 # Protecció de rutes /admin per rol

prisma/
├── schema.prisma                 # User, Account, Session, CamperModel, Comment, ContactRequest
├── migrations/                   # Migracions aplicades
└── seed.js                       # Llavor: 6 models + 3 usuaris + comentaris
```

**Separació de responsabilitats:**
- **Model** → `services/` accedeix a la BD amb Prisma.
- **Controller** → `app/api/` (endpoints) i `controllers/` (normalització).
- **View** → `components/` i les `page.js`, sense lògica de dades.

## 🔐 Rols i permisos

| Acció                          | Visitant | USER | EDITOR | ADMIN |
|--------------------------------|:--------:|:----:|:------:|:-----:|
| Veure catàleg i detall         | ✅       | ✅   | ✅     | ✅    |
| Llegir comentaris              | ✅       | ✅   | ✅     | ✅    |
| Enviar formulari de contacte   | ✅       | ✅   | ✅     | ✅    |
| Publicar comentaris            | ❌       | ✅   | ✅     | ✅    |
| Crear/editar/eliminar models   | ❌       | ❌   | ✅     | ✅    |
| Veure sol·licituds de contacte | ❌       | ❌   | ✅     | ✅    |
| Gestionar rols d'usuaris       | ❌       | ❌   | ❌     | ✅    |

La restricció s'aplica a dos nivells: `middleware.js` (rutes `/admin`) i comprovació de sessió/rol dins de cada endpoint protegit (defensa en profunditat, UC-10).

## ⚙️ Execució local

### 1. Requisits

- Node.js 20+
- Una base de dades PostgreSQL (recomanat: projecte gratuït a [Supabase](https://supabase.com))

### 2. Instal·lació

```bash
git clone <url-del-repo>
cd frontend-campers
npm install
```

### 3. Variables d'entorn

Copia `.env.example` a `.env` i omple els valors:

```bash
cp .env.example .env
```

```env
DATABASE_URL="postgresql://...:6543/postgres?pgbouncer=true"  # connexió amb pooling
DIRECT_URL="postgresql://...:5432/postgres"                    # connexió directa (migracions)
AUTH_SECRET="<secret aleatori, p.ex. openssl rand -base64 32>"
AUTH_URL="http://localhost:3000"
```

> ⚠️ La contrasenya de la BD no ha de contenir caràcters especials sense codificar (`#`, `@`, `?`, etc.).

### 4. Base de dades

```bash
npx prisma migrate dev --name init   # crea les taules
npm run db:seed                       # carrega dades de prova
```

### 5. Arrencar

```bash
npm run dev
```

Obre [http://localhost:3000](http://localhost:3000).

Eines útils:

```bash
npm run db:studio    # explorador visual de la BD (Prisma Studio)
npm run lint         # linter
```

## 🚀 Desplegament a Vercel

1. Puja el repositori a GitHub.
2. A [vercel.com](https://vercel.com): **New Project** → importa el repo.
3. Configura les variables d'entorn (`DATABASE_URL`, `DIRECT_URL`, `AUTH_SECRET`, `AUTH_URL`).
4. `AUTH_URL` ha d'apuntar a la URL de producció de Vercel.
5. Deploy. El build executa `prisma generate && next build` automàticament.

## ✅ Casos d'ús coberts

UC-01 a UC-11 implementats: catàleg públic, detall amb comentaris, formulari validat, registre/login, comentaris protegits per autenticació, gestió de continguts per EDITOR, administració d'usuaris per ADMIN i restricció d'accés per rol.

## 📋 Planificació Agile

- **Sprint 1** — MVP visual + BD: landing, esquema de dades, migracions i seed.
- **Sprint 2** — API + seguretat + release: endpoints REST, Auth.js, rols, desplegament.

## 🤖 Ús de la IA

El projecte s'ha desenvolupat amb assistència d'un LLM, aplicant:
- Prompting amb restriccions explícites (stack, versions, estructura MVC).
- Revisió del codi generat (seguretat, permisos, consultes a BD, fugues de dades).
- Correcció d'al·lucinacions i patrons obsolets (p. ex. configuració d'ESLint flat, versions de Prisma/Auth.js).
- Proves manuals sobre els casos d'ús.

## 📄 Llicència

Projecte acadèmic — M0613 DAW 2.

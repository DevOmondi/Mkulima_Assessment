# Mkulima — Inua MKulima Subsidy Program

A web platform that enables farmers to securely sign in and browse products available through the **Inua MKulima** subsidy program.

## Features

- Farmer authentication via username and password
- Protected dashboard displaying available products
- Product listings with ratings, pricing, and imagery

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Data fetching | TanStack Query v5 |
| Icons | Lucide React |

## Prerequisites

- Node.js 18 or later
- npm, yarn, pnpm, or bun

## Setup

**1. Clone the repository**

```bash
git clone <repository-url>
cd mkulima
```

**2. Install dependencies**

```bash
npm install
# or
yarn install
# or
pnpm install
```

**3. Configure environment variables**

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_AUTH_API_URL=<your-auth-api-endpoint>
```

> The auth endpoint should accept a `POST` request with `{ username, password }` and return a user/token payload on success.

**4. Run the development server**

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. You will land on the sign-in page. After authenticating, you are redirected to the product dashboard.

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm start` | Serve the production build |
| `npm run lint` | Run ESLint |

## Project Structure

```
mkulima/
├── app/
│   ├── page.tsx              # Sign-in page
│   ├── layout.tsx            # Root layout
│   ├── providers.tsx         # TanStack Query provider
│   └── dashboard/
│       ├── page.tsx          # Product dashboard
│       ├── api.ts            # API helpers
│       ├── types.ts          # Shared TypeScript types
│       └── components/       # Dashboard UI components
├── public/                   # Static assets
├── next.config.ts
└── package.json
```

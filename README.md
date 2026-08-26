# Boutique en ligne

Boutique de mode et accessoires : catalogue produits, panier, commande en paiement à la livraison, suivi de commande — et un espace admin complet pour gérer le catalogue et les commandes.

**Démo live :** _à venir_
**Espace admin (démo) :** `/admin/login`

## Le concept

- **Le client parcourt** le catalogue par catégorie (Femme, Homme, Accessoires), consulte une fiche produit détaillée (images, tailles, stock).
- **Il commande** en paiement à la livraison — pas de carte bancaire requise, juste nom, téléphone et adresse.
- **Il suit sa commande** en temps réel : reçue → confirmée → expédiée → livrée.
- **L'équipe gère tout** depuis un admin : catalogue (catégories + produits), commandes façon kanban, stats du jour.

## Stack technique

- [Next.js 16](https://nextjs.org) (App Router, Turbopack) + React 19 + TypeScript
- [Tailwind CSS v4](https://tailwindcss.com) — configuration CSS-first
- [Prisma ORM 7](https://www.prisma.io) + PostgreSQL ([Neon](https://neon.tech))
- Auth admin par mot de passe unique, session JWT ([jose](https://github.com/panva/jose)) en cookie httpOnly
- Panier persistant côté client (localStorage) via React Context
- Validation des formulaires avec [Zod](https://zod.dev)

## Fonctionnalités

**Côté client**
- Catalogue filtrable par catégorie, fiches produits avec galerie d'images et sélection de taille
- Panier persistant entre les pages, ajustement des quantités
- Commande en paiement à la livraison (nom, téléphone, adresse, ville)
- Suivi de commande en temps réel (polling léger)

**Côté admin** (`/admin`, protégé par mot de passe)
- Tableau de bord des commandes actives façon kanban (Nouveau / Confirmé / Expédié)
- Gestion complète du catalogue : catégories et produits (CRUD), stock, mise en avant
- Statistiques du jour : commandes, chiffre d'affaires

## Lancer le projet en local

```bash
npm install
cp .env.example .env   # renseigner DATABASE_URL, AUTH_SECRET, ADMIN_PASSWORD_HASH
npx prisma migrate dev
npx tsx prisma/seed.ts
npm run dev
```

La boutique est accessible sur `/`, l'espace admin sur `/admin/login`.

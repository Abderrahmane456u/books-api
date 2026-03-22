# Books API — Bibliothèque (MongoDB + Express + React)

Projet full stack : catalogue de livres avec catégories, interface React et administration MongoDB.

## Structure

| Dossier | Rôle |
|---------|------|
| `backend/` | API Express + Mongoose (`/livres`, `/categories`) — port **3000** |
| `frontend/atelier/` | Interface React (Vite) — port **5173** |
| `mongo-express-app/` | [Mongo Express](https://github.com/mongo-express/mongo-express) — port **8081** |

## Prérequis

- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/) local (port 27017)

## Démarrage rapide

### 1. Base de données & seed

```bash
cd mongo-express-app
npm install
npm run seed
```

### 2. API

```bash
cd backend
npm install
npm run dev
```

### 3. Frontend

```bash
cd frontend/atelier
npm install
npm run dev
```

### 4. (Optionnel) Mongo Express

```bash
cd mongo-express-app
npm start
```

Ouvrir http://localhost:8081 — identifiants dans `mongo-express-app/config.env`.

## Variables

- Backend : MongoDB `mongodb://localhost:27017/bibliotheque`
- Frontend en dev : proxy Vite vers l’API (`/api` → `localhost:3000`)

## Licence

Projet pédagogique / démonstration.

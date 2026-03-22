# Déployer sur Vercel

Ce dépôt est prêt pour **un seul projet Vercel** : site React (build Vite) + API Express en **fonction serverless** sous `/api`.

## Prérequis

1. Compte [Vercel](https://vercel.com)
2. Base **MongoDB en ligne** (ex. [MongoDB Atlas](https://www.mongodb.com/atlas) — gratuit) : `mongodb+srv://...`

> `localhost:27017` ne fonctionne pas sur Vercel : il faut une URI cloud.

## Étapes

### 1. Importer le projet

1. [New Project](https://vercel.com/new) → importer le repo GitHub `books-api`
2. **Root Directory** : laisser **`.`** (racine du repo, là où se trouve `vercel.json`)
3. Framework Preset : **Other** (déjà surchargé par `vercel.json`)

### 2. Variables d’environnement

Dans **Settings → Environment Variables**, ajouter :

| Nom | Valeur | Environnements |
|-----|--------|----------------|
| `MONGODB_URI` | Chaîne de connexion Atlas (ou autre Mongo hébergé) | Production, Preview |

Ne pas commiter l’URI dans le code.

### 3. Build

Vercel exécute :

- `installCommand` : dépendances `backend` + `frontend/atelier`
- `buildCommand` : `npm run build` dans le frontend
- Les routes `/api/*` sont servies par `api/index.mjs` (serverless)

### 4. Après déploiement

- **Site** : `https://ton-projet.vercel.app`
- **API** : `https://ton-projet.vercel.app/api/livres`, `/api/categories`, etc.

Le frontend utilise par défaut `baseURL = '/api'` (même domaine).  
Pour une API externe uniquement, définir **`VITE_API_URL`** dans Vercel (ex. `https://autre-domaine.com/api`) et **rebuild**.

## Dépannage

- **503 Base de données** : vérifier `MONGODB_URI` et la whitelist IP Atlas (**0.0.0.0/0** pour tester).
- **404 sur les routes React** : le rewrite SPA dans `vercel.json` doit rester après la règle `/api`.
- **Fonction qui time out** : augmenter `maxDuration` dans `vercel.json` (plan Pro pour > 10 s en prod).

## Développement local

```bash
# Terminal 1 — MongoDB local ou Atlas
cd backend && npm run dev

# Terminal 2
cd frontend/atelier && npm run dev
```

Le proxy Vite envoie `/api` vers `http://localhost:3000`.

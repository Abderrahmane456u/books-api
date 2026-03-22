# Mongo Express App - Bibliothèque

Interface web pour gérer la base MongoDB **bibliotheque**.

## Prérequis

- MongoDB installé et démarré (port 27017)
- Node.js

## Installation

```bash
npm install
```

## Utilisation

### 1. Lancer Mongo Express (interface web)

Dans un terminal :

```bash
cd mongo-express-app
npm start
```

Puis dans le navigateur, ouvre :

**http://localhost:8081**

Une fenêtre d’identification s’affiche (Basic Auth) :

- **Utilisateur :** `admin`  
- **Mot de passe :** `admin123`

Ensuite tu vois la liste des bases ; clique sur **`bibliotheque`** puis sur les collections **`livres`** ou **`categories`**.

### 2. Peupler la base de données (seed)

Exécuter une fois pour créer la base `bibliotheque` avec des données de démonstration :

```bash
npm run seed
```

Cela crée :
- **Collection categories** : Roman, Science-Fiction, Biographie, Histoire, Développement
- **Collection livres** : 8 livres d'exemple

## Structure de la base

| Collection   | Champs                                         |
|-------------|-------------------------------------------------|
| **categories** | nom, description                             |
| **livres**     | titre, auteur, categorie                      |

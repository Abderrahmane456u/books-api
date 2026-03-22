/**
 * Script pour peupler la base de données "bibliotheque"
 * Collections: categories, livres
 * À exécuter après le démarrage de MongoDB
 */

const { MongoClient } = require('mongodb');

const MONGO_URI = 'mongodb://127.0.0.1:27017';
const DB_NAME = 'bibliotheque';

const categories = [
  { nom: 'Roman', description: 'Romans et fictions' },
  { nom: 'Science-Fiction', description: 'SF, fantastique et futuriste' },
  { nom: 'Biographie', description: 'Vies et récits de personnalités' },
  { nom: 'Histoire', description: 'Ouvrages historiques' },
  { nom: 'Développement', description: 'Programmation et informatique' },
];

const livres = [
  { titre: 'Les Misérables', auteur: 'Victor Hugo', categorie: 'Roman' },
  { titre: '1984', auteur: 'George Orwell', categorie: 'Science-Fiction' },
  { titre: 'Le Petit Prince', auteur: 'Antoine de Saint-Exupéry', categorie: 'Roman' },
  { titre: 'Steve Jobs', auteur: 'Walter Isaacson', categorie: 'Biographie' },
  { titre: 'Sapiens', auteur: 'Yuval Noah Harari', categorie: 'Histoire' },
  { titre: 'Clean Code', auteur: 'Robert C. Martin', categorie: 'Développement' },
  { titre: 'Dune', auteur: 'Frank Herbert', categorie: 'Science-Fiction' },
  { titre: 'L\'Étranger', auteur: 'Albert Camus', categorie: 'Roman' },
];

async function seed() {
  const client = new MongoClient(MONGO_URI);
  try {
    await client.connect();
    console.log('✅ Connecté à MongoDB');

    const db = client.db(DB_NAME);

    // Vider les collections existantes (pour réinitialiser)
    await db.collection('categories').deleteMany({});
    await db.collection('livres').deleteMany({});

    // Insérer les catégories
    const catResult = await db.collection('categories').insertMany(categories);
    console.log(`✅ ${catResult.insertedCount} catégories insérées`);

    // Insérer les livres
    const livResult = await db.collection('livres').insertMany(livres);
    console.log(`✅ ${livResult.insertedCount} livres insérés`);

    console.log('\n📚 Base de données "bibliotheque" prête !');
    console.log('   - Collection: categories');
    console.log('   - Collection: livres (livres)');
  } catch (err) {
    console.error('❌ Erreur:', err.message);
  } finally {
    await client.close();
  }
}

seed();

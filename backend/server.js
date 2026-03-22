import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'   // ← ajouté

const app = express()
app.use(cors())
app.use(express.json())

// ← Connexion MongoDB
mongoose.connect('mongodb://localhost:27017/bibliotheque')
  .then(() => console.log('✅ MongoDB connecté'))
  .catch(err => console.log('❌ Erreur :', err))

// ← Modèle Livre
const Livre = mongoose.model('Livre', {
  titre: String,
  auteur: String,
  categorie: String
})

// ← Modèle Catégorie
const Categorie = mongoose.model('Categorie', {
  nom: String,
  description: String
})

app.get('/', (req, res) => res.send('API fonctionne'))

// GET toutes les catégories
app.get('/categories', async (req, res) => {
  const categories = await Categorie.find()
  res.json(categories)
})

// GET tous les livres (ou filtrés par catégorie: ?categorie=Roman)
app.get('/livres', async (req, res) => {
  const { categorie } = req.query
  const filter = categorie ? { categorie } : {}
  const livres = await Livre.find(filter)
  res.json(livres)
})

// GET livre par id
app.get('/livres/:id', async (req, res) => {
  const livre = await Livre.findById(req.params.id)
  if (!livre) return res.status(404).json({ message: "Livre not found" })
  res.json(livre)
})

// POST ajouter livre
app.post('/livres', async (req, res) => {
  const livre = new Livre(req.body)
  await livre.save()
  res.status(201).json({ message: "Livre ajouté", livre })
})

// DELETE supprimer livre
app.delete('/livres/:id', async (req, res) => {
  await Livre.findByIdAndDelete(req.params.id)
  res.json({ message: "Livre supprimé" })
})

app.put('/livres/:id', async (req, res) => {
  const livre = await Livre.findByIdAndUpdate(req.params.id, req.body, { new: true })
  if (!livre) return res.status(404).json({ message: "Livre not found" })
  res.json({ message: "Livre modifié", livre })
})

app.listen(3000, () => console.log('Server running on http://localhost:3000'))
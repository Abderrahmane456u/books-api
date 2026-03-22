import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import { connectDB } from './db.js'

const Livre =
  mongoose.models.Livre ||
  mongoose.model('Livre', {
    titre: String,
    auteur: String,
    categorie: String,
  })

const Categorie =
  mongoose.models.Categorie ||
  mongoose.model('Categorie', {
    nom: String,
    description: String,
  })

const api = express.Router()

api.get('/categories', async (req, res) => {
  const categories = await Categorie.find()
  res.json(categories)
})

api.get('/livres', async (req, res) => {
  const { categorie } = req.query
  const filter = categorie ? { categorie } : {}
  const livres = await Livre.find(filter)
  res.json(livres)
})

api.get('/livres/:id', async (req, res) => {
  const livre = await Livre.findById(req.params.id)
  if (!livre) return res.status(404).json({ message: 'Livre not found' })
  res.json(livre)
})

api.post('/livres', async (req, res) => {
  const livre = new Livre(req.body)
  await livre.save()
  res.status(201).json({ message: 'Livre ajouté', livre })
})

api.delete('/livres/:id', async (req, res) => {
  await Livre.findByIdAndDelete(req.params.id)
  res.json({ message: 'Livre supprimé' })
})

api.put('/livres/:id', async (req, res) => {
  const livre = await Livre.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })
  if (!livre) return res.status(404).json({ message: 'Livre not found' })
  res.json({ message: 'Livre modifié', livre })
})

export function createApp() {
  const app = express()

  app.use(
    cors({
      origin: true,
      credentials: true,
    })
  )
  app.use(express.json())

  app.use(async (req, res, next) => {
    try {
      await connectDB()
      next()
    } catch (err) {
      console.error('MongoDB:', err)
      res.status(503).json({ message: 'Base de données indisponible' })
    }
  })

  app.get('/', (req, res) => res.send('API bibliothèque — OK'))

  app.use('/api', api)

  return app
}

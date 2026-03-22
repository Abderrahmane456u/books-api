import mongoose from 'mongoose'

const MONGODB_URI =
  process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/bibliotheque'

/** Connexion réutilisable (important pour Vercel / serverless) */
const globalRef = globalThis
if (!globalRef.__mongooseBooks) {
  globalRef.__mongooseBooks = { conn: null, promise: null }
}
const cached = globalRef.__mongooseBooks

export async function connectDB() {
  if (cached.conn) return cached.conn
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI)
  }
  cached.conn = await cached.promise
  return cached.conn
}

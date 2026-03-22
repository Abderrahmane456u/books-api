import { createApp } from './app.js'
import { connectDB } from './db.js'

await connectDB()
console.log('✅ MongoDB connecté')

const app = createApp()
const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})

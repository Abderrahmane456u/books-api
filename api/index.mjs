/**
 * Point d’entrée Vercel (serverless) — même API qu’en local.
 */
import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'
import { createApp } from '../backend/app.js'

const require = createRequire(fileURLToPath(new URL('../backend/package.json', import.meta.url)))
const serverless = require('serverless-http')

const app = createApp()
export default serverless(app)

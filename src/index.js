// src/index.js
import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url'
import { productosRouter } from './routes/productos.js'

const app = express()
const PORT = process.env.PORT || 3000

// Para obtener __dirname en ESM
const __dirname = path.dirname(fileURLToPath(import.meta.url))

// Middleware
app.use(cors())
app.use(express.json())

// Servir archivos estáticos del frontend
app.use(express.static(path.join(__dirname, '../public')))

// Rutas API
app.use('/api/productos', productosRouter)

// Manejo de errores
app.use((err, req, res, next) => {
  const status  = err.status || 500
  const mensaje = err.mensaje || 'Error interno del servidor'
  console.error(`[ERROR] ${status} - ${mensaje}`)
  res.status(status).json({ error: true, mensaje })
})

app.listen(PORT, () => {
  console.log(`✓ Servidor en http://localhost:${PORT}`)
})
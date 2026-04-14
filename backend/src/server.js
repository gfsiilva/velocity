const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

// Rotas
const authRoutes = require('./routes/auth')
const motosRoutes = require('./routes/motos')
const aluguéisRoutes = require('./routes/alugueis')

app.use('/auth', authRoutes)
app.use('/motos', motosRoutes)
app.use('/alugueis', aluguéisRoutes)

// Rota de teste
app.get('/', (req, res) => {
  res.json({ message: 'VeloCity API rodando! 🏍️' })
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`)
})
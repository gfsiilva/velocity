const express = require('express')
const router = express.Router()
const autenticar = require('../middlewares/authMiddleware')
const {
  listarAlugueis,
  criarAluguel,
  devolverMoto
} = require('../controllers/aluguéisController')

router.get('/', autenticar, listarAlugueis)
router.post('/', autenticar, criarAluguel)
router.patch('/:id/devolver', autenticar, devolverMoto)

module.exports = router
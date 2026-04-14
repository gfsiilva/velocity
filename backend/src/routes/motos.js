const express = require('express')
const router = express.Router()
const autenticar = require('../middlewares/authMiddleware')
const {
  listarMotos,
  buscarMoto,
  criarMoto,
  atualizarMoto,
  deletarMoto
} = require('../controllers/motosController')

router.get('/', listarMotos)
router.get('/:id', buscarMoto)
router.post('/', autenticar, criarMoto)
router.put('/:id', autenticar, atualizarMoto)
router.delete('/:id', autenticar, deletarMoto)

module.exports = router
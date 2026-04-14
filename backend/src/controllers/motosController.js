const prisma = require('../prisma')

const listarMotos = async (req, res) => {
  try {
    const motos = await prisma.moto.findMany()
    res.json(motos)
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao buscar motos' })
  }
}

const buscarMoto = async (req, res) => {
  const { id } = req.params
  try {
    const moto = await prisma.moto.findUnique({
      where: { id: Number(id) }
    })
    if (!moto) return res.status(404).json({ erro: 'Moto não encontrada' })
    res.json(moto)
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao buscar moto' })
  }
}

const criarMoto = async (req, res) => {
  const { nome, marca, categoria, cilindrada, precoPorDia, imagemUrl } = req.body
  try {
    const moto = await prisma.moto.create({
      data: { nome, marca, categoria, cilindrada, precoPorDia, imagemUrl }
    })
    res.status(201).json(moto)
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao criar moto' })
  }
}

const atualizarMoto = async (req, res) => {
  const { id } = req.params
  const dados = req.body
  try {
    const moto = await prisma.moto.update({
      where: { id: Number(id) },
      data: dados
    })
    res.json(moto)
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao atualizar moto' })
  }
}

const deletarMoto = async (req, res) => {
  const { id } = req.params
  try {
    await prisma.moto.delete({
      where: { id: Number(id) }
    })
    res.json({ mensagem: 'Moto deletada com sucesso' })
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao deletar moto' })
  }
}

module.exports = { listarMotos, buscarMoto, criarMoto, atualizarMoto, deletarMoto }
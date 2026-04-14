const prisma = require('../prisma')

const listarAlugueis = async (req, res) => {
  try {
    const alugueis = await prisma.aluguel.findMany({
      where: { userId: req.usuario.id },
      include: { moto: true }
    })
    res.json(alugueis)
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao buscar aluguéis' })
  }
}

const criarAluguel = async (req, res) => {
  const { motoId, dataInicio, dataFim } = req.body
  try {
    const moto = await prisma.moto.findUnique({
      where: { id: Number(motoId) }
    })

    if (!moto) return res.status(404).json({ erro: 'Moto não encontrada' })
    if (!moto.disponivel) return res.status(400).json({ erro: 'Moto indisponível' })

    const inicio = new Date(dataInicio)
    const fim = new Date(dataFim)
    const dias = Math.ceil((fim - inicio) / (1000 * 60 * 60 * 24))
    const valorTotal = dias * moto.precoPorDia

    const aluguel = await prisma.aluguel.create({
      data: {
        userId: req.usuario.id,
        motoId: Number(motoId),
        dataInicio: inicio,
        dataFim: fim,
        valorTotal
      }
    })

    await prisma.moto.update({
      where: { id: Number(motoId) },
      data: { disponivel: false }
    })

    res.status(201).json(aluguel)
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao criar aluguel' })
  }
}

const devolverMoto = async (req, res) => {
  const { id } = req.params
  try {
    const aluguel = await prisma.aluguel.update({
      where: { id: Number(id) },
      data: { status: 'concluido' }
    })

    await prisma.moto.update({
      where: { id: aluguel.motoId },
      data: { disponivel: true }
    })

    res.json({ mensagem: 'Moto devolvida com sucesso!' })
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao devolver moto' })
  }
}

module.exports = { listarAlugueis, criarAluguel, devolverMoto }
const prisma = require('../prisma')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const register = async (req, res) => {
  const { nome, email, senha } = req.body

  try {
    const usuarioExiste = await prisma.user.findUnique({
      where: { email }
    })

    if (usuarioExiste) {
      return res.status(400).json({ erro: 'Email já cadastrado' })
    }

    const senhaCriptografada = await bcrypt.hash(senha, 10)

    const usuario = await prisma.user.create({
      data: {
        nome,
        email,
        senha: senhaCriptografada
      }
    })

    res.status(201).json({ mensagem: 'Usuário criado com sucesso!', id: usuario.id })
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao criar usuário' })
  }
}

const login = async (req, res) => {
  const { email, senha } = req.body

  try {
    const usuario = await prisma.user.findUnique({
      where: { email }
    })

    if (!usuario) {
      return res.status(400).json({ erro: 'Email ou senha inválidos' })
    }

    const senhaValida = await bcrypt.compare(senha, usuario.senha)

    if (!senhaValida) {
      return res.status(400).json({ erro: 'Email ou senha inválidos' })
    }

    const token = jwt.sign(
      { id: usuario.id, email: usuario.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    )

    res.json({ token, nome: usuario.nome })
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao fazer login' })
  }
}

module.exports = { register, login }
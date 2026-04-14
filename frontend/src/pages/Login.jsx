import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useAuth } from '../context/AuthContext'
import api from '../services/api'

function Login() {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState('')
  const [carregando, setCarregando] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErro('')
    setCarregando(true)
    try {
      const res = await api.post('/auth/login', { email, senha })
      login(res.data.token, res.data.nome)
      navigate('/dashboard')
    } catch (err) {
      setErro('Email ou senha inválidos')
    } finally {
      setCarregando(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center px-4">
      <div className="w-full max-w-md flex flex-col gap-12">
        <div className="text-center">
          <span className="text-6xl">
            <span className="font-medium text-white">Velo</span>
            <span className="font-bold text-[#00ff88]">City</span>
          </span>
          <p className="text-white/50 text-sm mt-2">Faça seu login</p>
          <Link to="/" className="text-white/30 hover:text-white/60 text-xs transition mt-1">
            ← Voltar para a página inicial
          </Link>
        </div>

        <Card className="bg-white/5 border-white/10">
          <CardHeader>
            <CardTitle className="text-white text-lg">Entrar na conta</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="flex flex-col gap-8">
              <div className="flex flex-col gap-2">
                <Label className="text-white/70">Email</Label>
                <Input
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-[#00ff88]"
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label className="text-white/70">Senha</Label>
                <Input
                  type="password"
                  placeholder="••••••••"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-[#00ff88]"
                  required
                />
              </div>

              {erro && <p className="text-red-400 text-sm">{erro}</p>}

              <Button
                type="submit"
                disabled={carregando}
                className="bg-[#00ff88] text-black font-bold cursor-pointer hover:bg-[#048b4c] w-full mt-2"
              >
                {carregando ? 'Entrando...' : 'Entrar'}
              </Button>

              <p className="text-white/50 text-sm text-center">
                Não tem conta?{' '}
                <Link to="/cadastro" className="text-[#00ff88] hover:underline">
                  Cadastrar-se
                </Link>
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Login
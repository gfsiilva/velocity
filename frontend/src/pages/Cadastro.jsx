import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import api from '../services/api'

function Cadastro() {
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [confirmarSenha, setConfirmarSenha] = useState('')
  const [erro, setErro] = useState('')
  const [carregando, setCarregando] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErro('')

    if (senha !== confirmarSenha) {
      return setErro('As senhas não coincidem')
    }

    setCarregando(true)
    try {
      await api.post('/auth/register', { nome, email, senha })
      navigate('/login')
    } catch (err) {
      setErro('Erro ao criar conta. Tente novamente.')
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
          <p className="text-white/50 text-sm mt-2">Crie sua conta</p>
        </div>

        <Card className="bg-white/5 border-white/10">
          <CardHeader>
            <CardTitle className="text-white text-lg">Cadastrar</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <Label className="text-white/70">Nome</Label>
                <Input
                  type="text"
                  placeholder="Seu nome completo"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/30"
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label className="text-white/70">Email</Label>
                <Input
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/30"
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
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/30"
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label className="text-white/70">Confirmar senha</Label>
                <Input
                  type="password"
                  placeholder="••••••••"
                  value={confirmarSenha}
                  onChange={(e) => setConfirmarSenha(e.target.value)}
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/30"
                  required
                />
              </div>

              {erro && <p className="text-red-400 text-sm">{erro}</p>}

              <Button
                type="submit"
                disabled={carregando}
                className="bg-[#00ff88] text-black font-bold cursor-pointer hover:bg-[#038649] w-full mt-2"
              >
                {carregando ? 'Cadastrando...' : 'Cadastrar'}
              </Button>

              <p className="text-white/50 text-sm text-center">
                Já tem conta?{' '}
                <Link to="/login" className="text-[#00ff88] hover:underline">
                  Fazer login
                </Link>
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Cadastro
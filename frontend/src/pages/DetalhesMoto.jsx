import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Sidebar from '../components/layout/Sidebar'
import api from '../services/api'

function DetalhesMoto() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [moto, setMoto] = useState(null)
  const [carregando, setCarregando] = useState(true)
  const [dataInicio, setDataInicio] = useState('')
  const [dataFim, setDataFim] = useState('')
  const [alugando, setAlugando] = useState(false)
  const [sucesso, setSucesso] = useState(false)
  const [erro, setErro] = useState('')

  useEffect(() => {
    api.get(`/motos/${id}`)
      .then(res => setMoto(res.data))
      .catch(() => navigate('/motos'))
      .finally(() => setCarregando(false))
  }, [id])

  const calcularDias = () => {
    if (!dataInicio || !dataFim) return 0
    const inicio = new Date(dataInicio)
    const fim = new Date(dataFim)
    const dias = Math.ceil((fim - inicio) / (1000 * 60 * 60 * 24))
    return dias > 0 ? dias : 0
  }

  const handleAlugar = async () => {
    setErro('')
    if (!dataInicio || !dataFim) return setErro('Preencha as datas')
    if (calcularDias() <= 0) return setErro('Data de fim deve ser maior que a de início')

    setAlugando(true)
    try {
      await api.post('/alugueis', {
        motoId: id,
        dataInicio,
        dataFim
      })
      setSucesso(true)
      setTimeout(() => navigate('/dashboard'), 2000)
    } catch (err) {
      setErro('Erro ao realizar aluguel. Tente novamente.')
    } finally {
      setAlugando(false)
    }
  }

  if (carregando) return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center">
      <p className="text-white/50">Carregando...</p>
    </div>
  )

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex">
      <Sidebar />
      <main className="ml-48 flex-1 p-8 flex flex-col gap-8">
        <button
          onClick={() => navigate('/motos')}
          className="text-white/50 hover:text-white text-sm transition w-fit"
        >
          ← Voltar para motos
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Imagem e info */}
          <div className="flex flex-col gap-4">
            <div className="bg-white/5 rounded-xl overflow-hidden h-100">
              {moto.imagemUrl ? (
                <img src={moto.imagemUrl} alt={moto.nome} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-8xl">🏍️</div>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3">
                <h1 className="text-3xl font-bold">{moto.nome}</h1>
                <Badge className={`text-xs border ${
                  moto.disponivel
                    ? 'bg-[#00ff88]/20 text-[#00ff88] border-[#00ff88]/30'
                    : 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
                }`}>
                  {moto.disponivel ? 'Disponível' : 'Alugada'}
                </Badge>
              </div>
              <p className="text-white/50">{moto.marca} · {moto.categoria} · {moto.cilindrada}cc</p>
              <p className="text-[#00ff88] text-2xl font-bold mt-2">
                R$ {moto.precoPorDia} <span className="text-white/40 text-sm font-normal">/dia</span>
              </p>
            </div>
          </div>

          {/* Formulário de aluguel */}
          <Card className="bg-white/5 border-white/10 h-fit">
            <CardContent className="p-6 flex flex-col gap-4">
              <h2 className="text-xl font-bold">Esxolha a data desejada</h2>

              {sucesso ? (
                <div className="flex flex-col items-center gap-3 py-8">
                  <span className="text-5xl">✅</span>
                  <p className="text-[#00ff88] font-bold text-lg">Aluguel realizado!</p>
                  <p className="text-white/50 text-sm">Redirecionando para o dashboard...</p>
                </div>
              ) : (
                <>
                  <div className="flex flex-col gap-2">
                    <Label className="text-white/70">Data de início</Label>
                    <Input
                      type="date"
                      value={dataInicio}
                      onChange={(e) => setDataInicio(e.target.value)}
                      className="bg-white/5 border-white/10 text-white cursor-pointer"
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label className="text-white/70 ">Data de devolução</Label>
                    <Input
                      type="date"
                      value={dataFim}
                      onChange={(e) => setDataFim(e.target.value)}
                      className="bg-white/5 border-white/10 text-white cursor-pointer"
                      min={dataInicio || new Date().toISOString().split('T')[0]}
                    />
                  </div>

                  {calcularDias() > 0 && (
                    <div className="bg-white/5 rounded-lg p-4 flex justify-between items-center">
                      <span className="text-white/50 text-sm">{calcularDias()} dias × R$ {moto.precoPorDia}</span>
                      <span className="text-[#00ff88] font-bold">
                        R$ {(calcularDias() * moto.precoPorDia).toFixed(2)}
                      </span>
                    </div>
                  )}

                  {erro && <p className="text-red-400 text-sm">{erro}</p>}

                  <Button
                    onClick={handleAlugar}
                    disabled={alugando || !moto.disponivel}
                    className="bg-[#00ff88] text-black font-bold cursor-pointer hover:bg-[#079754] w-full mt-2"
                  >
                    {alugando ? 'Processando...' : 'Confirmar aluguel'}
                  </Button>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

export default DetalhesMoto
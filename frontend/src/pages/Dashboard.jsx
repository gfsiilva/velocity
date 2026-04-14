import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Sidebar from '../components/layout/Sidebar'
import api from '../services/api'

function Dashboard() {
  const { usuario } = useAuth()
  const navigate = useNavigate()
  const [alugueis, setAlugueis] = useState([])
  const [carregando, setCarregando] = useState(true)

  useEffect(() => {
    api.get('/alugueis')
      .then(res => setAlugueis(res.data))
      .catch(err => console.error(err))
      .finally(() => setCarregando(false))
  }, [])

  const ativos = alugueis.filter(a => a.status === 'ativo')

  const statusCor = {
    'ativo': 'bg-[#00ff88]/20 text-[#00ff88] border-[#00ff88]/30',
    'concluido': 'bg-white/10 text-white/60 border-white/20',
    'atrasado': 'bg-red-500/20 text-red-400 border-red-500/30',
  }

  const formatarData = (data) => new Date(data).toLocaleDateString('pt-BR')

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex">
      <Sidebar />
      <main className="ml-48 flex-1 p-8 flex flex-col gap-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { icon: '🏍️', label: 'Motos alugadas', valor: alugueis.length, sub: 'Total de aluguéis' },
            { icon: '📅', label: 'Aluguéis ativos', valor: ativos.length, sub: 'Em andamento' },
            { icon: '💰', label: 'Total gasto', valor: `R$ ${alugueis.reduce((acc, a) => acc + a.valorTotal, 0).toFixed(2)}`, sub: 'Em aluguéis' },
          ].map((card) => (
            <Card key={card.label} className="bg-white/5 border-white/10">
              <CardContent className="py-6 flex items-center gap-4">
                <span className="text-3xl">{card.icon}</span>
                <div>
                  <p className="text-white/50 text-xs">{card.label}</p>
                  <p className="text-2xl font-bold text-white">{card.valor}</p>
                  <p className="text-white/30 text-xs">{card.sub}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div>
          <h2 className="text-xl font-bold mb-4">Seus Aluguéis</h2>
          {carregando ? (
            <p className="text-white/50">Carregando...</p>
          ) : alugueis.length === 0 ? (
            <Card className="bg-white/5 border-white/10">
              <CardContent className="flex flex-col items-center gap-4 py-12">
                <p className="text-white/50">Você ainda não tem nenhum aluguel.</p>
                <Button
                  onClick={() => navigate('/motos')}
                  className="bg-[#00ff88] text-black font-bold hover:bg-[#00dd77]"
                >
                  Alugar uma moto agora
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="flex flex-col gap-3">
              {alugueis.map((a) => (
                <Card key={a.id} className="bg-white/5 border-white/10">
                  <CardContent className="py-4 flex items-center justify-between">
                    <div className="flex flex-col gap-2">
                      <p className="font-semibold text-white">{a.moto?.nome}</p>
                      <div className="flex items-center gap-4 text-white/40 text-sm">
                        <span>Retirada: {formatarData(a.dataInicio)}</span>
                        <span>|</span>
                        <span>Devolução: {formatarData(a.dataFim)}</span>
                      </div>
                      <Badge className={`w-fit text-xs border ${statusCor[a.status]}`}>
                        {a.status === 'ativo' ? 'Em andamento' : a.status === 'concluido' ? 'Concluído' : 'Atrasado'}
                      </Badge>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <p className="text-[#00ff88] font-bold">R$ {a.valorTotal.toFixed(2)}</p>
                      <Button
                        onClick={() => navigate(`/motos/${a.motoId}`)}
                        className="bg-white/5 border border-white/10 text-white hover:bg-white/10 text-sm"
                      >
                        Ver detalhes
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default Dashboard
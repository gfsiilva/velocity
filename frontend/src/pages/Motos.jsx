import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import Sidebar from '../components/layout/Sidebar'
import api from '../services/api'

function Motos() {
  const [motos, setMotos] = useState([])
  const [categoria, setCategoria] = useState('Todos')
  const [carregando, setCarregando] = useState(true)
  const navigate = useNavigate()

  const categorias = ['Todos', 'Adventure', 'Sport', 'Custom', 'Até 300cc', '400-700cc', 'Acima de 700cc']

  useEffect(() => {
    api.get('/motos')
      .then(res => setMotos(res.data))
      .catch(err => console.error(err))
      .finally(() => setCarregando(false))
  }, [])

  const motosFiltradas = categoria === 'Todos'
    ? motos
    : motos.filter(m => m.categoria === categoria)

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex">
      <Sidebar />
      <main className="ml-48 flex-1 p-8 flex flex-col gap-6">
        <h1 className="text-2xl font-bold">Motos Disponíveis</h1>

        {/* Filtros */}
        <div className="flex gap-3 flex-wrap">
          {categorias.map(cat => (
            <button
              key={cat}
              onClick={() => setCategoria(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium cursor-pointer transition ${categoria === cat
                  ? 'bg-[#00ff88] text-black'
                  : 'bg-white/5 text-white/60 hover:bg-white/10'
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid de motos */}
        {carregando ? (
          <p className="text-white/50">Carregando motos...</p>
        ) : motosFiltradas.length === 0 ? (
          <p className="text-white/50">Nenhuma moto encontrada nessa categoria.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {motosFiltradas.map(moto => (
              <Card key={moto.id} className="bg-white/5 border-white/10 hover:border-[#00ff88]/30 transition">
                <CardContent className="p-4 flex flex-col gap-3">
                  <div className="bg-white/5 rounded-lg h-36 overflow-hidden">
                    {moto.imagemUrl ? (
                      <img
                        src={moto.imagemUrl}
                        alt={moto.nome}
                        className="w-full h-full object-cover"
                        onError={(e) => e.target.src = ''}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-6xl">🏍️</div>
                    )}
                  </div>
                  <div>
                    <p className="font-semibold text-white">{moto.nome}</p>
                    <p className="text-white/40 text-xs">{moto.categoria}, {moto.cilindrada}cc</p>
                  </div>
                  <Badge className={`w-fit text-xs border ${!moto.disponivel
                      ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
                      : 'bg-[#00ff88]/20 text-[#00ff88] border-[#00ff88]/30'
                    }`}>
                    {!moto.disponivel ? 'Alugada' : 'Disponível'}
                  </Badge>
                  <p className="text-[#00ff88] font-bold">
                    R$ {moto.precoPorDia} <span className="text-white/40 font-normal text-xs">/dia</span>
                  </p>
                  <Button
                    onClick={() => navigate(`/motos/${moto.id}`)}
                    className="bg-[#00ff88] text-black font-semibold cursor-pointer hover:bg-[#009952] w-full"
                    disabled={!moto.disponivel}
                  >
                    Alugar
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}

export default Motos
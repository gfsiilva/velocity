import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

function Home() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-16 py-4 border-b border-white/10">
        <span className="text-xl">
          <span className="font-medium text-white">Velo</span>
          <span className="font-bold text-[#00ff88]">City</span>
        </span>
        <div className="flex items-center gap-8">
          <Link to="/" className="text-white/70 hover:text-white text-sm transition">Início</Link>
          <Link to="/motos" className="text-white/70 hover:text-white text-sm transition">Motos</Link>
          <span className="text-white/70 text-sm cursor-pointer hover:text-white transition">Serviços</span>
        </div>
        <div className="flex gap-3 items-center">
          <Link to="/cadastro" className="text-white/70 hover:text-white text-sm transition">
            Cadastrar-se
          </Link>
          <Button asChild className="bg-[#00ff88] text-black font-semibold hover:bg-[#00dd77]">
            <Link to="/login">Entrar</Link>
          </Button>
        </div>
      </nav>

      {/* Hero */}
      <section className="flex items-center justify-between px-16 py-20 max-w-6xl mx-auto">
        <div className="flex flex-col gap-6 max-w-lg">
          <Badge className="bg-[#00ff88]/10 text-[#00ff88] border border-[#00ff88]/30 w-fit">
            🏍️ Aluguel de motos premium
          </Badge>
          <h1 className="text-5xl font-bold leading-tight">
            A sua melhor <br />
            <em className="not-italic text-white/80">experiência</em> é na{' '}
            <span className="text-8xl">
              <span className="font-medium text-white">Velo</span>
              <span className="font-bold text-[#00ff88]">City</span>
            </span>
          </h1>
          <p className="text-white/50 text-base">
            Alugue motos de alta performance com segurança, praticidade e o melhor preço do mercado.
          </p>
          <Button asChild className="bg-[#00ff88] text-black font-bold hover:bg-[#00dd77] w-fit px-8 py-6 text-base">
            <Link to="/cadastro">Alugar agora!</Link>
          </Button>
        </div>
{/* Imagem da moto */}
        <div className="hidden md:block">
          <img
            src="/image/moto1.png" // caminho da imagem dentro da pasta public
            alt="Moto Velocity"
            className="w-300 h-auto select-none object-contain"
          />
        </div>      </section>

      {/* Categorias */}
      <section className="px-16 py-12 max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold mb-2">
          Escolha a <span className="text-[#00ff88]">máquina</span> que combina com você.
        </h2>
        <p className="text-white/40 text-sm mb-8">Temos opções para todos os estilos e necessidades.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { titulo: 'Baixa cilindrada', cor: '#00ff88', desc: 'Ideal para quem está começando ou para uso urbano no dia a dia.' },
            { titulo: 'Média cilindrada', cor: '#ffaa00', desc: 'Versátil e com potência para se aventurar em diferentes estradas.' },
            { titulo: 'Alta cilindrada', cor: '#ff4444', desc: 'Alta performance para estradas longas e aventuras intensas.' },
          ].map((item) => (
            <Card key={item.titulo} className="bg-white/5 border-white/10 hover:border-white/20 transition">
              <CardHeader>
                <CardTitle className="text-base" style={{ color: item.cor }}>{item.titulo}</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                <p className="text-white/50 text-sm">{item.desc}</p>
                <Button asChild className="bg-[#00ff88] text-black font-semibold hover:bg-[#00dd77] w-fit">
                  <Link to="/motos">Ver motos</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* O que oferecemos */}
      <section className="px-16 py-12 max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-10">O que oferecemos</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { titulo: 'Aluguel de motos', desc: 'Escolha o modelo ideal e alugue por dia, semana ou mês.' },
            { titulo: 'Manutenção e revisão', desc: 'Garantimos que todas as motos estejam em perfeito estado.' },
            { titulo: 'Suporte ao cliente', desc: 'Atendimento rápido e fácil para dúvidas e emergências.' },
          ].map((item) => (
            <Card key={item.titulo} className="bg-white/5 border-white/10 hover:border-[#00ff88]/30 transition">
              <CardHeader>
                <CardTitle className="text-[#00ff88] text-base">{item.titulo}</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                <p className="text-white/50 text-sm">{item.desc}</p>
                <Button variant="outline" className="border-[#00ff88]/30 text-[#00ff88] hover:bg-[#00ff88]/10 w-fit">
                  Ver mais
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Onde estamos */}
      <section className="px-16 py-12 max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-8">Onde estamos</h2>
        <Card className="bg-white/5 border-white/10">
          <CardContent className="flex flex-col items-center gap-4 py-8">
            <p className="text-white/70">📍 Rua das Velocidades, 123 — Recife, PE</p>
            <p className="text-white/50 text-sm">Segunda a sábado, das 8h às 18h</p>
            <Button className="bg-[#00ff88] text-black font-bold hover:bg-[#00dd77]">
              Ver no mapa
            </Button>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="text-center text-white/30 py-8 border-t border-white/10 mt-8">
        © 2024 VeloCity. Todos os direitos reservados.
      </footer>
    </div>
  )
}

export default Home
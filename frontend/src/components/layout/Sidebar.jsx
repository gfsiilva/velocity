import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

function Sidebar() {
  const { logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const ativo = (path) =>
    location.pathname === path
      ? 'bg-[#00ff88]/10 text-[#00ff88]'
      : 'text-white/50 hover:text-white hover:bg-white/5'

  return (
    <aside className="w-48 min-h-screen bg-[#111] border-r border-white/10 flex flex-col py-6 px-4 gap-2 fixed">
      <span className="text-lg mb-6 px-2">
        <span className="font-medium text-white">Velo</span>
        <span className="font-bold text-[#00ff88]">City</span>
      </span>
      <button
        onClick={() => navigate('/dashboard')}
        className={`flex items-center gap-3 px-3 py-2 cursor-pointer rounded-lg text-sm font-medium transition ${ativo('/dashboard')}`}
      >
        🏠 Dashboard
      </button>
      <button
        onClick={() => navigate('/motos')}
        className={`flex items-center gap-3 cursor-pointer px-3 py-2 rounded-lg text-sm font-medium transition ${ativo('/motos')}`}
      >
        🏍️ Motos
      </button>
      <button className="flex items-center gap-3 px-3 cursor-pointer py-2 rounded-lg text-white/50 hover:text-white hover:bg-white/5 text-sm transition">
        👤 Perfil
      </button>
      <button className="flex items-center gap-3 px-3 cursor-pointer py-2 rounded-lg text-white/50 hover:text-white hover:bg-white/5 text-sm transition">
        📋 Histórico
      </button>
      <button
        onClick={handleLogout}
        className="flex items-center gap-3 px-3 cursor-pointer py-2 rounded-lg text-white/50 hover:text-red-400 hover:bg-red-500/10 text-sm transition mt-auto"
      >
        🚪 Sair
      </button>
    </aside>
  )
}

export default Sidebar
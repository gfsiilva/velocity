# 🏍️ VeloCity — Plataforma de Aluguel de Motos

Sistema web completo de aluguel de motos com autenticação JWT, CRUD completo e interface moderna.

## 🔗 Demo
> Link do deploy aqui colco depois

## 🖥️ Telas
- **Home** — página pública com apresentação do serviço
- **Cadastro/Login** — autenticação com JWT
- **Dashboard** — painel do usuário com histórico de aluguéis
- **Motos** — listagem com filtros por categoria
- **Detalhes** — informações da moto e formulário de aluguel

## 🧱 Tecnologias

### Frontend
- React + Vite
- Tailwind CSS
- shadcn/ui
- React Router DOM
- Axios

### Backend
- Node.js + Express
- Prisma ORM
- PostgreSQL (Supabase)
- JWT + Bcrypt

## ⚙️ Como rodar localmente

### Pré-requisitos
- Node.js instalado
- Conta no Supabase (gratuito)

### Backend
```bash
cd backend
npm install
# configure o .env com suas variáveis
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Variáveis de ambiente (backend/.env)
```env
DATABASE_URL="sua_url_do_supabase"
JWT_SECRET="sua_chave_secreta"
PORT=3000
```

## 📁 Estrutura do projeto
```
velocity/
├── backend/
│   ├── prisma/         # Schema do banco de dados
│   └── src/
│       ├── controllers/ # Lógica de negócio
│       ├── middlewares/ # Autenticação JWT
│       └── routes/      # Endpoints da API
└── frontend/
    └── src/
        ├── components/  # Componentes reutilizáveis
        ├── context/     # Contexto de autenticação
        ├── pages/       # Telas da aplicação
        └── services/    # Integração com a API
```

## 🔐 Funcionalidades
-  Cadastro de usuário com senha criptografada
-  Login com geração de token JWT
-  Rotas protegidas no frontend e backend
-  Listagem de motos com filtros por categoria
-  Aluguel com cálculo automático de valor
-  Dashboard com histórico de aluguéis em tempo real


# 🎮 CSBlox - Marketplace de Skins CS2

Marketplace brasileiro completo de skins Counter-Strike 2 com autenticação Steam, pagamento PIX via Mercado Pago e interface moderna.

## ✨ Funcionalidades Implementadas

### ✅ Core Features
- 🔐 **Autenticação Steam** - Login seguro via Steam OpenID
- 🏪 **Marketplace Completo** - Navegação, filtros avançados e busca
- 💰 **Sistema de Carteira** - Depósitos PIX e saques
- 📊 **Dashboard do Usuário** - Estatísticas, histórico e gerenciamento
- ⚙️ **Configurações** - Trade URL, notificações e preferências
- 🎨 **UI Moderna** - Dark mode, animações e design responsivo

### 🔧 Tecnologias

- **Framework**: Next.js 15 (App Router)
- **Linguagem**: TypeScript
- **Estilização**: TailwindCSS + shadcn/ui
- **Banco de Dados**: PostgreSQL + Prisma ORM
- **Autenticação**: NextAuth.js (Steam OpenID)
- **Pagamentos**: Mercado Pago (PIX)
- **State Management**: Zustand
- **Forms**: React Hook Form + Zod

## 🚀 Como Rodar o Projeto

### Pré-requisitos

- Node.js 18+ instalado
- PostgreSQL instalado e rodando
- Conta Steam Developer (para Steam API Key)
- Conta Mercado Pago (para pagamentos)

### 1. Clone o repositório

\`\`\`bash
git clone https://github.com/seu-usuario/csblox-marketplace.git
cd csblox-marketplace
\`\`\`

### 2. Instale as dependências

\`\`\`bash
npm install
\`\`\`

### 3. Configure as variáveis de ambiente

Copie o arquivo \`.env.local\` e configure suas credenciais:

\`\`\`env
# Database
DATABASE_URL="postgresql://postgres:password@localhost:5432/csblox"

# Auth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="gere-uma-chave-secreta-com-openssl-rand-base64-32"

# Steam API (Obtenha em: https://steamcommunity.com/dev/apikey)
STEAM_API_KEY="sua-steam-api-key"
STEAM_CALLBACK_URL="http://localhost:3000/api/auth/callback/steam"

# Mercado Pago (Obtenha em: https://www.mercadopago.com.br/developers)
NEXT_PUBLIC_MP_PUBLIC_KEY="TEST-xxxxx"
MP_ACCESS_TOKEN="TEST-xxxxx"

# URLs
NEXT_PUBLIC_APP_URL="http://localhost:3000"
SITE_URL="http://localhost:3000"
\`\`\`

### 4. Configure o banco de dados

\`\`\`bash
# Gerar o Prisma Client
npx prisma generate

# Criar as tabelas no banco
npx prisma db push

# (Opcional) Abrir o Prisma Studio para visualizar dados
npx prisma studio
\`\`\`

### 5. Rode o projeto

\`\`\`bash
npm run dev
\`\`\`

Acesse: **http://localhost:3000**

## 📁 Estrutura do Projeto

\`\`\`
csblox-marketplace/
├── prisma/
│   └── schema.prisma          # Schema do banco de dados
├── public/                    # Arquivos estáticos
├── src/
│   ├── app/                   # Páginas e rotas (App Router)
│   │   ├── api/              # API Routes
│   │   │   └── auth/         # NextAuth endpoints
│   │   ├── dashboard/        # Dashboard do usuário
│   │   ├── marketplace/      # Marketplace de skins
│   │   ├── wallet/           # Sistema de carteira
│   │   ├── settings/         # Configurações
│   │   ├── layout.tsx        # Layout principal
│   │   └── page.tsx          # Landing page
│   ├── components/           # Componentes React
│   │   ├── layout/          # Navbar, Footer, etc
│   │   ├── marketplace/     # Componentes do marketplace
│   │   ├── providers/       # Context providers
│   │   └── ui/              # Componentes shadcn/ui
│   ├── lib/                  # Utilitários e configs
│   │   ├── auth.ts          # Configuração NextAuth
│   │   ├── db.ts            # Prisma Client
│   │   └── utils.ts         # Funções auxiliares
│   └── types/               # TypeScript types
├── .env.local               # Variáveis de ambiente (não commitado)
├── components.json          # Config shadcn/ui
├── next.config.ts           # Config Next.js
├── package.json             # Dependências
├── tailwind.config.ts       # Config Tailwind
└── tsconfig.json            # Config TypeScript
\`\`\`

## 🎯 Próximos Passos (Em Desenvolvimento)

- [ ] Sistema de vendas com inventário Steam
- [ ] Checkout e processamento de compras
- [ ] Integração completa Mercado Pago
- [ ] Sistema de notificações em tempo real
- [ ] Admin Panel
- [ ] Sistema de reviews e reputação
- [ ] Chat entre usuário e vendedor
- [ ] Deploy em produção

## 🔐 Obtendo Credenciais

### Steam API Key

1. Acesse: https://steamcommunity.com/dev/apikey
2. Faça login com sua conta Steam
3. Preencha o domain name (use localhost para desenvolvimento)
4. Copie a chave gerada

### Mercado Pago

1. Crie uma conta em: https://www.mercadopago.com.br/
2. Acesse: https://www.mercadopago.com.br/developers
3. Crie uma aplicação
4. Copie as credenciais de teste (Public Key e Access Token)

### NextAuth Secret

Gere uma chave secreta:

\`\`\`bash
openssl rand -base64 32
\`\`\`

## 📝 Scripts Disponíveis

\`\`\`bash
npm run dev          # Inicia servidor de desenvolvimento
npm run build        # Build para produção
npm run start        # Inicia servidor de produção
npm run lint         # Roda o linter
npx prisma studio    # Abre interface visual do banco
npx prisma generate  # Gera Prisma Client
npx prisma db push   # Sincroniza schema com banco
\`\`\`

## 🐛 Troubleshooting

### Erro ao conectar no banco

Verifique se o PostgreSQL está rodando e se a \`DATABASE_URL\` está correta.

### Erro de autenticação Steam

Certifique-se de que:
- A \`STEAM_API_KEY\` está correta
- A \`NEXTAUTH_URL\` corresponde à URL que você está usando
- O callback URL está configurado corretamente

### Erro ao gerar Prisma Client

\`\`\`bash
rm -rf node_modules
npm install
npx prisma generate
\`\`\`

## 📄 Licença

Este projeto é um MVP educacional. Para uso comercial, consulte as licenças das tecnologias utilizadas.

## 🤝 Contribuindo

Contribuições são bem-vindas! Abra uma issue ou pull request.

## 📧 Suporte

Para dúvidas e suporte, abra uma issue no repositório.

---

**Desenvolvido com ❤️ para a comunidade CS2 brasileira**

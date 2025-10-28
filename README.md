# 🎮 CSBlox Marketplace

> Marketplace profissional de skins CS2 com sistema completo de compra, venda e pagamento via PIX

[![Next.js](https://img.shields.io/badge/Next.js-16.0-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.0-38bdf8)](https://tailwindcss.com/)
[![Prisma](https://img.shields.io/badge/Prisma-6.18-2D3748)](https://www.prisma.io/)

## 🚀 Funcionalidades

### ✅ Implementadas

- **🔐 Autenticação Steam**
  - Login via Steam OpenID (mock para desenvolvimento)
  - Sincronização automática de perfil
  - Sistema de sessões com NextAuth

- **🎒 Sistema de Inventário**
  - Integração com Steam API
  - Visualização de skins do CS2
  - Filtros por raridade, exterior e tipo
  - Seleção múltipla para anunciar

- **💰 Sistema de Pagamentos**
  - Depósitos via PIX (Mercado Pago)
  - QR Code automático
  - Confirmação instantânea
  - Saques via PIX

- **🛍️ Marketplace**
  - Listagem de skins disponíveis
  - Filtros avançados (preço, raridade, float)
  - Sistema de favoritos
  - Visualização detalhada de itens

- **📊 Dashboard**
  - Estatísticas do usuário
  - Histórico de transações
  - Saldo disponível
  - Anúncios ativos

- **⚙️ Configurações**
  - Trade URL do Steam
  - Dados pessoais
  - Chaves PIX para saque

### 🔜 Em Desenvolvimento

- [ ] Sistema de notificações em tempo real
- [ ] Chat entre comprador e vendedor
- [ ] Sistema de reputação
- [ ] Histórico de preços
- [ ] API pública
- [ ] App mobile

## 🛠️ Tecnologias

### Frontend
- **Next.js 16** - Framework React com App Router
- **TypeScript** - Tipagem estática
- **TailwindCSS v4** - Estilização moderna
- **Shadcn/ui** - Componentes reutilizáveis
- **Framer Motion** - Animações

### Backend
- **Next.js API Routes** - Serverless functions
- **Prisma** - ORM TypeScript
- **PostgreSQL** - Banco de dados
- **NextAuth.js** - Autenticação

### Integrações
- **Steam Web API** - Inventário e perfis
- **Mercado Pago** - Pagamentos PIX
- **Upstash Redis** - Cache e rate limiting

## 📦 Instalação

### Pré-requisitos

- Node.js 18+
- PostgreSQL 14+
- Conta Steam (para testes)
- Conta Mercado Pago (para pagamentos reais)

### Passo a Passo

1. **Clone o repositório**
```bash
git clone https://github.com/eubbbruno/csblox-marketplace.git
cd csblox-marketplace
```

2. **Instale as dependências**
```bash
npm install
```

3. **Configure as variáveis de ambiente**

Crie um arquivo `.env.local`:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/csblox"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="seu-secret-aqui-gere-com-openssl-rand-base64-32"

# Steam
STEAM_API_KEY="sua-steam-api-key"
STEAM_RETURN_URL="http://localhost:3000/api/auth/steam/callback"

# Mercado Pago
MERCADOPAGO_ACCESS_TOKEN="seu-access-token"
MERCADOPAGO_PUBLIC_KEY="sua-public-key"

# Upstash Redis (opcional)
UPSTASH_REDIS_REST_URL="https://..."
UPSTASH_REDIS_REST_TOKEN="..."
```

4. **Configure o banco de dados**
```bash
npx prisma migrate dev
npx prisma generate
```

5. **Inicie o servidor de desenvolvimento**
```bash
npm run dev
```

6. **Acesse a aplicação**
```
http://localhost:3000
```

## 🗂️ Estrutura do Projeto

```
csblox-marketplace/
├── src/
│   ├── app/                    # App Router do Next.js
│   │   ├── api/               # API Routes
│   │   │   ├── auth/          # Autenticação Steam
│   │   │   ├── steam/         # Inventário e perfis
│   │   │   └── payments/      # Mercado Pago
│   │   ├── dashboard/         # Dashboard do usuário
│   │   ├── marketplace/       # Listagem de skins
│   │   ├── inventory/         # Inventário do usuário
│   │   ├── wallet/            # Carteira e pagamentos
│   │   └── login/             # Página de login
│   ├── components/            # Componentes React
│   │   ├── ui/               # Componentes base (shadcn)
│   │   ├── layout/           # Layout components
│   │   └── marketplace/      # Componentes específicos
│   ├── lib/                   # Utilitários
│   │   ├── auth.ts           # Configuração NextAuth
│   │   ├── db.ts             # Prisma Client
│   │   └── utils.ts          # Funções auxiliares
│   └── types/                 # Tipos TypeScript
├── prisma/
│   └── schema.prisma          # Schema do banco
└── public/                    # Arquivos estáticos
```

## 🔧 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev              # Iniciar servidor dev
npm run build           # Build de produção
npm run start           # Iniciar servidor produção
npm run lint            # Verificar código

# Prisma
npx prisma studio       # Interface visual do banco
npx prisma migrate dev  # Criar migração
npx prisma generate     # Gerar Prisma Client
npx prisma db push      # Sync schema com banco
```

## 🌐 Deploy

### Vercel (Recomendado)

1. Faça push do código para o GitHub
2. Importe o projeto no [Vercel](https://vercel.com)
3. Configure as variáveis de ambiente
4. Deploy automático!

### Variáveis de Ambiente (Produção)

Configure estas variáveis no painel da Vercel:

- `DATABASE_URL`
- `NEXTAUTH_URL`
- `NEXTAUTH_SECRET`
- `STEAM_API_KEY`
- `MERCADOPAGO_ACCESS_TOKEN`
- `MERCADOPAGO_PUBLIC_KEY`

## 📊 Banco de Dados

O projeto usa PostgreSQL com Prisma. Schema principal:

```prisma
model User {
  id            String    @id @default(cuid())
  steamId       String    @unique
  username      String
  avatar        String?
  balance       Float     @default(0)
  tradeUrl      String?
  transactions  Transaction[]
  listings      Listing[]
}

model Listing {
  id            String    @id @default(cuid())
  itemName      String
  price         Float
  status        Status
  user          User      @relation(...)
}

model Transaction {
  id            String    @id @default(cuid())
  type          TransactionType
  amount        Float
  status        Status
  user          User      @relation(...)
}
```

## 🤝 Contribuindo

Contribuições são bem-vindas! Por favor:

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'feat: Minha nova feature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👤 Autor

**Bruno**
- GitHub: [@eubbbruno](https://github.com/eubbbruno)

## 🙏 Agradecimentos

- [Valve Corporation](https://www.valvesoftware.com/) - Counter-Strike 2
- [Steam](https://steamcommunity.com/) - API e documentação
- [Mercado Pago](https://www.mercadopago.com.br/) - Sistema de pagamentos
- [Shadcn/ui](https://ui.shadcn.com/) - Componentes UI

---

⭐ Se este projeto te ajudou, deixe uma estrela no GitHub!

🎮 **Divirta-se negociando skins!**

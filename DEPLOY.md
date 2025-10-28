# 🚀 Guia de Deploy - CSBlox Marketplace

## Deploy na Vercel

### 1. Pré-requisitos

- Conta no GitHub
- Conta na Vercel (https://vercel.com)
- Banco PostgreSQL em produção (Supabase, Neon, etc)
- Credenciais Steam API e Mercado Pago configuradas

### 2. Configurar Banco de Dados em Produção

#### Opção A: Supabase (Recomendado)

1. Acesse https://supabase.com e crie um projeto
2. Vá em Settings > Database
3. Copie a Connection String (modo Transaction)
4. Use como \`DATABASE_URL\`

#### Opção B: Neon

1. Acesse https://neon.tech e crie um projeto
2. Copie a Connection String
3. Use como \`DATABASE_URL\`

#### Opção C: Railway

1. Acesse https://railway.app
2. Crie um PostgreSQL Database
3. Copie a Connection String

### 3. Fazer Push no GitHub

\`\`\`bash
# Se ainda não tem repositório remoto
git remote add origin https://github.com/seu-usuario/csblox-marketplace.git
git branch -M main
git push -u origin main
\`\`\`

### 4. Configurar na Vercel

#### 4.1 Importar Projeto

1. Acesse https://vercel.com
2. Clique em "Add New Project"
3. Importe o repositório do GitHub
4. Framework Preset: **Next.js** (detectado automaticamente)

#### 4.2 Configurar Variáveis de Ambiente

Em **Environment Variables**, adicione:

\`\`\`env
# Database
DATABASE_URL=postgresql://user:pass@host:5432/dbname

# Auth
NEXTAUTH_URL=https://seu-dominio.vercel.app
NEXTAUTH_SECRET=sua-chave-secreta-gerada

# Steam
STEAM_API_KEY=sua-steam-api-key
STEAM_CALLBACK_URL=https://seu-dominio.vercel.app/api/auth/callback/steam

# Mercado Pago
NEXT_PUBLIC_MP_PUBLIC_KEY=seu-public-key-producao
MP_ACCESS_TOKEN=seu-access-token-producao

# URLs
NEXT_PUBLIC_APP_URL=https://seu-dominio.vercel.app
SITE_URL=https://seu-dominio.vercel.app
\`\`\`

#### 4.3 Configurar Build Settings

- **Framework Preset**: Next.js
- **Root Directory**: ./
- **Build Command**: \`npm run build\`
- **Install Command**: \`npm install\`

### 5. Deploy

1. Clique em **Deploy**
2. Aguarde o build completar (~2-5 minutos)
3. Acesse o domínio gerado

### 6. Após o Deploy

#### 6.1 Sincronizar Banco de Dados

\`\`\`bash
# Opção 1: Via Vercel CLI (Recomendado)
vercel env pull .env.production
npx prisma db push

# Opção 2: Via GitHub Actions (configurar depois)
\`\`\`

#### 6.2 Verificar Steam Callback

1. Atualize a Steam API Key settings com o novo domínio
2. Teste o login Steam no site em produção

#### 6.3 Configurar Domínio Customizado (Opcional)

1. Vá em Settings > Domains na Vercel
2. Adicione seu domínio
3. Configure os DNS conforme instruções

## Configuração de Webhooks (Mercado Pago)

### 1. Criar Webhook Endpoint

Já está implementado em: \`/api/webhooks/mercadopago\`

### 2. Configurar no Mercado Pago

1. Acesse https://www.mercadopago.com.br/developers
2. Vá em Webhooks
3. Adicione: \`https://seu-dominio.vercel.app/api/webhooks/mercadopago\`
4. Eventos: payments, chargebacks

## Monitoramento

### Vercel Analytics

1. Vá em Analytics na Vercel
2. Ative o Web Analytics (gratuito)
3. Monitore performance e erros

### Logs

\`\`\`bash
# Ver logs em tempo real
vercel logs

# Ver logs específicos
vercel logs --follow
\`\`\`

## Troubleshooting

### Build Falha

\`\`\`bash
# Erro comum: Prisma Client não gerado
# Solução: Adicionar no package.json
{
  "scripts": {
    "postinstall": "prisma generate"
  }
}
\`\`\`

### Erro de Database Connection

- Verifique se a \`DATABASE_URL\` está correta
- Confirme que o IP da Vercel está na whitelist do banco
- Use connection pooling (PgBouncer) para produção

### Steam Login não funciona

- Verifique se \`NEXTAUTH_URL\` está correto
- Atualize o callback URL no Steam Developer
- Confirme que o \`NEXTAUTH_SECRET\` está configurado

## Otimizações para Produção

### 1. Caching

Já configurado no Next.js 15 automaticamente.

### 2. Image Optimization

As imagens do Steam são otimizadas automaticamente pelo Next.js Image.

### 3. Database Connection Pooling

Use PgBouncer ou Supabase Pooler para melhor performance:

\`\`\`env
# Supabase Pooler Example
DATABASE_URL=postgresql://postgres:pass@pooler.supabase.com:6543/postgres?pgbouncer=true
\`\`\`

### 4. Rate Limiting

Implementar Redis (Upstash) para rate limiting:

\`\`\`bash
npm install @upstash/redis @upstash/ratelimit
\`\`\`

## Backup do Banco

\`\`\`bash
# Backup manual
pg_dump -h host -U user -d dbname > backup.sql

# Restaurar
psql -h host -U user -d dbname < backup.sql
\`\`\`

## Custos Estimados

- **Vercel**: Gratuito (Hobby) ou $20/mês (Pro)
- **Supabase**: Gratuito até 500MB
- **Mercado Pago**: 4.99% + R$ 0,39 por transação
- **Total Inicial**: ~R$ 0/mês (free tier)

## Checklist Final

- [ ] Banco de dados em produção configurado
- [ ] Variáveis de ambiente na Vercel
- [ ] Build bem-sucedido
- [ ] \`prisma db push\` executado
- [ ] Login Steam funcionando
- [ ] Webhook Mercado Pago configurado
- [ ] Domínio customizado (opcional)
- [ ] Analytics ativado
- [ ] Backup configurado

## Próximos Passos

1. Configurar CI/CD com GitHub Actions
2. Implementar testes automatizados
3. Configurar monitoramento de erros (Sentry)
4. Implementar rate limiting
5. Adicionar CDN para assets estáticos

---

**Boa sorte com seu deploy! 🚀**


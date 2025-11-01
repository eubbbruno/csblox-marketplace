# 🚀 Deploy CSBlox no Vercel - Guia Completo

## ✅ Passo 1: Acesse o Vercel Dashboard

1. Vá em: https://vercel.com/dashboard
2. Faça login com GitHub
3. Clique em **"Add New..."** → **"Project"**
4. Selecione o repositório **"csblox-marketplace"**
5. Clique em **"Import"**

---

## ⚙️ Passo 2: Configure as Variáveis de Ambiente

**IMPORTANTE:** Antes de fazer o deploy, adicione estas variáveis:

### Na tela de configuração do projeto, vá em "Environment Variables":

```bash
# 1. DATABASE_URL (OBRIGATÓRIO)
# Você precisa de um banco PostgreSQL
# Opções gratuitas: Neon, Supabase, Railway
DATABASE_URL=postgresql://user:password@host:5432/csblox

# 2. NEXTAUTH_SECRET (OBRIGATÓRIO)
# Gere uma chave aleatória em: https://generate-secret.vercel.app/32
NEXTAUTH_SECRET=sua-chave-secreta-aleatoria-de-32-caracteres

# 3. NEXTAUTH_URL (OBRIGATÓRIO)
# Será preenchido automaticamente após o primeiro deploy
# Formato: https://seu-projeto.vercel.app
NEXTAUTH_URL=https://csblox-marketplace.vercel.app

# 4. STEAM_API_KEY (Opcional - pode adicionar depois)
# Obter em: https://steamcommunity.com/dev/apikey
STEAM_API_KEY=

# 5. MERCADOPAGO_ACCESS_TOKEN (Opcional - pode adicionar depois)
# Obter em: https://www.mercadopago.com.br/developers
MERCADOPAGO_ACCESS_TOKEN=
```

---

## 🗄️ Passo 3: Configure o Banco de Dados

### Opção A: Neon (Recomendado - Grátis)

1. Acesse: https://neon.tech
2. Crie uma conta
3. Crie um novo projeto: **"csblox-marketplace"**
4. Copie a **Connection String**
5. Cole em `DATABASE_URL` no Vercel

### Opção B: Supabase (Alternativa - Grátis)

1. Acesse: https://supabase.com
2. Crie um projeto
3. Vá em **Settings** → **Database**
4. Copie a **Connection String** (modo "Session")
5. Cole em `DATABASE_URL` no Vercel

### Opção C: Railway (Alternativa - Grátis)

1. Acesse: https://railway.app
2. Crie um novo projeto PostgreSQL
3. Copie a **Connection String**
4. Cole em `DATABASE_URL` no Vercel

---

## 🚀 Passo 4: Deploy!

1. Após adicionar as variáveis, clique em **"Deploy"**
2. Aguarde 2-3 minutos
3. Seu site estará no ar! 🎉

---

## 🔄 Passo 5: Configurar Prisma (Após o Deploy)

Após o primeiro deploy, você precisa rodar as migrations:

### Via Vercel CLI:

```bash
# Instalar Vercel CLI (se ainda não instalou)
npm install -g vercel

# Fazer login
vercel login

# Linkar o projeto
vercel link

# Rodar as migrations
vercel env pull .env.local
npx prisma generate
npx prisma db push
```

---

## 📝 Checklist Final

- [ ] Conta criada no Vercel
- [ ] Projeto importado do GitHub
- [ ] Banco de dados PostgreSQL criado (Neon/Supabase/Railway)
- [ ] Variável `DATABASE_URL` configurada
- [ ] Variável `NEXTAUTH_SECRET` configurada
- [ ] Variável `NEXTAUTH_URL` configurada
- [ ] Deploy realizado com sucesso
- [ ] Migrations do Prisma executadas
- [ ] Site funcionando! 🎉

---

## 🆘 Problemas Comuns

### Erro: "Environment Variable NEXTAUTH_URL references Secret"
**Solução:** Adicione a variável `NEXTAUTH_URL` manualmente no dashboard do Vercel.

### Erro: "Prisma Client did not initialize yet"
**Solução:** Execute `npx prisma generate` localmente e faça commit.

### Erro: "Database connection failed"
**Solução:** Verifique se a `DATABASE_URL` está correta e se o banco está acessível.

---

## 🎯 URLs Úteis

- **Vercel Dashboard:** https://vercel.com/dashboard
- **Gerar Secret:** https://generate-secret.vercel.app/32
- **Neon (DB):** https://neon.tech
- **Supabase (DB):** https://supabase.com
- **Steam API Key:** https://steamcommunity.com/dev/apikey
- **Mercado Pago Dev:** https://www.mercadopago.com.br/developers

---

## 🎉 Pronto!

Seu CSBlox Marketplace estará no ar em poucos minutos! 🚀

Se tiver algum problema, me avise que eu te ajudo! 😊


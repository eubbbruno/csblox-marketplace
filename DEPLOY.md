# 🚀 Guia de Deploy - CSBlox Marketplace

## Deploy na Vercel (Recomendado)

### 1. Preparar o Repositório

Certifique-se que o código está no GitHub:
```bash
git add .
git commit -m "chore: preparar para deploy"
git push origin master
```

### 2. Importar no Vercel

1. Acesse [vercel.com](https://vercel.com)
2. Clique em "Add New Project"
3. Importe o repositório `eubbbruno/csblox-marketplace`
4. Configure as variáveis de ambiente (veja abaixo)
5. Clique em "Deploy"

### 3. Configurar Variáveis de Ambiente

No painel da Vercel, vá em **Settings > Environment Variables** e adicione:

#### Obrigatórias

```env
# NextAuth
NEXTAUTH_URL=https://seu-dominio.vercel.app
NEXTAUTH_SECRET=gere-com-openssl-rand-base64-32

# Database (use Neon, Supabase ou Railway)
DATABASE_URL=postgresql://user:password@host:5432/database

# Steam API
STEAM_API_KEY=sua-steam-api-key
STEAM_RETURN_URL=https://seu-dominio.vercel.app/api/auth/steam/callback

# Mercado Pago
MERCADOPAGO_ACCESS_TOKEN=seu-access-token
MERCADOPAGO_PUBLIC_KEY=sua-public-key
```

#### Opcionais

```env
# Upstash Redis (cache)
UPSTASH_REDIS_REST_URL=https://...
UPSTASH_REDIS_REST_TOKEN=...

# Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

### 4. Configurar Banco de Dados

#### Opção 1: Neon (PostgreSQL Serverless) - RECOMENDADO

1. Acesse [neon.tech](https://neon.tech)
2. Crie uma conta gratuita
3. Crie um novo projeto
4. Copie a `DATABASE_URL`
5. Cole nas variáveis de ambiente da Vercel
6. Rode as migrações:

```bash
# Localmente
npx prisma migrate deploy

# Ou via Vercel CLI
vercel env pull .env.local
npx prisma migrate deploy
```

#### Opção 2: Supabase

1. Acesse [supabase.com](https://supabase.com)
2. Crie um projeto
3. Vá em Settings > Database
4. Copie a Connection String (URI)
5. Cole nas variáveis de ambiente

#### Opção 3: Railway

1. Acesse [railway.app](https://railway.app)
2. New Project > PostgreSQL
3. Copie a `DATABASE_URL`
4. Cole nas variáveis de ambiente

### 5. Configurar Domínio Customizado (Opcional)

1. No painel da Vercel, vá em **Settings > Domains**
2. Adicione seu domínio
3. Configure os DNS conforme instruções
4. Atualize `NEXTAUTH_URL` com o novo domínio

### 6. Verificar Deploy

Após o deploy:

1. Acesse `https://seu-dominio.vercel.app`
2. Teste o login via Steam
3. Verifique o inventário
4. Teste um depósito PIX (use valores pequenos)

---

## Deploy Manual (VPS/Servidor)

### Requisitos

- Ubuntu 22.04 LTS
- Node.js 18+
- PostgreSQL 14+
- Nginx
- PM2

### Passo a Passo

#### 1. Instalar Dependências

```bash
# Atualizar sistema
sudo apt update && sudo apt upgrade -y

# Instalar Node.js 18
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Instalar PostgreSQL
sudo apt install -y postgresql postgresql-contrib

# Instalar PM2
sudo npm install -g pm2

# Instalar Nginx
sudo apt install -y nginx
```

#### 2. Configurar PostgreSQL

```bash
# Criar banco de dados
sudo -u postgres psql
CREATE DATABASE csblox;
CREATE USER csblox_user WITH PASSWORD 'sua-senha-segura';
GRANT ALL PRIVILEGES ON DATABASE csblox TO csblox_user;
\q
```

#### 3. Clonar e Configurar Projeto

```bash
# Clonar repositório
cd /var/www
sudo git clone https://github.com/eubbbruno/csblox-marketplace.git
cd csblox-marketplace

# Instalar dependências
npm install

# Configurar variáveis de ambiente
sudo nano .env.local
# Cole as variáveis necessárias

# Rodar migrações
npx prisma migrate deploy
npx prisma generate

# Build do projeto
npm run build
```

#### 4. Configurar PM2

```bash
# Iniciar aplicação
pm2 start npm --name "csblox" -- start

# Configurar auto-start
pm2 startup
pm2 save

# Ver logs
pm2 logs csblox
```

#### 5. Configurar Nginx

```bash
sudo nano /etc/nginx/sites-available/csblox
```

Cole a configuração:

```nginx
server {
    listen 80;
    server_name seu-dominio.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Ativar site:

```bash
sudo ln -s /etc/nginx/sites-available/csblox /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

#### 6. Configurar SSL (Certbot)

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d seu-dominio.com
```

#### 7. Atualizar Aplicação

Crie um script de deploy:

```bash
nano ~/deploy-csblox.sh
```

```bash
#!/bin/bash
cd /var/www/csblox-marketplace
git pull origin master
npm install
npx prisma generate
npm run build
pm2 restart csblox
```

```bash
chmod +x ~/deploy-csblox.sh
```

Para atualizar:
```bash
~/deploy-csblox.sh
```

---

## Checklist de Deploy ✅

### Antes do Deploy

- [ ] Código testado localmente
- [ ] Todas as variáveis de ambiente configuradas
- [ ] Banco de dados criado
- [ ] Migrações rodadas
- [ ] Build funcionando (`npm run build`)

### Após o Deploy

- [ ] Site acessível
- [ ] Login Steam funcionando
- [ ] Inventário carregando
- [ ] Pagamentos testados
- [ ] SSL configurado (HTTPS)
- [ ] Monitoramento ativo

### Integrações

- [ ] Steam API Key configurada
- [ ] Mercado Pago em produção
- [ ] Webhook do Mercado Pago configurado
- [ ] Email transacional (SendGrid/Resend)
- [ ] Analytics (Google Analytics/Plausible)

---

## Monitoramento

### Logs na Vercel

Acesse o painel da Vercel > seu projeto > Logs

### Logs no VPS

```bash
# Ver logs da aplicação
pm2 logs csblox

# Ver logs do Nginx
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log

# Ver logs do PostgreSQL
sudo tail -f /var/log/postgresql/postgresql-14-main.log
```

### Ferramentas Recomendadas

- **Sentry** - Monitoramento de erros
- **Uptime Robot** - Monitoramento de uptime
- **Datadog** - Métricas e logs
- **Plausible** - Analytics privado

---

## Troubleshooting

### Erro: "Module not found"

```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Erro: "Prisma Client not found"

```bash
npx prisma generate
npm run build
```

### Erro: "Database connection failed"

Verifique:
1. `DATABASE_URL` está correta
2. Banco de dados está acessível
3. Firewall permite conexão
4. Credenciais estão corretas

### Erro: "Steam API not working"

Verifique:
1. `STEAM_API_KEY` está configurada
2. IP do servidor está autorizado na Steam
3. Limite de requisições não foi atingido

---

## Suporte

Se tiver problemas:

1. Verifique os logs
2. Consulte a documentação
3. Abra uma issue no GitHub
4. Entre em contato com o suporte

---

🎉 **Deploy concluído! Boa sorte com seu marketplace!**

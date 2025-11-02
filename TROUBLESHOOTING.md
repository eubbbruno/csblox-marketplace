# 🔧 Troubleshooting - CSBlox Marketplace

## 🐛 Problemas Comuns e Soluções

---

## 1. ❌ **Header/Navbar não mudou**

### Sintomas:
- Alterações no navbar não aparecem
- Logo continua antiga
- Estilos não atualizam

### Soluções:

#### **Opção 1: Limpar Cache do Next.js**
```bash
# PowerShell (Windows)
Remove-Item -Path ".next" -Recurse -Force
npm run dev

# Bash (Linux/Mac)
rm -rf .next
npm run dev
```

#### **Opção 2: Limpar Cache do Navegador**
- **Chrome/Edge**: `Ctrl + Shift + Delete` → Limpar cache
- **Ou**: `Ctrl + Shift + R` (hard refresh)
- **Ou**: `F12` → Network → Disable cache (checkbox)

#### **Opção 3: Modo Anônimo**
- Abra em aba anônima: `Ctrl + Shift + N`
- Isso ignora todo o cache

#### **Opção 4: Verificar se o arquivo foi salvo**
```bash
git status
git diff src/components/layout/navbar.tsx
```

---

## 2. ❌ **Erro de Deploy: "Parsing ecmascript source code failed"**

### Sintomas:
```
Expected '</', got 'jsx text'
Error: Command "npx prisma generate && npm run build" exited with 1
```

### Causa:
- Tags JSX não fechadas corretamente
- Estrutura de componentes incorreta
- Falta de `</>` ou `</div>`

### Solução:
✅ **JÁ CORRIGIDO!** 
- Commit: `8641378 - fix: Correct Tabs structure in raffles page`
- Arquivo: `src/app/raffles/page.tsx`

Para aplicar:
```bash
git pull origin master
```

---

## 3. ❌ **Skins não aparecem no Marketplace**

### Sintomas:
- Marketplace vazio
- Erro de imagens
- Loading infinito

### Soluções:

#### **Usar Skins Mock:**
```typescript
// Em qualquer página/componente
import { MOCK_SKINS, generateMarketplaceSkins } from '@/lib/mock-skins'

// Opção 1: Usar skins base (17 skins)
const skins = MOCK_SKINS

// Opção 2: Gerar 50 skins variadas
const skins = generateMarketplaceSkins(50)
```

#### **Verificar Next/Image Config:**
```typescript
// next.config.ts
images: {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'community.cloudflare.steamstatic.com',
    },
    {
      protocol: 'https',
      hostname: 'steamcommunity.com',
    },
  ],
}
```

---

## 4. ❌ **Erro: "Module not found"**

### Sintomas:
```
Module not found: Can't resolve '@/components/...'
```

### Soluções:

#### **Verificar tsconfig.json:**
```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

#### **Reinstalar dependências:**
```bash
rm -rf node_modules
rm package-lock.json
npm install
```

---

## 5. ❌ **Hydration Error**

### Sintomas:
```
Hydration failed because the server rendered text didn't match the client
```

### Causa:
- Valores aleatórios gerados no servidor (Math.random(), Date.now())
- Conteúdo diferente entre servidor e cliente

### Solução:
```typescript
// ❌ ERRADO
const randomValue = Math.random()

// ✅ CORRETO
const [randomValue, setRandomValue] = useState(0)

useEffect(() => {
  setRandomValue(Math.random())
}, [])
```

---

## 6. ❌ **Erro de TypeScript: "implicitly has 'any' type"**

### Sintomas:
```
Parameter 'x' implicitly has an 'any' type
```

### Solução:
```typescript
// ❌ ERRADO
array.map(item => item.name)

// ✅ CORRETO
array.map((item: any) => item.name)
// ou
array.map((item: YourType) => item.name)
```

---

## 7. ❌ **Erro: "params.id" em API Routes (Next.js 16)**

### Sintomas:
```
Property 'id' does not exist on type 'Promise<{ id: string }>'
```

### Solução:
```typescript
// ❌ ERRADO (Next.js 15)
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id
}

// ✅ CORRETO (Next.js 16)
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
}
```

---

## 8. ❌ **Porta 3000 em uso**

### Sintomas:
```
Port 3000 is in use
```

### Soluções:

#### **Windows (PowerShell):**
```powershell
# Ver processo na porta 3000
netstat -ano | findstr :3000

# Matar processo (substitua PID)
taskkill /F /PID <PID>

# Ou matar todos os Node.js
taskkill /F /IM node.exe
```

#### **Linux/Mac:**
```bash
# Ver processo na porta 3000
lsof -i :3000

# Matar processo
kill -9 <PID>

# Ou
killall node
```

---

## 9. ❌ **Prisma não gera tipos**

### Sintomas:
```
Cannot find module '@prisma/client'
```

### Solução:
```bash
npx prisma generate
npx prisma db push
npm run dev
```

---

## 10. ❌ **Vercel Deploy falha**

### Sintomas:
- Build error no Vercel
- "Command exited with 1"

### Checklist:

#### **1. Verificar variáveis de ambiente:**
- `DATABASE_URL` configurada?
- `NEXTAUTH_SECRET` configurada?
- `NEXTAUTH_URL` configurada?

#### **2. Build local:**
```bash
npm run build
```
Se falhar localmente, corrigir antes de fazer deploy.

#### **3. Verificar Node version:**
```json
// package.json
"engines": {
  "node": ">=18.0.0"
}
```

#### **4. Limpar cache do Vercel:**
- Dashboard Vercel → Settings → Clear Build Cache
- Fazer novo deploy

---

## 11. ❌ **Imagens não carregam (403 Forbidden)**

### Sintomas:
- Imagens Steam retornam 403
- Placeholder aparece

### Solução:
```typescript
// next.config.ts
images: {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'community.cloudflare.steamstatic.com',
    },
  ],
}
```

---

## 12. ❌ **Animações Framer Motion não funcionam**

### Sintomas:
- Sem animações
- Componentes aparecem sem transição

### Solução:
```typescript
// Adicionar "use client" no topo do arquivo
"use client"

import { motion } from "framer-motion"
```

---

## 🆘 **Ainda com Problemas?**

### **Passos de Debug:**

1. **Verificar console do navegador** (F12)
2. **Verificar terminal do servidor**
3. **Limpar TUDO:**
   ```bash
   rm -rf .next node_modules
   npm install
   npm run dev
   ```
4. **Verificar versões:**
   ```bash
   node --version  # >= 18
   npm --version   # >= 9
   ```

---

## 📞 **Contato**

Se nenhuma solução funcionou:
1. Copie o erro completo
2. Tire screenshot
3. Me mande aqui no chat!

**Vou te ajudar! 😊**


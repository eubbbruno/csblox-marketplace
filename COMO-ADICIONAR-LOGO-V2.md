# 🎨 Como Adicionar Sua Logo no CSBlox - Guia Completo v2.0

## 📍 **Localização da Logo**

A logo está no arquivo: **`src/components/layout/navbar.tsx`**

Linha: **~75-122** (procure por `{/* Logo - v3.0 MELHORADO */}`)

---

## 🎯 **OPÇÃO 1: Usar Imagem Personalizada (RECOMENDADO)**

### **Passo 1: Adicione sua logo**

Coloque sua logo na pasta `public/` do projeto:

```
csblox-marketplace/
├── public/
│   ├── logo.png          ← Sua logo aqui
│   ├── logo-white.png    ← Versão branca (opcional)
│   └── favicon.ico
```

### **Passo 2: Edite o Navbar**

Abra `src/components/layout/navbar.tsx` e **descomente** as linhas 75-76:

**ANTES:**
```tsx
{/* 🎨 OPÇÃO 1: Usar sua logo personalizada (descomente e adicione sua logo em /public) */}
{/* <Image src="/logo.png" alt="CSBlox" width={48} height={48} className="rounded-xl" /> */}

{/* 🎨 OPÇÃO 2: Logo padrão com tema Blox (atual) */}
<div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 via-red-500 to-pink-500 shadow-xl shadow-orange-500/40 box-card border-2 border-orange-400/50 relative overflow-hidden">
  {/* ... */}
</div>
```

**DEPOIS:**
```tsx
{/* 🎨 OPÇÃO 1: Usar sua logo personalizada (descomente e adicione sua logo em /public) */}
<Image src="/logo.png" alt="CSBlox" width={56} height={56} className="rounded-xl shadow-xl" />

{/* 🎨 OPÇÃO 2: Logo padrão com tema Blox (atual) */}
{/* <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 via-red-500 to-pink-500 shadow-xl shadow-orange-500/40 box-card border-2 border-orange-400/50 relative overflow-hidden">
  ...
</div> */}
```

### **Passo 3: Adicione o import do Image**

No topo do arquivo `navbar.tsx`, adicione:

```tsx
import Image from "next/image"
```

### **Passo 4: Ajuste o tamanho (opcional)**

```tsx
{/* Logo pequena */}
<Image src="/logo.png" alt="CSBlox" width={48} height={48} className="rounded-xl" />

{/* Logo média (recomendado) */}
<Image src="/logo.png" alt="CSBlox" width={56} height={56} className="rounded-xl" />

{/* Logo grande */}
<Image src="/logo.png" alt="CSBlox" width={64} height={64} className="rounded-xl" />
```

---

## 🎨 **OPÇÃO 2: Logo SVG (Melhor Performance)**

### **Passo 1: Crie um componente de logo**

Crie o arquivo `src/components/common/logo.tsx`:

```tsx
export function Logo({ className }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 100 100" 
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Seu SVG aqui - exemplo: */}
      <rect width="100" height="100" rx="20" fill="url(#gradient)" />
      <text x="50" y="65" fontSize="40" fontWeight="bold" fill="white" textAnchor="middle">
        CB
      </text>
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f97316" />
          <stop offset="50%" stopColor="#ef4444" />
          <stop offset="100%" stopColor="#ec4899" />
        </linearGradient>
      </defs>
    </svg>
  )
}
```

### **Passo 2: Use no Navbar**

```tsx
import { Logo } from "@/components/common/logo"

// No código do navbar:
<Logo className="h-14 w-14 drop-shadow-xl" />
```

---

## 🎯 **OPÇÃO 3: Logo Externa (URL)**

Se sua logo está hospedada online:

```tsx
<Image 
  src="https://seusite.com/logo.png" 
  alt="CSBlox" 
  width={56} 
  height={56} 
  className="rounded-xl"
/>
```

**IMPORTANTE:** Adicione o domínio no `next.config.ts`:

```typescript
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'seusite.com',
      },
    ],
  },
}
```

---

## 🎨 **CUSTOMIZAÇÕES EXTRAS**

### **1. Logo com Animação Personalizada**

```tsx
<motion.div
  whileHover={{ scale: 1.1, rotate: 10 }}
  whileTap={{ scale: 0.9 }}
  transition={{ type: "spring", stiffness: 400 }}
>
  <Image src="/logo.png" alt="CSBlox" width={56} height={56} className="rounded-xl" />
</motion.div>
```

### **2. Logo com Borda Gradiente**

```tsx
<div className="p-1 rounded-2xl bg-gradient-to-br from-orange-500 via-red-500 to-pink-500">
  <Image 
    src="/logo.png" 
    alt="CSBlox" 
    width={56} 
    height={56} 
    className="rounded-xl bg-black"
  />
</div>
```

### **3. Logo com Glow Effect**

```tsx
<Image 
  src="/logo.png" 
  alt="CSBlox" 
  width={56} 
  height={56} 
  className="rounded-xl shadow-2xl shadow-orange-500/50 drop-shadow-2xl"
/>
```

### **4. Logo com Badge "BETA" Customizado**

Edite as linhas 114-116:

```tsx
<Badge variant="secondary" className="text-[9px] md:text-[10px] px-1.5 py-0.5 bg-orange-500/20 text-orange-400 border-orange-500/50 font-bold animate-pulse">
  BETA
</Badge>
```

Troque por:

```tsx
<Badge variant="secondary" className="text-[9px] md:text-[10px] px-1.5 py-0.5 bg-green-500/20 text-green-400 border-green-500/50 font-bold">
  OFICIAL
</Badge>
```

### **5. Remover Indicador "Online"**

Comente ou delete as linhas 96-106:

```tsx
{/* Indicador Online pulsante */}
{/* <motion.div 
  animate={{ 
    scale: [1, 1.3, 1],
    opacity: [1, 0.7, 1]
  }}
  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
  className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-3 border-background shadow-xl shadow-green-500/60"
>
  <div className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-75" />
</motion.div> */}
```

---

## 📐 **TAMANHOS RECOMENDADOS**

### **Para Logo em PNG/JPG:**
- **Tamanho ideal:** 200x200px a 512x512px
- **Formato:** PNG com fundo transparente
- **Peso:** Máximo 100KB (otimize com TinyPNG)

### **Para Logo em SVG:**
- **Formato:** SVG otimizado
- **Viewbox:** 0 0 100 100 ou 0 0 512 512
- **Peso:** Máximo 20KB

---

## 🔧 **OTIMIZAÇÃO DE IMAGENS**

### **Ferramentas Online:**
1. **TinyPNG** - https://tinypng.com/ (PNG/JPG)
2. **SVGOMG** - https://jakearchibald.github.io/svgomg/ (SVG)
3. **Squoosh** - https://squoosh.app/ (Todos os formatos)

### **Comando para otimizar (opcional):**

```bash
# Instalar sharp
npm install sharp

# Criar script de otimização
node scripts/optimize-logo.js
```

---

## 🎨 **EXEMPLOS DE LOGOS PRONTAS**

### **1. Logo Minimalista**

```tsx
<div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-orange-500 to-pink-500 flex items-center justify-center font-black text-2xl text-white shadow-xl">
  CB
</div>
```

### **2. Logo com Ícone do Lucide**

```tsx
import { Box, Hexagon, Layers } from "lucide-react"

<div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-orange-500 to-pink-500 flex items-center justify-center shadow-xl">
  <Box className="w-8 h-8 text-white" />
</div>
```

### **3. Logo Texto Gradiente**

```tsx
<span className="text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-orange-400 via-red-400 to-pink-400">
  CSBlox
</span>
```

---

## ✅ **CHECKLIST FINAL**

- [ ] Logo adicionada na pasta `public/`
- [ ] Código do navbar atualizado
- [ ] Import do `Image` adicionado (se necessário)
- [ ] Logo otimizada (< 100KB)
- [ ] Testado em mobile e desktop
- [ ] Animações funcionando
- [ ] Favicon atualizado (opcional)

---

## 🚨 **TROUBLESHOOTING**

### **Problema: Logo não aparece**

**Solução 1:** Verifique o caminho
```tsx
// ✅ CORRETO
<Image src="/logo.png" ... />

// ❌ ERRADO
<Image src="./logo.png" ... />
<Image src="logo.png" ... />
```

**Solução 2:** Limpe o cache
```bash
rm -rf .next
npm run dev
```

### **Problema: Logo muito grande/pequena**

Ajuste o `width` e `height`:
```tsx
<Image src="/logo.png" width={56} height={56} ... />
```

### **Problema: Logo pixelada**

Use uma imagem maior (mínimo 200x200px) ou SVG.

---

## 📞 **SUPORTE**

Se tiver dúvidas, verifique:
1. Arquivo está em `public/logo.png`?
2. Nome do arquivo está correto?
3. Formato é PNG, JPG ou SVG?
4. Cache foi limpo?

---

**Atualizado em:** 02/11/2025  
**Versão:** 2.0  
**Arquivo:** `src/components/layout/navbar.tsx` (linhas 67-122)


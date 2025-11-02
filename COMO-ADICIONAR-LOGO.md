# 🎨 Como Adicionar Sua Logo no CSBlox

## 📍 Onde Adicionar a Logo

A logo aparece no **Header (Navbar)** que está em:
```
src/components/layout/navbar.tsx
```

---

## 🖼️ **Opção 1: Usar Imagem (Recomendado)**

### Passo 1: Adicione sua logo na pasta `public`
```
public/
  └── logo.png  (ou logo.svg, logo.jpg)
```

### Passo 2: Edite o arquivo `src/components/layout/navbar.tsx`

**Encontre esta linha (aproximadamente linha 76-77):**
```tsx
{/* Opção 1: Usar uma imagem */}
{/* <Image src="/logo.png" alt="CSBlox" width={40} height={40} className="rounded-lg" /> */}
```

**Descomente e ajuste:**
```tsx
{/* Opção 1: Usar uma imagem */}
<Image 
  src="/logo.png" 
  alt="CSBlox" 
  width={48} 
  height={48} 
  className="rounded-xl object-cover" 
/>
```

**E comente o ícone padrão (linhas 79-84):**
```tsx
{/* Opção 2: Ícone atual (padrão) */}
{/* <div className="flex h-12 w-12...">
  ...
</div> */}
```

### Passo 3: Adicione o import do Next Image no topo do arquivo
```tsx
import Image from "next/image"
```

---

## 🎨 **Opção 2: Usar SVG Inline**

Se você tem um SVG, pode colocar direto no código:

```tsx
<div className="h-12 w-12 relative">
  <svg viewBox="0 0 100 100" className="w-full h-full">
    {/* Cole seu código SVG aqui */}
    <circle cx="50" cy="50" r="40" fill="#FF6B35"/>
    <text x="50" y="60" fontSize="40" textAnchor="middle" fill="white">
      CS
    </text>
  </svg>
</div>
```

---

## 🎯 **Opção 3: Manter Ícone mas Personalizar**

Se quiser manter o ícone mas mudar as cores:

```tsx
<div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[SUA-COR-1] via-[SUA-COR-2] to-[SUA-COR-3] shadow-lg shadow-[SUA-COR]/30 box-card border-2 border-[SUA-COR]/40">
  <Package className="w-6 h-6 text-white" />
</div>
```

**Exemplo com cores azuis:**
```tsx
<div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 via-cyan-500 to-teal-500 shadow-lg shadow-blue-500/30 box-card border-2 border-blue-400/40">
  <Package className="w-6 h-6 text-white" />
</div>
```

---

## 📐 Tamanhos Recomendados

### Para Imagens:
- **Tamanho ideal:** 512x512px (ou 1024x1024px para alta resolução)
- **Formato:** PNG com fundo transparente ou SVG
- **Peso:** Máximo 100KB

### Para o Header:
- A logo será exibida em **48x48px** (12 rem)
- Certifique-se que ela fica legível nesse tamanho

---

## 🎨 Personalizando o Nome "CSBlox"

Se quiser mudar o nome ou estilo:

**Encontre (linha ~96):**
```tsx
<span className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-orange-400 via-red-400 to-pink-400 tracking-tight">
  CSBlox
</span>
```

**Altere para:**
```tsx
<span className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-[SUA-COR-1] via-[SUA-COR-2] to-[SUA-COR-3] tracking-tight">
  SEU NOME AQUI
</span>
```

---

## 🔄 Exemplo Completo com Logo Customizada

```tsx
{/* Logo */}
<Link href="/" className="flex items-center gap-3 group">
  <motion.div 
    whileHover={{ scale: 1.05, rotate: 5 }}
    whileTap={{ scale: 0.95 }}
    transition={{ duration: 0.3, type: "spring" }}
    className="relative"
  >
    {/* SUA LOGO AQUI */}
    <Image 
      src="/logo.png" 
      alt="Meu Marketplace" 
      width={48} 
      height={48} 
      className="rounded-xl object-cover shadow-lg" 
    />
    
    {/* Indicador Online (opcional) */}
    <motion.div 
      animate={{ scale: [1, 1.2, 1] }}
      transition={{ duration: 2, repeat: Infinity }}
      className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-background shadow-lg shadow-green-500/50"
    />
  </motion.div>
  
  <div className="flex flex-col">
    <div className="flex items-center gap-2">
      <span className="text-2xl font-black text-white">
        Meu Marketplace
      </span>
      <Badge variant="secondary" className="text-[10px] px-1.5 py-0 bg-blue-500/20 text-blue-400 border-blue-500/50 font-bold">
        BETA
      </Badge>
    </div>
    <span className="text-[10px] text-muted-foreground font-medium -mt-1">
      Skins CS2
    </span>
  </div>
</Link>
```

---

## 🚀 Depois de Adicionar

1. Salve o arquivo
2. O servidor Next.js vai recarregar automaticamente
3. Atualize a página no navegador (F5)
4. Sua logo deve aparecer! 🎉

---

## 💡 Dicas

- **Use PNG transparente** para melhor resultado
- **Otimize a imagem** antes de adicionar (use TinyPNG.com)
- **SVG é melhor** para logos simples (escalável sem perder qualidade)
- **Teste em mobile** para garantir que fica boa em telas pequenas

---

## ❓ Problemas Comuns

### Logo não aparece?
- Verifique se o arquivo está em `public/logo.png`
- Verifique se o caminho está correto: `/logo.png` (com a barra no início)
- Limpe o cache: `Ctrl + Shift + R` ou `Cmd + Shift + R`

### Logo muito grande/pequena?
- Ajuste `width` e `height` no componente Image
- Use `object-cover` ou `object-contain` para ajustar

### Logo pixelizada?
- Use uma imagem maior (512x512 ou 1024x1024)
- Ou use SVG que nunca pixeliza

---

**Precisa de ajuda? Me chama! 😊**


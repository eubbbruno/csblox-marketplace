"use client"

import { Navbar } from "@/components/layout/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  ArrowRight, 
  Shield, 
  Zap, 
  Trophy, 
  Users, 
  Banknote, 
  Clock,
  Star,
  TrendingUp,
  CheckCircle2,
  Sparkles
} from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

export default function HomePage() {
  return (
    <>
      <Navbar />
      
      {/* Hero Section com Gradiente Animado */}
      <section className="relative overflow-hidden min-h-[90vh] flex items-center">
        {/* Background Animado */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-background to-background" />
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
        
        {/* Efeito de Brilho */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary/30 rounded-full blur-[120px] animate-pulse" />
        
        <div className="container relative z-10 py-24 sm:py-32">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-4xl text-center"
          >
            {/* Badge de Destaque */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8"
            >
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Marketplace #1 do Brasil</span>
              <Badge variant="secondary" className="ml-2">Novo</Badge>
            </motion.div>

            {/* Título Principal */}
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70"
            >
              Negocie Skins CS2
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary to-primary/60">
                Com Segurança
              </span>
            </motion.h1>

            {/* Subtítulo */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-6 text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
            >
              Compre e venda skins com <span className="text-primary font-semibold">PIX instantâneo</span>.
              Sistema de escrow seguro e taxa de apenas <span className="text-primary font-semibold">5%</span>.
            </motion.p>

            {/* CTAs */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link href="/login">
                <Button size="lg" className="gap-2 h-14 px-8 text-lg group">
                  <Zap className="h-5 w-5 group-hover:animate-pulse" />
                  Começar Agora
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/marketplace">
                <Button variant="outline" size="lg" className="h-14 px-8 text-lg">
                  Explorar Marketplace
                </Button>
              </Link>
            </motion.div>

            {/* Social Proof */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-12 flex items-center justify-center gap-8 text-sm text-muted-foreground"
            >
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-8 h-8 rounded-full bg-muted border-2 border-background" />
                  ))}
                </div>
                <span>10K+ usuários</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                <span>4.9/5 avaliação</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Stats Cards */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mx-auto mt-20 max-w-5xl"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "Usuários Ativos", value: "10K+", icon: Users, color: "text-blue-500" },
                { label: "Skins Vendidas", value: "50K+", icon: Trophy, color: "text-yellow-500" },
                { label: "Volume Mensal", value: "R$ 500K", icon: TrendingUp, color: "text-green-500" },
                { label: "Taxa", value: "5%", icon: Banknote, color: "text-purple-500" },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + i * 0.1 }}
                >
                  <Card className="text-center hover:shadow-lg transition-all border-primary/10 bg-card/50 backdrop-blur">
                    <CardContent className="pt-6">
                      <stat.icon className={`h-8 w-8 mx-auto mb-3 ${stat.color}`} />
                      <p className="text-3xl font-bold mb-1">{stat.value}</p>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 sm:py-32 relative">
        <div className="container">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mx-auto max-w-2xl text-center mb-16"
          >
            <Badge variant="outline" className="mb-4">Recursos</Badge>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              Por que escolher a CSBlox?
            </h2>
            <p className="text-lg text-muted-foreground">
              A plataforma mais completa e segura para negociar skins CS2
            </p>
          </motion.div>

          <div className="mx-auto max-w-6xl">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  icon: Zap,
                  title: "PIX Instantâneo",
                  description: "Receba seus pagamentos via PIX em segundos após a venda. Sem espera, sem complicação.",
                  color: "from-yellow-500 to-orange-500",
                },
                {
                  icon: Shield,
                  title: "100% Seguro",
                  description: "Sistema de escrow e verificação de itens. Suas transações protegidas do início ao fim.",
                  color: "from-blue-500 to-cyan-500",
                },
                {
                  icon: Trophy,
                  title: "Melhores Preços",
                  description: "Compare preços com o mercado Steam. Economize até 30% nas suas compras.",
                  color: "from-purple-500 to-pink-500",
                },
                {
                  icon: Users,
                  title: "Comunidade Ativa",
                  description: "Milhares de jogadores comprando e vendendo diariamente. Liquidez garantida.",
                  color: "from-green-500 to-emerald-500",
                },
                {
                  icon: Banknote,
                  title: "Taxa Baixa",
                  description: "Apenas 5% de taxa sobre vendas. Uma das menores do mercado brasileiro.",
                  color: "from-red-500 to-rose-500",
                },
                {
                  icon: Clock,
                  title: "Suporte 24/7",
                  description: "Equipe sempre disponível para ajudar. Resposta em menos de 1 hora.",
                  color: "from-indigo-500 to-violet-500",
                },
              ].map((feature, i) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Card className="group hover:shadow-xl transition-all duration-300 border-primary/10 h-full hover:scale-105">
                    <CardHeader>
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} p-2.5 mb-4 group-hover:scale-110 transition-transform`}>
                        <feature.icon className="h-full w-full text-white" />
                      </div>
                      <CardTitle className="text-xl">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-base leading-relaxed">
                        {feature.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Como Funciona */}
      <section className="py-24 sm:py-32 bg-muted/50">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mx-auto max-w-2xl text-center mb-16"
          >
            <Badge variant="outline" className="mb-4">Simples e Rápido</Badge>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              Como funciona?
            </h2>
            <p className="text-lg text-muted-foreground">
              Em apenas 3 passos você já está negociando
            </p>
          </motion.div>

          <div className="mx-auto max-w-5xl">
            <div className="grid gap-8 md:grid-cols-3">
              {[
                {
                  step: "01",
                  title: "Faça Login",
                  description: "Entre com sua conta Steam de forma segura e rápida",
                  icon: Shield,
                },
                {
                  step: "02",
                  title: "Escolha suas Skins",
                  description: "Navegue pelo marketplace ou liste suas próprias skins",
                  icon: Trophy,
                },
                {
                  step: "03",
                  title: "Negocie",
                  description: "Compre ou venda com PIX instantâneo e receba em segundos",
                  icon: Zap,
                },
              ].map((step, i) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2 }}
                  className="relative"
                >
                  <Card className="h-full hover:shadow-lg transition-all">
                    <CardHeader>
                      <div className="flex items-start gap-4">
                        <div className="text-6xl font-bold text-primary/20">
                          {step.step}
                        </div>
                        <div className="flex-1">
                          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                            <step.icon className="h-6 w-6 text-primary" />
                          </div>
                          <CardTitle className="text-xl mb-2">{step.title}</CardTitle>
                          <CardDescription className="text-base">
                            {step.description}
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                  {i < 2 && (
                    <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-primary/20" />
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 sm:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-primary/5 to-background" />
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
        
        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mx-auto max-w-3xl text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Comece Hoje Mesmo</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
              Pronto para negociar suas skins?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Junte-se a milhares de jogadores e comece a lucrar com suas skins CS2
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/login">
                <Button size="lg" className="gap-2 h-14 px-8 text-lg group">
                  Criar Conta Grátis
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/marketplace">
                <Button variant="outline" size="lg" className="h-14 px-8 text-lg">
                  Ver Marketplace
                </Button>
              </Link>
            </div>

            <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
              {[
                "✓ Sem taxa de cadastro",
                "✓ PIX instantâneo",
                "✓ Suporte 24/7",
                "✓ 100% seguro",
              ].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer Profissional */}
      <footer className="border-t bg-muted/30">
        <div className="container py-12">
          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                  <span className="text-sm font-bold text-primary-foreground">CS</span>
                </div>
                <span className="font-bold text-lg">CSBlox</span>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                O marketplace mais seguro e rápido para negociar skins CS2 no Brasil.
              </p>
              <div className="flex gap-2">
                {/* Redes sociais aqui */}
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold mb-4">Produto</h3>
              <ul className="space-y-2">
                <li><Link href="/marketplace" className="text-sm text-muted-foreground hover:text-primary transition-colors">Marketplace</Link></li>
                <li><Link href="/como-funciona" className="text-sm text-muted-foreground hover:text-primary transition-colors">Como Funciona</Link></li>
                <li><Link href="/taxas" className="text-sm text-muted-foreground hover:text-primary transition-colors">Taxas</Link></li>
                <li><Link href="/api" className="text-sm text-muted-foreground hover:text-primary transition-colors">API</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold mb-4">Suporte</h3>
              <ul className="space-y-2">
                <li><Link href="/faq" className="text-sm text-muted-foreground hover:text-primary transition-colors">FAQ</Link></li>
                <li><Link href="/suporte" className="text-sm text-muted-foreground hover:text-primary transition-colors">Contato</Link></li>
                <li><Link href="/termos" className="text-sm text-muted-foreground hover:text-primary transition-colors">Termos de Uso</Link></li>
                <li><Link href="/status" className="text-sm text-muted-foreground hover:text-primary transition-colors">Status</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><Link href="/privacidade" className="text-sm text-muted-foreground hover:text-primary transition-colors">Privacidade</Link></li>
                <li><Link href="/cookies" className="text-sm text-muted-foreground hover:text-primary transition-colors">Cookies</Link></li>
                <li><Link href="/lgpd" className="text-sm text-muted-foreground hover:text-primary transition-colors">LGPD</Link></li>
                <li><Link href="/seguranca" className="text-sm text-muted-foreground hover:text-primary transition-colors">Segurança</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground text-center sm:text-left">
              © 2024 CSBlox. Todos os direitos reservados.
            </p>
            <p className="text-xs text-muted-foreground text-center sm:text-right">
              Counter-Strike é marca registrada da Valve Corporation.
            </p>
          </div>
        </div>
      </footer>
    </>
  )
}

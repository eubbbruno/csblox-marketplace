import { Navbar } from "@/components/layout/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Shield, Zap, Trophy, Users, Banknote, Clock } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <>
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-primary/5 to-background" />
        <div className="container relative py-24 sm:py-32">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl animate-fade-in">
              O Melhor Marketplace de Skins CS2 do Brasil
            </h1>
            <p className="mt-6 text-lg text-muted-foreground animate-slide-in">
              Compre e venda skins com segurança. Pagamento via PIX instantâneo.
              Taxa de apenas 5% nas vendas.
            </p>
            <div className="mt-10 flex items-center justify-center gap-4 animate-slide-in">
              <Link href="/marketplace">
                <Button size="lg" className="gap-2">
                  Explorar Marketplace
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/como-funciona">
                <Button variant="outline" size="lg">
                  Como Funciona
                </Button>
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="mx-auto mt-16 max-w-4xl">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {[
                { label: "Usuários Ativos", value: "10K+" },
                { label: "Skins Disponíveis", value: "5K+" },
                { label: "Volume Mensal", value: "R$ 500K+" },
                { label: "Taxa de Venda", value: "5%" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-3xl font-bold">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 sm:py-32">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Por que escolher a CSBlox?
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Oferecemos a melhor experiência de compra e venda de skins CS2
            </p>
          </div>

          <div className="mx-auto mt-16 max-w-5xl">
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  icon: Zap,
                  title: "PIX Instantâneo",
                  description: "Receba seus pagamentos via PIX em segundos após a venda",
                },
                {
                  icon: Shield,
                  title: "100% Seguro",
                  description: "Sistema de escrow e verificação de itens para total segurança",
                },
                {
                  icon: Trophy,
                  title: "Melhores Preços",
                  description: "Compare preços com o mercado Steam e economize",
                },
                {
                  icon: Users,
                  title: "Comunidade Ativa",
                  description: "Milhares de jogadores comprando e vendendo diariamente",
                },
                {
                  icon: Banknote,
                  title: "Taxa Baixa",
                  description: "Apenas 5% de taxa sobre vendas realizadas",
                },
                {
                  icon: Clock,
                  title: "Suporte 24/7",
                  description: "Equipe sempre disponível para ajudar você",
                },
              ].map((feature) => (
                <Card key={feature.title} className="group hover:shadow-lg transition-all">
                  <CardHeader>
                    <feature.icon className="h-10 w-10 text-primary mb-4" />
                    <CardTitle>{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 sm:py-32 bg-muted">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Pronto para começar?
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Junte-se a milhares de jogadores e comece a negociar suas skins hoje mesmo
            </p>
            <div className="mt-8">
              <Link href="/marketplace">
                <Button size="lg" className="gap-2">
                  Acessar Marketplace
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12">
        <div className="container">
          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
            <div>
              <h3 className="text-sm font-semibold">Produto</h3>
              <ul className="mt-4 space-y-2">
                <li><Link href="/marketplace" className="text-sm text-muted-foreground hover:text-primary">Marketplace</Link></li>
                <li><Link href="/como-funciona" className="text-sm text-muted-foreground hover:text-primary">Como Funciona</Link></li>
                <li><Link href="/taxas" className="text-sm text-muted-foreground hover:text-primary">Taxas</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold">Suporte</h3>
              <ul className="mt-4 space-y-2">
                <li><Link href="/faq" className="text-sm text-muted-foreground hover:text-primary">FAQ</Link></li>
                <li><Link href="/suporte" className="text-sm text-muted-foreground hover:text-primary">Contato</Link></li>
                <li><Link href="/termos" className="text-sm text-muted-foreground hover:text-primary">Termos de Uso</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold">Empresa</h3>
              <ul className="mt-4 space-y-2">
                <li><Link href="/sobre" className="text-sm text-muted-foreground hover:text-primary">Sobre Nós</Link></li>
                <li><Link href="/blog" className="text-sm text-muted-foreground hover:text-primary">Blog</Link></li>
                <li><Link href="/carreiras" className="text-sm text-muted-foreground hover:text-primary">Carreiras</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold">Legal</h3>
              <ul className="mt-4 space-y-2">
                <li><Link href="/privacidade" className="text-sm text-muted-foreground hover:text-primary">Privacidade</Link></li>
                <li><Link href="/cookies" className="text-sm text-muted-foreground hover:text-primary">Cookies</Link></li>
                <li><Link href="/lgpd" className="text-sm text-muted-foreground hover:text-primary">LGPD</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t pt-8">
            <p className="text-center text-sm text-muted-foreground">
              © 2024 CSBlox. Todos os direitos reservados. Counter-Strike é marca registrada da Valve Corporation.
            </p>
          </div>
        </div>
      </footer>
    </>
  )
}

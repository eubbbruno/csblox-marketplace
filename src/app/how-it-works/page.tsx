"use client"

import { motion } from "framer-motion"
import { PageHeader } from "@/components/common/page-header"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  UserPlus, 
  Wallet, 
  ShoppingCart, 
  TrendingUp, 
  Shield, 
  Zap,
  Package,
  DollarSign,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Target,
  Gift,
  Dices
} from "lucide-react"
import Link from "next/link"

export default function HowItWorksPage() {
  const steps = [
    {
      number: "01",
      title: "Conecte sua Steam",
      description: "Faça login com sua conta Steam de forma segura. Não pedimos sua senha, apenas usamos a autenticação oficial da Steam.",
      icon: UserPlus,
      color: "from-blue-500 to-cyan-500",
      features: ["Login seguro via Steam", "Sem necessidade de senha", "Acesso ao inventário público"],
    },
    {
      number: "02",
      title: "Adicione Saldo",
      description: "Deposite via PIX de forma instantânea. Seu saldo fica disponível em segundos para usar na plataforma.",
      icon: Wallet,
      color: "from-green-500 to-emerald-500",
      features: ["PIX instantâneo", "Sem taxas de depósito", "Saldo disponível em segundos"],
    },
    {
      number: "03",
      title: "Compre ou Venda",
      description: "Navegue pelo marketplace, escolha as melhores skins e faça suas transações com segurança e rapidez.",
      icon: ShoppingCart,
      color: "from-purple-500 to-pink-500",
      features: ["Preços competitivos", "Transações seguras", "Entrega automática"],
    },
    {
      number: "04",
      title: "Saque seus Lucros",
      description: "Venda suas skins e saque o dinheiro via PIX. Sem complicação, sem burocracia.",
      icon: TrendingUp,
      color: "from-orange-500 to-red-500",
      features: ["Saque via PIX", "Taxas baixas", "Processamento rápido"],
    },
  ]

  const features = [
    {
      icon: Shield,
      title: "100% Seguro",
      description: "Sistema anti-fraude com IA e verificação em duas etapas",
      color: "text-blue-500",
    },
    {
      icon: Zap,
      title: "Super Rápido",
      description: "Transações instantâneas e entrega automática de skins",
      color: "text-yellow-500",
    },
    {
      icon: DollarSign,
      title: "Menores Taxas",
      description: "As taxas mais competitivas do mercado brasileiro",
      color: "text-green-500",
    },
    {
      icon: Target,
      title: "Preços Justos",
      description: "Sistema de precificação baseado no mercado Steam",
      color: "text-purple-500",
    },
    {
      icon: Gift,
      title: "Recompensas",
      description: "Sistema de níveis e recompensas para usuários ativos",
      color: "text-pink-500",
    },
    {
      icon: Dices,
      title: "Rifas Exclusivas",
      description: "Participe de sorteios de skins raras e valiosas",
      color: "text-orange-500",
    },
  ]

  const faqs = [
    {
      question: "Quanto tempo leva para receber minha skin?",
      answer: "Após a confirmação do pagamento, a skin é enviada automaticamente via trade da Steam. O processo geralmente leva de 1 a 5 minutos.",
    },
    {
      question: "Quais são as taxas?",
      answer: "Cobramos 5% de taxa sobre vendas. Depósitos via PIX são gratuitos. Saques têm uma taxa mínima de R$ 2,00.",
    },
    {
      question: "Como funciona o sistema de rifas?",
      answer: "Usuários criam rifas de suas skins, definindo o número de tickets e preço. Quando todos os números são vendidos, o sistema sorteia automaticamente o vencedor.",
    },
    {
      question: "É seguro?",
      answer: "Sim! Usamos criptografia SSL, autenticação Steam oficial, e sistema anti-fraude. Nunca pedimos sua senha da Steam.",
    },
    {
      question: "Posso vender minhas skins?",
      answer: "Sim! Basta conectar sua Steam, selecionar as skins do seu inventário, definir o preço e listar no marketplace.",
    },
    {
      question: "Quanto tempo leva para sacar?",
      answer: "Saques via PIX são processados em até 24 horas úteis, mas geralmente são instantâneos.",
    },
  ]

  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-4 py-8">
        <PageHeader
          title="Como Funciona"
          description="Aprenda a usar o CSBlox em 4 passos simples"
          icon={Sparkles}
        />

        {/* Steps Section */}
        <div className="mt-12 space-y-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="relative overflow-hidden bg-gray-900/50 border-gray-800 hover:border-purple-500/50 transition-all">
                {/* Background Gradient */}
                <div className={`absolute top-0 left-0 w-2 h-full bg-gradient-to-b ${step.color}`} />
                
                <div className="p-8">
                  <div className="flex flex-col md:flex-row gap-6 items-start">
                    {/* Number Badge */}
                    <div className="relative">
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg`}
                      >
                        <step.icon className="w-10 h-10 text-white" />
                      </motion.div>
                      <Badge className="absolute -top-2 -right-2 bg-black border-gray-700">
                        {step.number}
                      </Badge>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-white mb-3">{step.title}</h3>
                      <p className="text-gray-400 mb-4 leading-relaxed">{step.description}</p>
                      
                      {/* Features */}
                      <div className="flex flex-wrap gap-2">
                        {step.features.map((feature, i) => (
                          <Badge key={i} variant="secondary" className="bg-gray-800/50 text-gray-300">
                            <CheckCircle className="w-3 h-3 mr-1 text-green-500" />
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-16"
        >
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-purple-500/10 border-purple-500/50">VANTAGENS</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Por que escolher o CSBlox?
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              A plataforma mais completa e segura para negociar skins de CS2 no Brasil
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.6 + index * 0.05 }}
              >
                <Card className="p-6 bg-gray-900/50 border-gray-800 hover:border-purple-500/50 transition-all h-full">
                  <div className={`w-12 h-12 rounded-lg bg-gray-800/50 flex items-center justify-center mb-4 ${feature.color}`}>
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-400 text-sm">{feature.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-16"
        >
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-blue-500/10 border-blue-500/50">FAQ</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Perguntas Frequentes
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.9 + index * 0.05 }}
              >
                <Card className="p-6 bg-gray-900/50 border-gray-800 hover:border-blue-500/50 transition-all">
                  <h3 className="text-lg font-bold text-white mb-2 flex items-start gap-2">
                    <span className="text-blue-400 flex-shrink-0">Q:</span>
                    {faq.question}
                  </h3>
                  <p className="text-gray-400 pl-6">{faq.answer}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.2 }}
          className="mt-16"
        >
          <Card className="relative overflow-hidden bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-purple-500/50">
            <div className="p-12 text-center">
              <Package className="w-16 h-16 mx-auto mb-6 text-purple-400" />
              <h2 className="text-3xl font-bold text-white mb-4">
                Pronto para começar?
              </h2>
              <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
                Junte-se a milhares de traders que já confiam no CSBlox para suas transações de skins CS2
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/marketplace">
                  <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    Explorar Marketplace
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Link href="/raffles">
                  <Button size="lg" variant="outline" className="border-gray-700 hover:border-purple-500">
                    <Dices className="w-5 h-5 mr-2" />
                    Ver Rifas Ativas
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}


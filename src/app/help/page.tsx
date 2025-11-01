"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { PageHeader } from "@/components/common/page-header"
import { 
  HelpCircle, 
  MessageCircle, 
  Mail, 
  FileText, 
  Shield, 
  CreditCard,
  Package,
  Users,
  Search
} from "lucide-react"
import { useState } from "react"

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const categories = [
    { icon: Package, title: "Comprar e Vender", description: "Como funciona o marketplace", articles: 12 },
    { icon: CreditCard, title: "Pagamentos", description: "Depósitos, saques e PIX", articles: 8 },
    { icon: Shield, title: "Segurança", description: "Proteção e privacidade", articles: 6 },
    { icon: Users, title: "Conta", description: "Perfil e configurações", articles: 10 },
  ]

  const faqs = [
    {
      question: "Como faço para comprar uma skin?",
      answer: "Navegue pelo marketplace, selecione a skin desejada e clique em 'Comprar'. O pagamento pode ser feito via PIX ou saldo da carteira."
    },
    {
      question: "Quanto tempo leva para receber minha skin?",
      answer: "As skins são enviadas automaticamente via trade do Steam em até 5 minutos após a confirmação do pagamento."
    },
    {
      question: "Posso cancelar uma compra?",
      answer: "Sim, você pode cancelar uma compra antes da confirmação do pagamento. Após o pagamento, entre em contato com o suporte."
    },
    {
      question: "Qual a taxa cobrada nas vendas?",
      answer: "Cobramos apenas 5% sobre o valor de cada venda realizada, uma das menores taxas do mercado."
    },
  ]

  return (
    <div className="min-h-screen bg-[--color-bg-primary]">
      <div className="container py-8 max-w-6xl space-y-8">
        <PageHeader
          title="Central de Ajuda"
          description="Encontre respostas para suas dúvidas ou entre em contato conosco"
        />

        {/* Busca */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="bg-[--color-bg-secondary] border-[--color-border]">
            <CardContent className="p-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[--color-text-tertiary]" />
                <Input
                  placeholder="Buscar por artigos, tutoriais ou perguntas..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-12 bg-[--color-bg-tertiary] border-[--color-border] text-lg"
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Categorias */}
        <div>
          <h2 className="text-2xl font-bold text-[--color-text-primary] mb-6">Categorias</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {categories.map((category, index) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="bg-[--color-bg-secondary] border-[--color-border] hover:border-purple-500/50 transition-all cursor-pointer group">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-lg bg-purple-500/10 group-hover:bg-purple-500/20 transition-colors">
                        <category.icon className="h-6 w-6 text-purple-400" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-[--color-text-primary] mb-1">{category.title}</h3>
                        <p className="text-sm text-[--color-text-secondary] mb-2">{category.description}</p>
                        <p className="text-xs text-[--color-text-tertiary]">{category.articles} artigos</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* FAQs */}
        <div>
          <h2 className="text-2xl font-bold text-[--color-text-primary] mb-6">Perguntas Frequentes</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="bg-[--color-bg-secondary] border-[--color-border]">
                  <CardHeader>
                    <CardTitle className="text-lg text-[--color-text-primary] flex items-start gap-3">
                      <HelpCircle className="h-5 w-5 text-purple-400 flex-shrink-0 mt-0.5" />
                      {faq.question}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-[--color-text-secondary] pl-8">{faq.answer}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Contato */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="bg-linear-to-r from-purple-500/10 to-pink-500/10 border-purple-500/20">
            <CardContent className="p-8 text-center">
              <MessageCircle className="h-12 w-12 text-purple-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-[--color-text-primary] mb-2">
                Ainda precisa de ajuda?
              </h3>
              <p className="text-[--color-text-secondary] mb-6">
                Nossa equipe está pronta para ajudar você
              </p>
              <div className="flex gap-4 justify-center">
                <Button className="bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Chat ao Vivo
                </Button>
                <Button variant="outline" className="border-[--color-border]">
                  <Mail className="h-4 w-4 mr-2" />
                  Enviar Email
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}


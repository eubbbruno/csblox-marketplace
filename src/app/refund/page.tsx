"use client"

import { motion } from "framer-motion"
import { PageHeader } from "@/components/common/page-header"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DollarSign, AlertCircle, CheckCircle, XCircle, Clock, HelpCircle } from "lucide-react"

export default function RefundPage() {
  const policies = [
    {
      title: "Depósitos via PIX",
      icon: DollarSign,
      status: "non-refundable",
      description: "Depósitos realizados via PIX não são reembolsáveis. O valor depositado fica disponível como saldo na plataforma.",
      details: [
        "Saldo pode ser usado para compras no marketplace",
        "Saldo pode ser usado para participar de rifas",
        "Saldo pode ser sacado a qualquer momento (sujeito a taxas)",
        "Não há prazo de validade para o saldo",
      ],
    },
    {
      title: "Compras de Skins",
      icon: CheckCircle,
      status: "conditional",
      description: "Compras de skins são finais após a confirmação e envio do trade. Reembolsos só são possíveis em casos específicos.",
      details: [
        "✅ Skin não recebida após 24 horas: reembolso total",
        "✅ Skin diferente da anunciada: reembolso total",
        "✅ Problema técnico da plataforma: reembolso total",
        "❌ Arrependimento após recebimento: não reembolsável",
        "❌ Mudança de preço de mercado: não reembolsável",
      ],
    },
    {
      title: "Vendas de Skins",
      icon: XCircle,
      status: "non-refundable",
      description: "Vendas são finais após a confirmação. O vendedor não pode cancelar após o comprador efetuar o pagamento.",
      details: [
        "Vendedor recebe o valor após entrega confirmada",
        "Taxa de 5% é descontada automaticamente",
        "Valor pode ser sacado ou usado na plataforma",
        "Cancelamento só é possível antes de qualquer compra",
      ],
    },
    {
      title: "Rifas - Criador",
      icon: Clock,
      status: "conditional",
      description: "Criadores de rifas podem cancelar apenas antes da venda do primeiro número.",
      details: [
        "✅ Cancelamento antes de vender números: sem penalidade",
        "❌ Após venda de números: rifa deve ser concluída",
        "❌ Não entregar skin ao vencedor: banimento + multa",
        "Taxa de criação (2%) não é reembolsável",
      ],
    },
    {
      title: "Rifas - Participante",
      icon: XCircle,
      status: "non-refundable",
      description: "Compra de números de rifa não é reembolsável, exceto em caso de cancelamento pelo criador.",
      details: [
        "✅ Rifa cancelada pelo criador: reembolso total automático",
        "✅ Fraude comprovada: reembolso total",
        "❌ Não ganhar a rifa: não reembolsável (é um sorteio)",
        "❌ Arrependimento: não reembolsável",
      ],
    },
    {
      title: "Saques",
      icon: DollarSign,
      status: "conditional",
      description: "Saques via PIX são processados em até 24 horas. Taxa mínima de R$ 2,00.",
      details: [
        "Saque mínimo: R$ 10,00",
        "Taxa fixa: R$ 2,00 por saque",
        "Processamento: até 24 horas úteis",
        "Dados bancários devem estar corretos",
        "Saques incorretos não são reembolsáveis",
      ],
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "non-refundable":
        return (
          <Badge className="bg-red-500/20 text-red-400 border-red-500/50">
            <XCircle className="w-3 h-3 mr-1" />
            Não Reembolsável
          </Badge>
        )
      case "conditional":
        return (
          <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/50">
            <AlertCircle className="w-3 h-3 mr-1" />
            Condicional
          </Badge>
        )
      case "refundable":
        return (
          <Badge className="bg-green-500/20 text-green-400 border-green-500/50">
            <CheckCircle className="w-3 h-3 mr-1" />
            Reembolsável
          </Badge>
        )
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-4 py-8">
        <PageHeader
          title="Política de Reembolso"
          description="Entenda nossas políticas de reembolso e cancelamento"
          icon={DollarSign}
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-8"
        >
          {/* Aviso Importante */}
          <Card className="p-6 mb-8 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-blue-500/50">
            <div className="flex items-start gap-4">
              <AlertCircle className="w-6 h-6 text-blue-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-bold text-white mb-2">Importante</h3>
                <p className="text-gray-300">
                  Última atualização: {new Date().toLocaleDateString('pt-BR')}. 
                  Leia atentamente nossas políticas antes de realizar transações. 
                  Ao usar o CSBlox, você concorda com estas condições.
                </p>
              </div>
            </div>
          </Card>

          {/* Políticas */}
          <div className="space-y-6">
            {policies.map((policy, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              >
                <Card className="p-6 bg-gray-900/50 border-gray-800 hover:border-purple-500/50 transition-all">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/30">
                      <policy.icon className="w-6 h-6 text-purple-400" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-xl font-bold text-white">{policy.title}</h3>
                        {getStatusBadge(policy.status)}
                      </div>
                      <p className="text-gray-300 mb-4">{policy.description}</p>
                      <div className="space-y-2">
                        {policy.details.map((detail, i) => (
                          <div key={i} className="flex items-start gap-2 text-sm text-gray-400">
                            <span className="text-purple-400 mt-1">•</span>
                            <span>{detail}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Processo de Solicitação */}
          <Card className="p-6 mt-8 bg-gray-900/50 border-gray-800">
            <div className="flex items-start gap-4 mb-6">
              <HelpCircle className="w-6 h-6 text-purple-400 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Como Solicitar um Reembolso?</h3>
                <p className="text-gray-300">
                  Se você acredita ter direito a um reembolso, siga estes passos:
                </p>
              </div>
            </div>

            <div className="space-y-4 ml-10">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-500/20 border border-purple-500/50 flex items-center justify-center text-purple-400 font-bold">
                  1
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-1">Acesse o Suporte</h4>
                  <p className="text-gray-400 text-sm">
                    Vá para a Central de Ajuda e abra um ticket de suporte
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-500/20 border border-purple-500/50 flex items-center justify-center text-purple-400 font-bold">
                  2
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-1">Forneça Detalhes</h4>
                  <p className="text-gray-400 text-sm">
                    Inclua ID da transação, prints de tela e descrição do problema
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-500/20 border border-purple-500/50 flex items-center justify-center text-purple-400 font-bold">
                  3
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-1">Aguarde Análise</h4>
                  <p className="text-gray-400 text-sm">
                    Nossa equipe analisará em até 48 horas úteis
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-500/20 border border-purple-500/50 flex items-center justify-center text-purple-400 font-bold">
                  4
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-1">Receba Resposta</h4>
                  <p className="text-gray-400 text-sm">
                    Se aprovado, o reembolso é processado em até 5 dias úteis
                  </p>
                </div>
              </div>
            </div>
          </Card>

          {/* Exceções */}
          <Card className="p-6 mt-8 bg-gradient-to-r from-orange-500/10 to-red-500/10 border-orange-500/50">
            <div className="flex items-start gap-4">
              <AlertCircle className="w-6 h-6 text-orange-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-bold text-white mb-2">Exceções e Casos Especiais</h3>
                <p className="text-gray-300 mb-4">
                  Reservamo-nos o direito de avaliar cada caso individualmente. Em situações excepcionais,
                  podemos oferecer reembolsos mesmo fora das políticas padrão, a nosso critério.
                </p>
                <p className="text-gray-400 text-sm">
                  Casos de fraude comprovada, problemas técnicos graves ou erros da plataforma sempre
                  resultarão em reembolso total, independentemente da política padrão.
                </p>
              </div>
            </div>
          </Card>

          {/* Contato */}
          <Card className="p-6 mt-8 bg-gray-900/50 border-gray-800">
            <h3 className="text-xl font-bold text-white mb-3">Dúvidas sobre Reembolsos?</h3>
            <p className="text-gray-300 mb-4">
              Entre em contato com nossa equipe de suporte:
            </p>
            <div className="flex flex-col gap-2 text-gray-400">
              <p>📧 Email: reembolsos@csblox.com</p>
              <p>📧 Email alternativo: suporte@csblox.com</p>
              <p>💬 Discord: discord.gg/csblox</p>
              <p>🕐 Horário de atendimento: Segunda a Sexta, 9h às 18h (horário de Brasília)</p>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}


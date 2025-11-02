"use client"

import { motion } from "framer-motion"
import { PageHeader } from "@/components/common/page-header"
import { Card } from "@/components/ui/card"
import { FileText, Shield, AlertCircle, CheckCircle } from "lucide-react"

export default function TermsPage() {
  const sections = [
    {
      title: "1. Aceitação dos Termos",
      content: `Ao acessar e usar o CSBlox Marketplace, você concorda em cumprir e estar vinculado aos seguintes termos e condições de uso. Se você não concordar com qualquer parte destes termos, não deverá usar nossos serviços.`,
      icon: CheckCircle,
    },
    {
      title: "2. Descrição do Serviço",
      content: `O CSBlox é uma plataforma de marketplace que permite aos usuários comprar, vender e trocar skins de Counter-Strike 2 (CS2). Oferecemos também um sistema de rifas/sorteios de skins.`,
      icon: FileText,
    },
    {
      title: "3. Conta de Usuário",
      content: `Para usar nossos serviços, você deve criar uma conta através da autenticação Steam. Você é responsável por manter a segurança de sua conta e por todas as atividades que ocorrem sob sua conta. Você deve ter pelo menos 18 anos ou a idade legal em sua jurisdição para usar nossos serviços.`,
      icon: Shield,
    },
    {
      title: "4. Transações e Pagamentos",
      content: `Todas as transações são processadas através de métodos de pagamento seguros (PIX via Mercado Pago). As taxas de transação são claramente exibidas antes da confirmação. Você concorda em pagar todas as taxas aplicáveis. Não somos responsáveis por problemas relacionados aos processadores de pagamento de terceiros.`,
      icon: AlertCircle,
    },
    {
      title: "5. Rifas e Sorteios",
      content: `As rifas são realizadas de forma transparente e aleatória. Ao participar de uma rifa, você concorda que o resultado é final e não pode ser contestado. O criador da rifa deve possuir a skin anunciada. Reservamo-nos o direito de cancelar rifas suspeitas de fraude.`,
      icon: AlertCircle,
    },
    {
      title: "6. Propriedade Intelectual",
      content: `Todo o conteúdo do site, incluindo design, logotipos, textos e código, é propriedade do CSBlox ou de seus licenciadores. As skins de CS2 são propriedade da Valve Corporation. Não reivindicamos propriedade sobre as skins, apenas facilitamos sua negociação.`,
      icon: Shield,
    },
    {
      title: "7. Conduta do Usuário",
      content: `Você concorda em não usar o serviço para atividades ilegais, fraudulentas ou prejudiciais. É proibido: usar bots ou automação, manipular preços, criar múltiplas contas para fraude, realizar chargebacks fraudulentos, ou violar os Termos de Serviço da Steam.`,
      icon: AlertCircle,
    },
    {
      title: "8. Reembolsos e Cancelamentos",
      content: `Depósitos via PIX não são reembolsáveis, mas o saldo pode ser usado na plataforma ou sacado conforme nossa política. Vendas de skins são finais após a confirmação. Rifas podem ser canceladas apenas pelo criador antes da venda de qualquer número.`,
      icon: FileText,
    },
    {
      title: "9. Limitação de Responsabilidade",
      content: `O CSBlox não se responsabiliza por perdas diretas ou indiretas decorrentes do uso da plataforma. Não garantimos a disponibilidade ininterrupta do serviço. Não somos responsáveis por problemas com a API da Steam ou outros serviços de terceiros.`,
      icon: AlertCircle,
    },
    {
      title: "10. Modificações dos Termos",
      content: `Reservamo-nos o direito de modificar estes termos a qualquer momento. Notificaremos os usuários sobre mudanças significativas. O uso continuado do serviço após as mudanças constitui aceitação dos novos termos.`,
      icon: FileText,
    },
    {
      title: "11. Suspensão e Encerramento",
      content: `Podemos suspender ou encerrar sua conta a qualquer momento por violação destes termos, atividade suspeita, ou por qualquer outro motivo que consideremos apropriado. Você pode encerrar sua conta a qualquer momento, mas deve sacar seu saldo antes.`,
      icon: Shield,
    },
    {
      title: "12. Lei Aplicável",
      content: `Estes termos são regidos pelas leis do Brasil. Quaisquer disputas serão resolvidas nos tribunais brasileiros. Se qualquer disposição destes termos for considerada inválida, as demais disposições permanecerão em vigor.`,
      icon: CheckCircle,
    },
  ]

  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-4 py-8">
        <PageHeader
          title="Termos de Uso"
          description="Leia atentamente nossos termos e condições de uso"
          icon={<FileText className="w-6 h-6 text-white" />}
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-8"
        >
          {/* Aviso Importante */}
          <Card className="p-6 mb-8 bg-gradient-to-r from-orange-500/10 to-red-500/10 border-orange-500/50">
            <div className="flex items-start gap-4">
              <AlertCircle className="w-6 h-6 text-orange-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-bold text-white mb-2">Aviso Importante</h3>
                <p className="text-gray-300">
                  Última atualização: {new Date().toLocaleDateString('pt-BR')}. 
                  Ao usar o CSBlox, você concorda com todos os termos descritos abaixo.
                  Por favor, leia com atenção.
                </p>
              </div>
            </div>
          </Card>

          {/* Seções dos Termos */}
          <div className="space-y-6">
            {sections.map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              >
                <Card className="p-6 bg-gray-900/50 border-gray-800 hover:border-purple-500/50 transition-all">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/30">
                      <section.icon className="w-6 h-6 text-purple-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white mb-3">{section.title}</h3>
                      <p className="text-gray-300 leading-relaxed">{section.content}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Contato */}
          <Card className="p-6 mt-8 bg-gray-900/50 border-gray-800">
            <h3 className="text-xl font-bold text-white mb-3">Dúvidas sobre os Termos?</h3>
            <p className="text-gray-300 mb-4">
              Se você tiver alguma dúvida sobre nossos Termos de Uso, entre em contato conosco:
            </p>
            <div className="flex flex-col gap-2 text-gray-400">
              <p>📧 Email: suporte@csblox.com</p>
              <p>💬 Discord: discord.gg/csblox</p>
              <p>🕐 Horário de atendimento: Segunda a Sexta, 9h às 18h (horário de Brasília)</p>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}


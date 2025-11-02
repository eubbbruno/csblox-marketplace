"use client"

import { motion } from "framer-motion"
import { PageHeader } from "@/components/common/page-header"
import { Card } from "@/components/ui/card"
import { Shield, Lock, Eye, Database, UserCheck, AlertTriangle } from "lucide-react"

export default function PrivacyPage() {
  const sections = [
    {
      title: "1. Informações que Coletamos",
      content: `Coletamos as seguintes informações:
      
• **Informações da Steam**: ID Steam, nome de usuário, avatar, inventário público (quando você conecta sua conta Steam)
• **Informações de Transação**: Histórico de compras, vendas, depósitos e saques
• **Informações de Pagamento**: Dados processados através do Mercado Pago (não armazenamos dados de cartão)
• **Dados de Uso**: Endereço IP, navegador, páginas visitadas, tempo de permanência
• **Cookies**: Usamos cookies para manter sua sessão e melhorar a experiência`,
      icon: Database,
    },
    {
      title: "2. Como Usamos suas Informações",
      content: `Usamos suas informações para:
      
• Processar transações e gerenciar sua conta
• Verificar sua identidade e prevenir fraudes
• Melhorar nossos serviços e desenvolver novos recursos
• Enviar notificações importantes sobre sua conta
• Cumprir obrigações legais e regulatórias
• Analisar o uso da plataforma para otimização`,
      icon: Eye,
    },
    {
      title: "3. Compartilhamento de Informações",
      content: `Podemos compartilhar suas informações com:
      
• **Processadores de Pagamento**: Mercado Pago para processar transações
• **Steam/Valve**: Para autenticação e acesso ao inventário
• **Autoridades Legais**: Quando exigido por lei ou para prevenir fraudes
• **Provedores de Serviços**: Hospedagem, análise, suporte ao cliente

Nunca vendemos suas informações pessoais para terceiros.`,
      icon: UserCheck,
    },
    {
      title: "4. Segurança dos Dados",
      content: `Implementamos medidas de segurança robustas:
      
• Criptografia SSL/TLS para todas as comunicações
• Senhas são hasheadas com bcrypt
• Autenticação de dois fatores (2FA) disponível
• Monitoramento contínuo de atividades suspeitas
• Backups regulares e seguros dos dados
• Acesso restrito aos dados por funcionários autorizados`,
      icon: Lock,
    },
    {
      title: "5. Seus Direitos (LGPD)",
      content: `De acordo com a Lei Geral de Proteção de Dados (LGPD), você tem direito a:
      
• **Acesso**: Solicitar uma cópia dos seus dados
• **Correção**: Corrigir dados imprecisos ou desatualizados
• **Exclusão**: Solicitar a exclusão dos seus dados (exceto quando legalmente obrigatório manter)
• **Portabilidade**: Receber seus dados em formato estruturado
• **Revogação**: Revogar consentimentos a qualquer momento
• **Oposição**: Opor-se ao processamento de seus dados em certas circunstâncias`,
      icon: Shield,
    },
    {
      title: "6. Cookies e Tecnologias Similares",
      content: `Usamos cookies para:
      
• **Cookies Essenciais**: Necessários para o funcionamento do site (sessão, autenticação)
• **Cookies de Performance**: Analisam como você usa o site (Google Analytics)
• **Cookies de Funcionalidade**: Lembram suas preferências (tema, idioma)

Você pode desabilitar cookies nas configurações do navegador, mas isso pode afetar a funcionalidade do site.`,
      icon: Eye,
    },
    {
      title: "7. Retenção de Dados",
      content: `Mantemos seus dados pelo tempo necessário para:
      
• Fornecer nossos serviços
• Cumprir obrigações legais (registros fiscais por 5 anos)
• Resolver disputas e fazer cumprir nossos acordos
• Prevenir fraudes e abusos

Após esse período, os dados são anonimizados ou excluídos de forma segura.`,
      icon: Database,
    },
    {
      title: "8. Transferência Internacional de Dados",
      content: `Seus dados podem ser transferidos e processados em servidores localizados fora do Brasil, incluindo:
      
• Estados Unidos (servidores de hospedagem)
• União Europeia (serviços de CDN)

Garantimos que essas transferências cumprem as exigências da LGPD e usam cláusulas contratuais padrão.`,
      icon: Shield,
    },
    {
      title: "9. Privacidade de Menores",
      content: `Nossos serviços não são destinados a menores de 18 anos. Não coletamos intencionalmente informações de menores. Se descobrirmos que coletamos dados de um menor, tomaremos medidas para excluí-los imediatamente.`,
      icon: AlertTriangle,
    },
    {
      title: "10. Alterações nesta Política",
      content: `Podemos atualizar esta Política de Privacidade periodicamente. Notificaremos você sobre mudanças significativas através de:
      
• Email para o endereço cadastrado
• Notificação no site
• Aviso na página inicial

A data da última atualização é sempre exibida no topo desta página.`,
      icon: Shield,
    },
  ]

  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-4 py-8">
        <PageHeader
          title="Política de Privacidade"
          description="Como coletamos, usamos e protegemos suas informações"
          icon={<Shield className="w-6 h-6 text-white" />}
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
              <Shield className="w-6 h-6 text-blue-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-bold text-white mb-2">Seu Privacidade é Nossa Prioridade</h3>
                <p className="text-gray-300">
                  Última atualização: {new Date().toLocaleDateString('pt-BR')}. 
                  Esta política descreve como o CSBlox coleta, usa e protege suas informações pessoais
                  de acordo com a Lei Geral de Proteção de Dados (LGPD).
                </p>
              </div>
            </div>
          </Card>

          {/* Seções da Política */}
          <div className="space-y-6">
            {sections.map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              >
                <Card className="p-6 bg-gray-900/50 border-gray-800 hover:border-blue-500/50 transition-all">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/30">
                      <section.icon className="w-6 h-6 text-blue-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white mb-3">{section.title}</h3>
                      <p className="text-gray-300 leading-relaxed whitespace-pre-line">{section.content}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Contato do DPO */}
          <Card className="p-6 mt-8 bg-gray-900/50 border-gray-800">
            <h3 className="text-xl font-bold text-white mb-3">Encarregado de Proteção de Dados (DPO)</h3>
            <p className="text-gray-300 mb-4">
              Para exercer seus direitos ou esclarecer dúvidas sobre privacidade, entre em contato com nosso DPO:
            </p>
            <div className="flex flex-col gap-2 text-gray-400">
              <p>📧 Email: dpo@csblox.com</p>
              <p>📧 Email alternativo: privacidade@csblox.com</p>
              <p>📞 Telefone: +55 (11) 1234-5678</p>
              <p>🕐 Horário de atendimento: Segunda a Sexta, 9h às 18h (horário de Brasília)</p>
            </div>
          </Card>

          {/* Consentimento */}
          <Card className="p-6 mt-8 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border-green-500/50">
            <div className="flex items-start gap-4">
              <UserCheck className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-bold text-white mb-2">Consentimento</h3>
                <p className="text-gray-300">
                  Ao usar o CSBlox, você consente com a coleta e uso de informações conforme descrito nesta
                  Política de Privacidade. Você pode revogar seu consentimento a qualquer momento entrando
                  em contato conosco.
                </p>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}


"use client"

import { motion } from "framer-motion"
import { SectionTitle } from "@/components/common/section-title"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { HelpCircle } from "lucide-react"

export function FAQSection() {
  const faqs = [
    {
      question: "Como funciona o CSBlox?",
      answer: "O CSBlox é um marketplace seguro para compra, venda e troca de skins de CS2. Você faz login com Steam, deposita via PIX e pode negociar livremente. Todas as transações são protegidas e instantâneas.",
    },
    {
      question: "É seguro comprar skins aqui?",
      answer: "Sim! Utilizamos sistema anti-fraude avançado, verificação de vendedores e proteção em todas as transações. Além disso, mantemos as skins em custódia até a confirmação do pagamento.",
    },
    {
      question: "Quanto tempo demora para receber o PIX?",
      answer: "Os saques via PIX são processados instantaneamente! Após solicitar o saque, o valor cai na sua conta em até 5 minutos. Trabalhamos 24/7 para garantir rapidez.",
    },
    {
      question: "Qual a taxa cobrada?",
      answer: "Cobramos apenas 5% sobre cada venda realizada. Não há taxas para compra, depósito ou saque. Uma das menores taxas do mercado!",
    },
    {
      question: "Como funcionam as rifas?",
      answer: "Nas rifas, você compra números por uma fração do valor da skin. Quando todos os números são vendidos, sorteamos um ganhador aleatório que recebe a skin automaticamente. É uma forma divertida e acessível de conseguir skins raras!",
    },
    {
      question: "Posso cancelar uma compra?",
      answer: "Após a confirmação do pagamento, a transação é finalizada instantaneamente e não pode ser cancelada. Por isso, sempre confira os detalhes antes de confirmar.",
    },
    {
      question: "Como depositar dinheiro?",
      answer: "Acesse sua carteira, escolha o valor desejado e gere um QR Code PIX. Pague pelo app do seu banco e o saldo é creditado automaticamente em segundos!",
    },
    {
      question: "Preciso ter Steam Guard ativado?",
      answer: "Sim, para sua segurança, é obrigatório ter o Steam Guard Mobile Authenticator ativado há pelo menos 7 dias para realizar transações.",
    },
    {
      question: "Posso vender qualquer skin?",
      answer: "Você pode vender skins de CS2 que estejam no seu inventário Steam e não estejam com trade hold. Skins de outros jogos não são aceitas no momento.",
    },
    {
      question: "Como entro em contato com o suporte?",
      answer: "Você pode abrir um ticket na central de ajuda ou nos chamar no Discord. Nossa equipe responde em até 2 horas durante horário comercial.",
    },
  ]

  return (
    <section className="py-20 px-6 relative overflow-hidden bg-gradient-to-b from-black via-gray-900/30 to-black">
      <div className="max-w-4xl mx-auto relative z-10">
        <SectionTitle
          badge="PERGUNTAS FREQUENTES"
          badgeIcon={HelpCircle}
          title="❓ Dúvidas Comuns"
          description="Encontre respostas rápidas para as perguntas mais frequentes"
          gradient="from-cyan-400 via-blue-400 to-purple-400"
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <AccordionItem
                  value={`item-${i}`}
                  className="bg-gray-900/50 border border-gray-800 rounded-xl px-6 backdrop-blur-xl box-card hover:border-purple-500/50 transition-all"
                >
                  <AccordionTrigger className="text-left hover:no-underline py-4">
                    <span className="font-bold text-white pr-4">{faq.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-400 pb-4 leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>

        {/* Help CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <p className="text-gray-400 mb-4">Não encontrou sua resposta?</p>
          <a
            href="/help"
            className="text-purple-400 hover:text-purple-300 font-semibold underline transition-colors"
          >
            Acesse nossa Central de Ajuda →
          </a>
        </motion.div>
      </div>
    </section>
  )
}


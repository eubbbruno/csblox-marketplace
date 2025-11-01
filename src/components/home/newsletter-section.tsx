"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mail, Send, Sparkles, Gift } from "lucide-react"
import { toast } from "sonner"
import confetti from "canvas-confetti"

export function NewsletterSection() {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email || !email.includes("@")) {
      toast.error("Digite um email válido!")
      return
    }

    setLoading(true)

    // Simular API call
    setTimeout(() => {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#8B5CF6", "#EC4899", "#3B82F6"],
      })

      toast.success("Inscrito com sucesso!", {
        description: "Você receberá ofertas exclusivas no seu email!",
        icon: "🎉",
        style: {
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          color: "white",
          border: "none",
        },
      })

      setEmail("")
      setLoading(false)
    }, 1500)
  }

  return (
    <section className="py-20 px-6 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-900/20 via-pink-900/20 to-blue-900/20" />
        <motion.div
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <Card className="relative bg-gradient-to-br from-gray-900/95 via-purple-900/30 to-gray-900/95 border-purple-500/50 backdrop-blur-xl p-12 box-card overflow-hidden">
            {/* Decorative Icons */}
            <div className="absolute top-4 right-4 opacity-10">
              <Sparkles className="w-32 h-32 text-purple-400" />
            </div>
            <div className="absolute bottom-4 left-4 opacity-10">
              <Gift className="w-24 h-24 text-pink-400" />
            </div>

            <div className="relative z-10 text-center">
              {/* Icon */}
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="inline-block mb-6"
              >
                <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/50">
                  <Mail className="w-10 h-10 text-white" />
                </div>
              </motion.div>

              {/* Title */}
              <h2 className="text-4xl md:text-5xl font-black mb-4">
                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                  📬 Receba Ofertas Exclusivas
                </span>
              </h2>
              
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Cadastre seu email e seja o primeiro a saber sobre{" "}
                <span className="text-purple-400 font-bold">promoções</span>,{" "}
                <span className="text-pink-400 font-bold">rifas especiais</span> e{" "}
                <span className="text-blue-400 font-bold">novidades</span>!
              </p>

              {/* Form */}
              <form onSubmit={handleSubscribe} className="max-w-md mx-auto">
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex-1 relative">
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                      type="email"
                      placeholder="seu@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-12 h-14 bg-gray-800/50 border-gray-700 focus:border-purple-500 text-white placeholder:text-gray-500"
                      disabled={loading}
                    />
                  </div>
                  <Button
                    type="submit"
                    size="lg"
                    disabled={loading}
                    className="h-14 px-8 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold"
                  >
                    {loading ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                        />
                        Enviando...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2" />
                        Cadastrar
                      </>
                    )}
                  </Button>
                </div>
              </form>

              {/* Trust Badge */}
              <p className="text-sm text-gray-500 mt-4">
                🔒 Seus dados estão seguros. Sem spam, apenas ofertas relevantes.
              </p>

              {/* Benefits */}
              <div className="grid md:grid-cols-3 gap-4 mt-8">
                {[
                  { icon: "🎁", text: "Cupons Exclusivos" },
                  { icon: "⚡", text: "Ofertas Relâmpago" },
                  { icon: "🎲", text: "Rifas VIP" },
                ].map((benefit, i) => (
                  <motion.div
                    key={benefit.text}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center justify-center gap-2 text-gray-400"
                  >
                    <span className="text-2xl">{benefit.icon}</span>
                    <span className="text-sm font-medium">{benefit.text}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Glow Effect */}
            <motion.div
              animate={{
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl blur-2xl -z-10"
            />
          </Card>
        </motion.div>
      </div>
    </section>
  )
}


"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { SectionTitle } from "@/components/common/section-title"
import { LogIn, Wallet, Handshake, Zap, Shield, TrendingUp } from "lucide-react"

export function HowItWorksSection() {
  const steps = [
    {
      number: 1,
      title: "Conecte sua Steam",
      description: "Login rápido e seguro com sua conta Steam. Sem cadastros complicados!",
      icon: LogIn,
      color: "from-blue-500 to-cyan-500",
    },
    {
      number: 2,
      title: "Deposite com PIX",
      description: "Adicione saldo instantaneamente via PIX. Rápido, seguro e sem taxas abusivas!",
      icon: Wallet,
      color: "from-green-500 to-emerald-500",
    },
    {
      number: 3,
      title: "Negocie Livremente",
      description: "Compre, venda ou participe de rifas. Ganhe dinheiro com suas skins!",
      icon: Handshake,
      color: "from-purple-500 to-pink-500",
    },
  ]

  const features = [
    {
      icon: Zap,
      title: "Instantâneo",
      description: "Transações em segundos",
    },
    {
      icon: Shield,
      title: "100% Seguro",
      description: "Sistema anti-fraude",
    },
    {
      icon: TrendingUp,
      title: "Menor Taxa",
      description: "Apenas 5% por venda",
    },
  ]

  return (
    <section className="py-20 px-6 relative overflow-hidden bg-gradient-to-b from-black via-gray-900/50 to-black">
      {/* Decorative Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <SectionTitle
          badge="SIMPLES E RÁPIDO"
          title="Como Funciona?"
          description="Em apenas 3 passos você já está negociando suas skins"
          gradient="from-blue-400 via-purple-400 to-pink-400"
        />

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
            >
              <Card className="relative bg-gray-900/50 border-gray-800 p-8 box-card text-center group hover:border-purple-500/50 transition-all duration-300">
                {/* Number Badge */}
                <motion.div
                  className="absolute -top-6 left-1/2 transform -translate-x-1/2"
                  whileHover={{ scale: 1.1, rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center text-2xl font-black text-white shadow-lg`}>
                    {step.number}
                  </div>
                </motion.div>

                {/* Icon */}
                <motion.div
                  className="mt-8 mb-6"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className={`w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg`}>
                    <step.icon className="w-10 h-10 text-white" />
                  </div>
                </motion.div>

                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 group-hover:bg-clip-text transition-all">
                  {step.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {step.description}
                </p>

                {/* Arrow (except last) */}
                {i < steps.length - 1 && (
                  <motion.div
                    className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2"
                    animate={{ x: [0, 10, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
                      <path d="M5 15H25M25 15L18 8M25 15L18 22" stroke="url(#gradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <defs>
                        <linearGradient id="gradient" x1="5" y1="15" x2="25" y2="15">
                          <stop offset="0%" stopColor="#8B5CF6" />
                          <stop offset="100%" stopColor="#EC4899" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </motion.div>
                )}

                {/* Glow Effect */}
                <motion.div
                  className={`absolute -inset-0.5 bg-gradient-to-r ${step.color} rounded-xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500 -z-10`}
                />
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-6"
        >
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <Card className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 border-gray-700/50 backdrop-blur-xl p-6 text-center box-card">
                <feature.icon className="w-12 h-12 mx-auto mb-4 text-purple-400" />
                <h4 className="text-xl font-bold text-white mb-2">{feature.title}</h4>
                <p className="text-gray-400">{feature.description}</p>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}


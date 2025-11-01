"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { SectionTitle } from "@/components/common/section-title"
import { Star, Shield, Quote } from "lucide-react"

export function TestimonialsSection() {
  const testimonials = [
    {
      name: "João Silva",
      username: "@joaosilva",
      avatar: null,
      rating: 5,
      text: "Melhor marketplace de skins! Vendi minha faca em menos de 5 minutos e recebi o PIX na hora. Simplesmente perfeito!",
      verified: true,
      stats: "127 vendas",
    },
    {
      name: "Maria Santos",
      username: "@mariagamer",
      avatar: null,
      rating: 5,
      text: "Estava com medo de golpe, mas o sistema de segurança é top! Já comprei várias skins e nunca tive problema. Recomendo demais!",
      verified: true,
      stats: "89 compras",
    },
    {
      name: "Pedro Costa",
      username: "@pedroCS",
      avatar: null,
      rating: 5,
      text: "As rifas são viciantes! Já ganhei 3 skins incríveis gastando muito menos. A plataforma é rápida e confiável. 10/10!",
      verified: true,
      stats: "45 rifas ganhas",
    },
  ]

  return (
    <section className="py-20 px-6 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-900/10 to-black" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <SectionTitle
          badge="DEPOIMENTOS"
          badgeIcon={Star}
          title="💬 O Que Dizem Nossos Usuários"
          description="Milhares de traders satisfeitos compartilham suas experiências"
          gradient="from-yellow-400 via-orange-400 to-red-400"
        />

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={testimonial.username}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              whileHover={{ y: -10 }}
            >
              <Card className="relative bg-gradient-to-br from-gray-900/95 to-gray-800/95 border-gray-700/50 backdrop-blur-xl p-6 box-card h-full group">
                {/* Quote Icon */}
                <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Quote className="w-16 h-16 text-purple-400" />
                </div>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                  ))}
                </div>

                {/* Text */}
                <p className="text-gray-300 mb-6 leading-relaxed relative z-10">
                  "{testimonial.text}"
                </p>

                {/* User Info */}
                <div className="flex items-center gap-3 pt-4 border-t border-gray-800">
                  {testimonial.avatar ? (
                    <Image
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      width={48}
                      height={48}
                      className="rounded-full ring-2 ring-purple-500/30"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-xl font-bold ring-2 ring-purple-500/30">
                      {testimonial.name[0]}
                    </div>
                  )}
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-bold text-white">{testimonial.name}</p>
                      {testimonial.verified && (
                        <Shield className="w-4 h-4 text-green-400" />
                      )}
                    </div>
                    <p className="text-sm text-gray-400">{testimonial.username}</p>
                  </div>
                </div>

                {/* Stats Badge */}
                <Badge className="mt-3 bg-purple-500/20 text-purple-400 border-purple-500/50">
                  {testimonial.stats}
                </Badge>

                {/* Glow Effect */}
                <motion.div
                  className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500 -z-10"
                />
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <div className="flex flex-wrap justify-center items-center gap-8 text-gray-400">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-green-400" />
              <span className="font-semibold">100% Seguro</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-400" />
              <span className="font-semibold">4.9/5 Avaliação</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">👥</span>
              <span className="font-semibold">+10.000 Usuários</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}


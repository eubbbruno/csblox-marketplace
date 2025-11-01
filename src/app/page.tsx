"use client"

import { useState, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Sphere, MeshDistortMaterial, Float, Stars } from "@react-three/drei"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { TypeAnimation } from "react-type-animation"
import CountUp from "react-countup"
import { useInView } from "react-intersection-observer"
import { PopularSkinsSection } from "@/components/home/popular-skins-section"
import { HowItWorksSection } from "@/components/home/how-it-works-section"
import { TestimonialsSection } from "@/components/home/testimonials-section"
import { FAQSection } from "@/components/home/faq-section"
import { NewsletterSection } from "@/components/home/newsletter-section"
import { Footer } from "@/components/layout/footer"
import { 
  Sparkles, 
  Zap, 
  ChevronDown,
  Gamepad2,
  Users, 
  Gem,
  TrendingUp,
  Star,
  ArrowRight,
  Play
} from "lucide-react"

// Componente 3D Animado
function AnimatedSphere() {
  return (
    <Float speed={4} rotationIntensity={1} floatIntensity={2}>
      <Sphere args={[1, 100, 200]} scale={2.5}>
        <MeshDistortMaterial
          color="#8B5CF6"
          attach="material"
          distort={0.5}
          speed={1.5}
          roughness={0}
        />
      </Sphere>
    </Float>
  )
}

// Componente de Partículas Animadas
function ParticlesBackground() {
  return (
    <div className="fixed inset-0 -z-10">
      <div className="absolute inset-0 bg-gradient-to-br from-violet-900/20 via-purple-900/10 to-pink-900/20" />
      <motion.div
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%"],
        }}
        transition={{
          duration: 20,
          ease: "linear",
          repeat: Infinity,
          repeatType: "reverse",
        }}
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />
    </div>
  )
}

// Componente de Stats Animados
function AnimatedStats() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  const stats = [
    { label: "Usuários Ativos", value: 10000, suffix: "+", icon: Users },
    { label: "Skins Disponíveis", value: 5000, suffix: "+", icon: Gem },
    { label: "Volume Mensal", value: 500, suffix: "K+", prefix: "R$", icon: TrendingUp },
    { label: "Satisfação", value: 99, suffix: "%", icon: Star },
  ]

  return (
    <div ref={ref} className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          whileHover={{ scale: 1.05 }}
          className="relative"
        >
          <div className="relative p-6 rounded-2xl bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-xl border border-gray-700/50">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -top-3 -right-3"
            >
              <stat.icon className="w-8 h-8 text-purple-500/30" />
            </motion.div>
            <div className="text-4xl font-bold text-white">
              {inView && (
                <>
                  {stat.prefix}
                  <CountUp end={stat.value} duration={2.5} />
                  {stat.suffix}
                </>
              )}
            </div>
            <div className="text-sm text-gray-400 mt-1">{stat.label}</div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

// Componente Principal
export default function HomePage() {
  const { scrollY } = useScroll()
  const y1 = useTransform(scrollY, [0, 300], [0, 50])
  const y2 = useTransform(scrollY, [0, 300], [0, -50])
  const opacity = useTransform(scrollY, [0, 300], [1, 0])
  const [onlineUsers] = useState(Math.floor(Math.random() * 500) + 200)

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <ParticlesBackground />

      {/* Hero Section ÉPICO */}
      <section className="relative min-h-screen flex items-center justify-center pt-20">
        {/* Background 3D */}
        <div className="absolute inset-0">
          <Canvas camera={{ position: [0, 0, 5] }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
            <AnimatedSphere />
            <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
          </Canvas>
        </div>

        {/* Conteúdo do Hero */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            style={{ opacity }}
          >
            {/* Badge Animado */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-block mb-6"
            >
              <Badge className="px-4 py-2 text-sm font-bold bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/50 backdrop-blur-xl">
                <span className="relative flex h-3 w-3 mr-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </span>
                🔥 {onlineUsers}+ usuários online agora
              </Badge>
            </motion.div>

            {/* Título Principal com Efeito de Digitação */}
            <motion.h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6" style={{ y: y1 }}>
              <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
                REVOLUCIONE
              </span>
              <span className="block mt-2">
                <TypeAnimation
                  sequence={[
                    'SUAS SKINS',
                    2000,
                    'SEU INVENTÁRIO',
                    2000,
                    'SEU JOGO',
                    2000,
                  ]}
                  wrapper="span"
                  speed={50}
                  repeat={Infinity}
                  className="text-white"
                />
              </span>
            </motion.h1>

            {/* Subtítulo */}
            <motion.p
              className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              style={{ y: y2 }}
            >
              Compre, venda e troque skins de CS2 com
              <span className="text-purple-400 font-bold"> PIX instantâneo</span> e a
              <span className="text-pink-400 font-bold"> menor taxa do mercado</span>
            </motion.p>

            {/* CTAs */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="/login">
                  <Button size="lg" className="group relative px-8 py-6 text-lg font-bold bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-2xl shadow-2xl shadow-purple-500/25">
                    <span className="relative z-10 flex items-center">
                      <Zap className="w-5 h-5 mr-2" />
                      Começar Agora
                      <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Button>
                </Link>
              </motion.div>
              
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="/marketplace">
                  <Button size="lg" variant="outline" className="px-8 py-6 text-lg font-bold border-2 border-gray-700 hover:border-purple-500 bg-gray-900/50 backdrop-blur-xl rounded-2xl group">
                    <Play className="w-5 h-5 mr-2 text-purple-400" />
                    Ver Marketplace
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ChevronDown className="w-8 h-8 text-purple-400" />
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <AnimatedStats />
        </div>
      </section>

      {/* Popular Skins Section */}
      <PopularSkinsSection />

      {/* How It Works Section */}
      <HowItWorksSection />

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* FAQ Section */}
      <FAQSection />

      {/* Newsletter Section */}
      <NewsletterSection />

      {/* CTA Section Final */}
      <section className="py-32 px-6 relative">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 blur-3xl" />
            <div className="relative p-12 bg-gray-900/80 backdrop-blur-xl border border-gray-700/50 rounded-3xl box-card">
              <Gamepad2 className="w-16 h-16 mx-auto mb-6 text-purple-400" />
              <h2 className="text-4xl md:text-5xl font-black mb-4">
                Pronto para{" "}
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  dominar?
                </span>
              </h2>
              <p className="text-xl text-gray-400 mb-8">
                Junte-se a milhares de traders profissionais
              </p>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="/login">
                  <Button size="lg" className="px-12 py-6 text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-2xl shadow-2xl shadow-purple-500/25">
                    <Sparkles className="w-6 h-6 mr-3" />
                    Criar Conta Grátis
                  </Button>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}

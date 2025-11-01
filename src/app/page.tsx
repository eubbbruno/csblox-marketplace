"use client"

import { useState, useEffect } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Sphere, MeshDistortMaterial, Float, Stars } from "@react-three/drei"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import Tilt from "react-parallax-tilt"
import { TypeAnimation } from "react-type-animation"
import CountUp from "react-countup"
import { useInView } from "react-intersection-observer"
import confetti from "canvas-confetti"
import { RaffleCard } from "@/components/raffles/raffle-card"
import { 
  Sparkles, 
  Zap, 
  Shield, 
  Trophy, 
  Users, 
  TrendingUp,
  ArrowRight,
  Play,
  ChevronDown,
  Gamepad2,
  Target,
  Flame,
  Star,
  Crown,
  Gem,
  Package,
  Banknote,
  Dices
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

// Card de Feature com Animação 3D
function FeatureCard({ icon: Icon, title, description, delay }: any) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
    >
      <Tilt
        tiltMaxAngleX={10}
        tiltMaxAngleY={10}
        perspective={1000}
        glareEnable={true}
        glareMaxOpacity={0.3}
        glareBorderRadius="24px"
        scale={1.02}
      >
        <Card className="relative h-full p-6 bg-gradient-to-br from-gray-900/90 to-gray-800/90 border-gray-700/50 backdrop-blur-xl overflow-hidden group hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-500">
          {/* Glow Effect */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur opacity-0 group-hover:opacity-30 transition duration-1000" />
          
          {/* Animated Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <motion.div
              animate={{
                backgroundPosition: ["0% 0%", "100% 100%"],
              }}
              transition={{
                duration: 10,
                ease: "linear",
                repeat: Infinity,
                repeatType: "reverse",
              }}
              className="w-full h-full"
              style={{
                backgroundImage: `radial-gradient(circle at 50% 50%, rgba(168, 85, 247, 0.1) 0%, transparent 50%)`,
                backgroundSize: "50px 50px",
              }}
            />
          </div>
          
          <div className="relative z-10">
            <motion.div
              whileHover={{ rotate: 360, scale: 1.2 }}
              transition={{ duration: 0.5 }}
              className="w-16 h-16 mb-4 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/50"
            >
              <Icon className="w-8 h-8 text-white" />
            </motion.div>
            
            <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
            <p className="text-gray-400">{description}</p>
            
            <motion.div
              className="mt-4 flex items-center text-purple-400 font-semibold"
              whileHover={{ x: 5 }}
            >
              Saiba mais
              <ArrowRight className="w-4 h-4 ml-1" />
            </motion.div>
          </div>
          
          {/* Corner Decoration */}
          <div className="absolute top-0 right-0 w-20 h-20">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="w-full h-full"
            >
              <Sparkles className="w-8 h-8 text-purple-500/20 absolute top-2 right-2" />
            </motion.div>
          </div>
        </Card>
      </Tilt>
    </motion.div>
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

// Componente de Rifas Ativas
function RafflesSection() {
  const [raffles, setRaffles] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  useEffect(() => {
    const fetchRaffles = async () => {
      try {
        const response = await fetch('/api/raffles?limit=4&status=ACTIVE')
        const data = await response.json()
        if (data.success) {
          setRaffles(data.raffles)
        }
      } catch (error) {
        console.error('Error fetching raffles:', error)
      } finally {
        setLoading(false)
      }
    }

    if (inView) {
      fetchRaffles()
    }
  }, [inView])

  return (
    <section ref={ref} className="py-32 px-6 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 box-pattern opacity-5" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <Badge className="px-4 py-2 mb-4 bg-gradient-to-r from-orange-500/20 to-red-500/20 border-orange-500/50">
            <Dices className="w-4 h-4 mr-2 inline" />
            SORTEIOS AO VIVO
          </Badge>
          <h2 className="text-4xl md:text-6xl font-black mb-4">
            <span className="bg-gradient-to-r from-orange-400 via-red-400 to-pink-400 bg-clip-text text-transparent">
              🎲 Rifas Ativas
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Participe dos sorteios e ganhe skins incríveis por uma fração do preço!
          </p>
        </motion.div>

        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-800/50 rounded-lg h-96" />
              </div>
            ))}
          </div>
        ) : raffles.length > 0 ? (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {raffles.map((raffle, i) => (
                <motion.div
                  key={raffle.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <RaffleCard raffle={raffle} compact />
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <Link href="/raffles">
                <Button size="lg" variant="outline" className="border-2 border-orange-500 hover:bg-orange-500/10 text-orange-400 hover:text-orange-300">
                  Ver Todas as Rifas
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </motion.div>
          </>
        ) : (
          <div className="text-center py-12">
            <Dices className="w-16 h-16 mx-auto text-gray-600 mb-4" />
            <p className="text-gray-400">Nenhuma rifa ativa no momento</p>
          </div>
        )}
      </div>
    </section>
  )
}

// Componente Principal
export default function HomePage() {
  const { scrollY } = useScroll()
  const y1 = useTransform(scrollY, [0, 300], [0, 50])
  const y2 = useTransform(scrollY, [0, 300], [0, -50])
  const opacity = useTransform(scrollY, [0, 300], [1, 0])
  
  // Removido confetti de entrada para carregamento mais rápido
  
  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <ParticlesBackground />
      
      {/* Navbar Flutuante Animado */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
        className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
      >
        <div className="max-w-7xl mx-auto">
          <div className="bg-gray-900/80 backdrop-blur-xl rounded-full px-8 py-4 flex items-center justify-between border border-gray-800/50 shadow-2xl shadow-purple-500/10">
            {/* Logo Animado */}
            <Link href="/" className="flex items-center gap-3">
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="relative w-12 h-12"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl blur-md" />
                <div className="relative bg-black rounded-xl flex items-center justify-center w-full h-full">
                  <Gamepad2 className="w-6 h-6 text-white" />
                </div>
              </motion.div>
              <div>
                <span className="text-2xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  CSBLOX
                </span>
                <Badge variant="secondary" className="ml-2 text-xs">Beta</Badge>
              </div>
            </Link>
            
            {/* Menu Central */}
            <div className="hidden md:flex items-center gap-8">
              {["Marketplace", "Inventário", "Carteira"].map((item, i) => (
                <motion.div key={item} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    href={`/${item.toLowerCase()}`}
                    className="relative text-gray-300 hover:text-white transition-colors font-medium"
                  >
                    {item}
                  </Link>
                </motion.div>
              ))}
            </div>
            
            {/* CTA Button */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="/login">
                <Button className="relative bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold px-6 py-2 rounded-full shadow-lg shadow-purple-500/25">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Conectar Steam
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.nav>
      
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
              <Badge className="px-4 py-2 text-sm font-bold bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/50 backdrop-blur-xl">
                <Flame className="w-4 h-4 mr-2 text-orange-500 inline" />
                🔥 #1 Marketplace do Brasil
              </Badge>
            </motion.div>
            
            {/* Título Principal com Efeito de Digitação */}
            <motion.h1
              className="text-5xl md:text-7xl lg:text-8xl font-black mb-6"
              style={{ y: y1 }}
            >
              <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent animate-gradient">
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
      
      {/* Rifas Section */}
      <RafflesSection />
      
      {/* Features Section INSANO */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge className="px-4 py-2 mb-4 bg-purple-500/10 border-purple-500/50">
              FEATURES
            </Badge>
            <h2 className="text-4xl md:text-6xl font-black mb-4">
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Recursos Insanos
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Tecnologia de ponta para revolucionar sua experiência
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              icon={Zap}
              title="PIX Instantâneo"
              description="Receba em segundos, sem burocracia"
              delay={0.1}
            />
            <FeatureCard
              icon={Shield}
              title="100% Seguro"
              description="Sistema anti-fraude com IA"
              delay={0.2}
            />
            <FeatureCard
              icon={Trophy}
              title="Rank System"
              description="Suba de nível e ganhe recompensas"
              delay={0.3}
            />
            <FeatureCard
              icon={Target}
              title="Price Tracker"
              description="Monitore preços em tempo real"
              delay={0.4}
            />
            <FeatureCard
              icon={Crown}
              title="VIP Rewards"
              description="Benefícios exclusivos para membros"
              delay={0.5}
            />
            <FeatureCard
              icon={Gem}
              title="NFT Ready"
              description="Prepare-se para o futuro"
              delay={0.6}
            />
          </div>
        </div>
      </section>
      
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
            <Card className="relative p-12 bg-gray-900/80 backdrop-blur-xl border-gray-700/50">
              <Crown className="w-16 h-16 mx-auto mb-6 text-yellow-500" />
              <h2 className="text-4xl md:text-5xl font-black mb-4">
                Pronto para
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"> dominar?</span>
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
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

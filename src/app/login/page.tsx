"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, Zap, Trophy, Package, Sparkles, Lock, CheckCircle } from "lucide-react"
import Link from "next/link"

export default function LoginPage() {
  const handleSteamLogin = () => {
    // Para desenvolvimento, usar rota mock
    window.location.href = '/api/auth/steam'
  }
  
  const features = [
    { icon: Shield, label: "100% Seguro", description: "SSL + 2FA" },
    { icon: Zap, label: "PIX Instantâneo", description: "Saldo em segundos" },
    { icon: Trophy, label: "Menor Taxa", description: "Apenas 5%" },
  ]

  const benefits = [
    "✅ Acesso ao seu inventário Steam",
    "✅ Compre e venda skins com segurança",
    "✅ Participe de rifas exclusivas",
    "✅ Saque via PIX a qualquer momento",
    "✅ Sistema de reputação e níveis",
    "✅ Suporte 24/7 em português",
  ]
  
  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-pink-900/20" />
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
        className="absolute inset-0 opacity-30 box-pattern"
      />

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-5xl grid lg:grid-cols-2 gap-8 items-center">
          {/* Left Side - Branding */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="hidden lg:block"
          >
            <div className="space-y-6">
              {/* Logo */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-3"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-red-500 shadow-lg shadow-orange-500/25 box-card border border-orange-400/30">
                  <Package className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-red-400">
                    CSBlox
                  </h1>
                  <Badge variant="secondary" className="bg-orange-500/20 text-orange-400 border-orange-500/50">
                    Beta
                  </Badge>
                </div>
              </motion.div>

              {/* Headline */}
              <div className="space-y-3">
                <h2 className="text-4xl font-black text-white">
                  O Marketplace Mais{" "}
                  <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    Seguro
                  </span>{" "}
                  do Brasil
                </h2>
                <p className="text-xl text-gray-400">
                  Compre, venda e troque skins de CS2 com PIX instantâneo e as menores taxas do mercado.
                </p>
              </div>

              {/* Benefits */}
              <div className="space-y-2">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 * index }}
                    className="flex items-center gap-2 text-gray-300"
                  >
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span>{benefit}</span>
                  </motion.div>
                ))}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 pt-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">10K+</div>
                  <div className="text-sm text-gray-400">Usuários</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">5K+</div>
                  <div className="text-sm text-gray-400">Skins</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">99%</div>
                  <div className="text-sm text-gray-400">Satisfação</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Side - Login Card */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="relative overflow-hidden bg-gray-900/80 backdrop-blur-xl border-gray-800 shadow-2xl">
              {/* Glow Effect */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur opacity-20" />
              
              <div className="relative p-8 space-y-6">
                {/* Mobile Logo */}
                <div className="lg:hidden text-center">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="inline-flex items-center gap-3 mb-4"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-red-500 shadow-lg shadow-orange-500/25 box-card border border-orange-400/30">
                      <Package className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-red-400">
                      CSBlox
                    </span>
                  </motion.div>
                </div>

                {/* Header */}
                <div className="text-center space-y-2">
                  <h3 className="text-2xl font-bold text-white">Bem-vindo de Volta!</h3>
                  <p className="text-gray-400">
                    Faça login com sua conta Steam para começar
                  </p>
                </div>

                {/* Steam Login Button */}
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button 
                    onClick={handleSteamLogin}
                    className="w-full h-14 text-lg font-bold bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 shadow-lg shadow-blue-500/25"
                    size="lg"
                  >
                    <svg className="w-6 h-6 mr-3" viewBox="0 0 256 256" fill="currentColor">
                      <path d="M127.779 0C60.42 0 5.24 52.412 0 119.014l68.724 28.674a35.812 35.812 0 0 1 20.426-6.366c.682 0 1.356.019 2.02.056l30.566-44.71v-.626c0-26.903 21.69-48.796 48.353-48.796 26.662 0 48.352 21.893 48.352 48.796 0 26.902-21.69 48.804-48.352 48.804-.37 0-.73-.009-1.098-.018l-43.593 31.377c.028.582.046 1.163.046 1.751 0 20.246-16.28 36.676-36.294 36.676-17.566 0-32.263-12.658-35.584-29.412L4.41 166.623c11.576 44.539 51.928 77.494 100.178 77.494C198.213 244.117 256 186.168 256 92.503 256 29.301 206.024 0 127.779 0zM80.352 196.332l-15.749-6.568c2.787 5.867 7.621 10.775 14.033 13.47 13.857 5.83 29.836-.803 35.612-14.799a27.555 27.555 0 0 0 .046-21.035c-2.768-6.79-7.999-12.086-14.706-14.909-6.67-2.795-13.811-2.694-20.085-.304l16.275 6.79c10.222 4.3 15.056 16.145 10.794 26.461-4.253 10.314-15.998 15.191-26.22 10.894zm121.957-100.29c0-17.925-14.457-32.52-32.217-32.52-17.769 0-32.226 14.595-32.226 32.52 0 17.926 14.457 32.512 32.226 32.512 17.76 0 32.217-14.586 32.217-32.512zm-56.37-.055c0-13.488 10.84-24.42 24.2-24.42 13.368 0 24.208 10.932 24.208 24.42 0 13.488-10.84 24.421-24.209 24.421-13.359 0-24.2-10.933-24.2-24.42z"/>
                    </svg>
                    Entrar com Steam
                  </Button>
                </motion.div>
                
                {/* Divider */}
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-gray-700" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-gray-900 px-3 text-gray-500 flex items-center gap-2">
                      <Lock className="w-3 h-3" />
                      Login 100% Seguro
                    </span>
                  </div>
                </div>
                
                {/* Features */}
                <div className="grid grid-cols-3 gap-3">
                  {features.map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
                      className="text-center p-3 rounded-lg bg-gray-800/50 border border-gray-700 hover:border-purple-500/50 transition-all"
                    >
                      <feature.icon className="h-6 w-6 mx-auto mb-1 text-purple-400" />
                      <p className="text-xs font-semibold text-white">{feature.label}</p>
                      <p className="text-xs text-gray-500">{feature.description}</p>
                    </motion.div>
                  ))}
                </div>
                
                {/* Legal */}
                <p className="text-xs text-center text-gray-500">
                  Ao entrar, você concorda com nossos{" "}
                  <Link href="/terms" className="underline hover:text-purple-400 transition-colors">
                    Termos de Uso
                  </Link>{" "}
                  e{" "}
                  <Link href="/privacy" className="underline hover:text-purple-400 transition-colors">
                    Política de Privacidade
                  </Link>
                </p>

                {/* Trust Badge */}
                <div className="flex items-center justify-center gap-2 text-xs text-gray-600">
                  <Shield className="w-4 h-4 text-green-500" />
                  <span>Protegido por SSL e autenticação Steam oficial</span>
                </div>
              </div>
            </Card>

            {/* Footer */}
            <p className="text-center text-sm text-gray-600 mt-6">
              © {new Date().getFullYear()} CSBlox. Counter-Strike é marca registrada da Valve Corporation.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  )
}


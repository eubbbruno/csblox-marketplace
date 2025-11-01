"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import {
  Trophy,
  Sparkles,
  Users,
  Clock,
  Crown,
  PartyPopper,
} from "lucide-react"
import confetti from "canvas-confetti"
import { formatCurrency } from "@/lib/utils"

interface RaffleDrawAnimationProps {
  raffle: any
  onClose?: () => void
}

export function RaffleDrawAnimation({ raffle, onClose }: RaffleDrawAnimationProps) {
  const [phase, setPhase] = useState<"countdown" | "drawing" | "winner">("countdown")
  const [countdown, setCountdown] = useState(60)
  const [currentNumber, setCurrentNumber] = useState(1)
  const [winnerNumber, setWinnerNumber] = useState<number | null>(null)
  const [winner, setWinner] = useState<any>(null)

  useEffect(() => {
    // Countdown phase
    if (phase === "countdown" && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
      return () => clearTimeout(timer)
    }

    // Start drawing
    if (phase === "countdown" && countdown === 0) {
      setPhase("drawing")
      startDrawing()
    }
  }, [countdown, phase])

  const startDrawing = () => {
    // Simular roleta de números
    let iterations = 0
    const maxIterations = 50
    const interval = setInterval(() => {
      setCurrentNumber(Math.floor(Math.random() * raffle.totalTickets) + 1)
      iterations++

      if (iterations >= maxIterations) {
        clearInterval(interval)
        // Sortear número final
        const finalNumber = Math.floor(Math.random() * raffle.totalTickets) + 1
        setWinnerNumber(finalNumber)
        
        // Encontrar ganhador (mock)
        const mockWinner = {
          username: "Player" + Math.floor(Math.random() * 1000),
          avatar: null,
          numbers: [finalNumber],
        }
        setWinner(mockWinner)
        
        setTimeout(() => {
          setPhase("winner")
          celebrateWinner()
        }, 1000)
      }
    }, 100)
  }

  const celebrateWinner = () => {
    // Confetti MASSIVO! 🎉🎉🎉
    const duration = 5000
    const animationEnd = Date.now() + duration
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 }

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min
    }

    const interval = setInterval(function() {
      const timeLeft = animationEnd - Date.now()

      if (timeLeft <= 0) {
        return clearInterval(interval)
      }

      const particleCount = 50 * (timeLeft / duration)

      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: ["#f97316", "#ef4444", "#ec4899", "#fbbf24"],
      })
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ["#f97316", "#ef4444", "#ec4899", "#fbbf24"],
      })
    }, 250)

    // Confetti extra de cima
    setTimeout(() => {
      confetti({
        particleCount: 200,
        spread: 100,
        origin: { y: 0.4 },
        colors: ["#f97316", "#ef4444", "#ec4899", "#fbbf24"],
        shapes: ["star", "circle"],
      })
    }, 500)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-xl p-6">
      <AnimatePresence mode="wait">
        {/* Countdown Phase */}
        {phase === "countdown" && (
          <motion.div
            key="countdown"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="text-center"
          >
            <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-orange-500/50 p-12 max-w-2xl box-card">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-24 h-24 mx-auto mb-8"
              >
                <Clock className="w-full h-full text-orange-400" />
              </motion.div>

              <h2 className="text-4xl font-black mb-4">
                <span className="bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                  Sorteio em Andamento
                </span>
              </h2>

              <p className="text-gray-400 mb-8">
                O sorteio começará em instantes...
              </p>

              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="text-8xl font-black text-white mb-8"
              >
                {countdown}
              </motion.div>

              <div className="flex items-center justify-center gap-4 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span>{raffle.participants || 0} participantes</span>
                </div>
                <div className="flex items-center gap-2">
                  <Trophy className="w-4 h-4" />
                  <span>{raffle.totalTickets} números</span>
                </div>
              </div>
            </Card>
          </motion.div>
        )}

        {/* Drawing Phase */}
        {phase === "drawing" && (
          <motion.div
            key="drawing"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="text-center"
          >
            <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-orange-500/50 p-12 max-w-2xl box-card">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 0.5, repeat: Infinity }}
                className="w-24 h-24 mx-auto mb-8"
              >
                <Sparkles className="w-full h-full text-orange-400" />
              </motion.div>

              <h2 className="text-4xl font-black mb-8">
                <span className="bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                  Sorteando...
                </span>
              </h2>

              <div className="relative mb-8">
                <motion.div
                  animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: [0, 360],
                  }}
                  transition={{ duration: 0.3 }}
                  className="text-9xl font-black"
                >
                  <span className="bg-gradient-to-r from-orange-400 via-red-400 to-pink-400 bg-clip-text text-transparent">
                    {currentNumber}
                  </span>
                </motion.div>

                {/* Particles */}
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute top-1/2 left-1/2"
                    animate={{
                      x: [0, Math.cos(i * 45 * Math.PI / 180) * 100],
                      y: [0, Math.sin(i * 45 * Math.PI / 180) * 100],
                      opacity: [1, 0],
                      scale: [1, 0],
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      delay: i * 0.1,
                    }}
                  >
                    <Sparkles className="w-6 h-6 text-orange-400" />
                  </motion.div>
                ))}
              </div>

              <p className="text-gray-400">
                Aguarde enquanto sorteamos o número vencedor...
              </p>
            </Card>
          </motion.div>
        )}

        {/* Winner Phase */}
        {phase === "winner" && winner && (
          <motion.div
            key="winner"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="text-center max-w-3xl w-full"
          >
            <Card className="bg-gradient-to-br from-yellow-900/50 via-orange-900/50 to-red-900/50 border-yellow-500/50 p-12 box-card relative overflow-hidden">
              {/* Animated Background */}
              <div className="absolute inset-0 opacity-20">
                <motion.div
                  animate={{
                    backgroundPosition: ["0% 0%", "100% 100%"],
                  }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                  className="w-full h-full"
                  style={{
                    backgroundImage: `radial-gradient(circle, rgba(251, 191, 36, 0.3) 0%, transparent 50%)`,
                    backgroundSize: "50px 50px",
                  }}
                />
              </div>

              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="relative z-10"
              >
                <Crown className="w-32 h-32 mx-auto mb-6 text-yellow-400" />
              </motion.div>

              <motion.h2
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="text-5xl font-black mb-4 relative z-10"
              >
                <span className="bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
                  🎉 TEMOS UM VENCEDOR! 🎉
                </span>
              </motion.h2>

              <div className="relative z-10 mb-8">
                <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-2xl px-8 py-3 mb-4">
                  Número Sorteado: {winnerNumber}
                </Badge>

                <div className="flex items-center justify-center gap-4 mt-6">
                  {winner.avatar ? (
                    <Image
                      src={winner.avatar}
                      alt={winner.username}
                      width={80}
                      height={80}
                      className="rounded-full border-4 border-yellow-400"
                    />
                  ) : (
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center text-3xl font-bold border-4 border-yellow-400">
                      {winner.username[0]}
                    </div>
                  )}
                  <div className="text-left">
                    <p className="text-sm text-gray-400">Vencedor</p>
                    <p className="text-3xl font-black text-white">{winner.username}</p>
                  </div>
                </div>
              </div>

              <div className="relative z-10 mb-8">
                <div className="relative aspect-video max-w-md mx-auto mb-4">
                  <Image
                    src={raffle.skinImage}
                    alt={raffle.skinName}
                    fill
                    className="object-contain"
                  />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">{raffle.skinName}</h3>
                <p className="text-gray-300">
                  Valor: {formatCurrency(raffle.ticketPrice * raffle.totalTickets)}
                </p>
              </div>

              {onClose && (
                <Button
                  size="lg"
                  onClick={onClose}
                  className="relative z-10 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-bold"
                >
                  <PartyPopper className="w-5 h-5 mr-2" />
                  Fechar
                </Button>
              )}
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}


"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  Clock,
  Users,
  Sparkles,
  Star,
  Zap,
  TrendingUp,
  Package,
} from "lucide-react"
import { formatCurrency, getRarityColor } from "@/lib/utils"

interface RaffleCardProps {
  raffle: {
    id: string
    skinName: string
    skinImage: string
    skinRarity: string
    skinExterior?: string
    skinStatTrak: boolean
    skinSouvenir: boolean
    ticketPrice: number
    totalTickets: number
    soldTickets: number
    endDate: Date | string
    participants?: number
    progressPercentage?: number
    creator?: {
      username: string
      avatar?: string
    }
  }
  compact?: boolean
}

export function RaffleCard({ raffle, compact = false }: RaffleCardProps) {
  const [timeRemaining, setTimeRemaining] = useState("")
  const [isExpired, setIsExpired] = useState(false)

  useEffect(() => {
    const calculateTimeRemaining = () => {
      const end = new Date(raffle.endDate)
      const now = new Date()
      const diff = end.getTime() - now.getTime()

      if (diff <= 0) {
        setIsExpired(true)
        setTimeRemaining("Encerrada")
        return
      }

      const hours = Math.floor(diff / (1000 * 60 * 60))
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((diff % (1000 * 60)) / 1000)

      if (hours > 24) {
        const days = Math.floor(hours / 24)
        setTimeRemaining(`${days}d ${hours % 24}h`)
      } else if (hours > 0) {
        setTimeRemaining(`${hours}h ${minutes}m`)
      } else {
        setTimeRemaining(`${minutes}m ${seconds}s`)
      }
    }

    calculateTimeRemaining()
    const interval = setInterval(calculateTimeRemaining, 1000)

    return () => clearInterval(interval)
  }, [raffle.endDate])

  const progress = raffle.progressPercentage || 
    Math.round((raffle.soldTickets / raffle.totalTickets) * 100)
  
  const isAlmostComplete = progress >= 90
  const remainingTickets = raffle.totalTickets - raffle.soldTickets

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <Link href={`/raffles/${raffle.id}`}>
        <Card className="relative overflow-hidden bg-gradient-to-br from-gray-900/95 via-gray-800/95 to-gray-900/95 border-gray-700/50 backdrop-blur-xl group hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-300 box-card">
          {/* Rarity Indicator */}
          <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${getRarityColor(raffle.skinRarity)}`} />
          
          {/* Almost Complete Badge */}
          {isAlmostComplete && !isExpired && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute top-3 right-3 z-10"
            >
              <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white border-0 animate-pulse-glow">
                <TrendingUp className="w-3 h-3 mr-1" />
                QUASE COMPLETO!
              </Badge>
            </motion.div>
          )}
          
          {/* Image */}
          <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900 box-pattern">
            <Image
              src={raffle.skinImage}
              alt={raffle.skinName}
              fill
              className="object-contain p-4 transition-transform duration-700 group-hover:scale-110"
            />
            
            {/* Badges */}
            <div className="absolute top-3 left-3 flex flex-col gap-2 z-10">
              {raffle.skinStatTrak && (
                <Badge className="bg-gradient-to-r from-orange-500 to-red-500 border-0 text-white font-bold">
                  <Zap className="w-3 h-3 mr-1" />
                  StatTrak™
                </Badge>
              )}
              {raffle.skinSouvenir && (
                <Badge className="bg-gradient-to-r from-yellow-500 to-yellow-600 border-0 text-white font-bold">
                  <Star className="w-3 h-3 mr-1" />
                  Souvenir
                </Badge>
              )}
            </div>
          </div>
          
          {/* Content */}
          <div className="p-4">
            {/* Title */}
            <div className="mb-3">
              <h3 className="font-bold text-white text-lg group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 group-hover:bg-clip-text transition-all line-clamp-1">
                {raffle.skinName}
              </h3>
              <div className="flex items-center gap-2 mt-1">
                <Badge className={`${getRarityColor(raffle.skinRarity)} text-white border-0 text-xs`}>
                  {raffle.skinRarity}
                </Badge>
                {raffle.skinExterior && (
                  <span className="text-xs text-gray-400">
                    {raffle.skinExterior.replace('_', ' ')}
                  </span>
                )}
              </div>
            </div>
            
            {/* Progress */}
            <div className="mb-3">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-400">Progresso</span>
                <span className="font-bold text-white">
                  {raffle.soldTickets}/{raffle.totalTickets}
                </span>
              </div>
              <Progress value={progress} className="h-2" />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>{progress}% vendido</span>
                <span>{remainingTickets} restantes</span>
              </div>
            </div>
            
            {/* Info Grid */}
            <div className="grid grid-cols-2 gap-2 mb-3 p-2 rounded-lg bg-gray-800/50">
              <div className="flex items-center gap-2">
                <Package className="w-4 h-4 text-purple-400" />
                <div>
                  <p className="text-xs text-gray-400">Preço/Nº</p>
                  <p className="text-sm font-bold text-white">
                    {formatCurrency(raffle.ticketPrice)}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-400" />
                <div>
                  <p className="text-xs text-gray-400">Termina em</p>
                  <p className={`text-sm font-bold ${isExpired ? 'text-red-400' : 'text-white'}`}>
                    {timeRemaining}
                  </p>
                </div>
              </div>
            </div>
            
            {/* Footer */}
            <div className="flex items-center justify-between pt-3 border-t border-gray-800">
              <div className="flex items-center gap-2">
                {raffle.creator && (
                  <>
                    {raffle.creator.avatar ? (
                      <Image
                        src={raffle.creator.avatar}
                        alt={raffle.creator.username}
                        width={24}
                        height={24}
                        className="rounded-full"
                      />
                    ) : (
                      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-xs font-bold text-white">
                        {raffle.creator.username[0]}
                      </div>
                    )}
                    <span className="text-xs text-gray-400">{raffle.creator.username}</span>
                  </>
                )}
              </div>
              {raffle.participants !== undefined && (
                <div className="flex items-center gap-1 text-xs text-gray-400">
                  <Users className="w-3 h-3" />
                  <span>{raffle.participants}</span>
                </div>
              )}
            </div>
            
            {/* CTA Button */}
            {!compact && (
              <Button className="w-full mt-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold">
                <Sparkles className="w-4 h-4 mr-2" />
                Participar Agora
              </Button>
            )}
          </div>
          
          {/* Glow Effect */}
          <motion.div
            className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-500 -z-10"
          />
        </Card>
      </Link>
    </motion.div>
  )
}


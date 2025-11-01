"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useParams } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BuyTicketsModal } from "@/components/raffles/buy-tickets-modal"
import {
  Clock,
  Users,
  Sparkles,
  Star,
  Zap,
  TrendingUp,
  Package,
  Trophy,
  Shield,
  ArrowLeft,
  ExternalLink,
} from "lucide-react"
import { formatCurrency, getRarityColor } from "@/lib/utils"
import Link from "next/link"
import { toast } from "sonner"

export default function RaffleDetailsPage() {
  const params = useParams()
  const raffleId = params.id as string
  
  const [raffle, setRaffle] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [showBuyModal, setShowBuyModal] = useState(false)
  const [timeRemaining, setTimeRemaining] = useState("")

  useEffect(() => {
    fetchRaffleDetails()
  }, [raffleId])

  useEffect(() => {
    if (!raffle) return

    const calculateTimeRemaining = () => {
      const end = new Date(raffle.endDate)
      const now = new Date()
      const diff = end.getTime() - now.getTime()

      if (diff <= 0) {
        setTimeRemaining("Encerrada")
        return
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24))
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((diff % (1000 * 60)) / 1000)

      if (days > 0) {
        setTimeRemaining(`${days}d ${hours}h ${minutes}m`)
      } else if (hours > 0) {
        setTimeRemaining(`${hours}h ${minutes}m ${seconds}s`)
      } else {
        setTimeRemaining(`${minutes}m ${seconds}s`)
      }
    }

    calculateTimeRemaining()
    const interval = setInterval(calculateTimeRemaining, 1000)

    return () => clearInterval(interval)
  }, [raffle])

  const fetchRaffleDetails = async () => {
    try {
      const response = await fetch(`/api/raffles/${raffleId}`)
      const data = await response.json()

      if (data.success) {
        setRaffle(data.raffle)
      } else {
        toast.error("Rifa não encontrada")
      }
    } catch (error) {
      console.error("Error fetching raffle:", error)
      toast.error("Erro ao carregar rifa")
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-800 rounded w-1/3 mb-8" />
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="aspect-square bg-gray-800 rounded-lg" />
              <div className="space-y-4">
                <div className="h-12 bg-gray-800 rounded" />
                <div className="h-32 bg-gray-800 rounded" />
                <div className="h-16 bg-gray-800 rounded" />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!raffle) {
    return (
      <div className="min-h-screen bg-black text-white pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <Package className="w-16 h-16 mx-auto text-gray-600 mb-4" />
          <h2 className="text-2xl font-bold mb-2">Rifa não encontrada</h2>
          <p className="text-gray-400 mb-6">
            Esta rifa não existe ou foi removida
          </p>
          <Link href="/raffles">
            <Button>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar para Rifas
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  const progress = Math.round((raffle.soldTickets / raffle.totalTickets) * 100)
  const remainingTickets = raffle.totalTickets - raffle.soldTickets

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        {/* Back Button */}
        <Link href="/raffles">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
        </Link>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700 p-8 box-card">
              <div className="relative aspect-square mb-4">
                <Image
                  src={raffle.skinImage}
                  alt={raffle.skinName}
                  fill
                  className="object-contain"
                />
                
                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  {raffle.skinStatTrak && (
                    <Badge className="bg-gradient-to-r from-orange-500 to-red-500 border-0">
                      <Zap className="w-3 h-3 mr-1" />
                      StatTrak™
                    </Badge>
                  )}
                  {raffle.skinSouvenir && (
                    <Badge className="bg-gradient-to-r from-yellow-500 to-yellow-600 border-0">
                      <Star className="w-3 h-3 mr-1" />
                      Souvenir
                    </Badge>
                  )}
                </div>
              </div>

              {/* Skin Info */}
              <div className="space-y-3">
                <div>
                  <h2 className="text-2xl font-black mb-1">{raffle.skinName}</h2>
                  <div className="flex items-center gap-2">
                    <Badge className={`${getRarityColor(raffle.skinRarity)} text-white border-0`}>
                      {raffle.skinRarity}
                    </Badge>
                    {raffle.skinExterior && (
                      <span className="text-sm text-gray-400">
                        {raffle.skinExterior.replace('_', ' ')}
                      </span>
                    )}
                  </div>
                </div>

                {raffle.skinFloat && (
                  <div className="flex justify-between items-center p-3 bg-gray-800/50 rounded-lg">
                    <span className="text-sm text-gray-400">Float Value</span>
                    <span className="font-bold text-green-400">
                      {raffle.skinFloat.toFixed(4)}
                    </span>
                  </div>
                )}

                <div className="flex justify-between items-center p-3 bg-gray-800/50 rounded-lg">
                  <span className="text-sm text-gray-400">Tipo</span>
                  <span className="font-bold">{raffle.skinType || "N/A"}</span>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Info & Actions */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            {/* Timer Card */}
            <Card className="bg-gradient-to-r from-orange-500/20 to-red-500/20 border-orange-500/50 p-6 box-card">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Clock className="w-8 h-8 text-orange-400" />
                  <div>
                    <p className="text-sm text-gray-400">Termina em</p>
                    <p className="text-2xl font-black text-white">{timeRemaining}</p>
                  </div>
                </div>
                <Badge className="bg-orange-500 text-white">
                  {raffle.status}
                </Badge>
              </div>
            </Card>

            {/* Progress Card */}
            <Card className="bg-gray-900/50 border-gray-800 p-6 box-card">
              <div className="mb-4">
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-gray-400">Progresso</span>
                  <span className="font-bold">
                    {raffle.soldTickets}/{raffle.totalTickets}
                  </span>
                </div>
                <Progress value={progress} className="h-3 mb-2" />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>{progress}% vendido</span>
                  <span>{remainingTickets} números restantes</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-gray-800/50 rounded-lg">
                  <Package className="w-5 h-5 mx-auto mb-1 text-purple-400" />
                  <p className="text-xs text-gray-400">Preço/Número</p>
                  <p className="text-lg font-bold">{formatCurrency(raffle.ticketPrice)}</p>
                </div>
                <div className="text-center p-3 bg-gray-800/50 rounded-lg">
                  <Users className="w-5 h-5 mx-auto mb-1 text-blue-400" />
                  <p className="text-xs text-gray-400">Participantes</p>
                  <p className="text-lg font-bold">{raffle.participants || 0}</p>
                </div>
              </div>
            </Card>

            {/* Buy Button */}
            <Button
              size="lg"
              className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold text-lg py-6"
              onClick={() => setShowBuyModal(true)}
              disabled={remainingTickets === 0}
            >
              <Sparkles className="w-5 h-5 mr-2" />
              {remainingTickets === 0 ? "Esgotado" : "Comprar Números"}
            </Button>

            {/* Creator Info */}
            <Card className="bg-gray-900/50 border-gray-800 p-4 box-card">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {raffle.creator?.avatar ? (
                    <Image
                      src={raffle.creator.avatar}
                      alt={raffle.creator.username}
                      width={48}
                      height={48}
                      className="rounded-full"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-xl font-bold">
                      {raffle.creator?.username?.[0] || "?"}
                    </div>
                  )}
                  <div>
                    <p className="text-xs text-gray-400">Criado por</p>
                    <p className="font-bold">{raffle.creator?.username || "Anônimo"}</p>
                  </div>
                </div>
                <Badge className="bg-green-500/20 text-green-400 border-green-500/50">
                  <Shield className="w-3 h-3 mr-1" />
                  Verificado
                </Badge>
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="participants" className="mt-8">
          <TabsList className="bg-gray-900/50 border border-gray-800">
            <TabsTrigger value="participants">
              <Users className="w-4 h-4 mr-2" />
              Participantes ({raffle.entries?.length || 0})
            </TabsTrigger>
            <TabsTrigger value="mynumbers">
              <Trophy className="w-4 h-4 mr-2" />
              Meus Números
            </TabsTrigger>
            <TabsTrigger value="rules">
              <Shield className="w-4 h-4 mr-2" />
              Regras
            </TabsTrigger>
          </TabsList>

          <TabsContent value="participants" className="mt-6">
            <Card className="bg-gray-900/50 border-gray-800 p-6 box-card">
              {raffle.entries && raffle.entries.length > 0 ? (
                <div className="space-y-3">
                  {raffle.entries.map((entry: any, i: number) => (
                    <div
                      key={entry.id}
                      className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg hover:bg-gray-800 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-gray-500 w-8">#{i + 1}</span>
                        {entry.user?.avatar ? (
                          <Image
                            src={entry.user.avatar}
                            alt={entry.user.username}
                            width={32}
                            height={32}
                            className="rounded-full"
                          />
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-xs font-bold">
                            {entry.user?.username?.[0] || "?"}
                          </div>
                        )}
                        <span className="font-medium">{entry.user?.username || "Anônimo"}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <Badge variant="outline" className="border-purple-500/50">
                          {entry.ticketCount || entry.tickets?.length || 0} números
                        </Badge>
                        <span className="text-sm text-gray-400">
                          {formatCurrency(entry.amount)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Users className="w-12 h-12 mx-auto text-gray-600 mb-3" />
                  <p className="text-gray-400">Nenhum participante ainda</p>
                  <p className="text-sm text-gray-500">Seja o primeiro a participar!</p>
                </div>
              )}
            </Card>
          </TabsContent>

          <TabsContent value="mynumbers" className="mt-6">
            <Card className="bg-gray-900/50 border-gray-800 p-6 box-card">
              <div className="text-center py-12">
                <Trophy className="w-12 h-12 mx-auto text-gray-600 mb-3" />
                <p className="text-gray-400">Você ainda não participou desta rifa</p>
                <Button
                  className="mt-4"
                  onClick={() => setShowBuyModal(true)}
                >
                  Comprar Números
                </Button>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="rules" className="mt-6">
            <Card className="bg-gray-900/50 border-gray-800 p-6 box-card">
              <div className="space-y-4 text-gray-300">
                <div>
                  <h3 className="font-bold text-white mb-2 flex items-center gap-2">
                    <Shield className="w-5 h-5 text-green-400" />
                    Como Funciona
                  </h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Compre um ou mais números para participar do sorteio</li>
                    <li>Quanto mais números, maior sua chance de ganhar</li>
                    <li>O sorteio acontece quando todos os números forem vendidos</li>
                    <li>O ganhador recebe a skin automaticamente</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold text-white mb-2 flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-yellow-400" />
                    Regras do Sorteio
                  </h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Sorteio 100% aleatório e verificável</li>
                    <li>Não é possível cancelar após a compra</li>
                    <li>Apenas 1 ganhador por rifa</li>
                    <li>Skin transferida automaticamente para o vencedor</li>
                  </ul>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Buy Modal */}
      {showBuyModal && (
        <BuyTicketsModal
          raffle={raffle}
          onClose={() => setShowBuyModal(false)}
          onSuccess={fetchRaffleDetails}
        />
      )}
    </div>
  )
}


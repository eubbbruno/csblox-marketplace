"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  ArrowLeft,
  Package,
  DollarSign,
  Clock,
  Users,
  Sparkles,
  AlertCircle,
  Check,
} from "lucide-react"
import { formatCurrency, getRarityColor } from "@/lib/utils"
import { MOCK_SKINS } from "@/lib/mock-skins"
import Link from "next/link"
import { toast } from "sonner"
import confetti from "canvas-confetti"

export default function CreateRafflePage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)

  // Form data
  const [selectedSkin, setSelectedSkin] = useState<any>(null)
  const [totalTickets, setTotalTickets] = useState(100)
  const [ticketPrice, setTicketPrice] = useState(10)
  const [duration, setDuration] = useState(24)

  // Calculations
  const totalValue = totalTickets * ticketPrice
  const creatorEarnings = totalValue * 0.95 // 95% para o criador
  const platformFee = totalValue * 0.05 // 5% taxa
  const suggestedPrice = selectedSkin ? Math.ceil((selectedSkin.steamPrice / totalTickets) * 0.7) : 10

  const ticketOptions = [50, 100, 200, 500]
  const durationOptions = [
    { value: 1, label: "1 hora" },
    { value: 6, label: "6 horas" },
    { value: 12, label: "12 horas" },
    { value: 24, label: "24 horas" },
    { value: 48, label: "48 horas" },
  ]

  const handleCreateRaffle = async () => {
    if (!selectedSkin) {
      toast.error("Selecione uma skin")
      return
    }

    if (ticketPrice < 1) {
      toast.error("Preço mínimo: R$ 1,00 por número")
      return
    }

    setLoading(true)

    try {
      const response = await fetch("/api/raffles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          skinName: selectedSkin.name,
          skinImage: selectedSkin.image,
          skinRarity: selectedSkin.rarity,
          skinExterior: selectedSkin.exterior,
          skinFloat: selectedSkin.float,
          skinType: selectedSkin.type,
          skinStatTrak: selectedSkin.isStatTrak,
          skinSouvenir: selectedSkin.isSouvenir,
          totalTickets,
          ticketPrice,
          duration,
        }),
      })

      const data = await response.json()

      if (data.success) {
        confetti({
          particleCount: 150,
          spread: 80,
          origin: { y: 0.6 },
          colors: ["#f97316", "#ef4444", "#ec4899"],
        })

        toast.success("Rifa criada com sucesso!", {
          icon: "🎉",
          style: {
            background: "linear-gradient(135deg, #f97316 0%, #ef4444 100%)",
            color: "white",
            border: "none",
          },
        })

        setTimeout(() => {
          router.push(`/raffles/${data.raffle.id}`)
        }, 1500)
      } else {
        toast.error(data.message || "Erro ao criar rifa")
      }
    } catch (error) {
      console.error("Error creating raffle:", error)
      toast.error("Erro ao criar rifa")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-12">
      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <div className="mb-8">
          <Link href="/raffles">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar
            </Button>
          </Link>
          
          <h1 className="text-4xl md:text-5xl font-black mb-2">
            <span className="bg-gradient-to-r from-orange-400 via-red-400 to-pink-400 bg-clip-text text-transparent">
              Criar Nova Rifa
            </span>
          </h1>
          <p className="text-gray-400">
            Configure sua rifa e comece a vender números
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-12">
          <div className="flex items-center gap-4">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
                    s === step
                      ? "bg-gradient-to-r from-orange-500 to-red-500 text-white scale-110"
                      : s < step
                      ? "bg-green-500 text-white"
                      : "bg-gray-800 text-gray-500"
                  }`}
                >
                  {s < step ? <Check className="w-5 h-5" /> : s}
                </div>
                {s < 3 && (
                  <div
                    className={`w-16 h-1 mx-2 ${
                      s < step ? "bg-green-500" : "bg-gray-800"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step 1: Select Skin */}
        {step === 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="bg-gray-900/50 border-gray-800 p-6 box-card">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Package className="w-6 h-6 text-orange-400" />
                Selecione a Skin
              </h2>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                {MOCK_SKINS.map((skin) => (
                  <motion.div
                    key={skin.name}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedSkin(skin)}
                    className={`cursor-pointer p-4 rounded-lg border-2 transition-all ${
                      selectedSkin?.name === skin.name
                        ? "border-orange-500 bg-orange-500/10"
                        : "border-gray-800 hover:border-gray-700"
                    }`}
                  >
                    <div className="relative aspect-square mb-3">
                      <Image
                        src={skin.image}
                        alt={skin.name}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <h3 className="font-bold text-sm mb-1 line-clamp-1">
                      {skin.name}
                    </h3>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className={`${getRarityColor(skin.rarity)} text-white border-0 text-xs`}>
                        {skin.rarity}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-400">
                      {formatCurrency(skin.steamPrice)}
                    </p>
                  </motion.div>
                ))}
              </div>

              <Button
                size="lg"
                className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
                onClick={() => setStep(2)}
                disabled={!selectedSkin}
              >
                Continuar
              </Button>
            </Card>
          </motion.div>
        )}

        {/* Step 2: Configure */}
        {step === 2 && selectedSkin && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Form */}
              <Card className="bg-gray-900/50 border-gray-800 p-6 box-card">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <Sparkles className="w-6 h-6 text-orange-400" />
                  Configurar Rifa
                </h2>

                <div className="space-y-6">
                  {/* Total Tickets */}
                  <div>
                    <Label className="mb-3 block">Total de Números</Label>
                    <div className="grid grid-cols-4 gap-2">
                      {ticketOptions.map((option) => (
                        <Button
                          key={option}
                          variant={totalTickets === option ? "default" : "outline"}
                          onClick={() => setTotalTickets(option)}
                          className={totalTickets === option ? "bg-orange-500 hover:bg-orange-600" : "border-gray-700"}
                        >
                          {option}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Ticket Price */}
                  <div>
                    <Label htmlFor="price" className="mb-3 block">
                      Preço por Número
                    </Label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input
                        id="price"
                        type="number"
                        min={1}
                        value={ticketPrice}
                        onChange={(e) => setTicketPrice(Math.max(1, parseFloat(e.target.value) || 1))}
                        className="pl-10 bg-gray-800 border-gray-700"
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      Sugestão baseada no valor da skin: {formatCurrency(suggestedPrice)}
                    </p>
                  </div>

                  {/* Duration */}
                  <div>
                    <Label className="mb-3 block">Duração</Label>
                    <Select value={duration.toString()} onValueChange={(v) => setDuration(parseInt(v))}>
                      <SelectTrigger className="bg-gray-800 border-gray-700">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {durationOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value.toString()}>
                            <Clock className="w-4 h-4 inline mr-2" />
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Info Alert */}
                  <div className="p-4 bg-blue-500/10 border border-blue-500/50 rounded-lg">
                    <div className="flex gap-3">
                      <AlertCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                      <div className="text-sm text-blue-300">
                        <p className="font-semibold mb-1">Informações Importantes</p>
                        <ul className="list-disc list-inside space-y-1 text-xs">
                          <li>Você receberá 95% do valor total</li>
                          <li>5% de taxa da plataforma</li>
                          <li>Sorteio automático quando 100% vendido</li>
                          <li>Não é possível cancelar após criar</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <Button
                    variant="outline"
                    className="flex-1 border-gray-700"
                    onClick={() => setStep(1)}
                  >
                    Voltar
                  </Button>
                  <Button
                    className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
                    onClick={() => setStep(3)}
                  >
                    Continuar
                  </Button>
                </div>
              </Card>

              {/* Preview */}
              <Card className="bg-gray-900/50 border-gray-800 p-6 box-card">
                <h3 className="text-xl font-bold mb-4">Preview</h3>
                
                <div className="relative aspect-square mb-4 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg p-4">
                  <Image
                    src={selectedSkin.image}
                    alt={selectedSkin.name}
                    fill
                    className="object-contain"
                  />
                </div>

                <h4 className="font-bold text-lg mb-2">{selectedSkin.name}</h4>
                <Badge className={`${getRarityColor(selectedSkin.rarity)} text-white border-0 mb-4`}>
                  {selectedSkin.rarity}
                </Badge>

                <div className="space-y-3">
                  <div className="flex justify-between p-3 bg-gray-800/50 rounded-lg">
                    <span className="text-gray-400">Total de Números</span>
                    <span className="font-bold">{totalTickets}</span>
                  </div>
                  <div className="flex justify-between p-3 bg-gray-800/50 rounded-lg">
                    <span className="text-gray-400">Preço por Número</span>
                    <span className="font-bold">{formatCurrency(ticketPrice)}</span>
                  </div>
                  <div className="flex justify-between p-3 bg-gray-800/50 rounded-lg">
                    <span className="text-gray-400">Valor Total</span>
                    <span className="font-bold text-green-400">{formatCurrency(totalValue)}</span>
                  </div>
                  <div className="flex justify-between p-3 bg-gray-800/50 rounded-lg">
                    <span className="text-gray-400">Você Receberá (95%)</span>
                    <span className="font-bold text-purple-400">{formatCurrency(creatorEarnings)}</span>
                  </div>
                </div>
              </Card>
            </div>
          </motion.div>
        )}

        {/* Step 3: Confirm */}
        {step === 3 && selectedSkin && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="bg-gray-900/50 border-gray-800 p-8 box-card max-w-2xl mx-auto">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl font-black mb-2">Confirmar Criação</h2>
                <p className="text-gray-400">
                  Revise os detalhes antes de criar a rifa
                </p>
              </div>

              <div className="space-y-4 mb-8">
                <div className="p-4 bg-gray-800/50 rounded-lg">
                  <p className="text-sm text-gray-400 mb-1">Skin</p>
                  <p className="font-bold text-lg">{selectedSkin.name}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-800/50 rounded-lg">
                    <p className="text-sm text-gray-400 mb-1">Total de Números</p>
                    <p className="font-bold text-2xl">{totalTickets}</p>
                  </div>
                  <div className="p-4 bg-gray-800/50 rounded-lg">
                    <p className="text-sm text-gray-400 mb-1">Preço/Número</p>
                    <p className="font-bold text-2xl">{formatCurrency(ticketPrice)}</p>
                  </div>
                </div>
                <div className="p-4 bg-green-500/10 border border-green-500/50 rounded-lg">
                  <p className="text-sm text-gray-400 mb-1">Você Receberá</p>
                  <p className="font-bold text-3xl text-green-400">{formatCurrency(creatorEarnings)}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    Taxa da plataforma: {formatCurrency(platformFee)} (5%)
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1 border-gray-700"
                  onClick={() => setStep(2)}
                  disabled={loading}
                >
                  Voltar
                </Button>
                <Button
                  className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
                  onClick={handleCreateRaffle}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
                      />
                      Criando...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 mr-2" />
                      Criar Rifa
                    </>
                  )}
                </Button>
              </div>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  )
}


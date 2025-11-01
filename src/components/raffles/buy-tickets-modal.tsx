"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import {
  Sparkles,
  Wallet,
  TrendingUp,
  Package,
  X,
  Check,
} from "lucide-react"
import { formatCurrency } from "@/lib/utils"
import { toast } from "sonner"
import confetti from "canvas-confetti"

interface BuyTicketsModalProps {
  raffle: any
  onClose: () => void
  onSuccess: () => void
}

export function BuyTicketsModal({ raffle, onClose, onSuccess }: BuyTicketsModalProps) {
  const [quantity, setQuantity] = useState(1)
  const [loading, setLoading] = useState(false)
  const [userBalance] = useState(1000) // Mock - substituir por saldo real

  const quickAmounts = [1, 5, 10, 25, 50]
  const maxTickets = raffle.totalTickets - raffle.soldTickets
  
  const totalPrice = quantity * raffle.ticketPrice
  const winChance = ((quantity / raffle.totalTickets) * 100).toFixed(2)
  const hasEnoughBalance = userBalance >= totalPrice

  const handleBuy = async () => {
    if (!hasEnoughBalance) {
      toast.error("Saldo insuficiente!")
      return
    }

    if (quantity < 1 || quantity > maxTickets) {
      toast.error(`Escolha entre 1 e ${maxTickets} números`)
      return
    }

    setLoading(true)

    try {
      const response = await fetch(`/api/raffles/${raffle.id}/buy`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantity }),
      })

      const data = await response.json()

      if (data.success) {
        // Confetti épico! 🎉
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#f97316", "#ef4444", "#ec4899"],
        })

        toast.success(`Você comprou ${quantity} número(s)!`, {
          description: `Números: ${data.tickets.join(", ")}`,
          icon: "🎲",
          style: {
            background: "linear-gradient(135deg, #f97316 0%, #ef4444 100%)",
            color: "white",
            border: "none",
          },
        })

        onSuccess()
        onClose()
      } else {
        toast.error(data.message || "Erro ao comprar números")
      }
    } catch (error) {
      console.error("Error buying tickets:", error)
      toast.error("Erro ao processar compra")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="bg-gray-900 border-gray-800 text-white max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-black flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-orange-400" />
            Comprar Números
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Skin Info */}
          <div className="p-4 bg-gray-800/50 rounded-lg">
            <p className="text-sm text-gray-400 mb-1">Skin</p>
            <p className="font-bold">{raffle.skinName}</p>
          </div>

          {/* Quantity Input */}
          <div>
            <Label className="mb-2 block">Quantidade de Números</Label>
            <Input
              type="number"
              min={1}
              max={maxTickets}
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, Math.min(maxTickets, parseInt(e.target.value) || 1)))}
              className="bg-gray-800 border-gray-700 text-center text-2xl font-bold"
            />
            <p className="text-xs text-gray-500 mt-1 text-center">
              Máximo: {maxTickets} números disponíveis
            </p>
          </div>

          {/* Quick Amounts */}
          <div>
            <Label className="mb-2 block">Atalhos</Label>
            <div className="grid grid-cols-5 gap-2">
              {quickAmounts.map((amount) => (
                <Button
                  key={amount}
                  variant={quantity === amount ? "default" : "outline"}
                  size="sm"
                  onClick={() => setQuantity(Math.min(amount, maxTickets))}
                  disabled={amount > maxTickets}
                  className={quantity === amount ? "bg-orange-500 hover:bg-orange-600" : "border-gray-700"}
                >
                  {amount}
                </Button>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-gradient-to-br from-orange-500/20 to-red-500/20 border border-orange-500/50 rounded-lg">
              <Package className="w-5 h-5 text-orange-400 mb-2" />
              <p className="text-xs text-gray-400">Valor Total</p>
              <p className="text-xl font-black text-white">
                {formatCurrency(totalPrice)}
              </p>
            </div>
            <div className="p-4 bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/50 rounded-lg">
              <TrendingUp className="w-5 h-5 text-green-400 mb-2" />
              <p className="text-xs text-gray-400">Chance de Vitória</p>
              <p className="text-xl font-black text-white">{winChance}%</p>
            </div>
          </div>

          {/* Balance */}
          <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
            <div className="flex items-center gap-2">
              <Wallet className="w-5 h-5 text-purple-400" />
              <span className="text-sm text-gray-400">Seu Saldo</span>
            </div>
            <span className={`font-bold ${hasEnoughBalance ? 'text-green-400' : 'text-red-400'}`}>
              {formatCurrency(userBalance)}
            </span>
          </div>

          {/* Preview Numbers */}
          <div className="p-4 bg-gray-800/50 rounded-lg">
            <p className="text-sm text-gray-400 mb-2">Seus números serão:</p>
            <div className="flex flex-wrap gap-2">
              {Array.from({ length: Math.min(quantity, 10) }).map((_, i) => (
                <Badge key={i} variant="outline" className="border-orange-500/50 text-orange-400">
                  ?
                </Badge>
              ))}
              {quantity > 10 && (
                <Badge variant="outline" className="border-gray-700">
                  +{quantity - 10} mais
                </Badge>
              )}
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Os números serão sorteados aleatoriamente após a compra
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button
              variant="outline"
              className="flex-1 border-gray-700"
              onClick={onClose}
              disabled={loading}
            >
              <X className="w-4 h-4 mr-2" />
              Cancelar
            </Button>
            <Button
              className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
              onClick={handleBuy}
              disabled={loading || !hasEnoughBalance}
            >
              {loading ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
                  />
                  Processando...
                </>
              ) : (
                <>
                  <Check className="w-4 h-4 mr-2" />
                  Confirmar Compra
                </>
              )}
            </Button>
          </div>

          {!hasEnoughBalance && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-sm text-red-400 text-center"
            >
              Saldo insuficiente. Adicione fundos à sua carteira.
            </motion.div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}


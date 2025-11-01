"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { PageHeader } from "@/components/common/page-header"
import { ShoppingBag, DollarSign, TrendingUp, AlertCircle } from "lucide-react"
import { formatCurrency } from "@/lib/utils"
import { toast } from "sonner"

export default function SellPage() {
  const router = useRouter()
  const [price, setPrice] = useState("")
  const [description, setDescription] = useState("")

  const handleSubmit = () => {
    if (!price || parseFloat(price) <= 0) {
      toast.error("Defina um preço válido")
      return
    }
    toast.success("Anúncio criado com sucesso!", { icon: "🎉" })
    router.push("/marketplace")
  }

  return (
    <div className="min-h-screen bg-[--color-bg-primary]">
      <div className="container py-8 max-w-4xl space-y-8">
        <PageHeader
          title="Vender Item"
          description="Crie um anúncio para vender suas skins no marketplace"
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid gap-6 md:grid-cols-2"
        >
          {/* Preview do Item */}
          <Card className="bg-[--color-bg-secondary] border-[--color-border]">
            <CardHeader>
              <CardTitle className="text-[--color-text-primary]">Item Selecionado</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-4/3 bg-[--color-bg-tertiary] rounded-lg flex items-center justify-center mb-4">
                <p className="text-[--color-text-tertiary]">Imagem da Skin</p>
              </div>
              <h3 className="font-bold text-[--color-text-primary] mb-2">AK-47 | Redline</h3>
              <div className="flex gap-2">
                <Badge>Field-Tested</Badge>
                <Badge variant="outline">StatTrak™</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Formulário */}
          <Card className="bg-[--color-bg-secondary] border-[--color-border]">
            <CardHeader>
              <CardTitle className="text-[--color-text-primary]">Detalhes do Anúncio</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="price">Preço de Venda (R$)</Label>
                <Input
                  id="price"
                  type="number"
                  placeholder="0.00"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="bg-[--color-bg-tertiary] border-[--color-border]"
                />
                <p className="text-xs text-[--color-text-tertiary] mt-1">
                  Preço sugerido: R$ 245,50
                </p>
              </div>

              <div>
                <Label htmlFor="description">Descrição (opcional)</Label>
                <Input
                  id="description"
                  placeholder="Adicione detalhes sobre o item..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="bg-[--color-bg-tertiary] border-[--color-border]"
                />
              </div>

              <div className="p-4 bg-[--color-bg-tertiary] rounded-lg space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-[--color-text-tertiary]">Preço de venda:</span>
                  <span className="text-[--color-text-primary]">{formatCurrency(parseFloat(price) || 0)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[--color-text-tertiary]">Taxa (5%):</span>
                  <span className="text-red-400">- {formatCurrency((parseFloat(price) || 0) * 0.05)}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-[--color-border]">
                  <span className="font-semibold text-[--color-text-primary]">Você receberá:</span>
                  <span className="font-bold text-green-400">
                    {formatCurrency((parseFloat(price) || 0) * 0.95)}
                  </span>
                </div>
              </div>

              <Button 
                className="w-full bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                onClick={handleSubmit}
              >
                <ShoppingBag className="h-4 w-4 mr-2" />
                Criar Anúncio
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Dicas */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="bg-blue-500/5 border-blue-500/20">
            <CardContent className="pt-6">
              <div className="flex gap-4">
                <AlertCircle className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <div className="space-y-2 text-sm text-[--color-text-secondary]">
                  <p className="font-semibold text-[--color-text-primary]">Dicas para vender mais rápido:</p>
                  <ul className="space-y-1 list-disc list-inside">
                    <li>Defina um preço competitivo baseado no mercado</li>
                    <li>Adicione uma descrição detalhada do item</li>
                    <li>Verifique se sua Trade URL está configurada</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}


"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { PageHeader } from "@/components/common/page-header"
import { EmptyState } from "@/components/common/empty-state"
import { ShoppingCart, Trash2, CreditCard, Package } from "lucide-react"
import { formatCurrency } from "@/lib/utils"
import { toast } from "sonner"
import Image from "next/image"

export default function CartPage() {
  const [cartItems, setCartItems] = useState<any[]>([])

  const total = cartItems.reduce((sum, item) => sum + item.price, 0)

  const handleRemove = (id: string) => {
    setCartItems(cartItems.filter(item => item.id !== id))
    toast.success("Item removido do carrinho")
  }

  const handleCheckout = () => {
    toast.success("Processando pagamento...", { icon: "💳" })
  }

  return (
    <div className="min-h-screen bg-[--color-bg-primary]">
      <div className="container py-8 max-w-6xl space-y-8">
        <PageHeader
          title="Carrinho de Compras"
          description={`${cartItems.length} ${cartItems.length === 1 ? 'item' : 'itens'} no carrinho`}
        />

        {cartItems.length === 0 ? (
          <EmptyState
            icon={ShoppingCart}
            title="Seu carrinho está vazio"
            description="Explore o marketplace e adicione skins incríveis ao seu carrinho!"
            action={{
              label: "Ir para Marketplace",
              onClick: () => window.location.href = "/marketplace"
            }}
          />
        ) : (
          <div className="grid gap-6 lg:grid-cols-[1fr_400px]">
            {/* Lista de Itens */}
            <div className="space-y-4">
              {cartItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="bg-[--color-bg-secondary] border-[--color-border]">
                    <CardContent className="p-4">
                      <div className="flex gap-4">
                        <div className="relative w-24 h-24 bg-[--color-bg-tertiary] rounded-lg">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-contain p-2"
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-[--color-text-primary] mb-1">{item.name}</h3>
                          <div className="flex gap-2 mb-2">
                            <Badge>{item.exterior}</Badge>
                            {item.statTrak && <Badge variant="outline">StatTrak™</Badge>}
                          </div>
                          <p className="text-2xl font-bold text-green-400">{formatCurrency(item.price)}</p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleRemove(item.id)}
                          className="text-red-400 hover:text-red-300"
                        >
                          <Trash2 className="h-5 w-5" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Resumo */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:sticky lg:top-24 h-fit"
            >
              <Card className="bg-[--color-bg-secondary] border-[--color-border]">
                <CardContent className="p-6 space-y-4">
                  <h3 className="text-xl font-bold text-[--color-text-primary]">Resumo do Pedido</h3>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-[--color-text-tertiary]">Subtotal:</span>
                      <span className="text-[--color-text-primary]">{formatCurrency(total)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[--color-text-tertiary]">Taxa:</span>
                      <span className="text-green-400">R$ 0,00</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-[--color-border]">
                      <span className="font-bold text-[--color-text-primary]">Total:</span>
                      <span className="text-2xl font-bold text-green-400">{formatCurrency(total)}</span>
                    </div>
                  </div>

                  <Button 
                    className="w-full bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                    onClick={handleCheckout}
                  >
                    <CreditCard className="h-4 w-4 mr-2" />
                    Finalizar Compra
                  </Button>

                  <p className="text-xs text-[--color-text-tertiary] text-center">
                    Pagamento seguro via PIX ou Saldo
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  )
}


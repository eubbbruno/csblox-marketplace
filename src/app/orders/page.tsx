"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PageHeader } from "@/components/common/page-header"
import { EmptyState } from "@/components/common/empty-state"
import { Package, CheckCircle, Clock, XCircle, ExternalLink } from "lucide-react"
import { formatCurrency, formatDate } from "@/lib/utils"

export default function OrdersPage() {
  const orders: any[] = []

  return (
    <div className="min-h-screen bg-[--color-bg-primary]">
      <div className="container py-8 max-w-6xl space-y-8">
        <PageHeader
          title="Meus Pedidos"
          description="Acompanhe o status de todas as suas compras e vendas"
        />

        <Tabs defaultValue="purchases" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 bg-[--color-bg-secondary]">
            <TabsTrigger value="purchases">🛒 Compras</TabsTrigger>
            <TabsTrigger value="sales">💰 Vendas</TabsTrigger>
          </TabsList>

          <TabsContent value="purchases">
            {orders.length === 0 ? (
              <EmptyState
                icon={Package}
                title="Nenhuma compra encontrada"
                description="Você ainda não realizou nenhuma compra. Explore o marketplace!"
                action={{
                  label: "Ir para Marketplace",
                  onClick: () => window.location.href = "/marketplace"
                }}
              />
            ) : (
              <div className="space-y-4">
                {orders.map((order, index) => (
                  <motion.div
                    key={order.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="bg-[--color-bg-secondary] border-[--color-border]">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="font-bold text-[--color-text-primary] mb-1">
                              Pedido #{order.id}
                            </h3>
                            <p className="text-sm text-[--color-text-tertiary]">
                              {formatDate(order.createdAt)}
                            </p>
                          </div>
                          <Badge className="bg-green-500/10 text-green-400 border-green-500/50">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Concluído
                          </Badge>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-[--color-text-secondary] mb-1">
                              {order.itemCount} {order.itemCount === 1 ? 'item' : 'itens'}
                            </p>
                            <p className="text-2xl font-bold text-[--color-text-primary]">
                              {formatCurrency(order.total)}
                            </p>
                          </div>
                          <Button variant="outline" className="border-[--color-border]">
                            Ver Detalhes
                            <ExternalLink className="h-4 w-4 ml-2" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="sales">
            <EmptyState
              icon={Package}
              title="Nenhuma venda encontrada"
              description="Você ainda não vendeu nenhum item. Anuncie suas skins!"
              action={{
                label: "Vender Itens",
                onClick: () => window.location.href = "/inventory"
              }}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}


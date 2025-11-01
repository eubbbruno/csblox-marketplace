"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { PageHeader } from "@/components/common/page-header"
import { StatCard } from "@/components/common/stat-card"
import { LoadingState } from "@/components/common/loading-state"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { 
  Wallet, 
  ShoppingBag, 
  Package, 
  TrendingUp, 
  DollarSign,
  Eye,
  Clock,
  ArrowRight,
  Plus,
  Activity,
  Dices,
  Star
} from "lucide-react"
import { formatCurrency, formatDate } from "@/lib/utils"
import Link from "next/link"

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login")
    }
    if (status !== "loading") {
      setLoading(false)
    }
  }, [status, router])

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen bg-black text-white pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-6">
          <LoadingState type="page" />
        </div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  // Mock data - substituir por dados reais da API
  const stats = {
    balance: session.user.balance || 0,
    totalSales: 12,
    totalPurchases: 8,
    activeListings: 5,
  }

  const recentTransactions = [
    {
      id: "1",
      type: "sale",
      item: "AK-47 | Redline",
      amount: 245.50,
      date: new Date(),
      status: "completed",
    },
    {
      id: "2",
      type: "purchase",
      item: "AWP | Asiimov",
      amount: 320.00,
      date: new Date(Date.now() - 86400000),
      status: "completed",
    },
    {
      id: "3",
      type: "deposit",
      item: "Depósito PIX",
      amount: 500.00,
      date: new Date(Date.now() - 172800000),
      status: "completed",
    },
  ]

  const activeRaffles = [
    {
      id: "1",
      skinName: "Karambit | Fade",
      ticketsBought: 5,
      totalTickets: 100,
      endDate: new Date(Date.now() + 86400000),
    },
    {
      id: "2",
      skinName: "M4A4 | Howl",
      ticketsBought: 10,
      totalTickets: 200,
      endDate: new Date(Date.now() + 172800000),
    },
  ]

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <PageHeader
          title={`Olá, ${session.user.username}! 👋`}
          description="Gerencie suas transações, saldo e atividades"
          badge="Dashboard"
          icon={<Activity className="w-6 h-6 text-white" />}
          actions={
            <div className="flex gap-3">
              <Link href="/sell">
                <Button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Vender Item
                </Button>
              </Link>
              <Link href="/wallet">
                <Button variant="outline" className="border-purple-500/50 hover:bg-purple-500/10">
                  <Wallet className="w-4 h-4 mr-2" />
                  Carteira
                </Button>
              </Link>
            </div>
          }
        />

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Saldo Disponível"
            value={stats.balance}
            icon={Wallet}
            format="currency"
            trend={{ value: "+12%", isPositive: true }}
            gradient="from-green-500 to-emerald-500"
            delay={0}
          />
          <StatCard
            title="Total de Vendas"
            value={stats.totalSales}
            icon={ShoppingBag}
            format="number"
            gradient="from-blue-500 to-cyan-500"
            delay={0.1}
          />
          <StatCard
            title="Total de Compras"
            value={stats.totalPurchases}
            icon={Package}
            format="number"
            gradient="from-purple-500 to-pink-500"
            delay={0.2}
          />
          <StatCard
            title="Anúncios Ativos"
            value={stats.activeListings}
            icon={TrendingUp}
            format="number"
            gradient="from-orange-500 to-red-500"
            delay={0.3}
          />
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Zap className="w-6 h-6 text-yellow-400" />
            Ações Rápidas
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: ShoppingBag, label: "Marketplace", href: "/marketplace", color: "from-purple-500 to-pink-500" },
              { icon: Dices, label: "Rifas", href: "/raffles", color: "from-orange-500 to-red-500" },
              { icon: Package, label: "Inventário", href: "/inventory", color: "from-blue-500 to-cyan-500" },
              { icon: DollarSign, label: "Depositar", href: "/wallet", color: "from-green-500 to-emerald-500" },
            ].map((action, i) => (
              <Link key={action.href} href={action.href}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Card className={`bg-gradient-to-br ${action.color} p-6 border-0 cursor-pointer group`}>
                    <action.icon className="w-8 h-8 text-white mb-2" />
                    <p className="text-white font-bold">{action.label}</p>
                  </Card>
                </motion.div>
              </Link>
            ))}
          </div>
        </motion.div>

        {/* Tabs */}
        <Tabs defaultValue="transactions" className="space-y-6">
          <TabsList className="bg-gray-900/50 border border-gray-800">
            <TabsTrigger value="transactions">
              <Clock className="w-4 h-4 mr-2" />
              Transações Recentes
            </TabsTrigger>
            <TabsTrigger value="raffles">
              <Dices className="w-4 h-4 mr-2" />
              Minhas Rifas
            </TabsTrigger>
            <TabsTrigger value="activity">
              <Activity className="w-4 h-4 mr-2" />
              Atividade
            </TabsTrigger>
          </TabsList>

          {/* Transactions Tab */}
          <TabsContent value="transactions">
            <Card className="bg-gray-900/50 border-gray-800 box-card">
              <div className="p-6">
                <h3 className="text-xl font-bold mb-4">Últimas Transações</h3>
                <div className="space-y-4">
                  {recentTransactions.map((transaction, i) => (
                    <motion.div
                      key={transaction.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg hover:bg-gray-800 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                          transaction.type === "sale" ? "bg-green-500/20" :
                          transaction.type === "purchase" ? "bg-blue-500/20" :
                          "bg-purple-500/20"
                        }`}>
                          {transaction.type === "sale" ? (
                            <ShoppingBag className="w-6 h-6 text-green-400" />
                          ) : transaction.type === "purchase" ? (
                            <Package className="w-6 h-6 text-blue-400" />
                          ) : (
                            <Wallet className="w-6 h-6 text-purple-400" />
                          )}
                        </div>
                        <div>
                          <p className="font-bold text-white">{transaction.item}</p>
                          <p className="text-sm text-gray-400">
                            {formatDate(transaction.date)}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`text-lg font-bold ${
                          transaction.type === "sale" || transaction.type === "deposit"
                            ? "text-green-400"
                            : "text-red-400"
                        }`}>
                          {transaction.type === "sale" || transaction.type === "deposit" ? "+" : "-"}
                          {formatCurrency(transaction.amount)}
                        </p>
                        <Badge className="bg-green-500/20 text-green-400 border-green-500/50">
                          {transaction.status}
                        </Badge>
                      </div>
                    </motion.div>
                  ))}
                </div>
                <Link href="/orders">
                  <Button variant="outline" className="w-full mt-6 border-gray-700">
                    Ver Todas as Transações
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </Card>
          </TabsContent>

          {/* Raffles Tab */}
          <TabsContent value="raffles">
            <Card className="bg-gray-900/50 border-gray-800 box-card">
              <div className="p-6">
                <h3 className="text-xl font-bold mb-4">Rifas que Você Participa</h3>
                <div className="space-y-4">
                  {activeRaffles.map((raffle, i) => (
                    <motion.div
                      key={raffle.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="p-4 bg-gray-800/50 rounded-lg hover:bg-gray-800 transition-colors"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <Dices className="w-8 h-8 text-orange-400" />
                          <div>
                            <p className="font-bold text-white">{raffle.skinName}</p>
                            <p className="text-sm text-gray-400">
                              Você tem {raffle.ticketsBought} números
                            </p>
                          </div>
                        </div>
                        <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/50">
                          {Math.round((raffle.ticketsBought / raffle.totalTickets) * 100)}% chance
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-400">
                        <span>Termina em: {formatDate(raffle.endDate)}</span>
                        <Link href={`/raffles/${raffle.id}`}>
                          <Button size="sm" variant="outline" className="border-orange-500/50 hover:bg-orange-500/10">
                            Ver Detalhes
                          </Button>
                        </Link>
                      </div>
                    </motion.div>
                  ))}
                </div>
                <Link href="/raffles">
                  <Button variant="outline" className="w-full mt-6 border-gray-700">
                    Ver Todas as Rifas
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </Card>
          </TabsContent>

          {/* Activity Tab */}
          <TabsContent value="activity">
            <Card className="bg-gray-900/50 border-gray-800 box-card">
              <div className="p-6">
                <h3 className="text-xl font-bold mb-4">Atividade Recente</h3>
                <div className="space-y-3">
                  {[
                    { icon: Eye, text: "Você visualizou AK-47 | Redline", time: "2 minutos atrás" },
                    { icon: Star, text: "Você favoritou AWP | Dragon Lore", time: "1 hora atrás" },
                    { icon: ShoppingBag, text: "Você vendeu M4A4 | Howl", time: "3 horas atrás" },
                    { icon: Package, text: "Você comprou Glock-18 | Fade", time: "1 dia atrás" },
                  ].map((activity, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-center gap-3 p-3 bg-gray-800/50 rounded-lg"
                    >
                      <activity.icon className="w-5 h-5 text-purple-400" />
                      <div className="flex-1">
                        <p className="text-white text-sm">{activity.text}</p>
                        <p className="text-xs text-gray-500">{activity.time}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PageHeader } from "@/components/common/page-header"
import { Trophy, TrendingUp, DollarSign, Package, Crown, Medal, Award } from "lucide-react"
import { formatCurrency } from "@/lib/utils"

export default function LeaderboardPage() {
  const topUsers = [
    { rank: 1, username: "ProTrader", avatar: "", totalSales: 1250000, itemsSold: 450, rating: 5.0 },
    { rank: 2, username: "SkinMaster", avatar: "", totalSales: 980000, itemsSold: 380, rating: 4.9 },
    { rank: 3, username: "CSGOLegend", avatar: "", totalSales: 750000, itemsSold: 320, rating: 4.8 },
    { rank: 4, username: "MarketKing", avatar: "", totalSales: 650000, itemsSold: 290, rating: 4.7 },
    { rank: 5, username: "TradePro", avatar: "", totalSales: 580000, itemsSold: 260, rating: 4.7 },
  ]

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="h-6 w-6 text-yellow-400" />
      case 2:
        return <Medal className="h-6 w-6 text-gray-400" />
      case 3:
        return <Award className="h-6 w-6 text-orange-400" />
      default:
        return <span className="text-2xl font-bold text-[--color-text-tertiary]">#{rank}</span>
    }
  }

  return (
    <div className="min-h-screen bg-[--color-bg-primary]">
      <div className="container py-8 max-w-6xl space-y-8">
        <PageHeader
          title="Ranking de Traders"
          description="Os melhores vendedores e traders da plataforma"
        />

        <Tabs defaultValue="sales" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-[--color-bg-secondary]">
            <TabsTrigger value="sales">💰 Vendas</TabsTrigger>
            <TabsTrigger value="volume">📊 Volume</TabsTrigger>
            <TabsTrigger value="rating">⭐ Avaliação</TabsTrigger>
          </TabsList>

          <TabsContent value="sales" className="space-y-4">
            {topUsers.map((user, index) => (
              <motion.div
                key={user.username}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className={`bg-[--color-bg-secondary] border-[--color-border] hover:border-[--color-border-hover] transition-all ${
                  user.rank <= 3 ? 'ring-2 ring-purple-500/20' : ''
                }`}>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-6">
                      {/* Rank */}
                      <div className="flex items-center justify-center w-16 h-16 rounded-full bg-[--color-bg-tertiary]">
                        {getRankIcon(user.rank)}
                      </div>

                      {/* Avatar e Nome */}
                      <div className="flex items-center gap-4 flex-1">
                        <Avatar className="h-14 w-14 border-2 border-purple-500/50">
                          <AvatarImage src={user.avatar} />
                          <AvatarFallback>{user.username[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-bold text-lg text-[--color-text-primary] mb-1">
                            {user.username}
                          </h3>
                          <div className="flex gap-2">
                            <Badge variant="outline" className="border-green-500/50 text-green-400">
                              {user.itemsSold} vendas
                            </Badge>
                            <Badge variant="outline" className="border-yellow-500/50 text-yellow-400">
                              ⭐ {user.rating.toFixed(1)}
                            </Badge>
                          </div>
                        </div>
                      </div>

                      {/* Total de Vendas */}
                      <div className="text-right">
                        <p className="text-sm text-[--color-text-tertiary] mb-1">Total de Vendas</p>
                        <p className="text-2xl font-bold text-green-400">
                          {formatCurrency(user.totalSales)}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </TabsContent>

          <TabsContent value="volume">
            <Card className="bg-[--color-bg-secondary] border-[--color-border] p-12">
              <div className="text-center text-[--color-text-tertiary]">
                <Package className="h-16 w-16 mx-auto mb-4 opacity-50" />
                <p>Ranking por volume em breve...</p>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="rating">
            <Card className="bg-[--color-bg-secondary] border-[--color-border] p-12">
              <div className="text-center text-[--color-text-tertiary]">
                <Trophy className="h-16 w-16 mx-auto mb-4 opacity-50" />
                <p>Ranking por avaliação em breve...</p>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}


"use client"

import { use } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PageHeader } from "@/components/common/page-header"
import { EmptyState } from "@/components/common/empty-state"
import { StatCard } from "@/components/common/stat-card"
import { 
  Star, 
  Package, 
  DollarSign, 
  TrendingUp, 
  ExternalLink,
  Calendar,
  Shield,
  Award
} from "lucide-react"
import { formatCurrency, formatDate } from "@/lib/utils"

export default function ProfilePage({ params }: { params: Promise<{ username: string }> }) {
  const { username } = use(params)

  // Mock data - seria buscado da API
  const user = {
    username,
    avatar: "https://avatars.steamstatic.com/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb_full.jpg",
    steamId: "76561198000000000",
    profileUrl: "https://steamcommunity.com/profiles/76561198000000000",
    joinedAt: new Date("2024-01-15"),
    rating: 4.8,
    totalSales: 234,
    totalRevenue: 125000,
    activeListings: 12,
    verified: true,
  }

  const listings: any[] = []
  const reviews: any[] = []

  return (
    <div className="min-h-screen bg-[--color-bg-primary]">
      <div className="container py-8 max-w-6xl space-y-8">
        {/* Header do Perfil */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="bg-[--color-bg-secondary] border-[--color-border]">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
                <Avatar className="h-32 w-32 border-4 border-purple-500/50">
                  <AvatarImage src={user.avatar} />
                  <AvatarFallback className="text-4xl">{user.username[0]}</AvatarFallback>
                </Avatar>

                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-3xl font-bold text-[--color-text-primary]">{user.username}</h1>
                    {user.verified && (
                      <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/50">
                        <Shield className="h-3 w-3 mr-1" />
                        Verificado
                      </Badge>
                    )}
                  </div>

                  <div className="flex items-center gap-4 text-sm text-[--color-text-secondary] mb-4">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                      <span className="font-semibold">{user.rating.toFixed(1)}</span>
                      <span className="text-[--color-text-tertiary]">({user.totalSales} avaliações)</span>
                    </div>
                    <span className="text-[--color-text-tertiary]">•</span>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>Membro desde {formatDate(user.joinedAt).split(' ')[0]}</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="border-[--color-border]" asChild>
                      <a href={user.profileUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Ver Perfil Steam
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-4"
        >
          <StatCard
            title="Total de Vendas"
            value={user.totalSales.toString()}
            icon={Package}
            trend={{ value: "+15%", isPositive: true }}
          />
          <StatCard
            title="Receita Total"
            value={formatCurrency(user.totalRevenue)}
            icon={DollarSign}
            trend={{ value: "+28%", isPositive: true }}
          />
          <StatCard
            title="Anúncios Ativos"
            value={user.activeListings.toString()}
            icon={TrendingUp}
          />
          <StatCard
            title="Avaliação"
            value={user.rating.toFixed(1)}
            icon={Star}
          />
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Tabs defaultValue="listings" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3 bg-[--color-bg-secondary]">
              <TabsTrigger value="listings">
                <Package className="h-4 w-4 mr-2" />
                Anúncios ({user.activeListings})
              </TabsTrigger>
              <TabsTrigger value="reviews">
                <Star className="h-4 w-4 mr-2" />
                Avaliações ({user.totalSales})
              </TabsTrigger>
              <TabsTrigger value="achievements">
                <Award className="h-4 w-4 mr-2" />
                Conquistas
              </TabsTrigger>
            </TabsList>

            <TabsContent value="listings">
              {listings.length === 0 ? (
                <EmptyState
                  icon={Package}
                  title="Nenhum anúncio ativo"
                  description="Este usuário não possui anúncios ativos no momento."
                />
              ) : (
                <div className="grid md:grid-cols-3 gap-4">
                  {/* Grid de anúncios */}
                </div>
              )}
            </TabsContent>

            <TabsContent value="reviews">
              {reviews.length === 0 ? (
                <EmptyState
                  icon={Star}
                  title="Nenhuma avaliação"
                  description="Este usuário ainda não recebeu avaliações."
                />
              ) : (
                <div className="space-y-4">
                  {/* Lista de avaliações */}
                </div>
              )}
            </TabsContent>

            <TabsContent value="achievements">
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { title: "Primeira Venda", description: "Realizou sua primeira venda", unlocked: true },
                  { title: "Trader Experiente", description: "100+ vendas realizadas", unlocked: true },
                  { title: "5 Estrelas", description: "Manteve avaliação 5.0", unlocked: false },
                  { title: "Vendedor do Mês", description: "Maior volume de vendas", unlocked: false },
                ].map((achievement, index) => (
                  <motion.div
                    key={achievement.title}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className={`bg-[--color-bg-secondary] border-[--color-border] ${
                      achievement.unlocked ? 'ring-2 ring-yellow-500/20' : 'opacity-50'
                    }`}>
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className={`p-3 rounded-lg ${
                            achievement.unlocked ? 'bg-yellow-500/10' : 'bg-[--color-bg-tertiary]'
                          }`}>
                            <Award className={`h-6 w-6 ${
                              achievement.unlocked ? 'text-yellow-400' : 'text-[--color-text-tertiary]'
                            }`} />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-bold text-[--color-text-primary] mb-1">
                              {achievement.title}
                            </h3>
                            <p className="text-sm text-[--color-text-secondary]">
                              {achievement.description}
                            </p>
                            {achievement.unlocked && (
                              <Badge className="mt-2 bg-yellow-500/10 text-yellow-400 border-yellow-500/50">
                                Desbloqueado
                              </Badge>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  )
}


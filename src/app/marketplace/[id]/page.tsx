"use client"

import { use } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { 
  ShoppingCart, 
  Heart, 
  Share2, 
  ExternalLink, 
  TrendingUp,
  Shield,
  Clock,
  Star,
  AlertCircle
} from "lucide-react"
import { formatCurrency, getRarityColor } from "@/lib/utils"
import { toast } from "sonner"
import Image from "next/image"

export default function SkinDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)

  // Mock data - seria buscado da API
  const skin = {
    id,
    name: "AK-47 | Redline",
    collection: "The Phoenix Collection",
    rarity: "CLASSIFIED",
    exterior: "FIELD_TESTED",
    float: 0.25,
    price: 245.50,
    steamPrice: 280.00,
    discount: 12,
    image: "https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot7HxfDhjxszJemkV09-5lpKKqPrxN7LEmyUJ7ZQpiLuSrYmkjVHn_RZsYz_3JYfDcQM4N1CCrAO8wO_p1sXvot2XnpNklqzK",
    statTrak: true,
    seller: {
      username: "ProPlayer123",
      avatar: "https://avatars.steamstatic.com/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb_full.jpg",
      rating: 4.8,
      totalSales: 234,
    },
    description: "Ótima skin com float baixo! Perfeita para jogar competitivo.",
    views: 1234,
    favorites: 89,
  }

  const handleAddToCart = () => {
    toast.success("Item adicionado ao carrinho!", { icon: "🛒" })
  }

  const handleBuyNow = () => {
    toast.success("Processando compra...", { icon: "💳" })
  }

  return (
    <div className="min-h-screen bg-[--color-bg-primary]">
      <div className="container py-8 max-w-7xl space-y-8">
        {/* Breadcrumb */}
        <div className="text-sm text-[--color-text-tertiary]">
          <a href="/marketplace" className="hover:text-purple-400">Marketplace</a>
          <span className="mx-2">/</span>
          <span className="text-[--color-text-primary]">{skin.name}</span>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_400px]">
          {/* Coluna Principal */}
          <div className="space-y-6">
            {/* Imagem e Galeria */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="bg-[--color-bg-secondary] border-[--color-border]">
                <CardContent className="p-8">
                  <div className="relative aspect-16/9 bg-linear-to-br from-[--color-bg-tertiary] to-[--color-bg-primary] rounded-lg mb-4">
                    <Image
                      src={skin.image}
                      alt={skin.name}
                      fill
                      className="object-contain p-8"
                    />
                    {skin.discount > 0 && (
                      <Badge className="absolute top-4 left-4 bg-red-500 text-white">
                        -{skin.discount}%
                      </Badge>
                    )}
                    <Badge className={`absolute top-4 right-4 ${getRarityColor(skin.rarity)}`}>
                      {skin.rarity}
                    </Badge>
                  </div>

                  {/* Ações Rápidas */}
                  <div className="flex gap-2">
                    <Button variant="outline" size="icon" className="border-[--color-border]">
                      <Heart className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" className="border-[--color-border]">
                      <Share2 className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" className="flex-1 border-[--color-border]">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Inspecionar no Jogo
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Detalhes */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="bg-[--color-bg-secondary] border-[--color-border]">
                <CardContent className="p-6 space-y-4">
                  <h2 className="text-2xl font-bold text-[--color-text-primary]">Detalhes do Item</h2>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-[--color-text-tertiary] mb-1">Coleção</p>
                      <p className="font-semibold text-[--color-text-primary]">{skin.collection}</p>
                    </div>
                    <div>
                      <p className="text-sm text-[--color-text-tertiary] mb-1">Exterior</p>
                      <p className="font-semibold text-[--color-text-primary]">{skin.exterior}</p>
                    </div>
                    <div>
                      <p className="text-sm text-[--color-text-tertiary] mb-1">Float Value</p>
                      <p className="font-semibold text-green-400">{skin.float.toFixed(4)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-[--color-text-tertiary] mb-1">Tipo</p>
                      <p className="font-semibold text-[--color-text-primary]">
                        {skin.statTrak && "StatTrak™ "}Rifle
                      </p>
                    </div>
                  </div>

                  {skin.description && (
                    <>
                      <Separator />
                      <div>
                        <p className="text-sm text-[--color-text-tertiary] mb-2">Descrição do Vendedor</p>
                        <p className="text-[--color-text-secondary]">{skin.description}</p>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* Vendedor */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="bg-[--color-bg-secondary] border-[--color-border]">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-[--color-text-primary] mb-4">Vendedor</h3>
                  <div className="flex items-center gap-4">
                    <Avatar className="h-16 w-16 border-2 border-purple-500/50">
                      <AvatarImage src={skin.seller.avatar} />
                      <AvatarFallback>{skin.seller.username[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h4 className="font-bold text-[--color-text-primary] mb-1">{skin.seller.username}</h4>
                      <div className="flex items-center gap-3 text-sm">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                          <span className="text-[--color-text-secondary]">{skin.seller.rating.toFixed(1)}</span>
                        </div>
                        <span className="text-[--color-text-tertiary]">•</span>
                        <span className="text-[--color-text-secondary]">{skin.seller.totalSales} vendas</span>
                      </div>
                    </div>
                    <Button variant="outline" className="border-[--color-border]">
                      Ver Perfil
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Sidebar de Compra */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:sticky lg:top-24 h-fit space-y-4"
          >
            {/* Preço */}
            <Card className="bg-[--color-bg-secondary] border-[--color-border]">
              <CardContent className="p-6 space-y-4">
                <div>
                  <p className="text-sm text-[--color-text-tertiary] mb-1">Preço</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold text-green-400">{formatCurrency(skin.price)}</span>
                    {skin.steamPrice && (
                      <span className="text-sm text-[--color-text-tertiary] line-through">
                        {formatCurrency(skin.steamPrice)}
                      </span>
                    )}
                  </div>
                  {skin.discount > 0 && (
                    <p className="text-sm text-green-400 mt-1">
                      Economize {formatCurrency(skin.steamPrice - skin.price)}
                    </p>
                  )}
                </div>

                <Separator />

                <div className="space-y-2">
                  <Button 
                    className="w-full bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                    onClick={handleBuyNow}
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Comprar Agora
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full border-[--color-border]"
                    onClick={handleAddToCart}
                  >
                    Adicionar ao Carrinho
                  </Button>
                </div>

                <div className="flex items-center gap-2 text-xs text-[--color-text-tertiary]">
                  <Shield className="h-4 w-4 text-green-400" />
                  <span>Compra 100% segura e protegida</span>
                </div>
              </CardContent>
            </Card>

            {/* Stats */}
            <Card className="bg-[--color-bg-secondary] border-[--color-border]">
              <CardContent className="p-6 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[--color-text-tertiary]">Visualizações</span>
                  <span className="font-semibold text-[--color-text-primary]">{skin.views}</span>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[--color-text-tertiary]">Favoritos</span>
                  <span className="font-semibold text-[--color-text-primary]">{skin.favorites}</span>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[--color-text-tertiary]">Anunciado há</span>
                  <span className="font-semibold text-[--color-text-primary]">2 dias</span>
                </div>
              </CardContent>
            </Card>

            {/* Aviso */}
            <Card className="bg-blue-500/5 border-blue-500/20">
              <CardContent className="p-4">
                <div className="flex gap-3">
                  <AlertCircle className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-[--color-text-secondary]">
                    <p className="font-semibold text-[--color-text-primary] mb-1">Dica de Segurança</p>
                    <p>Sempre verifique o float value e os detalhes do item antes de comprar.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}


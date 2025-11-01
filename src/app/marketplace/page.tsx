"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Filters } from "@/components/marketplace/filters"
import { ItemCard } from "@/components/marketplace/item-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { PageHeader } from "@/components/common/page-header"
import { EmptyState } from "@/components/common/empty-state"
import { LoadingState } from "@/components/common/loading-state"
import { Search, SlidersHorizontal, TrendingUp, Flame, Sparkles, Package } from "lucide-react"
import { MarketplaceFilters, Listing } from "@/types"
import { toast } from "sonner"

// Mock data - será substituído por dados reais da API
const MOCK_LISTINGS: Listing[] = [
  {
    id: "1",
    itemName: "AK-47",
    itemType: "weapon",
    skinName: "Redline",
    collection: "The Phoenix Collection",
    rarity: "CLASSIFIED",
    exterior: "FIELD_TESTED",
    floatValue: 0.25,
    paintSeed: 123,
    patternIndex: 456,
    isStatTrak: true,
    isSouvenir: false,
    stickers: null,
    price: 245.50,
    steamPrice: 280.00,
    discount: 12,
    imageUrl: "https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot7HxfDhjxszJemkV09-5lpKKqPrxN7LEmyUJ7ZQpiLuSrYmkjVHn_RZsYz_3JYfDcQM4N1CCrAO8wO_p1sXvot2XnpNklqzK",
    inspectUrl: "steam://rungame/730/76561202255233023/+csgo_econ_action_preview%20S76561198084749846A123456789D123456789",
    sellerId: "seller1",
    seller: {
      id: "seller1",
      username: "ProPlayer123",
      avatar: "https://avatars.steamstatic.com/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb_full.jpg",
      reputation: 4.8,
      totalSales: 234,
    },
    description: "Ótima skin, float baixo!",
    status: "ACTIVE",
    views: 1234,
    favorites: 89,
    expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "2",
    itemName: "M4A4",
    itemType: "weapon",
    skinName: "Howl",
    collection: "The Huntsman Collection",
    rarity: "CONTRABAND",
    exterior: "MINIMAL_WEAR",
    floatValue: 0.08,
    paintSeed: 789,
    patternIndex: undefined,
    isStatTrak: false,
    isSouvenir: false,
    stickers: null,
    price: 8999.99,
    steamPrice: 9500.00,
    discount: 5,
    imageUrl: "https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou-6kejhjxszFJTwW09izh5SEhfLLP7LWnn8fvpFw3-yXo42tigHt_hA4NWr0cNXEdAY6ZVCGrAC6k-fu0cO-v8_LnHU3vyIm7HqJgVXp1jw1BKY9",
    inspectUrl: "steam://rungame/730/76561202255233023/+csgo_econ_action_preview%20S76561198084749846A987654321D987654321",
    sellerId: "seller2",
    seller: {
      id: "seller2",
      username: "CollectorPT",
      avatar: "https://avatars.steamstatic.com/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb_full.jpg",
      reputation: 5.0,
      totalSales: 567,
    },
    description: "Raríssima! Contraband!",
    status: "ACTIVE",
    views: 5678,
    favorites: 456,
    expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "3",
    itemName: "AWP",
    itemType: "weapon",
    skinName: "Dragon Lore",
    collection: "The Cobblestone Collection",
    rarity: "COVERT",
    exterior: "FACTORY_NEW",
    floatValue: 0.01,
    paintSeed: 321,
    patternIndex: 654,
    isStatTrak: false,
    isSouvenir: true,
    stickers: null,
    price: 15499.99,
    steamPrice: 16000.00,
    discount: 3,
    imageUrl: "https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot621FAR17PLfYQJD_9W7m5a0mvLwOq7c2G5S7ctlmdbN_Iv9nBrsqUBkMGD6JYGVdw85ZgrYrFG_w7vrgJe46p_MnXdhvCF04nyPnRGpwUYb5TqkMrQ",
    inspectUrl: "steam://rungame/730/76561202255233023/+csgo_econ_action_preview%20S76561198084749846A111222333D444555666",
    sellerId: "seller3",
    seller: {
      id: "seller3",
      username: "SkinMaster",
      avatar: "https://avatars.steamstatic.com/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb_full.jpg",
      reputation: 4.9,
      totalSales: 890,
    },
    description: "Souvenir Dragon Lore FN com float incrível!",
    status: "ACTIVE",
    views: 12345,
    favorites: 987,
    expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

export default function MarketplacePage() {
  const [filters, setFilters] = useState<MarketplaceFilters>({
    sortBy: 'newest',
  })
  const [searchQuery, setSearchQuery] = useState("")
  const [showMobileFilters, setShowMobileFilters] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleFiltersChange = (newFilters: MarketplaceFilters) => {
    setFilters(newFilters)
  }

  const handleResetFilters = () => {
    setFilters({ sortBy: 'newest' })
    setSearchQuery("")
  }

  const handleSearch = () => {
    setFilters({ ...filters, search: searchQuery })
  }

  const handleAddToCart = (listingId: string) => {
    toast.success("Item adicionado ao carrinho!", {
      icon: "🛒",
    })
  }

  const handleToggleFavorite = (listingId: string) => {
    toast.success("Item adicionado aos favoritos!", {
      icon: "❤️",
    })
  }

  // Aplicar filtros (simulado - será feito no backend)
  const filteredListings = MOCK_LISTINGS

  // Stats rápidas
  const stats = [
    { label: "Itens Disponíveis", value: "5.2K+", icon: Package, color: "text-blue-400" },
    { label: "Melhor Oferta", value: "-15%", icon: TrendingUp, color: "text-green-400" },
    { label: "Novos Hoje", value: "127", icon: Sparkles, color: "text-purple-400" },
    { label: "Em Alta", value: "AK-47", icon: Flame, color: "text-orange-400" },
  ]

  return (
    <div className="min-h-screen bg-[--color-bg-primary]">
      <div className="container py-8 space-y-8">
        {/* Header */}
        <PageHeader
          title="Marketplace"
          description="Encontre as melhores skins CS2 com os melhores preços e menor taxa do Brasil"
        />

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-linear-to-br from-purple-600/10 to-pink-600/10 rounded-lg blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative p-4 rounded-lg bg-[--color-bg-secondary] border border-[--color-border] hover:border-[--color-border-hover] transition-all">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg bg-[--color-bg-tertiary] ${stat.color}`}>
                    <stat.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-[--color-text-primary]">{stat.value}</div>
                    <div className="text-xs text-[--color-text-tertiary]">{stat.label}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Busca e Ordenação */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <div className="flex-1 flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[--color-text-tertiary]" />
              <Input
                placeholder="Buscar por nome da skin, coleção ou raridade..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                className="pl-10 bg-[--color-bg-secondary] border-[--color-border] focus:border-purple-500"
              />
            </div>
            <Button 
              onClick={handleSearch}
              className="bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            >
              <Search className="h-4 w-4 mr-2" />
              Buscar
            </Button>
          </div>

          <div className="flex gap-2">
            <Select
              value={filters.sortBy}
              onValueChange={(value) => setFilters({ ...filters, sortBy: value as any })}
            >
              <SelectTrigger className="w-[180px] bg-[--color-bg-secondary] border-[--color-border]">
                <SelectValue placeholder="Ordenar por" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">🆕 Mais Recentes</SelectItem>
                <SelectItem value="price_asc">💰 Menor Preço</SelectItem>
                <SelectItem value="price_desc">💎 Maior Preço</SelectItem>
                <SelectItem value="popular">🔥 Mais Popular</SelectItem>
                <SelectItem value="float_asc">✨ Menor Float</SelectItem>
                <SelectItem value="float_desc">🎯 Maior Float</SelectItem>
              </SelectContent>
            </Select>

            <Button
              variant="outline"
              className="lg:hidden border-[--color-border]"
              onClick={() => setShowMobileFilters(!showMobileFilters)}
            >
              <SlidersHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </motion.div>

        {/* Layout Principal */}
        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-6">
          {/* Filtros */}
          <motion.aside
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className={`${showMobileFilters ? 'block' : 'hidden'} lg:block`}
          >
            <div className="sticky top-24">
              <Filters
                filters={filters}
                onFiltersChange={handleFiltersChange}
                onReset={handleResetFilters}
              />
            </div>
          </motion.aside>

          {/* Grid de Itens */}
          <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {/* Contador de Resultados */}
            <div className="mb-6 flex items-center justify-between p-4 rounded-lg bg-[--color-bg-secondary] border border-[--color-border]">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="border-purple-500/50 text-purple-400">
                  {filteredListings.length} itens encontrados
                </Badge>
                {filters.search && (
                  <Badge variant="outline" className="border-pink-500/50 text-pink-400">
                    Buscando: "{filters.search}"
                  </Badge>
                )}
              </div>
              {filters.search && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleResetFilters}
                  className="text-[--color-text-tertiary] hover:text-[--color-text-primary]"
                >
                  Limpar Filtros
                </Button>
              )}
            </div>

            {/* Loading State */}
            {isLoading && (
              <LoadingState count={6} />
            )}

            {/* Grid de Skins */}
            {!isLoading && filteredListings.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
              >
                {filteredListings.map((listing, index) => (
                  <motion.div
                    key={listing.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <ItemCard
                      listing={listing}
                      onAddToCart={handleAddToCart}
                      onToggleFavorite={handleToggleFavorite}
                    />
                  </motion.div>
                ))}
              </motion.div>
            )}

            {/* Empty State */}
            {!isLoading && filteredListings.length === 0 && (
              <EmptyState
                icon={Package}
                title="Nenhum item encontrado"
                description="Não encontramos nenhuma skin com os filtros selecionados. Tente ajustar os filtros ou fazer uma nova busca."
                action={{
                  label: "Limpar Filtros",
                  onClick: handleResetFilters,
                }}
              />
            )}

            {/* Paginação */}
            {!isLoading && filteredListings.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="mt-8 flex justify-center gap-2"
              >
                <Button variant="outline" disabled className="border-[--color-border]">
                  Anterior
                </Button>
                <Button className="bg-linear-to-r from-purple-600 to-pink-600">1</Button>
                <Button variant="outline" className="border-[--color-border]">2</Button>
                <Button variant="outline" className="border-[--color-border]">3</Button>
                <Button variant="outline" className="border-[--color-border]">
                  Próximo
                </Button>
              </motion.div>
            )}
          </motion.main>
        </div>
      </div>
    </div>
  )
}


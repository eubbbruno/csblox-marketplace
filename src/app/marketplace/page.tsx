"use client"

import { useState } from "react"
import { Navbar } from "@/components/layout/navbar"
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
import { Search, SlidersHorizontal } from "lucide-react"
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
    toast.success("Item adicionado ao carrinho!")
  }

  const handleToggleFavorite = (listingId: string) => {
    toast.success("Item adicionado aos favoritos!")
  }

  // Aplicar filtros (simulado - será feito no backend)
  const filteredListings = MOCK_LISTINGS

  return (
    <>
      <Navbar />
      
      <div className="container py-8">
        {/* Cabeçalho */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Marketplace</h1>
          <p className="text-muted-foreground">
            Encontre as melhores skins CS2 com os melhores preços
          </p>
        </div>

        {/* Busca e Ordenação */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1 flex gap-2">
            <Input
              placeholder="Buscar por nome da skin..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              className="flex-1"
            />
            <Button onClick={handleSearch}>
              <Search className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex gap-2">
            <Select
              value={filters.sortBy}
              onValueChange={(value) => setFilters({ ...filters, sortBy: value as any })}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Ordenar por" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Mais Recentes</SelectItem>
                <SelectItem value="price_asc">Menor Preço</SelectItem>
                <SelectItem value="price_desc">Maior Preço</SelectItem>
                <SelectItem value="popular">Mais Popular</SelectItem>
                <SelectItem value="float_asc">Menor Float</SelectItem>
                <SelectItem value="float_desc">Maior Float</SelectItem>
              </SelectContent>
            </Select>

            <Button
              variant="outline"
              className="lg:hidden"
              onClick={() => setShowMobileFilters(!showMobileFilters)}
            >
              <SlidersHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Layout Principal */}
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6">
          {/* Filtros */}
          <aside className={`${showMobileFilters ? 'block' : 'hidden'} lg:block`}>
            <Filters
              filters={filters}
              onFiltersChange={handleFiltersChange}
              onReset={handleResetFilters}
            />
          </aside>

          {/* Grid de Itens */}
          <main>
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Mostrando <span className="font-semibold">{filteredListings.length}</span> itens
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredListings.map((listing) => (
                <ItemCard
                  key={listing.id}
                  listing={listing}
                  onAddToCart={handleAddToCart}
                  onToggleFavorite={handleToggleFavorite}
                />
              ))}
            </div>

            {/* Paginação */}
            {filteredListings.length === 0 && (
              <div className="text-center py-12">
                <p className="text-lg text-muted-foreground">
                  Nenhum item encontrado com os filtros selecionados
                </p>
                <Button variant="outline" className="mt-4" onClick={handleResetFilters}>
                  Limpar Filtros
                </Button>
              </div>
            )}

            {filteredListings.length > 0 && (
              <div className="mt-8 flex justify-center gap-2">
                <Button variant="outline" disabled>
                  Anterior
                </Button>
                <Button variant="outline">1</Button>
                <Button variant="outline">2</Button>
                <Button variant="outline">3</Button>
                <Button variant="outline">
                  Próximo
                </Button>
              </div>
            )}
          </main>
        </div>
      </div>
    </>
  )
}


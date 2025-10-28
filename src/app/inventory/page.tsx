"use client"

import { useState, useEffect } from "react"
import { Navbar } from "@/components/layout/navbar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Package, 
  Search, 
  Filter,
  RefreshCw,
  DollarSign,
  ExternalLink,
  AlertCircle
} from "lucide-react"
import { formatCurrency, getRarityColor } from "@/lib/utils"
import Image from "next/image"

interface InventoryItem {
  assetId: string
  name: string
  type: string
  rarity: string
  exterior: string | null
  imageUrl: string
  marketable: boolean
  tradable: boolean
  steamPrice?: number
}

export default function InventoryPage() {
  const [items, setItems] = useState<InventoryItem[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set())
  const [filter, setFilter] = useState<"all" | "tradable" | "marketable">("all")
  
  useEffect(() => {
    loadInventory()
  }, [])
  
  const loadInventory = async () => {
    setLoading(true)
    try {
      // Para desenvolvimento, usar Steam ID mock
      const mockSteamId = '76561198000000000'
      const response = await fetch(`/api/steam/inventory?steamId=${mockSteamId}`)
      const data = await response.json()
      
      if (data.success) {
        setItems(data.items)
      }
    } catch (error) {
      console.error('Erro ao carregar inventário:', error)
    } finally {
      setLoading(false)
    }
  }
  
  const filteredItems = items.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = 
      filter === "all" || 
      (filter === "tradable" && item.tradable) ||
      (filter === "marketable" && item.marketable)
    
    return matchesSearch && matchesFilter
  })
  
  const toggleItemSelection = (assetId: string) => {
    const newSelection = new Set(selectedItems)
    if (newSelection.has(assetId)) {
      newSelection.delete(assetId)
    } else {
      newSelection.add(assetId)
    }
    setSelectedItems(newSelection)
  }
  
  const handleListItems = () => {
    if (selectedItems.size === 0) {
      alert('Selecione pelo menos 1 item para anunciar')
      return
    }
    
    // Redirecionar para página de criar anúncio
    const itemIds = Array.from(selectedItems).join(',')
    window.location.href = `/sell?items=${itemIds}`
  }
  
  return (
    <>
      <Navbar />
      
      <div className="container py-8">
        {/* Cabeçalho */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Meu Inventário</h1>
            <p className="text-muted-foreground">
              Gerencie suas skins e crie anúncios
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={loadInventory} disabled={loading}>
              <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
              Atualizar
            </Button>
            {selectedItems.size > 0 && (
              <Button onClick={handleListItems}>
                <Package className="h-4 w-4 mr-2" />
                Anunciar ({selectedItems.size})
              </Button>
            )}
          </div>
        </div>
        
        {/* Filtros */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por nome da skin..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Tabs value={filter} onValueChange={(v) => setFilter(v as any)} className="w-auto">
                <TabsList>
                  <TabsTrigger value="all">Todos</TabsTrigger>
                  <TabsTrigger value="tradable">Trocáveis</TabsTrigger>
                  <TabsTrigger value="marketable">Vendáveis</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </CardContent>
        </Card>
        
        {/* Alerta de Trade URL */}
        <Card className="mb-6 border-yellow-500/50 bg-yellow-500/5">
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <AlertCircle className="h-5 w-5 text-yellow-500 mt-0.5" />
              <div className="flex-1">
                <h3 className="font-semibold mb-1">Configure sua Trade URL</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Para vender suas skins, você precisa configurar sua Trade URL do Steam.
                </p>
                <Button variant="outline" size="sm" asChild>
                  <a href="/settings">
                    Configurar Agora
                    <ExternalLink className="h-3 w-3 ml-2" />
                  </a>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4" />
              <p className="text-muted-foreground">Carregando inventário...</p>
            </div>
          </div>
        )}
        
        {/* Empty State */}
        {!loading && filteredItems.length === 0 && (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Package className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">
                {searchTerm ? 'Nenhum item encontrado' : 'Inventário vazio'}
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                {searchTerm 
                  ? 'Tente buscar por outro termo'
                  : 'Você ainda não tem itens do CS2 no seu inventário Steam'
                }
              </p>
              {searchTerm && (
                <Button variant="outline" onClick={() => setSearchTerm('')}>
                  Limpar busca
                </Button>
              )}
            </CardContent>
          </Card>
        )}
        
        {/* Grid de Itens */}
        {!loading && filteredItems.length > 0 && (
          <>
            <div className="flex justify-between items-center mb-4">
              <p className="text-sm text-muted-foreground">
                {filteredItems.length} {filteredItems.length === 1 ? 'item encontrado' : 'itens encontrados'}
              </p>
              {selectedItems.size > 0 && (
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setSelectedItems(new Set())}
                >
                  Limpar seleção
                </Button>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredItems.map((item) => (
                <Card 
                  key={item.assetId}
                  className={`cursor-pointer transition-all hover:shadow-lg ${
                    selectedItems.has(item.assetId) 
                      ? 'ring-2 ring-primary shadow-lg' 
                      : ''
                  }`}
                  onClick={() => toggleItemSelection(item.assetId)}
                >
                  <CardHeader className="pb-3">
                    <div className="relative aspect-4/3 mb-2 bg-linear-to-br from-muted/50 to-muted rounded-lg overflow-hidden">
                      <Image
                        src={item.imageUrl}
                        alt={item.name}
                        fill
                        className="object-contain p-4"
                      />
                      <Badge 
                        className={`absolute top-2 right-2 ${getRarityColor(item.rarity)}`}
                      >
                        {item.rarity}
                      </Badge>
                    </div>
                    <CardTitle className="text-sm line-clamp-2">
                      {item.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-muted-foreground">{item.type}</span>
                      {item.exterior && (
                        <Badge variant="outline" className="text-xs">
                          {item.exterior.replace('_', ' ')}
                        </Badge>
                      )}
                    </div>
                    
                    {item.steamPrice && (
                      <div className="flex items-center justify-between pt-2 border-t">
                        <span className="text-xs text-muted-foreground">Preço Steam</span>
                        <span className="text-sm font-bold text-green-600">
                          {formatCurrency(item.steamPrice)}
                        </span>
                      </div>
                    )}
                    
                    <div className="flex gap-1 mt-2">
                      {item.tradable && (
                        <Badge variant="secondary" className="text-xs">
                          Trocável
                        </Badge>
                      )}
                      {item.marketable && (
                        <Badge variant="secondary" className="text-xs">
                          Vendável
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  )
}


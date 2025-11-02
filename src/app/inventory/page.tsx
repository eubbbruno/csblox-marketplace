"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PageHeader } from "@/components/common/page-header"
import { EmptyState } from "@/components/common/empty-state"
import { LoadingState } from "@/components/common/loading-state"
import { StatCard } from "@/components/common/stat-card"
import { 
  Package, 
  Search, 
  Filter,
  RefreshCw,
  DollarSign,
  ExternalLink,
  AlertCircle,
  CheckSquare,
  Square,
  TrendingUp,
  Layers,
  ShoppingBag
} from "lucide-react"
import { formatCurrency, getRarityColor } from "@/lib/utils"
import { toast } from "sonner"
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
      toast.error('Selecione pelo menos 1 item para anunciar')
      return
    }
    
    // Redirecionar para página de criar anúncio
    const itemIds = Array.from(selectedItems).join(',')
    window.location.href = `/sell?items=${itemIds}`
  }

  const selectAll = () => {
    const allIds = new Set(filteredItems.map(item => item.assetId))
    setSelectedItems(allIds)
    toast.success(`${allIds.size} itens selecionados`)
  }

  const totalValue = filteredItems.reduce((sum, item) => sum + (item.steamPrice || 0), 0)
  const selectedValue = filteredItems
    .filter(item => selectedItems.has(item.assetId))
    .reduce((sum, item) => sum + (item.steamPrice || 0), 0)
  
  return (
    <div className="min-h-screen bg-[--color-bg-primary]">
      <div className="container py-8 space-y-8">
        {/* Header */}
        <PageHeader
          title="Meu Inventário Steam"
          description="Gerencie suas skins CS2 e crie anúncios para vender no marketplace"
          actions={
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                onClick={loadInventory} 
                disabled={loading}
                className="border-[--color-border]"
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                Atualizar
              </Button>
              {selectedItems.size > 0 && (
                <Button 
                  onClick={handleListItems}
                  className="bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                >
                  <ShoppingBag className="h-4 w-4 mr-2" />
                  Vender ({selectedItems.size})
                </Button>
              )}
            </div>
          }
        />

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-4"
        >
          <StatCard
            title="Total de Itens"
            value={filteredItems.length.toString()}
            icon={Package}
            trend={filteredItems.length > 0 ? { value: "+5%", isPositive: true } : undefined}
          />
          <StatCard
            title="Valor Total"
            value={formatCurrency(totalValue)}
            icon={DollarSign}
            trend={{ value: "+12%", isPositive: true }}
          />
          <StatCard
            title="Selecionados"
            value={selectedItems.size.toString()}
            icon={CheckSquare}
          />
          <StatCard
            title="Valor Selecionado"
            value={formatCurrency(selectedValue)}
            icon={TrendingUp}
            trend={selectedValue > 0 ? { value: `${selectedItems.size} itens`, isPositive: true } : undefined}
          />
        </motion.div>
        
        {/* Filtros e Busca */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="bg-[--color-bg-secondary] border-[--color-border]">
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[--color-text-tertiary]" />
                  <Input
                    placeholder="Buscar por nome da skin, coleção ou tipo..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-[--color-bg-tertiary] border-[--color-border]"
                  />
                </div>
                <Tabs value={filter} onValueChange={(v) => setFilter(v as any)} className="w-auto">
                  <TabsList className="bg-[--color-bg-tertiary]">
                    <TabsTrigger value="all">🎯 Todos</TabsTrigger>
                    <TabsTrigger value="tradable">🔄 Trocáveis</TabsTrigger>
                    <TabsTrigger value="marketable">💰 Vendáveis</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        
        {/* Alerta de Trade URL */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card className="border-yellow-500/50 bg-yellow-500/5">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-yellow-500/10">
                  <AlertCircle className="h-5 w-5 text-yellow-500" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-1 text-[--color-text-primary]">Configure sua Trade URL</h3>
                  <p className="text-sm text-[--color-text-secondary] mb-3">
                    Para vender suas skins, você precisa configurar sua Trade URL do Steam nas configurações.
                  </p>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    asChild
                    className="border-yellow-500/50 text-yellow-500 hover:bg-yellow-500/10"
                  >
                    <a href="/settings">
                      Configurar Agora
                      <ExternalLink className="h-3 w-3 ml-2" />
                    </a>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        
        {/* Loading State */}
        {loading && <LoadingState count={8} />}
        
        {/* Empty State */}
        {!loading && filteredItems.length === 0 && (
          <EmptyState
            icon={Package}
            title={searchTerm ? 'Nenhum item encontrado' : 'Inventário vazio'}
            description={
              searchTerm 
                ? 'Tente buscar por outro termo ou ajuste os filtros'
                : 'Você ainda não tem itens do CS2 no seu inventário Steam. Compre skins no marketplace ou jogue CS2 para conseguir drops!'
            }
            actions={searchTerm ? {
              label: "Limpar Busca",
              onClick: () => setSearchTerm('')
            } : undefined}
          />
        )}
        
        {/* Grid de Itens */}
        {!loading && filteredItems.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {/* Barra de Ações */}
            <div className="flex justify-between items-center mb-6 p-4 rounded-lg bg-[--color-bg-secondary] border border-[--color-border]">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="border-purple-500/50 text-purple-400">
                  {filteredItems.length} {filteredItems.length === 1 ? 'item' : 'itens'}
                </Badge>
                {selectedItems.size > 0 && (
                  <Badge variant="outline" className="border-pink-500/50 text-pink-400">
                    {selectedItems.size} selecionados
                  </Badge>
                )}
              </div>
              <div className="flex gap-2">
                {filteredItems.length > 0 && selectedItems.size === 0 && (
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={selectAll}
                    className="border-[--color-border]"
                  >
                    <CheckSquare className="h-4 w-4 mr-2" />
                    Selecionar Todos
                  </Button>
                )}
                {selectedItems.size > 0 && (
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => {
                      setSelectedItems(new Set())
                      toast.info('Seleção limpa')
                    }}
                    className="text-[--color-text-tertiary]"
                  >
                    <Square className="h-4 w-4 mr-2" />
                    Limpar Seleção
                  </Button>
                )}
              </div>
            </div>
            
            {/* Grid de Skins */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredItems.map((item, index) => (
                <motion.div
                  key={item.assetId}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card 
                    className={`cursor-pointer transition-all hover:shadow-xl hover:shadow-purple-500/10 bg-[--color-bg-secondary] border-[--color-border] hover:border-[--color-border-hover] ${
                      selectedItems.has(item.assetId) 
                        ? 'ring-2 ring-purple-500 shadow-xl shadow-purple-500/20 border-purple-500' 
                        : ''
                    }`}
                    onClick={() => toggleItemSelection(item.assetId)}
                  >
                    <CardHeader className="pb-3">
                      {/* Checkbox Indicator */}
                      <div className="absolute top-3 left-3 z-10">
                        <div className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all ${
                          selectedItems.has(item.assetId)
                            ? 'bg-purple-600 border-purple-600'
                            : 'bg-[--color-bg-tertiary] border-[--color-border]'
                        }`}>
                          {selectedItems.has(item.assetId) && (
                            <CheckSquare className="w-4 h-4 text-white" />
                          )}
                        </div>
                      </div>

                      <div className="relative aspect-4/3 mb-2 bg-linear-to-br from-[--color-bg-tertiary] to-[--color-bg-primary] rounded-lg overflow-hidden">
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
                      <CardTitle className="text-sm line-clamp-2 text-[--color-text-primary]">
                        {item.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-[--color-text-tertiary]">{item.type}</span>
                        {item.exterior && (
                          <Badge variant="outline" className="text-xs border-[--color-border]">
                            {item.exterior.replace('_', ' ')}
                          </Badge>
                        )}
                      </div>
                      
                      {item.steamPrice && (
                        <div className="flex items-center justify-between pt-2 border-t border-[--color-border]">
                          <span className="text-xs text-[--color-text-tertiary]">Preço Steam</span>
                          <span className="text-sm font-bold text-green-400">
                            {formatCurrency(item.steamPrice)}
                          </span>
                        </div>
                      )}
                      
                      <div className="flex gap-1 mt-2">
                        {item.tradable && (
                          <Badge variant="secondary" className="text-xs bg-blue-500/10 text-blue-400 border-blue-500/50">
                            🔄 Trocável
                          </Badge>
                        )}
                        {item.marketable && (
                          <Badge variant="secondary" className="text-xs bg-green-500/10 text-green-400 border-green-500/50">
                            💰 Vendável
                          </Badge>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}


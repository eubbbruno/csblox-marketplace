"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { RaffleCard } from "@/components/raffles/raffle-card"
import Link from "next/link"
import {
  Plus,
  Filter,
  Search,
  Dices,
  Package,
  TrendingUp,
  Clock,
  X,
} from "lucide-react"
import { Input } from "@/components/ui/input"

export default function RafflesPage() {
  const [raffles, setRaffles] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("active")
  const [showFilters, setShowFilters] = useState(true)
  
  // Filtros
  const [priceRange, setPriceRange] = useState([0, 1000])
  const [selectedRarities, setSelectedRarities] = useState<string[]>([])
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("time")

  const rarities = [
    { value: "CONSUMER", label: "Consumer", color: "bg-gray-500" },
    { value: "INDUSTRIAL", label: "Industrial", color: "bg-blue-400" },
    { value: "MIL_SPEC", label: "Mil-Spec", color: "bg-blue-600" },
    { value: "RESTRICTED", label: "Restricted", color: "bg-purple-600" },
    { value: "CLASSIFIED", label: "Classified", color: "bg-pink-600" },
    { value: "COVERT", label: "Covert", color: "bg-red-600" },
    { value: "CONTRABAND", label: "Contraband", color: "bg-yellow-600" },
  ]

  const types = [
    { value: "Pistol", label: "Pistolas" },
    { value: "Rifle", label: "Rifles" },
    { value: "Sniper Rifle", label: "Snipers" },
    { value: "SMG", label: "SMGs" },
    { value: "Shotgun", label: "Shotguns" },
    { value: "Knife", label: "Facas" },
    { value: "Gloves", label: "Luvas" },
  ]

  useEffect(() => {
    fetchRaffles()
  }, [activeTab, sortBy])

  const fetchRaffles = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams({
        status: activeTab === "active" ? "ACTIVE" : activeTab === "finished" ? "COMPLETED" : "ACTIVE",
        sortBy,
      })
      
      const response = await fetch(`/api/raffles?${params}`)
      const data = await response.json()
      
      if (data.success) {
        setRaffles(data.raffles)
      }
    } catch (error) {
      console.error("Error fetching raffles:", error)
    } finally {
      setLoading(false)
    }
  }

  const toggleRarity = (rarity: string) => {
    setSelectedRarities((prev) =>
      prev.includes(rarity)
        ? prev.filter((r) => r !== rarity)
        : [...prev, rarity]
    )
  }

  const toggleType = (type: string) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    )
  }

  const clearFilters = () => {
    setPriceRange([0, 1000])
    setSelectedRarities([])
    setSelectedTypes([])
    setSearchQuery("")
  }

  const filteredRaffles = raffles.filter((raffle) => {
    // Filtro de busca
    if (searchQuery && !raffle.skinName.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false
    }
    
    // Filtro de preço
    if (raffle.ticketPrice < priceRange[0] || raffle.ticketPrice > priceRange[1]) {
      return false
    }
    
    // Filtro de raridade
    if (selectedRarities.length > 0 && !selectedRarities.includes(raffle.skinRarity)) {
      return false
    }
    
    // Filtro de tipo
    if (selectedTypes.length > 0 && !selectedTypes.includes(raffle.skinType)) {
      return false
    }
    
    return true
  })

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-black mb-2">
                <span className="bg-gradient-to-r from-orange-400 via-red-400 to-pink-400 bg-clip-text text-transparent">
                  🎲 Rifas de Skins
                </span>
              </h1>
              <p className="text-gray-400">
                Participe dos sorteios e ganhe skins incríveis!
              </p>
            </div>
            
            <Link href="/raffles/create">
              <Button size="lg" className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600">
                <Plus className="w-5 h-5 mr-2" />
                Criar Rifa
              </Button>
            </Link>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Buscar skins..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 bg-gray-900/50 border-gray-700 focus:border-purple-500"
            />
          </div>
        </motion.div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList className="bg-gray-900/50 border border-gray-800">
            <TabsTrigger value="active" className="data-[state=active]:bg-orange-500">
              <Dices className="w-4 h-4 mr-2" />
              Ativas
            </TabsTrigger>
            <TabsTrigger value="finished" className="data-[state=active]:bg-gray-700">
              <Package className="w-4 h-4 mr-2" />
              Finalizadas
            </TabsTrigger>
            <TabsTrigger value="mine" className="data-[state=active]:bg-purple-600">
              <TrendingUp className="w-4 h-4 mr-2" />
              Minhas Rifas
            </TabsTrigger>
          </TabsList>

          {/* Main Content */}
          <div className="grid lg:grid-cols-4 gap-6 mt-6">
          {/* Sidebar Filters */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className={`lg:col-span-1 ${showFilters ? 'block' : 'hidden lg:block'}`}
          >
            <Card className="bg-gray-900/50 border-gray-800 p-6 sticky top-24 box-card">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold flex items-center gap-2">
                  <Filter className="w-5 h-5" />
                  Filtros
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                  className="text-xs text-gray-400 hover:text-white"
                >
                  Limpar
                </Button>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <Label className="text-sm font-semibold mb-3 block">
                  Preço por Número
                </Label>
                <Slider
                  value={priceRange}
                  onValueChange={setPriceRange}
                  max={1000}
                  step={10}
                  className="mb-2"
                />
                <div className="flex justify-between text-xs text-gray-400">
                  <span>R$ {priceRange[0]}</span>
                  <span>R$ {priceRange[1]}</span>
                </div>
              </div>

              {/* Rarity Filter */}
              <div className="mb-6">
                <Label className="text-sm font-semibold mb-3 block">
                  Raridade
                </Label>
                <div className="space-y-2">
                  {rarities.map((rarity) => (
                    <div key={rarity.value} className="flex items-center gap-2">
                      <Checkbox
                        id={rarity.value}
                        checked={selectedRarities.includes(rarity.value)}
                        onCheckedChange={() => toggleRarity(rarity.value)}
                      />
                      <Label
                        htmlFor={rarity.value}
                        className="flex items-center gap-2 cursor-pointer text-sm"
                      >
                        <div className={`w-3 h-3 rounded-full ${rarity.color}`} />
                        {rarity.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Type Filter */}
              <div className="mb-6">
                <Label className="text-sm font-semibold mb-3 block">
                  Tipo de Item
                </Label>
                <div className="space-y-2">
                  {types.map((type) => (
                    <div key={type.value} className="flex items-center gap-2">
                      <Checkbox
                        id={type.value}
                        checked={selectedTypes.includes(type.value)}
                        onCheckedChange={() => toggleType(type.value)}
                      />
                      <Label
                        htmlFor={type.value}
                        className="cursor-pointer text-sm"
                      >
                        {type.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sort By */}
              <div>
                <Label className="text-sm font-semibold mb-3 block">
                  Ordenar por
                </Label>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="bg-gray-800 border-gray-700">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="time">
                      <Clock className="w-4 h-4 inline mr-2" />
                      Tempo Restante
                    </SelectItem>
                    <SelectItem value="progress">
                      <TrendingUp className="w-4 h-4 inline mr-2" />
                      Progresso
                    </SelectItem>
                    <SelectItem value="price_low">
                      <Package className="w-4 h-4 inline mr-2" />
                      Menor Preço
                    </SelectItem>
                    <SelectItem value="price_high">
                      <Package className="w-4 h-4 inline mr-2" />
                      Maior Preço
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </Card>
          </motion.div>

          {/* Raffles Grid */}
          <div className="lg:col-span-3">
            <TabsContent value={activeTab} className="mt-0">
              {loading ? (
                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="animate-pulse">
                      <div className="bg-gray-800/50 rounded-lg h-96" />
                    </div>
                  ))}
                </div>
              ) : filteredRaffles.length > 0 ? (
                <>
                  <div className="mb-4 text-sm text-gray-400">
                    Mostrando {filteredRaffles.length} rifa(s)
                  </div>
                  <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredRaffles.map((raffle, i) => (
                      <motion.div
                        key={raffle.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                      >
                        <RaffleCard raffle={raffle} />
                      </motion.div>
                    ))}
                  </div>
                </>
              ) : (
                <Card className="bg-gray-900/50 border-gray-800 p-12 text-center">
                  <Dices className="w-16 h-16 mx-auto text-gray-600 mb-4" />
                  <h3 className="text-xl font-bold mb-2">
                    Nenhuma rifa encontrada
                  </h3>
                  <p className="text-gray-400 mb-6">
                    Tente ajustar os filtros ou criar uma nova rifa
                  </p>
                  <Button
                    variant="outline"
                    onClick={clearFilters}
                    className="border-gray-700"
                  >
                    <X className="w-4 h-4 mr-2" />
                    Limpar Filtros
                  </Button>
                </Card>
              )}
            </TabsContent>
          </div>
        </div>
        </Tabs>

        {/* Mobile Filter Toggle */}
        <Button
          className="lg:hidden fixed bottom-6 right-6 rounded-full w-14 h-14 shadow-2xl bg-gradient-to-r from-purple-600 to-pink-600 z-50"
          onClick={() => setShowFilters(!showFilters)}
        >
          <Filter className="w-6 h-6" />
        </Button>
      </div>
    </div>
  )
}


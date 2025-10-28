"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { X, Filter } from "lucide-react"
import { MarketplaceFilters } from "@/types"
import { formatCurrency } from "@/lib/utils"

interface FiltersProps {
  filters: MarketplaceFilters
  onFiltersChange: (filters: MarketplaceFilters) => void
  onReset: () => void
}

const RARITIES = [
  { value: "CONSUMER", label: "Consumer Grade", color: "bg-gray-500" },
  { value: "INDUSTRIAL", label: "Industrial Grade", color: "bg-blue-400" },
  { value: "MIL_SPEC", label: "Mil-Spec", color: "bg-blue-600" },
  { value: "RESTRICTED", label: "Restricted", color: "bg-purple-600" },
  { value: "CLASSIFIED", label: "Classified", color: "bg-pink-600" },
  { value: "COVERT", label: "Covert", color: "bg-red-600" },
  { value: "CONTRABAND", label: "Contraband", color: "bg-yellow-600" },
]

const EXTERIORS = [
  { value: "FACTORY_NEW", label: "Nova de Fábrica (FN)" },
  { value: "MINIMAL_WEAR", label: "Pouco Usada (MW)" },
  { value: "FIELD_TESTED", label: "Testada em Campo (FT)" },
  { value: "WELL_WORN", label: "Bem Desgastada (WW)" },
  { value: "BATTLE_SCARRED", label: "Veterana de Guerra (BS)" },
]

const ITEM_TYPES = [
  { value: "weapon", label: "Armas" },
  { value: "knife", label: "Facas" },
  { value: "gloves", label: "Luvas" },
  { value: "agent", label: "Agentes" },
  { value: "sticker", label: "Adesivos" },
  { value: "case", label: "Caixas" },
]

export function Filters({ filters, onFiltersChange, onReset }: FiltersProps) {
  const [priceRange, setPriceRange] = useState([filters.minPrice || 0, filters.maxPrice || 10000])

  const handleRarityChange = (rarity: string) => {
    const current = filters.rarity || []
    const updated = current.includes(rarity)
      ? current.filter(r => r !== rarity)
      : [...current, rarity]
    onFiltersChange({ ...filters, rarity: updated })
  }

  const handleExteriorChange = (exterior: string) => {
    const current = filters.exterior || []
    const updated = current.includes(exterior)
      ? current.filter(e => e !== exterior)
      : [...current, exterior]
    onFiltersChange({ ...filters, exterior: updated })
  }

  const handleItemTypeChange = (itemType: string) => {
    const current = filters.itemType || []
    const updated = current.includes(itemType)
      ? current.filter(t => t !== itemType)
      : [...current, itemType]
    onFiltersChange({ ...filters, itemType: updated })
  }

  const handlePriceChange = (values: number[]) => {
    setPriceRange(values)
    onFiltersChange({ ...filters, minPrice: values[0], maxPrice: values[1] })
  }

  const activeFiltersCount = [
    filters.rarity?.length || 0,
    filters.exterior?.length || 0,
    filters.itemType?.length || 0,
    filters.isStatTrak ? 1 : 0,
    filters.isSouvenir ? 1 : 0,
    (filters.minPrice && filters.minPrice > 0) || (filters.maxPrice && filters.maxPrice < 10000) ? 1 : 0,
  ].reduce((a, b) => a + b, 0)

  return (
    <Card className="h-fit">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            <CardTitle className="text-lg">Filtros</CardTitle>
            {activeFiltersCount > 0 && (
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                {activeFiltersCount}
              </span>
            )}
          </div>
          {activeFiltersCount > 0 && (
            <Button variant="ghost" size="sm" onClick={onReset}>
              <X className="h-4 w-4 mr-1" />
              Limpar
            </Button>
          )}
        </div>
      </CardHeader>
      <Separator />
      <ScrollArea className="h-[calc(100vh-16rem)]">
        <CardContent className="space-y-6 pt-6">
          {/* Preço */}
          <div className="space-y-3">
            <Label className="text-sm font-semibold">Faixa de Preço</Label>
            <div className="space-y-2">
              <Slider
                min={0}
                max={10000}
                step={50}
                value={priceRange}
                onValueChange={handlePriceChange}
                className="my-4"
              />
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>{formatCurrency(priceRange[0])}</span>
                <span>{formatCurrency(priceRange[1])}</span>
              </div>
            </div>
          </div>

          <Separator />

          {/* Raridade */}
          <div className="space-y-3">
            <Label className="text-sm font-semibold">Raridade</Label>
            <div className="space-y-2">
              {RARITIES.map((rarity) => (
                <div key={rarity.value} className="flex items-center space-x-2">
                  <Checkbox
                    id={`rarity-${rarity.value}`}
                    checked={filters.rarity?.includes(rarity.value)}
                    onCheckedChange={() => handleRarityChange(rarity.value)}
                  />
                  <label
                    htmlFor={`rarity-${rarity.value}`}
                    className="flex items-center gap-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                  >
                    <div className={`h-3 w-3 rounded ${rarity.color}`} />
                    {rarity.label}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Exterior */}
          <div className="space-y-3">
            <Label className="text-sm font-semibold">Exterior</Label>
            <div className="space-y-2">
              {EXTERIORS.map((exterior) => (
                <div key={exterior.value} className="flex items-center space-x-2">
                  <Checkbox
                    id={`exterior-${exterior.value}`}
                    checked={filters.exterior?.includes(exterior.value)}
                    onCheckedChange={() => handleExteriorChange(exterior.value)}
                  />
                  <label
                    htmlFor={`exterior-${exterior.value}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                  >
                    {exterior.label}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Tipo de Item */}
          <div className="space-y-3">
            <Label className="text-sm font-semibold">Tipo de Item</Label>
            <div className="space-y-2">
              {ITEM_TYPES.map((type) => (
                <div key={type.value} className="flex items-center space-x-2">
                  <Checkbox
                    id={`type-${type.value}`}
                    checked={filters.itemType?.includes(type.value)}
                    onCheckedChange={() => handleItemTypeChange(type.value)}
                  />
                  <label
                    htmlFor={`type-${type.value}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                  >
                    {type.label}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Especiais */}
          <div className="space-y-3">
            <Label className="text-sm font-semibold">Especiais</Label>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="stattrak"
                  checked={filters.isStatTrak}
                  onCheckedChange={(checked) =>
                    onFiltersChange({ ...filters, isStatTrak: checked as boolean })
                  }
                />
                <label
                  htmlFor="stattrak"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                >
                  StatTrak™
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="souvenir"
                  checked={filters.isSouvenir}
                  onCheckedChange={(checked) =>
                    onFiltersChange({ ...filters, isSouvenir: checked as boolean })
                  }
                />
                <label
                  htmlFor="souvenir"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                >
                  Souvenir
                </label>
              </div>
            </div>
          </div>
        </CardContent>
      </ScrollArea>
    </Card>
  )
}


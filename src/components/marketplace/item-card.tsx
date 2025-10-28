"use client"

import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Heart, Eye, ShoppingCart, Star } from "lucide-react"
import { formatCurrency, getRarityColor, getExteriorShort, getFloatColor } from "@/lib/utils"
import { Listing } from "@/types"
import { useState } from "react"

interface ItemCardProps {
  listing: Listing
  onAddToCart?: (listingId: string) => void
  onToggleFavorite?: (listingId: string) => void
}

export function ItemCard({ listing, onAddToCart, onToggleFavorite }: ItemCardProps) {
  const [isFavorite, setIsFavorite] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite)
    onToggleFavorite?.(listing.id)
  }

  const discount = listing.steamPrice && listing.price < listing.steamPrice
    ? Math.round(((listing.steamPrice - listing.price) / listing.steamPrice) * 100)
    : null

  return (
    <Card 
      className="group overflow-hidden hover:shadow-xl transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-muted to-background">
        {/* Imagem */}
        <Link href={`/marketplace/${listing.id}`}>
          <Image
            src={listing.imageUrl}
            alt={`${listing.itemName} | ${listing.skinName}`}
            fill
            className="object-contain p-4 group-hover:scale-110 transition-transform duration-300"
          />
        </Link>

        {/* Badges superiores */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {listing.isStatTrak && (
            <Badge variant="destructive" className="bg-orange-600">
              StatTrak™
            </Badge>
          )}
          {listing.isSouvenir && (
            <Badge variant="secondary" className="bg-yellow-600">
              Souvenir
            </Badge>
          )}
          {discount && discount > 0 && (
            <Badge variant="default" className="bg-green-600">
              -{discount}%
            </Badge>
          )}
        </div>

        {/* Botão Favorito */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 bg-background/80 hover:bg-background"
          onClick={handleToggleFavorite}
        >
          <Heart
            className={`h-5 w-5 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`}
          />
        </Button>

        {/* Float */}
        <div className="absolute bottom-2 right-2">
          <Badge variant="outline" className="bg-background/80">
            <span className={getFloatColor(listing.floatValue)}>
              Float: {listing.floatValue.toFixed(4)}
            </span>
          </Badge>
        </div>
      </div>

      <CardContent className="p-4">
        {/* Raridade */}
        <div className={`h-1 w-full rounded-full mb-3 ${getRarityColor(listing.rarity)}`} />

        {/* Nome */}
        <Link href={`/marketplace/${listing.id}`}>
          <h3 className="font-semibold text-sm mb-1 line-clamp-1 hover:text-primary transition-colors">
            {listing.itemName}
          </h3>
          <p className="text-xs text-muted-foreground mb-3 line-clamp-1">
            {listing.skinName}
          </p>
        </Link>

        {/* Exterior */}
        <div className="flex items-center gap-2 mb-3">
          <Badge variant="secondary" className="text-xs">
            {getExteriorShort(listing.exterior)}
          </Badge>
          {listing.paintSeed && (
            <span className="text-xs text-muted-foreground">
              Seed: {listing.paintSeed}
            </span>
          )}
        </div>

        {/* Vendedor */}
        <div className="flex items-center gap-2 mb-3 pb-3 border-b">
          <Avatar className="h-6 w-6">
            <AvatarImage src={listing.seller.avatar} />
            <AvatarFallback>{listing.seller.username[0]}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium truncate">{listing.seller.username}</p>
            <div className="flex items-center gap-1">
              <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
              <span className="text-xs text-muted-foreground">
                {listing.seller.reputation.toFixed(1)} ({listing.seller.totalSales})
              </span>
            </div>
          </div>
        </div>

        {/* Preço e Ações */}
        <div className="space-y-2">
          <div className="flex items-baseline justify-between">
            <div>
              <p className="text-2xl font-bold text-primary">
                {formatCurrency(listing.price)}
              </p>
              {listing.steamPrice && (
                <p className="text-xs text-muted-foreground line-through">
                  Steam: {formatCurrency(listing.steamPrice)}
                </p>
              )}
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              className="flex-1"
              onClick={() => onAddToCart?.(listing.id)}
            >
              <ShoppingCart className="h-4 w-4 mr-1" />
              Comprar
            </Button>
            <Link href={`/marketplace/${listing.id}`}>
              <Button variant="outline" size="icon">
                <Eye className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between mt-3 pt-3 border-t text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Eye className="h-3 w-3" />
            <span>{listing.views}</span>
          </div>
          <div className="flex items-center gap-1">
            <Heart className="h-3 w-3" />
            <span>{listing.favorites}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}


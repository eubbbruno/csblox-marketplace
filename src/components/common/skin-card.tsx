"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import Tilt from "react-parallax-tilt"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Heart, ShoppingCart, Eye, Sparkles, Star, Zap, TrendingDown } from "lucide-react"
import { formatCurrency, getRarityColor } from "@/lib/utils"
import confetti from "canvas-confetti"
import { toast } from "sonner"

interface SkinCardProps {
  skin: {
    id: string
    name: string
    image: string
    rarity: string
    exterior?: string
    float?: number
    price: number
    steamPrice?: number
    discount?: number
    isStatTrak?: boolean
    isSouvenir?: boolean
    seller?: {
      username: string
      avatar?: string
      reputation?: number
    }
    views?: number
    favorites?: number
  }
  variant?: "default" | "compact" | "featured"
  onAddToCart?: (id: string) => void
  onLike?: (id: string) => void
}

export function SkinCard({ skin, variant = "default", onAddToCart, onLike }: SkinCardProps) {
  const [isLiked, setIsLiked] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const handleLike = () => {
    setIsLiked(!isLiked)
    if (!isLiked) {
      confetti({
        particleCount: 20,
        spread: 40,
        origin: { y: 0.6 },
        colors: ["#ff0000", "#ff69b4"],
      })
    }
    onLike?.(skin.id)
  }

  const handleAddToCart = () => {
    confetti({
      particleCount: 30,
      spread: 60,
      origin: { y: 0.8 },
      colors: ["#8B5CF6", "#EC4899"],
    })
    toast.success("Item adicionado ao carrinho!", {
      icon: "🛒",
      style: {
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        color: "white",
        border: "none",
      },
    })
    onAddToCart?.(skin.id)
  }

  const isCompact = variant === "compact"
  const isFeatured = variant === "featured"

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: isCompact ? -3 : -10 }}
      transition={{ duration: 0.3 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Tilt
        tiltMaxAngleX={isCompact ? 5 : 15}
        tiltMaxAngleY={isCompact ? 5 : 15}
        perspective={1000}
        glareEnable={!isCompact}
        glareMaxOpacity={0.45}
        glareBorderRadius="20px"
        scale={isCompact ? 1.01 : 1.02}
      >
        <Link href={`/marketplace/${skin.id}`}>
          <Card className="relative overflow-hidden bg-gradient-to-br from-gray-900/95 via-gray-800/95 to-gray-900/95 border-gray-700/50 backdrop-blur-xl group box-card">
            {/* Rarity Indicator */}
            <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${getRarityColor(skin.rarity)}`} />
            
            {/* Image Container */}
            <div className={`relative ${isCompact ? 'aspect-square' : 'aspect-[4/3]'} overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900 box-pattern`}>
              <Image
                src={skin.image}
                alt={skin.name}
                fill
                className="object-contain p-4 transition-transform duration-700 group-hover:scale-110"
              />
              
              {/* Top Badges */}
              <div className="absolute top-3 left-3 flex flex-col gap-2 z-10">
                {skin.isStatTrak && (
                  <Badge className="bg-gradient-to-r from-orange-500 to-red-500 border-0 text-white font-bold text-xs">
                    <Zap className="w-3 h-3 mr-1" />
                    StatTrak™
                  </Badge>
                )}
                {skin.isSouvenir && (
                  <Badge className="bg-gradient-to-r from-yellow-500 to-yellow-600 border-0 text-white font-bold text-xs">
                    <Star className="w-3 h-3 mr-1" />
                    Souvenir
                  </Badge>
                )}
                {skin.discount && (
                  <Badge className="bg-red-500 text-white border-0 font-bold">
                    <TrendingDown className="w-3 h-3 mr-1" />
                    -{skin.discount}%
                  </Badge>
                )}
              </div>

              {/* Quick Actions */}
              {!isCompact && (
                <motion.div
                  className="absolute top-3 right-3 flex gap-2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={isHovered ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                >
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => {
                      e.preventDefault()
                      handleLike()
                    }}
                    className="w-10 h-10 rounded-full bg-black/50 backdrop-blur-xl flex items-center justify-center border border-white/10"
                  >
                    <Heart className={`w-5 h-5 ${isLiked ? 'text-red-500 fill-red-500' : 'text-white'}`} />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-10 h-10 rounded-full bg-black/50 backdrop-blur-xl flex items-center justify-center border border-white/10"
                  >
                    <Eye className="w-5 h-5 text-white" />
                  </motion.button>
                </motion.div>
              )}

              {/* Float Value */}
              {!isCompact && skin.float && (
                <motion.div
                  className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/90 to-transparent"
                  initial={{ y: 20, opacity: 0 }}
                  animate={isHovered ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
                >
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-white/80">Float</span>
                    <span className="font-bold text-green-400">
                      {skin.float.toFixed(4)}
                    </span>
                  </div>
                </motion.div>
              )}
            </div>
            
            {/* Content */}
            <div className={isCompact ? 'p-3' : 'p-4'}>
              {/* Title and Rarity */}
              <div className="mb-3">
                <h3 className={`font-bold text-white ${isCompact ? 'text-sm' : 'text-lg'} group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 group-hover:bg-clip-text transition-all line-clamp-1`}>
                  {skin.name}
                </h3>
                <div className="flex items-center gap-2 mt-1">
                  <Badge className={`${getRarityColor(skin.rarity)} text-white border-0 text-xs`}>
                    {skin.rarity}
                  </Badge>
                  {skin.exterior && (
                    <span className="text-xs text-gray-400">
                      {skin.exterior.replace('_', ' ')}
                    </span>
                  )}
                </div>
              </div>
              
              {/* Price */}
              <div className="mb-3">
                <div className="flex items-end gap-2">
                  <span className={`${isCompact ? 'text-xl' : 'text-3xl'} font-black text-transparent bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text`}>
                    {formatCurrency(skin.price)}
                  </span>
                  {skin.steamPrice && (
                    <span className="text-xs text-gray-500 line-through mb-1">
                      {formatCurrency(skin.steamPrice)}
                    </span>
                  )}
                </div>
              </div>

              {/* Seller Info */}
              {!isCompact && skin.seller && (
                <div className="flex items-center justify-between mb-3 p-2 rounded-lg bg-gray-800/50">
                  <div className="flex items-center gap-2">
                    {skin.seller.avatar ? (
                      <Image
                        src={skin.seller.avatar}
                        alt={skin.seller.username}
                        width={24}
                        height={24}
                        className="rounded-full"
                      />
                    ) : (
                      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-xs font-bold">
                        {skin.seller.username[0]}
                      </div>
                    )}
                    <span className="text-xs text-gray-400">{skin.seller.username}</span>
                  </div>
                  {skin.seller.reputation && (
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3 ${
                            i < Math.floor(skin.seller?.reputation || 0)
                              ? 'text-yellow-500 fill-yellow-500'
                              : 'text-gray-600'
                          }`}
                        />
                      ))}
                    </div>
                  )}
                </div>
              )}
              
              {/* Action Buttons */}
              {!isCompact && (
                <div className="flex gap-2">
                  <Button
                    onClick={(e) => {
                      e.preventDefault()
                      handleAddToCart()
                    }}
                    className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold"
                    size="sm"
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Comprar
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-gray-700 hover:border-purple-500 bg-gray-800/50"
                    onClick={(e) => e.preventDefault()}
                  >
                    <Sparkles className="w-4 h-4 text-purple-400" />
                  </Button>
                </div>
              )}

              {/* Stats Footer */}
              {!isCompact && (skin.views || skin.favorites) && (
                <motion.div
                  className="mt-3 pt-3 border-t border-gray-800 flex justify-between text-xs text-gray-500"
                  initial={{ opacity: 0 }}
                  animate={isHovered ? { opacity: 1 } : { opacity: 0.5 }}
                >
                  {skin.views && (
                    <span className="flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      {skin.views}
                    </span>
                  )}
                  {skin.favorites && (
                    <span className="flex items-center gap-1">
                      <Heart className="w-3 h-3" />
                      {skin.favorites}
                    </span>
                  )}
                </motion.div>
              )}
            </div>
            
            {/* Glow Effect */}
            <motion.div
              className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-500 -z-10"
            />
          </Card>
        </Link>
      </Tilt>
    </motion.div>
  )
}


"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import Tilt from "react-parallax-tilt"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Heart, 
  ShoppingCart, 
  Eye, 
  Sparkles, 
  TrendingUp, 
  Star,
  Zap,
  Crown,
  Diamond,
  Swords,
  Shield
} from "lucide-react"
import confetti from "canvas-confetti"
import { toast } from "sonner"

interface EpicSkinCardProps {
  listing: any
}

export function EpicSkinCard({ listing }: EpicSkinCardProps) {
  const [isLiked, setIsLiked] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  
  const getRarityGradient = (rarity: string) => {
    const gradients: Record<string, string> = {
      'CONSUMER': 'from-gray-600 to-gray-700',
      'INDUSTRIAL': 'from-blue-500 to-blue-600',
      'MIL_SPEC': 'from-indigo-500 to-blue-600',
      'RESTRICTED': 'from-purple-500 to-purple-600',
      'CLASSIFIED': 'from-pink-500 to-purple-600',
      'COVERT': 'from-red-500 to-red-600',
      'CONTRABAND': 'from-yellow-500 via-orange-500 to-red-500'
    }
    return gradients[rarity] || 'from-gray-600 to-gray-700'
  }
  
  const getRarityIcon = (rarity: string) => {
    const icons: Record<string, any> = {
      'CONSUMER': Shield,
      'INDUSTRIAL': Swords,
      'MIL_SPEC': Diamond,
      'RESTRICTED': Star,
      'CLASSIFIED': Crown,
      'COVERT': Zap,
      'CONTRABAND': Sparkles
    }
    const Icon = icons[rarity] || Shield
    return <Icon className="w-4 h-4" />
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
    })
  }
  
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
  }
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -10 }}
      transition={{ duration: 0.3 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Tilt
        tiltMaxAngleX={15}
        tiltMaxAngleY={15}
        perspective={1000}
        glareEnable={true}
        glareMaxOpacity={0.45}
        glareBorderRadius="20px"
        scale={1.02}
      >
        <Card className="relative overflow-hidden bg-gradient-to-br from-gray-900/95 via-gray-800/95 to-gray-900/95 border-gray-700/50 backdrop-blur-xl group">
          {/* Animated Background */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 via-pink-600/10 to-purple-600/10" />
            <motion.div
              className="absolute inset-0"
              animate={{
                background: [
                  "radial-gradient(circle at 0% 0%, rgba(139, 92, 246, 0.1) 0%, transparent 50%)",
                  "radial-gradient(circle at 100% 100%, rgba(236, 72, 153, 0.1) 0%, transparent 50%)",
                  "radial-gradient(circle at 0% 100%, rgba(139, 92, 246, 0.1) 0%, transparent 50%)",
                  "radial-gradient(circle at 100% 0%, rgba(236, 72, 153, 0.1) 0%, transparent 50%)",
                ],
              }}
              transition={{ duration: 10, repeat: Infinity }}
            />
          </div>
          
          {/* Rarity Indicator */}
          <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${getRarityGradient(listing.rarity)}`} />
          
          {/* Image Container */}
          <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900">
            <Image
              src={listing.imageUrl}
              alt={listing.itemName}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            {/* Top Badges */}
            <div className="absolute top-3 left-3 flex gap-2 z-10">
              <AnimatePresence>
                {listing.isStatTrak && (
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ scale: 0, rotate: 180 }}
                  >
                    <Badge className="bg-gradient-to-r from-orange-500 to-red-500 border-0 text-white font-bold">
                      <Zap className="w-3 h-3 mr-1" />
                      StatTrak™
                    </Badge>
                  </motion.div>
                )}
                {listing.isSouvenir && (
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ scale: 0, rotate: 180 }}
                  >
                    <Badge className="bg-gradient-to-r from-yellow-500 to-yellow-600 border-0 text-white font-bold">
                      <Star className="w-3 h-3 mr-1" />
                      Souvenir
                    </Badge>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            {/* Float Value Bar */}
            <motion.div 
              className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/90 to-transparent"
              initial={{ y: 20, opacity: 0 }}
              animate={isHovered ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
            >
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-white/80">Float Value</span>
                <span className="text-sm font-bold text-transparent bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text">
                  {parseFloat(listing.floatValue).toFixed(4)}
                </span>
              </div>
              <div className="mt-1 h-2 bg-gray-800 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-green-400 to-blue-400"
                  initial={{ width: 0 }}
                  animate={{ width: `${(1 - listing.floatValue) * 100}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                />
              </div>
            </motion.div>
            
            {/* Quick Actions */}
            <motion.div
              className="absolute top-3 right-3 flex gap-2"
              initial={{ opacity: 0, x: 20 }}
              animate={isHovered ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            >
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleLike}
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
          </div>
          
          {/* Content */}
          <div className="p-4 relative z-10">
            {/* Title and Rarity */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="font-bold text-white text-lg group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 group-hover:bg-clip-text transition-all line-clamp-1">
                  {listing.itemName}
                </h3>
                <p className="text-sm text-gray-400">{listing.skinName}</p>
              </div>
              <Badge className={`bg-gradient-to-r ${getRarityGradient(listing.rarity)} text-white border-0`}>
                {getRarityIcon(listing.rarity)}
              </Badge>
            </div>
            
            {/* Price Section */}
            <div className="mb-4">
              <div className="flex items-end gap-2">
                <span className="text-3xl font-black text-transparent bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text">
                  R$ {listing.price}
                </span>
                {listing.steamPrice && (
                  <span className="text-sm text-gray-500 line-through mb-1">
                    R$ {listing.steamPrice}
                  </span>
                )}
              </div>
              {listing.discount && (
                <Badge className="mt-1 bg-red-500/20 text-red-400 border-red-500/50">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  {listing.discount}% OFF
                </Badge>
              )}
            </div>
            
            {/* Seller Info */}
            <div className="flex items-center justify-between mb-4 p-2 rounded-lg bg-gray-800/50">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-xs font-bold text-white">
                  {listing.seller.username[0]}
                </div>
                <div>
                  <p className="text-xs font-medium text-white">{listing.seller.username}</p>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3 h-3 ${
                          i < Math.floor(listing.seller.reputation)
                            ? 'text-yellow-500 fill-yellow-500'
                            : 'text-gray-600'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <Badge className="bg-green-500/20 text-green-400 border-green-500/50 text-xs">
                Verificado
              </Badge>
            </div>
            
            {/* Action Buttons */}
            <div className="flex gap-2">
              <motion.div className="flex-1" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  onClick={handleAddToCart}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold shadow-lg shadow-purple-500/25"
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Comprar
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="outline"
                  size="icon"
                  className="border-gray-700 hover:border-purple-500 bg-gray-800/50"
                >
                  <Sparkles className="w-4 h-4 text-purple-400" />
                </Button>
              </motion.div>
            </div>
            
            {/* Stats Footer */}
            <motion.div
              className="mt-3 pt-3 border-t border-gray-800 flex justify-between text-xs text-gray-500"
              initial={{ opacity: 0 }}
              animate={isHovered ? { opacity: 1 } : { opacity: 0.5 }}
            >
              <span className="flex items-center gap-1">
                <Eye className="w-3 h-3" />
                {listing.views} views
              </span>
              <span className="flex items-center gap-1">
                <Heart className="w-3 h-3" />
                {listing.favorites} likes
              </span>
            </motion.div>
          </div>
          
          {/* Glow Effect on Hover */}
          <motion.div
            className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-500 -z-10"
          />
        </Card>
      </Tilt>
    </motion.div>
  )
}


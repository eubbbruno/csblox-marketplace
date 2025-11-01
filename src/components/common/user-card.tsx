"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Shield } from "lucide-react"

interface UserCardProps {
  user: {
    username: string
    avatar?: string
    reputation?: number
    isVerified?: boolean
    stats?: {
      sales?: number
      purchases?: number
    }
  }
  onClick?: () => void
  compact?: boolean
}

export function UserCard({ user, onClick, compact = false }: UserCardProps) {
  const content = (
    <Card className="bg-gray-900/50 border-gray-800 p-4 box-card hover:border-purple-500/50 transition-all cursor-pointer group">
      <div className="flex items-center gap-3">
        {user.avatar ? (
          <Image
            src={user.avatar}
            alt={user.username}
            width={compact ? 40 : 56}
            height={compact ? 40 : 56}
            className="rounded-full ring-2 ring-purple-500/20 group-hover:ring-purple-500/50 transition-all"
          />
        ) : (
          <div className={`${compact ? 'w-10 h-10' : 'w-14 h-14'} rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-xl font-bold ring-2 ring-purple-500/20 group-hover:ring-purple-500/50 transition-all`}>
            {user.username[0].toUpperCase()}
          </div>
        )}
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <p className="font-bold text-white truncate group-hover:text-purple-400 transition-colors">
              {user.username}
            </p>
            {user.isVerified && (
              <Shield className="w-4 h-4 text-green-400 flex-shrink-0" />
            )}
          </div>
          
          {user.reputation !== undefined && (
            <div className="flex items-center gap-1 mt-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3 h-3 ${
                    i < Math.floor(user.reputation!)
                      ? "text-yellow-500 fill-yellow-500"
                      : "text-gray-600"
                  }`}
                />
              ))}
              <span className="text-xs text-gray-400 ml-1">
                {user.reputation.toFixed(1)}
              </span>
            </div>
          )}
          
          {!compact && user.stats && (
            <div className="flex gap-3 mt-2 text-xs text-gray-400">
              {user.stats.sales !== undefined && (
                <span>{user.stats.sales} vendas</span>
              )}
              {user.stats.purchases !== undefined && (
                <span>{user.stats.purchases} compras</span>
              )}
            </div>
          )}
        </div>
      </div>
    </Card>
  )

  if (onClick) {
    return (
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onClick}
      >
        {content}
      </motion.div>
    )
  }

  return (
    <Link href={`/profile/${user.username}`}>
      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
        {content}
      </motion.div>
    </Link>
  )
}


"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { LucideIcon } from "lucide-react"

interface SectionTitleProps {
  badge?: string
  badgeIcon?: LucideIcon
  title: string
  description?: string
  gradient?: string
  centered?: boolean
}

export function SectionTitle({
  badge,
  badgeIcon: BadgeIcon,
  title,
  description,
  gradient = "from-purple-400 to-pink-400",
  centered = true
}: SectionTitleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={centered ? "text-center mb-16" : "mb-12"}
    >
      {badge && (
        <Badge className="px-4 py-2 mb-4 bg-purple-500/10 border-purple-500/50">
          {BadgeIcon && <BadgeIcon className="w-4 h-4 mr-2 inline" />}
          {badge}
        </Badge>
      )}
      
      <h2 className="text-4xl md:text-6xl font-black mb-4">
        <span className={`bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}>
          {title}
        </span>
      </h2>
      
      {description && (
        <p className={`text-xl text-gray-400 ${centered ? "max-w-2xl mx-auto" : "max-w-3xl"}`}>
          {description}
        </p>
      )}
    </motion.div>
  )
}


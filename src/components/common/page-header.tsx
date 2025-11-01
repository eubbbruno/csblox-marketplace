"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { ReactNode } from "react"

interface PageHeaderProps {
  title: string
  description?: string
  badge?: string
  icon?: ReactNode
  actions?: ReactNode
  gradient?: string
}

export function PageHeader({
  title,
  description,
  badge,
  icon,
  actions,
  gradient = "from-purple-400 via-pink-400 to-purple-400"
}: PageHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-8"
    >
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            {icon && (
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/25"
              >
                {icon}
              </motion.div>
            )}
            <div>
              <h1 className="text-4xl md:text-5xl font-black">
                <span className={`bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}>
                  {title}
                </span>
              </h1>
              {badge && (
                <Badge className="mt-2 bg-purple-500/20 text-purple-400 border-purple-500/50">
                  {badge}
                </Badge>
              )}
            </div>
          </div>
          {description && (
            <p className="text-gray-400 text-lg max-w-2xl">
              {description}
            </p>
          )}
        </div>
        
        {actions && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            {actions}
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}


"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react"
import { formatCurrency } from "@/lib/utils"

interface StatCardProps {
  title: string
  value: string | number
  icon: LucideIcon
  trend?: {
    value: string
    isPositive: boolean
  }
  format?: "currency" | "number" | "text"
  gradient?: string
  delay?: number
}

export function StatCard({
  title,
  value,
  icon: Icon,
  trend,
  format = "text",
  gradient = "from-purple-500 to-pink-500",
  delay = 0
}: StatCardProps) {
  const formattedValue = format === "currency" 
    ? formatCurrency(Number(value))
    : format === "number"
    ? Number(value).toLocaleString("pt-BR")
    : value

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      whileHover={{ y: -5 }}
    >
      <Card className="bg-gradient-to-br from-gray-900/95 to-gray-800/95 border-gray-700/50 backdrop-blur-xl p-6 box-card relative overflow-hidden group">
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <motion.div
            animate={{
              background: [
                "radial-gradient(circle at 0% 0%, rgba(139, 92, 246, 0.1) 0%, transparent 50%)",
                "radial-gradient(circle at 100% 100%, rgba(236, 72, 153, 0.1) 0%, transparent 50%)",
              ],
            }}
            transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
            className="absolute inset-0"
          />
        </div>

        <div className="relative z-10">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-sm text-gray-400 mb-1">{title}</p>
              <h3 className="text-3xl font-black text-white">{formattedValue}</h3>
            </div>
            
            <motion.div
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ duration: 0.5 }}
              className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-lg`}
            >
              <Icon className="w-6 h-6 text-white" />
            </motion.div>
          </div>

          {trend && (
            <Badge
              variant="outline"
              className={`${
                trend.isPositive
                  ? "border-green-500/50 text-green-400 bg-green-500/10"
                  : "border-red-500/50 text-red-400 bg-red-500/10"
              }`}
            >
              {trend.isPositive ? (
                <TrendingUp className="w-3 h-3 mr-1" />
              ) : (
                <TrendingDown className="w-3 h-3 mr-1" />
              )}
              {trend.value}
            </Badge>
          )}
        </div>

        {/* Glow Effect */}
        <motion.div
          className={`absolute -inset-0.5 bg-gradient-to-r ${gradient} rounded-xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500 -z-10`}
        />
      </Card>
    </motion.div>
  )
}


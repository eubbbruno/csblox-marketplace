"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { LucideIcon } from "lucide-react"

interface EmptyStateProps {
  icon: LucideIcon
  title: string
  description: string
  action?: {
    label: string
    onClick: () => void
  }
}

export function EmptyState({ icon: Icon, title, description, action }: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="bg-gray-900/50 border-gray-800 p-12 text-center box-card">
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="mb-6"
        >
          <Icon className="w-20 h-20 mx-auto text-gray-600" />
        </motion.div>
        
        <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
        <p className="text-gray-400 mb-6 max-w-md mx-auto">{description}</p>
        
        {action && (
          <Button
            onClick={action.onClick}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
          >
            {action.label}
          </Button>
        )}
      </Card>
    </motion.div>
  )
}


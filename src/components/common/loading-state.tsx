"use client"

import { motion } from "framer-motion"

interface LoadingStateProps {
  type?: "grid" | "list" | "card" | "page"
  count?: number
}

export function LoadingState({ type = "grid", count = 6 }: LoadingStateProps) {
  if (type === "page") {
    return (
      <div className="animate-pulse space-y-8">
        <div className="h-12 bg-gray-800/50 rounded w-1/3" />
        <div className="h-6 bg-gray-800/50 rounded w-2/3" />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-96 bg-gray-800/50 rounded-lg" />
          ))}
        </div>
      </div>
    )
  }

  if (type === "list") {
    return (
      <div className="space-y-4">
        {[...Array(count)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.1 }}
            className="animate-pulse"
          >
            <div className="flex items-center gap-4 p-4 bg-gray-800/50 rounded-lg">
              <div className="w-16 h-16 bg-gray-700/50 rounded-lg" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-700/50 rounded w-3/4" />
                <div className="h-3 bg-gray-700/50 rounded w-1/2" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    )
  }

  if (type === "card") {
    return (
      <div className="animate-pulse">
        <div className="bg-gray-800/50 rounded-lg p-6 space-y-4">
          <div className="h-48 bg-gray-700/50 rounded" />
          <div className="h-4 bg-gray-700/50 rounded w-3/4" />
          <div className="h-3 bg-gray-700/50 rounded w-1/2" />
        </div>
      </div>
    )
  }

  // Grid (default)
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(count)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.1 }}
          className="animate-pulse"
        >
          <div className="bg-gray-800/50 rounded-lg h-96">
            <div className="h-2/3 bg-gray-700/50 rounded-t-lg" />
            <div className="p-4 space-y-3">
              <div className="h-4 bg-gray-700/50 rounded w-3/4" />
              <div className="h-3 bg-gray-700/50 rounded w-1/2" />
              <div className="h-8 bg-gray-700/50 rounded" />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}


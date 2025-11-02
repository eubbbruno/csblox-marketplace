"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { PageHeader } from "@/components/common/page-header"
import { EmptyState } from "@/components/common/empty-state"
import { Bell, CheckCheck, Trash2, ShoppingBag, DollarSign, TrendingUp, AlertCircle } from "lucide-react"
import { formatDate } from "@/lib/utils"

export default function NotificationsPage() {
  const notifications: any[] = []

  const getIcon = (type: string) => {
    switch (type) {
      case "purchase":
        return <ShoppingBag className="h-5 w-5 text-green-400" />
      case "sale":
        return <DollarSign className="h-5 w-5 text-blue-400" />
      case "system":
        return <AlertCircle className="h-5 w-5 text-yellow-400" />
      default:
        return <Bell className="h-5 w-5 text-purple-400" />
    }
  }

  return (
    <div className="min-h-screen bg-[--color-bg-primary]">
      <div className="container py-8 max-w-4xl space-y-8">
        <PageHeader
          title="Notificações"
          description="Fique por dentro de todas as suas atividades"
          actions={
            notifications.length > 0 && (
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="border-[--color-border]">
                  <CheckCheck className="h-4 w-4 mr-2" />
                  Marcar todas como lidas
                </Button>
                <Button variant="ghost" size="sm" className="text-red-400">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Limpar tudo
                </Button>
              </div>
            )
          }
        />

        {notifications.length === 0 ? (
          <EmptyState
            icon={Bell}
            title="Nenhuma notificação"
            description="Você está em dia! Não há notificações novas no momento."
          />
        ) : (
          <div className="space-y-3">
            {notifications.map((notification, index) => (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className={`bg-[--color-bg-secondary] border-[--color-border] hover:border-[--color-border-hover] transition-all cursor-pointer ${
                  !notification.read ? 'ring-2 ring-purple-500/20' : ''
                }`}>
                  <CardContent className="p-4">
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 p-2 rounded-lg bg-[--color-bg-tertiary]">
                        {getIcon(notification.type)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-1">
                          <h3 className="font-semibold text-[--color-text-primary]">
                            {notification.title}
                          </h3>
                          {!notification.read && (
                            <Badge className="bg-purple-500/10 text-purple-400 border-purple-500/50">
                              Nova
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-[--color-text-secondary] mb-2">
                          {notification.message}
                        </p>
                        <p className="text-xs text-[--color-text-tertiary]">
                          {formatDate(notification.createdAt)}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}


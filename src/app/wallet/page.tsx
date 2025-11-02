"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { PageHeader } from "@/components/common/page-header"
import { EmptyState } from "@/components/common/empty-state"
import { StatCard } from "@/components/common/stat-card"
import { 
  Wallet, 
  Plus,
  Minus,
  ArrowUpRight,
  ArrowDownLeft,
  Clock,
  CheckCircle2,
  XCircle,
  Copy,
  TrendingUp,
  TrendingDown,
  DollarSign,
  CreditCard
} from "lucide-react"
import { formatCurrency, formatDate } from "@/lib/utils"
import { toast } from "sonner"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function WalletPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [depositAmount, setDepositAmount] = useState("")
  const [withdrawAmount, setWithdrawAmount] = useState("")
  const [showPixDialog, setShowPixDialog] = useState(false)
  const [pixData, setPixData] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/")
    }
  }, [status, router])

  const handleDeposit = async () => {
    const amount = parseFloat(depositAmount)
    if (isNaN(amount) || amount < 20) {
      toast.error("Valor mínimo de depósito é R$ 20,00")
      return
    }
    if (amount > 5000) {
      toast.error("Valor máximo de depósito é R$ 5.000,00")
      return
    }
    
    setLoading(true)
    try {
      const response = await fetch('/api/payments/mercadopago', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount,
          userId: session?.user.id,
          description: `Depósito de ${formatCurrency(amount)}`,
          type: 'DEPOSIT'
        })
      })
      
      const data = await response.json()
      
      if (data.success) {
        setPixData(data)
        setShowPixDialog(true)
        toast.success("PIX gerado com sucesso!", { icon: "💰" })
      } else {
        toast.error("Erro ao gerar PIX")
      }
    } catch (error) {
      console.error('Erro:', error)
      toast.error("Erro ao processar pagamento")
    } finally {
      setLoading(false)
    }
  }

  const handleWithdraw = () => {
    const amount = parseFloat(withdrawAmount)
    if (isNaN(amount) || amount < 10) {
      toast.error("Valor mínimo de saque é R$ 10,00")
      return
    }
    if (amount > (session?.user.balance || 0)) {
      toast.error("Saldo insuficiente")
      return
    }
    toast.success("Solicitação de saque enviada! Será processada em até 24h", { icon: "✅" })
  }

  const copyPixCode = () => {
    const code = pixData?.pixCode || "00020126580014br.gov.bcb.pix0136..."
    navigator.clipboard.writeText(code)
    toast.success("Código PIX copiado!", { icon: "📋" })
  }

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-[--color-bg-primary] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-4 border-purple-600 border-t-transparent rounded-full mx-auto mb-4" />
          <p className="text-[--color-text-secondary]">Carregando...</p>
        </div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  return (
    <div className="min-h-screen bg-[--color-bg-primary]">
      <div className="container py-8 max-w-6xl space-y-8">
        {/* Header */}
        <PageHeader
          title="Carteira"
          description="Gerencie seu saldo, faça depósitos e saques via PIX instantâneo"
        />

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-4"
        >
          <StatCard
            title="Saldo Disponível"
            value={formatCurrency(session.user.balance || 0)}
            icon={Wallet}
            trend={{ value: "+R$ 150", isPositive: true }}
          />
          <StatCard
            title="Total Depositado"
            value={formatCurrency(0)}
            icon={TrendingUp}
          />
          <StatCard
            title="Total Sacado"
            value={formatCurrency(0)}
            icon={TrendingDown}
          />
          <StatCard
            title="Saldo Bloqueado"
            value={formatCurrency(0)}
            icon={Clock}
          />
        </motion.div>

        {/* Ações de Depósito e Saque */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid gap-6 md:grid-cols-2"
        >
          {/* Depositar */}
          <Card className="bg-[--color-bg-secondary] border-[--color-border] hover:border-green-500/50 transition-all">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-lg bg-green-500/10">
                  <Plus className="h-6 w-6 text-green-500" />
                </div>
                <div>
                  <CardTitle className="text-[--color-text-primary]">Adicionar Saldo</CardTitle>
                  <CardDescription>Depósito via PIX instantâneo</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="deposit-amount" className="text-[--color-text-secondary]">Valor</Label>
                <Input
                  id="deposit-amount"
                  type="number"
                  placeholder="R$ 0,00"
                  value={depositAmount}
                  onChange={(e) => setDepositAmount(e.target.value)}
                  min="20"
                  max="5000"
                  className="bg-[--color-bg-tertiary] border-[--color-border] text-[--color-text-primary]"
                />
                <p className="text-xs text-[--color-text-tertiary] mt-1">
                  Mín: R$ 20,00 • Máx: R$ 5.000,00
                </p>
              </div>

              <div className="grid grid-cols-4 gap-2">
                {["50", "100", "200", "500"].map((value) => (
                  <Button 
                    key={value}
                    variant="outline" 
                    size="sm"
                    onClick={() => setDepositAmount(value)}
                    className="border-[--color-border] hover:border-green-500/50"
                  >
                    R$ {value}
                  </Button>
                ))}
              </div>

              <Button 
                className="w-full bg-linear-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700" 
                onClick={handleDeposit} 
                disabled={loading}
              >
                {loading ? (
                  <>
                    <div className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full mr-2" />
                    Gerando PIX...
                  </>
                ) : (
                  <>
                    <Plus className="h-4 w-4 mr-2" />
                    Gerar PIX
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Sacar */}
          <Card className="bg-[--color-bg-secondary] border-[--color-border] hover:border-red-500/50 transition-all">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-lg bg-red-500/10">
                  <Minus className="h-6 w-6 text-red-500" />
                </div>
                <div>
                  <CardTitle className="text-[--color-text-primary]">Sacar Saldo</CardTitle>
                  <CardDescription>Receba via PIX em até 24h</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="withdraw-amount" className="text-[--color-text-secondary]">Valor</Label>
                <Input
                  id="withdraw-amount"
                  type="number"
                  placeholder="R$ 0,00"
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(e.target.value)}
                  min="10"
                  max={session.user.balance || 0}
                  className="bg-[--color-bg-tertiary] border-[--color-border] text-[--color-text-primary]"
                />
                <p className="text-xs text-[--color-text-tertiary] mt-1">
                  Mín: R$ 10,00 • Taxa: R$ 2,90
                </p>
              </div>

              <div className="p-4 bg-[--color-bg-tertiary] rounded-lg text-sm space-y-2">
                <div className="flex justify-between">
                  <span className="text-[--color-text-tertiary]">Valor do saque:</span>
                  <span className="font-medium text-[--color-text-primary]">{formatCurrency(parseFloat(withdrawAmount) || 0)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[--color-text-tertiary]">Taxa:</span>
                  <span className="font-medium text-red-400">- {formatCurrency(2.90)}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-[--color-border]">
                  <span className="font-semibold text-[--color-text-primary]">Você receberá:</span>
                  <span className="font-bold text-green-400">
                    {formatCurrency(Math.max(0, (parseFloat(withdrawAmount) || 0) - 2.90))}
                  </span>
                </div>
              </div>

              <Button 
                className="w-full bg-linear-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700" 
                onClick={handleWithdraw}
              >
                <Minus className="h-4 w-4 mr-2" />
                Solicitar Saque
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Histórico */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card className="bg-[--color-bg-secondary] border-[--color-border]">
            <CardHeader>
              <CardTitle className="text-[--color-text-primary]">Histórico de Transações</CardTitle>
              <CardDescription>
                Veja todas as suas movimentações financeiras
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="all">
                <TabsList className="grid w-full grid-cols-4 bg-[--color-bg-tertiary]">
                  <TabsTrigger value="all">🎯 Todas</TabsTrigger>
                  <TabsTrigger value="deposits">💰 Depósitos</TabsTrigger>
                  <TabsTrigger value="withdrawals">💸 Saques</TabsTrigger>
                  <TabsTrigger value="purchases">🛒 Compras</TabsTrigger>
                </TabsList>

                <TabsContent value="all" className="mt-6">
                  <EmptyState
                    icon={Wallet}
                    title="Nenhuma transação encontrada"
                    description="Suas transações aparecerão aqui após você fazer depósitos, saques ou compras."
                  />
                </TabsContent>

                <TabsContent value="deposits" className="mt-6">
                  <EmptyState
                    icon={ArrowDownLeft}
                    title="Nenhum depósito encontrado"
                    description="Faça seu primeiro depósito via PIX para começar a comprar skins!"
                  />
                </TabsContent>

                <TabsContent value="withdrawals" className="mt-6">
                  <EmptyState
                    icon={ArrowUpRight}
                    title="Nenhum saque encontrado"
                    description="Você ainda não solicitou nenhum saque."
                  />
                </TabsContent>

                <TabsContent value="purchases" className="mt-6">
                  <EmptyState
                    icon={CreditCard}
                    title="Nenhuma compra encontrada"
                    description="Explore o marketplace e compre suas primeiras skins!"
                  />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Dialog PIX */}
      <Dialog open={showPixDialog} onOpenChange={setShowPixDialog}>
        <DialogContent className="bg-[--color-bg-secondary] border-[--color-border]">
          <DialogHeader>
            <DialogTitle className="text-[--color-text-primary]">Depósito via PIX</DialogTitle>
            <DialogDescription>
              Escaneie o QR Code ou copie o código PIX para completar o pagamento
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="p-4 bg-linear-to-r from-green-500/10 to-emerald-500/10 rounded-lg text-center border border-green-500/20">
              <p className="text-sm text-[--color-text-tertiary] mb-2">Valor a depositar</p>
              <p className="text-3xl font-bold text-[--color-text-primary]">{formatCurrency(parseFloat(depositAmount) || 0)}</p>
            </div>

            <div className="flex items-center justify-center p-8 bg-white rounded-lg">
              <div className="text-center">
                <div className="w-48 h-48 bg-gray-200 rounded-lg flex items-center justify-center mb-4">
                  <p className="text-sm text-gray-500">QR Code PIX</p>
                </div>
                <p className="text-xs text-gray-600">
                  Escaneie com o app do seu banco
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-[--color-text-secondary]">Código PIX Copia e Cola</Label>
              <div className="flex gap-2">
                <Input
                  value={pixData?.pixCode || "Gerando código..."}
                  readOnly
                  className="font-mono text-xs bg-[--color-bg-tertiary] border-[--color-border]"
                />
                <Button 
                  variant="outline" 
                  onClick={copyPixCode}
                  className="border-[--color-border]"
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
              <p className="text-sm text-yellow-500 flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Este PIX expira em 30 minutos
              </p>
            </div>

            <div className="text-xs text-[--color-text-tertiary] space-y-1">
              <p>• O crédito é automático após o pagamento</p>
              <p>• Não compartilhe este código com ninguém</p>
              <p>• Em caso de problemas, entre em contato com o suporte</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

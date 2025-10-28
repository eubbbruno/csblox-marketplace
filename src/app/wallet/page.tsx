"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Navbar } from "@/components/layout/navbar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { 
  Wallet, 
  Plus,
  Minus,
  ArrowUpRight,
  ArrowDownLeft,
  Clock,
  CheckCircle2,
  XCircle,
  Copy
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
        toast.success("PIX gerado com sucesso!")
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
    toast.success("Solicitação de saque enviada! Será processada em até 24h")
  }

  const copyPixCode = () => {
    const code = pixData?.pixCode || "00020126580014br.gov.bcb.pix0136..."
    navigator.clipboard.writeText(code)
    toast.success("Código PIX copiado!")
  }

  if (status === "loading") {
    return (
      <>
        <Navbar />
        <div className="container py-8">
          <div className="flex items-center justify-center h-[60vh]">
            <div className="text-center">
              <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4" />
              <p className="text-muted-foreground">Carregando...</p>
            </div>
          </div>
        </div>
      </>
    )
  }

  if (!session) {
    return null
  }

  return (
    <>
      <Navbar />
      
      <div className="container py-8 max-w-6xl">
        {/* Cabeçalho */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Carteira</h1>
          <p className="text-muted-foreground">
            Gerencie seu saldo e transações
          </p>
        </div>

        {/* Saldo Atual */}
        <Card className="mb-8 bg-linear-to-r from-primary/10 to-primary/5 border-primary/20">
          <CardHeader>
            <CardTitle className="text-lg">Saldo Disponível</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-2">
              <span className="text-5xl font-bold">{formatCurrency(session.user.balance || 0)}</span>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Saldo bloqueado: {formatCurrency(0)}
            </p>
          </CardContent>
        </Card>

        {/* Ações de Depósito e Saque */}
        <div className="grid gap-6 md:grid-cols-2 mb-8">
          {/* Depositar */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-green-500/10">
                  <Plus className="h-5 w-5 text-green-500" />
                </div>
                <div>
                  <CardTitle>Adicionar Saldo</CardTitle>
                  <CardDescription>Depósito via PIX instantâneo</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="deposit-amount">Valor</Label>
                <Input
                  id="deposit-amount"
                  type="number"
                  placeholder="R$ 0,00"
                  value={depositAmount}
                  onChange={(e) => setDepositAmount(e.target.value)}
                  min="20"
                  max="5000"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Mín: R$ 20,00 • Máx: R$ 5.000,00
                </p>
              </div>

              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setDepositAmount("50")}
                >
                  R$ 50
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setDepositAmount("100")}
                >
                  R$ 100
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setDepositAmount("200")}
                >
                  R$ 200
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setDepositAmount("500")}
                >
                  R$ 500
                </Button>
              </div>

              <Button className="w-full" onClick={handleDeposit} disabled={loading}>
                {loading ? (
                  <>
                    <div className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full mr-2" />
                    Gerando...
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
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-red-500/10">
                  <Minus className="h-5 w-5 text-red-500" />
                </div>
                <div>
                  <CardTitle>Sacar Saldo</CardTitle>
                  <CardDescription>Receba via PIX em até 24h</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="withdraw-amount">Valor</Label>
                <Input
                  id="withdraw-amount"
                  type="number"
                  placeholder="R$ 0,00"
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(e.target.value)}
                  min="10"
                  max={session.user.balance || 0}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Mín: R$ 10,00 • Taxa: R$ 2,90
                </p>
              </div>

              <div className="p-3 bg-muted rounded-lg text-sm">
                <div className="flex justify-between mb-1">
                  <span className="text-muted-foreground">Valor do saque:</span>
                  <span className="font-medium">{formatCurrency(parseFloat(withdrawAmount) || 0)}</span>
                </div>
                <div className="flex justify-between mb-1">
                  <span className="text-muted-foreground">Taxa:</span>
                  <span className="font-medium">- {formatCurrency(2.90)}</span>
                </div>
                <div className="flex justify-between pt-2 border-t">
                  <span className="font-semibold">Você receberá:</span>
                  <span className="font-bold text-primary">
                    {formatCurrency(Math.max(0, (parseFloat(withdrawAmount) || 0) - 2.90))}
                  </span>
                </div>
              </div>

              <Button className="w-full" variant="destructive" onClick={handleWithdraw}>
                <Minus className="h-4 w-4 mr-2" />
                Solicitar Saque
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Histórico */}
        <Card>
          <CardHeader>
            <CardTitle>Histórico de Transações</CardTitle>
            <CardDescription>
              Veja todas as suas movimentações
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="all">Todas</TabsTrigger>
                <TabsTrigger value="deposits">Depósitos</TabsTrigger>
                <TabsTrigger value="withdrawals">Saques</TabsTrigger>
                <TabsTrigger value="purchases">Compras</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="space-y-4 mt-4">
                <div className="flex items-center justify-center py-12">
                  <div className="text-center">
                    <Wallet className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-sm text-muted-foreground">
                      Nenhuma transação encontrada
                    </p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="deposits" className="mt-4">
                <div className="flex items-center justify-center py-12">
                  <p className="text-sm text-muted-foreground">Nenhum depósito encontrado</p>
                </div>
              </TabsContent>

              <TabsContent value="withdrawals" className="mt-4">
                <div className="flex items-center justify-center py-12">
                  <p className="text-sm text-muted-foreground">Nenhum saque encontrado</p>
                </div>
              </TabsContent>

              <TabsContent value="purchases" className="mt-4">
                <div className="flex items-center justify-center py-12">
                  <p className="text-sm text-muted-foreground">Nenhuma compra encontrada</p>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      {/* Dialog PIX */}
      <Dialog open={showPixDialog} onOpenChange={setShowPixDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Depósito via PIX</DialogTitle>
            <DialogDescription>
              Escaneie o QR Code ou copie o código PIX
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="p-4 bg-muted rounded-lg text-center">
              <p className="text-sm text-muted-foreground mb-2">Valor a depositar</p>
              <p className="text-3xl font-bold">{formatCurrency(parseFloat(depositAmount) || 0)}</p>
            </div>

            <div className="flex items-center justify-center p-8 bg-white rounded-lg">
              <div className="text-center">
                <div className="w-48 h-48 bg-gray-200 rounded-lg flex items-center justify-center mb-4">
                  <p className="text-sm text-gray-500">QR Code PIX</p>
                </div>
                <p className="text-xs text-muted-foreground">
                  Escaneie com o app do seu banco
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Código PIX Copia e Cola</Label>
              <div className="flex gap-2">
                <Input
                  value={pixData?.pixCode || "Gerando código..."}
                  readOnly
                  className="font-mono text-xs"
                />
                <Button variant="outline" onClick={copyPixCode}>
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
              <p className="text-sm text-yellow-600 dark:text-yellow-500">
                ⏱️ Este PIX expira em 30 minutos
              </p>
            </div>

            <div className="text-xs text-muted-foreground">
              <p>• O crédito é automático após o pagamento</p>
              <p>• Não compartilhe este código com ninguém</p>
              <p>• Em caso de problemas, entre em contato com o suporte</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}


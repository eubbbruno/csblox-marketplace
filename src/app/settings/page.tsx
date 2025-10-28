"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Navbar } from "@/components/layout/navbar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { toast } from "sonner"
import { Save, ExternalLink } from "lucide-react"

export default function SettingsPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [tradeUrl, setTradeUrl] = useState("")
  const [email, setEmail] = useState("")

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/")
    }
  }, [status, router])

  const handleSaveTradeUrl = () => {
    if (!tradeUrl.includes("steamcommunity.com/tradeoffer")) {
      toast.error("URL de troca inválida")
      return
    }
    toast.success("Trade URL salva com sucesso!")
  }

  const handleSaveEmail = () => {
    if (!email || !email.includes("@")) {
      toast.error("Email inválido")
      return
    }
    toast.success("Email salvo com sucesso!")
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
      
      <div className="container py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Configurações</h1>
          <p className="text-muted-foreground">
            Gerencie as configurações da sua conta
          </p>
        </div>

        <div className="space-y-6">
          {/* Trade URL */}
          <Card>
            <CardHeader>
              <CardTitle>Trade URL do Steam</CardTitle>
              <CardDescription>
                Configure sua Trade URL para receber itens automaticamente
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="trade-url">Trade URL</Label>
                <Input
                  id="trade-url"
                  placeholder="https://steamcommunity.com/tradeoffer/new/?partner=..."
                  value={tradeUrl}
                  onChange={(e) => setTradeUrl(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  Encontre sua Trade URL nas{" "}
                  <a
                    href="https://steamcommunity.com/id/me/tradeoffers/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline inline-flex items-center gap-1"
                  >
                    configurações do Steam
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </p>
              </div>
              <Button onClick={handleSaveTradeUrl}>
                <Save className="h-4 w-4 mr-2" />
                Salvar Trade URL
              </Button>
            </CardContent>
          </Card>

          {/* Email */}
          <Card>
            <CardHeader>
              <CardTitle>Email</CardTitle>
              <CardDescription>
                Receba notificações sobre suas transações
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Endereço de Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <Button onClick={handleSaveEmail}>
                <Save className="h-4 w-4 mr-2" />
                Salvar Email
              </Button>
            </CardContent>
          </Card>

          {/* Notificações */}
          <Card>
            <CardHeader>
              <CardTitle>Notificações</CardTitle>
              <CardDescription>
                Escolha quais notificações deseja receber
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Vendas</p>
                    <p className="text-sm text-muted-foreground">
                      Quando alguém comprar um item seu
                    </p>
                  </div>
                  <Button variant="outline" size="sm">Ativado</Button>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Compras</p>
                    <p className="text-sm text-muted-foreground">
                      Confirmação de compras realizadas
                    </p>
                  </div>
                  <Button variant="outline" size="sm">Ativado</Button>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Promoções</p>
                    <p className="text-sm text-muted-foreground">
                      Ofertas especiais e novidades
                    </p>
                  </div>
                  <Button variant="outline" size="sm">Desativado</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Segurança */}
          <Card>
            <CardHeader>
              <CardTitle>Segurança</CardTitle>
              <CardDescription>
                Informações da sua conta Steam
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between py-2">
                  <div>
                    <p className="font-medium">Steam ID</p>
                    <p className="text-sm text-muted-foreground">{session.user.steamId}</p>
                  </div>
                </div>
                <Separator />
                <div className="flex items-center justify-between py-2">
                  <div>
                    <p className="font-medium">Conta Steam</p>
                    <p className="text-sm text-muted-foreground">{session.user.username}</p>
                  </div>
                  <a
                    href={session.user.profileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="outline" size="sm">
                      Ver Perfil
                      <ExternalLink className="h-4 w-4 ml-2" />
                    </Button>
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}


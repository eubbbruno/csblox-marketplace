"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { PageHeader } from "@/components/common/page-header"
import { toast } from "sonner"
import { Save, ExternalLink, User, Shield, Bell, Palette, CreditCard } from "lucide-react"

export default function SettingsPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [tradeUrl, setTradeUrl] = useState("")
  const [email, setEmail] = useState("")
  const [pixKey, setPixKey] = useState("")

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
    toast.success("Trade URL salva com sucesso!", { icon: "✅" })
  }

  const handleSaveEmail = () => {
    if (!email || !email.includes("@")) {
      toast.error("Email inválido")
      return
    }
    toast.success("Email salvo com sucesso!", { icon: "✅" })
  }

  const handleSavePixKey = () => {
    if (!pixKey) {
      toast.error("Chave PIX inválida")
      return
    }
    toast.success("Chave PIX salva com sucesso!", { icon: "✅" })
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
      <div className="container py-8 max-w-5xl space-y-8">
        <PageHeader
          title="Configurações"
          description="Gerencie as configurações da sua conta e preferências"
        />

        <div className="grid gap-6 lg:grid-cols-[250px_1fr]">
          {/* Sidebar com Preview do Perfil */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            <Card className="bg-[--color-bg-secondary] border-[--color-border]">
              <CardContent className="p-6 text-center">
                <Avatar className="h-24 w-24 mx-auto mb-4 border-4 border-purple-500/50">
                  <AvatarImage src={session.user.avatar} />
                  <AvatarFallback>{session.user.username[0]}</AvatarFallback>
                </Avatar>
                <h3 className="font-bold text-[--color-text-primary] mb-1">
                  {session.user.username}
                </h3>
                <p className="text-sm text-[--color-text-tertiary]">
                  Membro desde 2024
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Tabs de Configurações */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Tabs defaultValue="profile" className="space-y-6">
              <TabsList className="grid w-full grid-cols-5 bg-[--color-bg-secondary]">
                <TabsTrigger value="profile">
                  <User className="h-4 w-4 mr-2" />
                  Perfil
                </TabsTrigger>
                <TabsTrigger value="security">
                  <Shield className="h-4 w-4 mr-2" />
                  Segurança
                </TabsTrigger>
                <TabsTrigger value="notifications">
                  <Bell className="h-4 w-4 mr-2" />
                  Notificações
                </TabsTrigger>
                <TabsTrigger value="payment">
                  <CreditCard className="h-4 w-4 mr-2" />
                  Pagamento
                </TabsTrigger>
                <TabsTrigger value="appearance">
                  <Palette className="h-4 w-4 mr-2" />
                  Aparência
                </TabsTrigger>
              </TabsList>

              {/* Perfil */}
              <TabsContent value="profile" className="space-y-4">
                <Card className="bg-[--color-bg-secondary] border-[--color-border]">
                  <CardHeader>
                    <CardTitle className="text-[--color-text-primary]">Informações do Perfil</CardTitle>
                    <CardDescription>
                      Atualize suas informações pessoais
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="seu@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-[--color-bg-tertiary] border-[--color-border]"
                      />
                    </div>
                    <Button onClick={handleSaveEmail} className="bg-linear-to-r from-purple-600 to-pink-600">
                      <Save className="h-4 w-4 mr-2" />
                      Salvar Email
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-[--color-bg-secondary] border-[--color-border]">
                  <CardHeader>
                    <CardTitle className="text-[--color-text-primary]">Trade URL do Steam</CardTitle>
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
                        className="bg-[--color-bg-tertiary] border-[--color-border]"
                      />
                      <p className="text-xs text-[--color-text-tertiary]">
                        Encontre sua Trade URL nas{" "}
                        <a
                          href="https://steamcommunity.com/id/me/tradeoffers/privacy"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-purple-400 hover:underline inline-flex items-center gap-1"
                        >
                          configurações do Steam
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      </p>
                    </div>
                    <Button onClick={handleSaveTradeUrl} className="bg-linear-to-r from-purple-600 to-pink-600">
                      <Save className="h-4 w-4 mr-2" />
                      Salvar Trade URL
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Segurança */}
              <TabsContent value="security">
                <Card className="bg-[--color-bg-secondary] border-[--color-border]">
                  <CardHeader>
                    <CardTitle className="text-[--color-text-primary]">Informações da Conta Steam</CardTitle>
                    <CardDescription>
                      Dados vinculados à sua conta Steam
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between py-3">
                        <div>
                          <p className="font-medium text-[--color-text-primary]">Steam ID</p>
                          <p className="text-sm text-[--color-text-tertiary]">{session.user.steamId}</p>
                        </div>
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between py-3">
                        <div>
                          <p className="font-medium text-[--color-text-primary]">Usuário Steam</p>
                          <p className="text-sm text-[--color-text-tertiary]">{session.user.username}</p>
                        </div>
                        <a
                          href={session.user.profileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Button variant="outline" size="sm" className="border-[--color-border]">
                            Ver Perfil
                            <ExternalLink className="h-4 w-4 ml-2" />
                          </Button>
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Notificações */}
              <TabsContent value="notifications">
                <Card className="bg-[--color-bg-secondary] border-[--color-border]">
                  <CardHeader>
                    <CardTitle className="text-[--color-text-primary]">Preferências de Notificações</CardTitle>
                    <CardDescription>
                      Escolha quais notificações deseja receber
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { title: "Vendas", description: "Quando alguém comprar um item seu", enabled: true },
                        { title: "Compras", description: "Confirmação de compras realizadas", enabled: true },
                        { title: "Ofertas", description: "Quando receberem ofertas nos seus itens", enabled: true },
                        { title: "Promoções", description: "Ofertas especiais e novidades", enabled: false },
                      ].map((notification, index) => (
                        <div key={index}>
                          <div className="flex items-center justify-between py-3">
                            <div>
                              <p className="font-medium text-[--color-text-primary]">{notification.title}</p>
                              <p className="text-sm text-[--color-text-tertiary]">{notification.description}</p>
                            </div>
                            <Button 
                              variant="outline" 
                              size="sm"
                              className={notification.enabled ? "border-green-500/50 text-green-400" : "border-[--color-border]"}
                            >
                              {notification.enabled ? "Ativado" : "Desativado"}
                            </Button>
                          </div>
                          {index < 3 && <Separator />}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Pagamento */}
              <TabsContent value="payment">
                <Card className="bg-[--color-bg-secondary] border-[--color-border]">
                  <CardHeader>
                    <CardTitle className="text-[--color-text-primary]">Informações de Pagamento</CardTitle>
                    <CardDescription>
                      Configure sua chave PIX para receber saques
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="pix-key">Chave PIX</Label>
                      <Input
                        id="pix-key"
                        placeholder="email@exemplo.com, CPF, telefone ou chave aleatória"
                        value={pixKey}
                        onChange={(e) => setPixKey(e.target.value)}
                        className="bg-[--color-bg-tertiary] border-[--color-border]"
                      />
                      <p className="text-xs text-[--color-text-tertiary]">
                        Essa chave será usada para enviar seus saques
                      </p>
                    </div>
                    <Button onClick={handleSavePixKey} className="bg-linear-to-r from-purple-600 to-pink-600">
                      <Save className="h-4 w-4 mr-2" />
                      Salvar Chave PIX
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Aparência */}
              <TabsContent value="appearance">
                <Card className="bg-[--color-bg-secondary] border-[--color-border]">
                  <CardHeader>
                    <CardTitle className="text-[--color-text-primary]">Personalização</CardTitle>
                    <CardDescription>
                      Customize a aparência da plataforma
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between py-3">
                        <div>
                          <p className="font-medium text-[--color-text-primary]">Tema</p>
                          <p className="text-sm text-[--color-text-tertiary]">Modo escuro ativado</p>
                        </div>
                        <Button variant="outline" size="sm" className="border-[--color-border]">
                          Escuro
                        </Button>
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between py-3">
                        <div>
                          <p className="font-medium text-[--color-text-primary]">Animações</p>
                          <p className="text-sm text-[--color-text-tertiary]">Efeitos visuais e transições</p>
                        </div>
                        <Button variant="outline" size="sm" className="border-green-500/50 text-green-400">
                          Ativado
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Zap, Trophy } from "lucide-react"
import Link from "next/link"

export default function LoginPage() {
  const handleSteamLogin = () => {
    // Para desenvolvimento, usar rota mock
    window.location.href = '/api/auth/steam'
  }
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-muted/50 to-background p-4">
      <div className="w-full max-w-md">
        <Card className="shadow-2xl">
          <CardHeader className="text-center space-y-1">
            <div className="flex justify-center mb-4">
              <div className="h-16 w-16 rounded-full bg-primary flex items-center justify-center">
                <span className="text-2xl font-bold text-primary-foreground">CS</span>
              </div>
            </div>
            <CardTitle className="text-2xl">Bem-vindo ao CSBlox</CardTitle>
            <CardDescription>
              O melhor marketplace de skins CS2 do Brasil
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button 
              onClick={handleSteamLogin}
              className="w-full h-12 text-base"
              size="lg"
            >
              <svg className="w-6 h-6 mr-2" viewBox="0 0 256 256" fill="currentColor">
                <path d="M127.779 0C60.42 0 5.24 52.412 0 119.014l68.724 28.674a35.812 35.812 0 0 1 20.426-6.366c.682 0 1.356.019 2.02.056l30.566-44.71v-.626c0-26.903 21.69-48.796 48.353-48.796 26.662 0 48.352 21.893 48.352 48.796 0 26.902-21.69 48.804-48.352 48.804-.37 0-.73-.009-1.098-.018l-43.593 31.377c.028.582.046 1.163.046 1.751 0 20.246-16.28 36.676-36.294 36.676-17.566 0-32.263-12.658-35.584-29.412L4.41 166.623c11.576 44.539 51.928 77.494 100.178 77.494C198.213 244.117 256 186.168 256 92.503 256 29.301 206.024 0 127.779 0zM80.352 196.332l-15.749-6.568c2.787 5.867 7.621 10.775 14.033 13.47 13.857 5.83 29.836-.803 35.612-14.799a27.555 27.555 0 0 0 .046-21.035c-2.768-6.79-7.999-12.086-14.706-14.909-6.67-2.795-13.811-2.694-20.085-.304l16.275 6.79c10.222 4.3 15.056 16.145 10.794 26.461-4.253 10.314-15.998 15.191-26.22 10.894zm121.957-100.29c0-17.925-14.457-32.52-32.217-32.52-17.769 0-32.226 14.595-32.226 32.52 0 17.926 14.457 32.512 32.226 32.512 17.76 0 32.217-14.586 32.217-32.512zm-56.37-.055c0-13.488 10.84-24.42 24.2-24.42 13.368 0 24.208 10.932 24.208 24.42 0 13.488-10.84 24.421-24.209 24.421-13.359 0-24.2-10.933-24.2-24.42z"/>
              </svg>
              Entrar com Steam
            </Button>
            
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">
                  Login seguro via Steam
                </span>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="space-y-1">
                <Shield className="h-6 w-6 mx-auto text-primary" />
                <p className="text-xs text-muted-foreground">100% Seguro</p>
              </div>
              <div className="space-y-1">
                <Zap className="h-6 w-6 mx-auto text-primary" />
                <p className="text-xs text-muted-foreground">PIX Instant.</p>
              </div>
              <div className="space-y-1">
                <Trophy className="h-6 w-6 mx-auto text-primary" />
                <p className="text-xs text-muted-foreground">Taxa 5%</p>
              </div>
            </div>
            
            <p className="text-xs text-center text-muted-foreground">
              Ao entrar, você concorda com nossos{" "}
              <Link href="/termos" className="underline hover:text-primary">
                Termos de Uso
              </Link>{" "}
              e{" "}
              <Link href="/privacidade" className="underline hover:text-primary">
                Política de Privacidade
              </Link>
            </p>
          </CardContent>
        </Card>
        
        <p className="text-center text-sm text-muted-foreground mt-4">
          © 2024 CSBlox. Counter-Strike é marca registrada da Valve Corporation.
        </p>
      </div>
    </div>
  )
}


"use client"

import Link from "next/link"
import Image from "next/image"
import { useSession, signIn, signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ShoppingCart, Wallet, Settings, LogOut, LayoutDashboard, Store } from "lucide-react"
import { formatCurrency } from "@/lib/utils"
import { useRouter } from "next/navigation"

export function Navbar() {
  const { data: session, status } = useSession()
  const router = useRouter()

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
            <span className="text-xl font-bold text-primary-foreground">CS</span>
          </div>
          <span className="text-xl font-bold">CSBlox</span>
        </Link>

        {/* Menu Central */}
        <div className="hidden md:flex items-center gap-6">
          <Link href="/marketplace" className="text-sm font-medium hover:text-primary transition-colors">
            <Store className="inline-block w-4 h-4 mr-1" />
            Marketplace
          </Link>
          <Link href="/como-funciona" className="text-sm font-medium hover:text-primary transition-colors">
            Como Funciona
          </Link>
          <Link href="/suporte" className="text-sm font-medium hover:text-primary transition-colors">
            Suporte
          </Link>
        </div>

        {/* Menu Direito */}
        <div className="flex items-center gap-4">
          {status === "loading" ? (
            <div className="h-8 w-24 animate-pulse rounded bg-muted" />
          ) : session?.user ? (
            <>
              {/* Saldo */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => router.push("/wallet")}
                className="hidden sm:flex"
              >
                <Wallet className="h-4 w-4 mr-1" />
                {formatCurrency(session.user.balance || 0)}
              </Button>

              {/* Carrinho */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => router.push("/cart")}
              >
                <ShoppingCart className="h-5 w-5" />
              </Button>

              {/* Menu do Usuário */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={session.user.avatar} alt={session.user.username} />
                      <AvatarFallback>{session.user.username[0].toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <span className="hidden sm:inline-block">{session.user.username}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => router.push("/dashboard")}>
                    <LayoutDashboard className="h-4 w-4 mr-2" />
                    Dashboard
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => router.push("/wallet")}>
                    <Wallet className="h-4 w-4 mr-2" />
                    Carteira
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => router.push("/settings")}>
                    <Settings className="h-4 w-4 mr-2" />
                    Configurações
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => signOut()}>
                    <LogOut className="h-4 w-4 mr-2" />
                    Sair
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <Button
              onClick={() => signIn("steam")}
              className="gap-2"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM8.5 17C6.57 17 5 15.43 5 13.5C5 11.57 6.57 10 8.5 10C10.43 10 12 11.57 12 13.5C12 15.43 10.43 17 8.5 17ZM17 13C15.9 13 15 12.1 15 11C15 9.9 15.9 9 17 9C18.1 9 19 9.9 19 11C19 12.1 18.1 13 17 13Z"/>
              </svg>
              Login com Steam
            </Button>
          )}
        </div>
      </div>
    </nav>
  )
}


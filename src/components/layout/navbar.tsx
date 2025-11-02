"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useSession, signIn, signOut } from "next-auth/react"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  ShoppingCart, 
  Wallet, 
  Settings, 
  LogOut, 
  LayoutDashboard, 
  Store,
  Menu,
  X,
  Package,
  Sparkles,
  Dices
} from "lucide-react"
import { formatCurrency } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"

export function Navbar() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = [
    { href: "/marketplace", label: "Marketplace", icon: Store },
    { href: "/raffles", label: "Rifas", icon: Dices },
    { href: "/inventory", label: "Inventário", icon: Package },
    { href: "/how-it-works", label: "Como Funciona", icon: Sparkles },
  ]

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-background/80 backdrop-blur-xl border-b shadow-lg"
          : "bg-background/60 backdrop-blur-md border-b border-border/40"
      }`}
    >
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <motion.div 
            whileHover={{ scale: 1.05, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.3, type: "spring" }}
            className="relative"
          >
            {/* Você pode substituir por sua logo aqui */}
            {/* Opção 1: Usar uma imagem */}
            {/* <Image src="/logo.png" alt="CSBlox" width={40} height={40} className="rounded-lg" /> */}
            
            {/* Opção 2: Ícone atual (padrão) - v2.0 */}
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 via-red-500 to-pink-500 shadow-lg shadow-orange-500/30 box-card border-2 border-orange-400/40 relative overflow-hidden">
              {/* Efeito de brilho */}
              <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <Package className="w-6 h-6 text-white relative z-10" />
            </div>
            
            {/* Indicador Online */}
            <motion.div 
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-background shadow-lg shadow-green-500/50"
            />
          </motion.div>
          
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-orange-400 via-red-400 to-pink-400 tracking-tight">
                CSBlox
              </span>
              <Badge variant="secondary" className="text-[10px] px-1.5 py-0 bg-orange-500/20 text-orange-400 border-orange-500/50 font-bold">
                BETA
              </Badge>
            </div>
            <span className="text-[10px] text-muted-foreground font-medium -mt-1">
              Marketplace CS2
            </span>
          </div>
        </Link>

        {/* Menu Central - Desktop */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href
            return (
              <Link key={link.href} href={link.href}>
                <Button
                  variant={isActive ? "secondary" : "ghost"}
                  size="sm"
                  className={`gap-2 relative ${
                    isActive ? "bg-primary/10 text-primary" : ""
                  }`}
                >
                  {link.icon && <link.icon className="h-4 w-4" />}
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Button>
              </Link>
            )
          })}
        </div>

        {/* Menu Direito */}
        <div className="flex items-center gap-2">
          {status === "loading" ? (
            <div className="h-10 w-32 animate-pulse rounded-lg bg-muted" />
          ) : session?.user ? (
            <>
              {/* Saldo */}
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => router.push("/wallet")}
                  className="hidden sm:flex gap-2 border-primary/20 hover:border-primary/40 hover:bg-primary/5"
                >
                  <Wallet className="h-4 w-4 text-green-500" />
                  <span className="font-semibold">{formatCurrency(session.user.balance || 0)}</span>
                </Button>
              </motion.div>

              {/* Carrinho */}
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => router.push("/cart")}
                  className="relative"
                >
                  <ShoppingCart className="h-5 w-5" />
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
                    0
                  </Badge>
                </Button>
              </motion.div>

              {/* Menu do Usuário */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="gap-2 hover:bg-primary/5">
                    <Avatar className="h-8 w-8 ring-2 ring-primary/20">
                      <AvatarImage src={session.user.avatar} alt={session.user.username} />
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {session.user.username[0].toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <span className="hidden sm:inline-block font-medium">{session.user.username}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-background/95 backdrop-blur-xl">
                  <DropdownMenuLabel className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-primary" />
                    Minha Conta
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => router.push("/dashboard")} className="cursor-pointer">
                    <LayoutDashboard className="h-4 w-4 mr-2" />
                    Dashboard
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => router.push("/inventory")} className="cursor-pointer">
                    <Package className="h-4 w-4 mr-2" />
                    Inventário
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => router.push("/wallet")} className="cursor-pointer">
                    <Wallet className="h-4 w-4 mr-2" />
                    Carteira
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => router.push("/settings")} className="cursor-pointer">
                    <Settings className="h-4 w-4 mr-2" />
                    Configurações
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => signOut()} className="cursor-pointer text-red-600">
                    <LogOut className="h-4 w-4 mr-2" />
                    Sair
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={() => router.push("/login")}
                className="gap-2 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg shadow-primary/25"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM8.5 17C6.57 17 5 15.43 5 13.5C5 11.57 6.57 10 8.5 10C10.43 10 12 11.57 12 13.5C12 15.43 10.43 17 8.5 17ZM17 13C15.9 13 15 12.1 15 11C15 9.9 15.9 9 17 9C18.1 9 19 9.9 19 11C19 12.1 18.1 13 17 13Z"/>
                </svg>
                <span className="hidden sm:inline">Login com Steam</span>
                <span className="sm:hidden">Login</span>
              </Button>
            </motion.div>
          )}

          {/* Menu Mobile */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t bg-background/95 backdrop-blur-xl"
          >
            <div className="container py-4 space-y-2">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href} onClick={() => setMobileMenuOpen(false)}>
                  <Button
                    variant={pathname === link.href ? "secondary" : "ghost"}
                    className="w-full justify-start gap-2"
                  >
                    {link.icon && <link.icon className="h-4 w-4" />}
                    {link.label}
                  </Button>
                </Link>
              ))}
              {session?.user && (
                <Button
                  variant="ghost"
                  className="w-full justify-start gap-2"
                  onClick={() => {
                    router.push("/wallet")
                    setMobileMenuOpen(false)
                  }}
                >
                  <Wallet className="h-4 w-4" />
                  Saldo: {formatCurrency(session.user.balance || 0)}
                </Button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

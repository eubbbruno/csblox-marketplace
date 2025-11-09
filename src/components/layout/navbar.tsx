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
          ? "bg-background/95 backdrop-blur-xl border-b shadow-lg shadow-primary/5"
          : "bg-background/80 backdrop-blur-lg border-b border-border/40"
      }`}
    >
      <div className="container flex h-20 items-center justify-between px-4 md:px-6">
        {/* Logo - v3.0 MELHORADO */}
        <Link href="/" className="flex items-center gap-3 md:gap-4 group">
          <motion.div 
            whileHover={{ scale: 1.08, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.3, type: "spring", stiffness: 400 }}
            className="relative"
          >
            {/* 🎨 OPÇÃO 1: Usar sua logo personalizada (descomente e adicione sua logo em /public) */}
            {/* <Image src="/logo.png" alt="CSBlox" width={48} height={48} className="rounded-xl" /> */}
            
            {/* 🎨 OPÇÃO 2: Logo padrão com tema Blox (atual) */}
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 via-red-500 to-pink-500 shadow-xl shadow-orange-500/40 box-card border-2 border-orange-400/50 relative overflow-hidden">
              {/* Efeito de brilho animado */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-tr from-white/30 to-transparent"
                animate={{ 
                  opacity: [0, 0.3, 0],
                  rotate: [0, 180, 360]
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
              <Package className="w-7 h-7 text-white relative z-10 drop-shadow-lg" />
            </div>
            
            {/* Indicador Online pulsante */}
            <motion.div 
              animate={{ 
                scale: [1, 1.3, 1],
                opacity: [1, 0.7, 1]
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-3 border-background shadow-xl shadow-green-500/60"
            >
              <div className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-75" />
            </motion.div>
          </motion.div>
          
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-2xl md:text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-orange-400 via-red-400 to-pink-400 tracking-tight drop-shadow-sm">
                CSBlox
              </span>
              <Badge variant="secondary" className="text-[9px] md:text-[10px] px-1.5 py-0.5 bg-orange-500/20 text-orange-400 border-orange-500/50 font-bold animate-pulse">
                BETA
              </Badge>
            </div>
            <span className="text-[10px] md:text-xs text-muted-foreground font-semibold -mt-0.5 tracking-wide">
              Marketplace CS2
            </span>
          </div>
        </Link>

        {/* Menu Central - Desktop */}
        <div className="hidden lg:flex items-center gap-2">
          {navLinks.map((link) => {
            const isActive = pathname === link.href
            return (
              <Link key={link.href} href={link.href}>
                <motion.div
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    variant={isActive ? "secondary" : "ghost"}
                    size="default"
                    className={`gap-2 relative font-semibold transition-all ${
                      isActive 
                        ? "bg-primary/15 text-primary shadow-md shadow-primary/10" 
                        : "hover:bg-primary/5"
                    }`}
                  >
                    {link.icon && <link.icon className={`h-4 w-4 ${isActive ? 'text-primary' : ''}`} />}
                    {link.label}
                    {isActive && (
                      <motion.div
                        layoutId="navbar-indicator"
                        className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/50 via-primary to-primary/50 rounded-t-full"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </Button>
                </motion.div>
              </Link>
            )
          })}
        </div>

        {/* Menu Direito */}
        <div className="flex items-center gap-2 md:gap-3">
          {status === "loading" ? (
            <div className="h-10 w-32 animate-pulse rounded-lg bg-muted" />
          ) : session?.user ? (
            <>
              {/* Saldo */}
              <motion.div 
                whileHover={{ scale: 1.05, y: -2 }} 
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="outline"
                  size="default"
                  onClick={() => router.push("/wallet")}
                  className="hidden sm:flex gap-2 border-green-500/30 hover:border-green-500/50 hover:bg-green-500/10 font-bold shadow-sm hover:shadow-md hover:shadow-green-500/20 transition-all"
                >
                  <Wallet className="h-4 w-4 text-green-500" />
                  <span className="text-green-500">{formatCurrency(session.user.balance || 0)}</span>
                </Button>
              </motion.div>

              {/* Carrinho */}
              <motion.div 
                whileHover={{ scale: 1.05, y: -2 }} 
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => router.push("/cart")}
                  className="relative border-primary/20 hover:border-primary/40 hover:bg-primary/10"
                >
                  <ShoppingCart className="h-5 w-5" />
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-primary text-primary-foreground animate-pulse">
                    0
                  </Badge>
                </Button>
              </motion.div>

              {/* Menu do Usuário */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button variant="ghost" size="default" className="gap-2 md:gap-3 hover:bg-primary/10 transition-all">
                      <Avatar className="h-9 w-9 ring-2 ring-primary/30 hover:ring-primary/50 transition-all">
                        <AvatarImage src={session.user.avatar} alt={session.user.username} />
                        <AvatarFallback className="bg-gradient-to-br from-primary/20 to-primary/10 text-primary font-bold">
                          {session.user.username[0].toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <span className="hidden md:inline-block font-semibold">{session.user.username}</span>
                    </Button>
                  </motion.div>
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
            <motion.div 
              whileHover={{ scale: 1.05, y: -2 }} 
              whileTap={{ scale: 0.95 }}
            >
              <Button
                onClick={() => router.push("/login")}
                size="default"
                className="gap-2 bg-gradient-to-r from-primary via-primary/90 to-primary/80 hover:from-primary/90 hover:via-primary/80 hover:to-primary/70 shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transition-all font-bold"
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
            className="lg:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
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

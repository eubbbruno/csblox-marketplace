"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Package, Store, Dices, Wallet, HelpCircle, FileText, Shield, Mail, Facebook, Twitter, Instagram, MessageCircle } from "lucide-react"

export function Footer() {
  const footerLinks = {
    marketplace: [
      { label: "Marketplace", href: "/marketplace", icon: Store },
      { label: "Rifas", href: "/raffles", icon: Dices },
      { label: "Vender Skins", href: "/sell", icon: Package },
      { label: "Meu Inventário", href: "/inventory", icon: Package },
    ],
    account: [
      { label: "Carteira", href: "/wallet", icon: Wallet },
      { label: "Meus Pedidos", href: "/orders", icon: FileText },
      { label: "Configurações", href: "/settings", icon: Shield },
    ],
    support: [
      { label: "Como Funciona", href: "/how-it-works", icon: HelpCircle },
      { label: "Central de Ajuda", href: "/help", icon: HelpCircle },
      { label: "FAQ", href: "/help#faq", icon: HelpCircle },
      { label: "Contato", href: "/help#contact", icon: Mail },
    ],
    legal: [
      { label: "Termos de Uso", href: "/terms" },
      { label: "Política de Privacidade", href: "/privacy" },
      { label: "Política de Reembolso", href: "/refund" },
    ],
  }

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook", color: "hover:text-blue-500" },
    { icon: Twitter, href: "#", label: "Twitter", color: "hover:text-sky-400" },
    { icon: Instagram, href: "#", label: "Instagram", color: "hover:text-pink-500" },
    { icon: MessageCircle, href: "#", label: "Discord", color: "hover:text-indigo-400" },
  ]

  return (
    <footer className="relative bg-gradient-to-b from-black via-gray-900 to-black border-t border-gray-800 pt-16 pb-8">
      {/* Decorative Top Border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4 group">
              <motion.div
                whileHover={{ scale: 1.05, rotateY: 180 }}
                transition={{ duration: 0.3 }}
                className="relative"
                style={{ transformStyle: "preserve-3d" }}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-md bg-gradient-to-br from-orange-500 to-red-500 shadow-lg shadow-orange-500/25 box-card border border-orange-400/30">
                  <Package className="w-6 h-6 text-white" />
                </div>
              </motion.div>
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-red-400">
                CSBlox
              </span>
            </Link>
            
            <p className="text-gray-400 mb-6 leading-relaxed">
              O marketplace mais seguro e rápido para comprar, vender e trocar skins de CS2. 
              Transações instantâneas via PIX com as menores taxas do mercado.
            </p>

            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-10 h-10 rounded-lg bg-gray-800/50 border border-gray-700 flex items-center justify-center text-gray-400 transition-colors ${social.color}`}
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Marketplace Links */}
          <div>
            <h3 className="text-white font-bold mb-4 flex items-center gap-2">
              <Store className="w-5 h-5 text-purple-400" />
              Marketplace
            </h3>
            <ul className="space-y-3">
              {footerLinks.marketplace.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-purple-400 transition-colors flex items-center gap-2 group"
                  >
                    <motion.span
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                      initial={{ x: -5 }}
                      whileHover={{ x: 0 }}
                    >
                      →
                    </motion.span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Account Links */}
          <div>
            <h3 className="text-white font-bold mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5 text-purple-400" />
              Conta
            </h3>
            <ul className="space-y-3">
              {footerLinks.account.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-purple-400 transition-colors flex items-center gap-2 group"
                  >
                    <motion.span
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                      initial={{ x: -5 }}
                      whileHover={{ x: 0 }}
                    >
                      →
                    </motion.span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-white font-bold mb-4 flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-purple-400" />
              Suporte
            </h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-purple-400 transition-colors flex items-center gap-2 group"
                  >
                    <motion.span
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                      initial={{ x: -5 }}
                      whileHover={{ x: 0 }}
                    >
                      →
                    </motion.span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <div className="text-center md:text-left">
              <p className="text-gray-500 text-sm">
                © {new Date().getFullYear()} CSBlox. Todos os direitos reservados.
              </p>
              <p className="text-gray-600 text-xs mt-1">
                Counter-Strike é marca registrada da Valve Corporation.
              </p>
            </div>

            {/* Legal Links */}
            <div className="flex flex-wrap justify-center gap-6">
              {footerLinks.legal.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-gray-500 hover:text-gray-300 text-sm transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Trust Badges */}
          <div className="mt-6 flex flex-wrap justify-center items-center gap-6 text-xs text-gray-600">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-green-500" />
              <span>SSL Seguro</span>
            </div>
            <div className="flex items-center gap-2">
              <Package className="w-4 h-4 text-blue-500" />
              <span>API Steam Oficial</span>
            </div>
            <div className="flex items-center gap-2">
              <Wallet className="w-4 h-4 text-purple-500" />
              <span>PIX Instantâneo</span>
            </div>
          </div>
        </div>
      </div>

      {/* Animated Background Pattern */}
      <div className="absolute bottom-0 left-0 right-0 h-32 opacity-5 pointer-events-none">
        <motion.div
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="w-full h-full box-pattern"
        />
      </div>
    </footer>
  )
}


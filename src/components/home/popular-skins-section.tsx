"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { SectionTitle } from "@/components/common/section-title"
import { SkinCard } from "@/components/common/skin-card"
import { LoadingState } from "@/components/common/loading-state"
import { Store, ArrowRight, TrendingUp } from "lucide-react"
import Link from "next/link"

export function PopularSkinsSection() {
  const [skins, setSkins] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPopularSkins = async () => {
      try {
        // Mock data - substituir por API real
        const mockSkins = [
          {
            id: "1",
            name: "AK-47 | Redline",
            image: "https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot7HxfDhjxszJemkV09-5lpKKqPrxN7LEmyVQ7MEpiLuSrYmnjQO3-UdsZGHyd4_Bd1RvNQ7T_FDrw-_og8O46oOJlyU6Qxr5Vg",
            rarity: "CLASSIFIED",
            exterior: "FIELD_TESTED",
            float: 0.25,
            price: 245.50,
            steamPrice: 280.00,
            discount: 12,
            isStatTrak: false,
            isSouvenir: false,
            seller: {
              username: "ProTrader",
              reputation: 4.8,
            },
            views: 1234,
            favorites: 89,
          },
          {
            id: "2",
            name: "AWP | Dragon Lore",
            image: "https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot621FAR17PLfYQJD_9W7m5a0mvLwOq7c2G5S7ctlmdbN_Iv9nBrsqUBkMGD6JYGVdw85ZgrYrFG_w7vrgJe46p_MnXdhvCF04nyPnRGpwUYb5TqkMrQ",
            rarity: "COVERT",
            exterior: "FACTORY_NEW",
            float: 0.01,
            price: 14500.00,
            steamPrice: 16000.00,
            discount: 9,
            isStatTrak: false,
            isSouvenir: true,
            seller: {
              username: "LegendSeller",
              reputation: 5.0,
            },
            views: 5678,
            favorites: 456,
          },
          {
            id: "3",
            name: "Karambit | Fade",
            image: "https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpovbSsLQJf2PLacDBA5ciJlY20kfb5NqjYg3tu5Mx2gv2P8dqg3FLk-kdqYW-hI9SQJgBqMlGE8gW9xu7pjJC4vZWazXtm7idw7X6IgVXp1jw1BKY9",
            rarity: "COVERT",
            exterior: "FACTORY_NEW",
            float: 0.01,
            price: 2350.00,
            steamPrice: 2500.00,
            discount: 6,
            seller: {
              username: "KnifeKing",
              reputation: 4.9,
            },
            views: 3456,
            favorites: 234,
          },
          {
            id: "4",
            name: "M4A4 | Howl",
            image: "https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou-6kejhjxszFJTwW09izh5SEhfLLP7LWnn8fvpFw3-yXo42tigHt_hA4NWr0cNXEdAY6ZVCGrAC6k-fu0cO-v8_LnHU3vyIm7HqJgVXp1jw1BKY9",
            rarity: "CONTRABAND",
            exterior: "MINIMAL_WEAR",
            float: 0.08,
            price: 8900.00,
            steamPrice: 9500.00,
            discount: 6,
            seller: {
              username: "RareCollector",
              reputation: 4.7,
            },
            views: 2345,
            favorites: 178,
          },
          {
            id: "5",
            name: "Glock-18 | Fade",
            image: "https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgposbaqKAxf0Ob3djFN79fnzL-YkuP1Nq7cqWdQ-sJ0teXI8oThxlDh8hs4a2GlLNWVJFI4YFrQ-gK8k-vxxcjr3V7Beg",
            rarity: "RESTRICTED",
            exterior: "FACTORY_NEW",
            float: 0.01,
            price: 420.00,
            steamPrice: 450.00,
            discount: 7,
            isStatTrak: true,
            seller: {
              username: "FastSeller",
              reputation: 4.6,
            },
            views: 890,
            favorites: 67,
          },
          {
            id: "6",
            name: "M4A1-S | Icarus Fell",
            image: "https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpou-6kejhz2v_Nfz5H_uO1gb-Gw_alIITCmX5d_MR6j-3I4IG7jVWx-0JrYGGhJYSRdAU6YFrS_gO9w-3u0Ja06ZzKnXI3uCQ8pSGKRXp6Gxw",
            rarity: "RESTRICTED",
            exterior: "FACTORY_NEW",
            float: 0.02,
            price: 330.00,
            steamPrice: 350.00,
            discount: 6,
            isStatTrak: true,
            seller: {
              username: "QuickTrade",
              reputation: 4.5,
            },
            views: 765,
            favorites: 54,
          },
          {
            id: "7",
            name: "USP-S | Kill Confirmed",
            image: "https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpoo6m1FBRp3_bGcjhQ09-jq5WYh8jiPLfFl2xU18h0juDU-MKt2wW3-ENkZGGmJYGQdVQ9ZF_T_lC7w-3rhp-86ZzLnXZh7nF05HzfnRWx1RhMaLJxxavJVxzAUKBRUvKN",
            rarity: "CLASSIFIED",
            exterior: "MINIMAL_WEAR",
            float: 0.12,
            price: 175.00,
            steamPrice: 180.00,
            discount: 3,
            isStatTrak: true,
            seller: {
              username: "BestDeals",
              reputation: 4.8,
            },
            views: 654,
            favorites: 43,
          },
          {
            id: "8",
            name: "Desert Eagle | Blaze",
            image: "https://community.cloudflare.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgposr-kLAtl7PLZTjlH_9mkgIWKkPvxDLDEm2JS4Mp1mOjG-LP5gVO8v11uNzykI4WRdgRvZQzZ_1K8wbvpgJ-66ZrJm3Uw7nMn5HvYyRLiiU5SLrs4qVgDwA",
            rarity: "RESTRICTED",
            exterior: "FACTORY_NEW",
            float: 0.01,
            price: 610.00,
            steamPrice: 650.00,
            discount: 6,
            seller: {
              username: "TopSeller",
              reputation: 4.9,
            },
            views: 543,
            favorites: 38,
          },
        ]
        
        setTimeout(() => {
          setSkins(mockSkins)
          setLoading(false)
        }, 1000)
      } catch (error) {
        console.error("Error fetching popular skins:", error)
        setLoading(false)
      }
    }

    fetchPopularSkins()
  }, [])

  return (
    <section className="py-20 px-6 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 box-pattern opacity-5" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <SectionTitle
          badge="MAIS VENDIDOS"
          badgeIcon={TrendingUp}
          title="🔥 Skins Populares"
          description="As skins mais procuradas do marketplace com os melhores preços"
          gradient="from-purple-400 via-pink-400 to-purple-400"
        />

        {loading ? (
          <LoadingState type="grid" count={8} />
        ) : (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {skins.map((skin, i) => (
                <motion.div
                  key={skin.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                >
                  <SkinCard skin={skin} variant="compact" />
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <Link href="/marketplace">
                <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold px-8">
                  <Store className="w-5 h-5 mr-2" />
                  Ver Marketplace Completo
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </motion.div>
          </>
        )}
      </div>
    </section>
  )
}


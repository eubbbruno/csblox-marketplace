import { NextAuthOptions } from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/lib/db"

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as any,
  providers: [
    {
      id: "steam",
      name: "Steam",
      type: "oauth",
      authorization: {
        url: "https://steamcommunity.com/openid/login",
        params: {
          "openid.ns": "http://specs.openid.net/auth/2.0",
          "openid.mode": "checkid_setup",
          "openid.return_to": `${process.env.NEXTAUTH_URL}/api/auth/callback/steam`,
          "openid.realm": process.env.NEXTAUTH_URL!,
          "openid.identity": "http://specs.openid.net/auth/2.0/identifier_select",
          "openid.claimed_id": "http://specs.openid.net/auth/2.0/identifier_select",
        },
      },
      idToken: false,
      checks: ["none"],
      clientId: "openid",
      clientSecret: process.env.STEAM_API_KEY!,
      client: {
        id: "openid",
      },
      profile(profile: any) {
        return {
          id: profile.steamid,
          steamId: profile.steamid,
          username: profile.personaname,
          avatar: profile.avatarfull,
          profileUrl: profile.profileurl,
        }
      },
    },
  ],
  callbacks: {
    async signIn({ user, account, profile }: any) {
      if (account?.provider === "steam") {
        try {
          // Buscar ou criar usuário
          const steamId = user.steamId
          const existingUser = await prisma.user.findUnique({
            where: { steamId },
          })

          if (!existingUser) {
            await prisma.user.create({
              data: {
                steamId,
                username: user.username,
                avatar: user.avatar,
                profileUrl: user.profileUrl,
                lastLoginAt: new Date(),
              },
            })
          } else {
            await prisma.user.update({
              where: { steamId },
              data: {
                username: user.username,
                avatar: user.avatar,
                lastLoginAt: new Date(),
              },
            })
          }
          return true
        } catch (error) {
          console.error("Error in signIn callback:", error)
          return false
        }
      }
      return true
    },
    async session({ session, token }: any) {
      if (token?.sub) {
        const user = await prisma.user.findUnique({
          where: { steamId: token.sub },
          select: {
            id: true,
            steamId: true,
            username: true,
            avatar: true,
            profileUrl: true,
            balance: true,
            role: true,
            status: true,
          },
        })
        
        if (user) {
          session.user = {
            ...user,
            balance: Number(user.balance),
          }
        }
      }
      return session
    },
    async jwt({ token, user }: any) {
      if (user) {
        token.sub = user.steamId
      }
      return token
    },
  },
  pages: {
    signIn: "/login",
    error: "/auth/error",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
}


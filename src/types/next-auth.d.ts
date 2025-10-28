import NextAuth from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      steamId: string
      username: string
      avatar: string
      profileUrl: string
      balance: number
      role: string
      status: string
    }
  }

  interface User {
    id: string
    steamId: string
    username: string
    avatar: string
    profileUrl: string
    balance?: number
    role?: string
    status?: string
  }
}


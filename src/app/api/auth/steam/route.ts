import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

// Esta é uma implementação simplificada para desenvolvimento
// Em produção, use a biblioteca completa do Steam OpenID

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  
  // Simular login para desenvolvimento
  // Em produção, implemente a validação correta do Steam
  const mockSteamId = '76561198000000000'
  const mockUsername = 'TestUser'
  const mockAvatar = 'https://avatars.steamstatic.com/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb_full.jpg'
  
  try {
    // Buscar ou criar usuário
    let user = await prisma.user.findUnique({
      where: { steamId: mockSteamId }
    })
    
    if (!user) {
      user = await prisma.user.create({
        data: {
          steamId: mockSteamId,
          username: mockUsername,
          avatar: mockAvatar,
          profileUrl: `https://steamcommunity.com/profiles/${mockSteamId}`,
        }
      })
    } else {
      // Atualizar último login
      await prisma.user.update({
        where: { id: user.id },
        data: { lastLoginAt: new Date() }
      })
    }
    
    // Em produção, você deve configurar a sessão com NextAuth aqui
    // Por enquanto, apenas redirecionar para o dashboard
    return NextResponse.redirect(new URL('/dashboard', request.url))
  } catch (error) {
    console.error('Auth error:', error)
    return NextResponse.redirect(new URL('/login?error=auth', request.url))
  }
}


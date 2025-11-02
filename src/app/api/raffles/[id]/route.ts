import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

// GET /api/raffles/[id] - Detalhes de uma rifa
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const raffle = await prisma.raffle.findUnique({
      where: { id },
      include: {
        creator: {
          select: {
            id: true,
            username: true,
            avatar: true,
            reputation: true,
            totalSales: true,
          },
        },
        entries: {
          include: {
            user: {
              select: {
                id: true,
                username: true,
                avatar: true,
              },
            },
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
        winner: {
          select: {
            id: true,
            username: true,
            avatar: true,
          },
        },
      },
    })

    if (!raffle) {
      return NextResponse.json(
        { error: 'Rifa não encontrada' },
        { status: 404 }
      )
    }

    // Incrementar views
    await prisma.raffle.update({
      where: { id },
      data: { views: { increment: 1 } },
    })

    // Calcular números vendidos
    const soldNumbers = new Set<number>()
    raffle.entries.forEach(entry => {
      entry.tickets.forEach(ticket => soldNumbers.add(ticket))
    })

    // Estatísticas
    const uniqueParticipants = new Set(raffle.entries.map(e => e.userId)).size
    const progressPercentage = (raffle.soldTickets / raffle.totalTickets) * 100
    const timeRemaining = raffle.endDate.getTime() - Date.now()

    return NextResponse.json({
      success: true,
      raffle: {
        ...raffle,
        soldNumbers: Array.from(soldNumbers).sort((a, b) => a - b),
        participants: uniqueParticipants,
        progressPercentage: Math.round(progressPercentage),
        remainingTickets: raffle.totalTickets - raffle.soldTickets,
        timeRemaining: Math.max(0, timeRemaining),
      },
    })
  } catch (error) {
    console.error('Error fetching raffle:', error)
    return NextResponse.json(
      { error: 'Erro ao buscar rifa' },
      { status: 500 }
    )
  }
}


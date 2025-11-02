import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

// POST /api/raffles/[id]/draw - Executar sorteio
export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    // Buscar rifa
    const raffle = await prisma.raffle.findUnique({
      where: { id },
      include: {
        entries: true,
      },
    })

    if (!raffle) {
      return NextResponse.json(
        { error: 'Rifa não encontrada' },
        { status: 404 }
      )
    }

    // Validações
    if (raffle.status !== 'DRAWING') {
      return NextResponse.json(
        { error: 'Esta rifa não está pronta para sorteio' },
        { status: 400 }
      )
    }

    if (raffle.drawDate && new Date() < raffle.drawDate) {
      return NextResponse.json(
        { error: 'Aguarde o countdown terminar' },
        { status: 400 }
      )
    }

    if (raffle.soldTickets < raffle.totalTickets) {
      return NextResponse.json(
        { error: 'Nem todos os números foram vendidos' },
        { status: 400 }
      )
    }

    // Sortear número aleatório
    const winnerTicket = Math.floor(Math.random() * raffle.totalTickets) + 1

    // Encontrar o ganhador
    const winnerEntry = raffle.entries.find((entry: any) => 
      entry.tickets.includes(winnerTicket)
    )

    if (!winnerEntry) {
      return NextResponse.json(
        { error: 'Erro ao encontrar ganhador' },
        { status: 500 }
      )
    }

    // Atualizar rifa e entry do ganhador
    const result = await prisma.$transaction(async (tx: any) => {
      // Atualizar rifa
      const updatedRaffle = await tx.raffle.update({
        where: { id: raffle.id },
        data: {
          status: 'COMPLETED',
          winnerId: winnerEntry.userId,
          winnerTicket,
          completedAt: new Date(),
        },
        include: {
          winner: {
            select: {
              id: true,
              username: true,
              avatar: true,
            },
          },
        },
      })

      // Marcar entry como vencedora
      await tx.raffleEntry.update({
        where: { id: winnerEntry.id },
        data: { isWinner: true },
      })

      // Criar notificação para o ganhador
      await tx.notification.create({
        data: {
          userId: winnerEntry.userId,
          type: 'SYSTEM',
          title: '🎉 Você ganhou uma rifa!',
          message: `Parabéns! Você ganhou a rifa de ${raffle.skinName}! Número sorteado: ${winnerTicket}`,
          link: `/raffles/${raffle.id}`,
        },
      })

      // Criar notificações para todos os participantes
      const participantIds = [...new Set(raffle.entries.map((e: any) => e.userId))]
      const notifications = participantIds
        .filter((id: string) => id !== winnerEntry.userId)
        .map((userId: string) => ({
          userId,
          type: 'SYSTEM' as const,
          title: 'Rifa finalizada',
          message: `A rifa de ${raffle.skinName} foi finalizada. Número sorteado: ${winnerTicket}`,
          link: `/raffles/${raffle.id}`,
        }))

      if (notifications.length > 0) {
        await tx.notification.createMany({
          data: notifications,
        })
      }

      return updatedRaffle
    })

    return NextResponse.json({
      success: true,
      raffle: result,
      winnerTicket,
      message: 'Sorteio realizado com sucesso!',
    })
  } catch (error) {
    console.error('Error drawing raffle:', error)
    return NextResponse.json(
      { error: 'Erro ao realizar sorteio' },
      { status: 500 }
    )
  }
}


import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

// POST /api/raffles/[id]/buy - Comprar números
export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const { userId, ticketCount } = body

    if (!userId || !ticketCount) {
      return NextResponse.json(
        { error: 'Dados obrigatórios faltando' },
        { status: 400 }
      )
    }

    if (ticketCount < 1 || ticketCount > 100) {
      return NextResponse.json(
        { error: 'Quantidade de números inválida (1-100)' },
        { status: 400 }
      )
    }

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
    if (raffle.status !== 'ACTIVE') {
      return NextResponse.json(
        { error: 'Esta rifa não está mais ativa' },
        { status: 400 }
      )
    }

    if (raffle.creatorId === userId) {
      return NextResponse.json(
        { error: 'Você não pode comprar números da sua própria rifa' },
        { status: 400 }
      )
    }

    if (new Date() > raffle.endDate) {
      return NextResponse.json(
        { error: 'Esta rifa já expirou' },
        { status: 400 }
      )
    }

    const remainingTickets = raffle.totalTickets - raffle.soldTickets
    if (ticketCount > remainingTickets) {
      return NextResponse.json(
        { error: `Apenas ${remainingTickets} números disponíveis` },
        { status: 400 }
      )
    }

    // Verificar saldo do usuário
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { balance: true },
    })

    if (!user) {
      return NextResponse.json(
        { error: 'Usuário não encontrado' },
        { status: 404 }
      )
    }

    const totalAmount = parseFloat(raffle.ticketPrice.toString()) * ticketCount

    if (parseFloat(user.balance.toString()) < totalAmount) {
      return NextResponse.json(
        { error: 'Saldo insuficiente' },
        { status: 400 }
      )
    }

    // Gerar números aleatórios disponíveis
    const soldNumbers = new Set<number>()
    raffle.entries.forEach((entry: any) => {
      entry.tickets.forEach((ticket: number) => soldNumbers.add(ticket))
    })

    const availableNumbers: number[] = []
    for (let i = 1; i <= raffle.totalTickets; i++) {
      if (!soldNumbers.has(i)) {
        availableNumbers.push(i)
      }
    }

    // Selecionar números aleatórios
    const selectedTickets: number[] = []
    for (let i = 0; i < ticketCount; i++) {
      const randomIndex = Math.floor(Math.random() * availableNumbers.length)
      selectedTickets.push(availableNumbers[randomIndex])
      availableNumbers.splice(randomIndex, 1)
    }

    selectedTickets.sort((a, b) => a - b)

    // Transação: Criar entry e atualizar saldos
    const result = await prisma.$transaction(async (tx) => {
      // Criar entry
      const entry = await tx.raffleEntry.create({
        data: {
          raffleId: raffle.id,
          userId,
          tickets: selectedTickets,
          ticketCount,
          amount: totalAmount,
        },
      })

      // Atualizar rifa
      await tx.raffle.update({
        where: { id: raffle.id },
        data: {
          soldTickets: { increment: ticketCount },
        },
      })

      // Debitar do comprador
      await tx.user.update({
        where: { id: userId },
        data: {
          balance: { decrement: totalAmount },
        },
      })

      // Creditar ao criador (95% - 5% de taxa)
      const creatorAmount = totalAmount * 0.95
      await tx.user.update({
        where: { id: raffle.creatorId },
        data: {
          balance: { increment: creatorAmount },
        },
      })

      return entry
    })

    // Verificar se todos os números foram vendidos
    const updatedRaffle = await prisma.raffle.findUnique({
      where: { id: raffle.id },
      select: { soldTickets: true, totalTickets: true },
    })

    if (updatedRaffle && updatedRaffle.soldTickets >= updatedRaffle.totalTickets) {
      // Iniciar sorteio (60 segundos)
      const drawDate = new Date()
      drawDate.setSeconds(drawDate.getSeconds() + 60)

      await prisma.raffle.update({
        where: { id: raffle.id },
        data: {
          status: 'DRAWING',
          drawDate,
        },
      })
    }

    return NextResponse.json({
      success: true,
      entry: result,
      tickets: selectedTickets,
      message: `${ticketCount} número(s) comprado(s) com sucesso!`,
    })
  } catch (error) {
    console.error('Error buying tickets:', error)
    return NextResponse.json(
      { error: 'Erro ao comprar números' },
      { status: 500 }
    )
  }
}


import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

// GET /api/raffles - Listar rifas ativas
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status') || 'ACTIVE'
    const limit = parseInt(searchParams.get('limit') || '20')
    const page = parseInt(searchParams.get('page') || '1')
    const skip = (page - 1) * limit

    const raffles = await prisma.raffle.findMany({
      where: {
        status: status as any,
        endDate: {
          gte: new Date(), // Apenas rifas que ainda não expiraram
        },
      },
      include: {
        creator: {
          select: {
            id: true,
            username: true,
            avatar: true,
            reputation: true,
          },
        },
        entries: {
          select: {
            userId: true,
            ticketCount: true,
          },
        },
        _count: {
          select: {
            entries: true,
          },
        },
      },
      orderBy: [
        { status: 'asc' },
        { endDate: 'asc' },
      ],
      take: limit,
      skip,
    })

    // Calcular estatísticas para cada rifa
    const rafflesWithStats = raffles.map(raffle => {
      const uniqueParticipants = new Set(raffle.entries.map(e => e.userId)).size
      const progressPercentage = (raffle.soldTickets / raffle.totalTickets) * 100

      return {
        ...raffle,
        participants: uniqueParticipants,
        progressPercentage: Math.round(progressPercentage),
        remainingTickets: raffle.totalTickets - raffle.soldTickets,
        timeRemaining: raffle.endDate.getTime() - Date.now(),
      }
    })

    const total = await prisma.raffle.count({
      where: {
        status: status as any,
        endDate: {
          gte: new Date(),
        },
      },
    })

    return NextResponse.json({
      success: true,
      raffles: rafflesWithStats,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error('Error fetching raffles:', error)
    return NextResponse.json(
      { error: 'Erro ao buscar rifas' },
      { status: 500 }
    )
  }
}

// POST /api/raffles - Criar nova rifa
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const {
      userId,
      skinName,
      skinImage,
      skinRarity,
      skinExterior,
      skinFloat,
      skinStatTrak,
      skinSouvenir,
      totalTickets,
      ticketPrice,
      duration, // em horas
      description,
    } = body

    // Validações
    if (!userId || !skinName || !skinImage || !skinRarity) {
      return NextResponse.json(
        { error: 'Dados obrigatórios faltando' },
        { status: 400 }
      )
    }

    if (![50, 100, 200, 500].includes(totalTickets)) {
      return NextResponse.json(
        { error: 'Total de tickets inválido. Deve ser 50, 100, 200 ou 500' },
        { status: 400 }
      )
    }

    if (ticketPrice < 1 || ticketPrice > 1000) {
      return NextResponse.json(
        { error: 'Preço do ticket deve estar entre R$ 1,00 e R$ 1.000,00' },
        { status: 400 }
      )
    }

    // Verificar saldo do usuário (deve ter pelo menos 10% do valor total como garantia)
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

    const totalValue = totalTickets * ticketPrice
    const requiredBalance = totalValue * 0.1 // 10% de garantia

    if (parseFloat(user.balance.toString()) < requiredBalance) {
      return NextResponse.json(
        { error: `Saldo insuficiente. Necessário pelo menos R$ ${requiredBalance.toFixed(2)} de garantia` },
        { status: 400 }
      )
    }

    // Calcular data de término
    const endDate = new Date()
    endDate.setHours(endDate.getHours() + duration)

    // Criar rifa
    const raffle = await prisma.raffle.create({
      data: {
        creatorId: userId,
        skinName,
        skinImage,
        skinRarity,
        skinExterior: skinExterior || null,
        skinFloat: skinFloat || null,
        skinStatTrak: skinStatTrak || false,
        skinSouvenir: skinSouvenir || false,
        totalTickets,
        ticketPrice,
        totalValue,
        endDate,
        description: description || null,
      },
      include: {
        creator: {
          select: {
            id: true,
            username: true,
            avatar: true,
          },
        },
      },
    })

    return NextResponse.json({
      success: true,
      raffle,
      message: 'Rifa criada com sucesso!',
    })
  } catch (error) {
    console.error('Error creating raffle:', error)
    return NextResponse.json(
      { error: 'Erro ao criar rifa' },
      { status: 500 }
    )
  }
}


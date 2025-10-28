import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

// Mercado Pago SDK
// npm install mercadopago

const MP_ACCESS_TOKEN = process.env.MERCADOPAGO_ACCESS_TOKEN

interface CreatePaymentRequest {
  amount: number
  userId: string
  description: string
  type: 'DEPOSIT' | 'PURCHASE'
  itemId?: string
}

export async function POST(request: Request) {
  try {
    const body: CreatePaymentRequest = await request.json()
    const { amount, userId, description, type, itemId } = body
    
    // Validações
    if (!amount || amount <= 0) {
      return NextResponse.json(
        { error: 'Valor inválido' },
        { status: 400 }
      )
    }
    
    if (!userId) {
      return NextResponse.json(
        { error: 'Usuário não identificado' },
        { status: 400 }
      )
    }
    
    // Verificar se está em modo de desenvolvimento
    if (!MP_ACCESS_TOKEN) {
      // Retornar pagamento mock para desenvolvimento
      const mockPayment = await createMockPayment(body)
      return NextResponse.json(mockPayment)
    }
    
    // Em produção, usar SDK do Mercado Pago
    // const mercadopago = require('mercadopago')
    // mercadopago.configure({ access_token: MP_ACCESS_TOKEN })
    
    // const payment = await mercadopago.payment.create({
    //   transaction_amount: amount,
    //   description: description,
    //   payment_method_id: 'pix',
    //   payer: {
    //     email: user.email,
    //     first_name: user.username
    //   }
    // })
    
    // Por enquanto, retornar mock
    const mockPayment = await createMockPayment(body)
    return NextResponse.json(mockPayment)
    
  } catch (error) {
    console.error('Erro ao criar pagamento:', error)
    return NextResponse.json(
      { error: 'Erro ao processar pagamento' },
      { status: 500 }
    )
  }
}

async function createMockPayment(data: CreatePaymentRequest) {
  const { amount, userId, description, type } = data
  
  // Criar transação no banco de dados
  const transaction = await prisma.transaction.create({
    data: {
      userId,
      type,
      amount,
      status: 'PENDING',
      paymentMethod: 'PIX',
      description,
      metadata: {
        mock: true
      }
    }
  })
  
  // Gerar QR Code PIX mock
  const pixCode = generateMockPixCode(amount)
  
  return {
    success: true,
    transactionId: transaction.id,
    amount,
    status: 'PENDING',
    pixCode,
    qrCodeData: pixCode,
    qrCodeBase64: await generateQRCodeBase64(pixCode),
    expiresAt: new Date(Date.now() + 30 * 60 * 1000), // 30 minutos
    instructions: [
      'Abra o app do seu banco',
      'Escolha pagar via Pix',
      'Escaneie o QR Code ou copie o código',
      'Confirme o pagamento',
      'Aguarde a confirmação automática'
    ]
  }
}

function generateMockPixCode(amount: number): string {
  // Gerar código PIX mock (em produção, virá do Mercado Pago)
  const timestamp = Date.now()
  const random = Math.random().toString(36).substring(7)
  return `00020126580014br.gov.bcb.pix0136${random}${timestamp}520400005303986540${amount.toFixed(2)}5802BR5913CSBlox Market6009SAO PAULO62070503***6304${random.toUpperCase()}`
}

async function generateQRCodeBase64(pixCode: string): Promise<string> {
  // Em produção, usar biblioteca QRCode
  // const QRCode = require('qrcode')
  // return await QRCode.toDataURL(pixCode)
  
  // Mock: retornar imagem base64 de exemplo
  return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=='
}

// Webhook para receber notificações do Mercado Pago
export async function PUT(request: Request) {
  try {
    const body = await request.json()
    const { transactionId, status } = body
    
    if (!transactionId) {
      return NextResponse.json(
        { error: 'Transaction ID é obrigatório' },
        { status: 400 }
      )
    }
    
    // Atualizar status da transação
    const transaction = await prisma.transaction.update({
      where: { id: transactionId },
      data: { 
        status,
        completedAt: status === 'COMPLETED' ? new Date() : null
      },
      include: {
        user: true
      }
    })
    
    // Se pagamento foi aprovado, adicionar saldo ao usuário
    if (status === 'COMPLETED' && transaction.type === 'DEPOSIT') {
      await prisma.user.update({
        where: { id: transaction.userId },
        data: {
          balance: {
            increment: transaction.amount
          }
        }
      })
      
      // Aqui você pode enviar email/notificação ao usuário
      console.log(`Saldo adicionado: R$ ${transaction.amount} para ${transaction.user.username}`)
    }
    
    return NextResponse.json({
      success: true,
      transaction
    })
    
  } catch (error) {
    console.error('Erro ao atualizar pagamento:', error)
    return NextResponse.json(
      { error: 'Erro ao atualizar pagamento' },
      { status: 500 }
    )
  }
}

// Verificar status de pagamento
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const transactionId = searchParams.get('transactionId')
  
  if (!transactionId) {
    return NextResponse.json(
      { error: 'Transaction ID é obrigatório' },
      { status: 400 }
    )
  }
  
  try {
    const transaction = await prisma.transaction.findUnique({
      where: { id: transactionId }
    })
    
    if (!transaction) {
      return NextResponse.json(
        { error: 'Transação não encontrada' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({
      success: true,
      status: transaction.status,
      amount: transaction.amount,
      createdAt: transaction.createdAt,
      completedAt: transaction.completedAt
    })
    
  } catch (error) {
    console.error('Erro ao buscar transação:', error)
    return NextResponse.json(
      { error: 'Erro ao buscar transação' },
      { status: 500 }
    )
  }
}


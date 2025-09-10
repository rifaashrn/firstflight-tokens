import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../lib/prisma'
import { generateQRCode } from '../../../lib/qr-code'


export async function POST(request: NextRequest) {
  try {
    const { serviceType } = await request.json()
    const lastToken = await prisma.token.findFirst({
      orderBy: { number: 'desc' },
    })
    const nextNumber = (lastToken?.number || 0) + 1

    const qrData = `Token: ${serviceType}${nextNumber}`
    const qrCodeImage = await generateQRCode(qrData)

    const token = await prisma.token.create({
      data: {
        number: nextNumber,
        serviceType,
        qrCodeData: qrCodeImage,
      },
    })

    return NextResponse.json({ 
      id: token.id, 
      number: nextNumber, 
      serviceType, 
      qrCodeImage 
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create token' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const tokens = await prisma.token.findMany({
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json(tokens)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch tokens' },
      { status: 500 }
    )
  }
}
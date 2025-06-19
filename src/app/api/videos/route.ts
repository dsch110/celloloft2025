import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const etudeId = searchParams.get('etudeId')
  const weekNumber = searchParams.get('week')

  if (!etudeId) {
    return NextResponse.json({ error: 'Etude ID is required' }, { status: 400 })
  }

  const videos = await prisma.video.findMany({
    where: {
      etudeId: parseInt(etudeId),
      ...(weekNumber && { weekNumber: parseInt(weekNumber) })
    },
    orderBy: {
      orderInWeek: 'asc'
    }
  })

  return NextResponse.json(videos)
} 
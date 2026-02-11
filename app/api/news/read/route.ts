import { NextResponse } from 'next/server';
import { requireUser } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  const user = await requireUser();
  const { newsId } = await req.json();
  await prisma.newsRead.upsert({ where: { newsId_userId: { newsId, userId: user.id } }, update: { readAt: new Date() }, create: { newsId, userId: user.id } });
  return NextResponse.json({ ok: true });
}

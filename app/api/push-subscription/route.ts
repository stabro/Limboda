import { NextResponse } from 'next/server';
import { requireUser } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  const user = await requireUser();
  const data = await req.json();
  await prisma.pushSubscription.upsert({ where: { endpoint: data.endpoint }, update: { p256dh: data.keys.p256dh, auth: data.keys.auth, userId: user.id }, create: { endpoint: data.endpoint, p256dh: data.keys.p256dh, auth: data.keys.auth, userId: user.id } });
  await prisma.user.update({ where: { id: user.id }, data: { pushEnabled: true } });
  return NextResponse.json({ ok: true });
}

import { NextResponse } from 'next/server';
import { requireUser } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { audit } from '@/lib/audit';

export async function POST(req: Request) {
  const user = await requireUser(['styrelsen']);
  const form = await req.formData();
  const waterCostPerM3 = Number(form.get('waterCostPerM3'));
  const waterPeriodCost = Number(form.get('waterPeriodCost'));
  await prisma.setting.upsert({ where: { id: 1 }, update: { waterCostPerM3, waterPeriodCost }, create: { id: 1, waterCostPerM3, waterPeriodCost } });
  await audit(user.id, 'update', 'Setting', '1', { waterCostPerM3, waterPeriodCost });
  return NextResponse.redirect(new URL('/settings', req.url));
}

import { NextResponse } from 'next/server';
import { calculateInvoiceAmount, calculatePeriodConsumption } from '@/lib/calc';
import { requireUser } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { audit } from '@/lib/audit';
import fs from 'fs/promises';
import path from 'path';

export async function POST(req: Request) {
  const user = await requireUser();
  const form = await req.formData();
  const readingDate = new Date(String(form.get('readingDate')));
  const meterValue = Number(form.get('meterValue'));
  const address = String(form.get('address'));

  const recent = await prisma.waterReading.findFirst({ where: { houseNumber: user.houseNumber }, orderBy: { submitDate: 'desc' } });
  if (recent && Date.now() - recent.submitDate.getTime() < 20 * 86400000) throw new Error('En avläsning per 20 dagar');
  const periodConsumption = calculatePeriodConsumption(meterValue, recent?.meterValue);
  if (periodConsumption < 0) throw new Error('Negativ förbrukning är inte tillåten');

  const setting = await prisma.setting.upsert({ where: { id: 1 }, update: {}, create: { id: 1 } });
  const invoiceAmount = calculateInvoiceAmount(setting.waterCostPerM3, setting.waterPeriodCost, periodConsumption);

  let imagePath: string | undefined;
  const image = form.get('image');
  if (image instanceof File && image.size > 0) {
    await fs.mkdir(path.join(process.cwd(), 'public', 'uploads'), { recursive: true });
    const fileName = `${Date.now()}_${image.name}`;
    const savePath = path.join(process.cwd(), 'public', 'uploads', fileName);
    await fs.writeFile(savePath, Buffer.from(await image.arrayBuffer()));
    imagePath = `/uploads/${fileName}`;
  }

  const created = await prisma.waterReading.create({ data: { houseNumber: user.houseNumber, address, readingDate, meterValue, periodConsumption, invoiceAmount, imagePath, userId: user.id } });
  await audit(user.id, 'create', 'WaterReading', created.id, created);
  return NextResponse.redirect(new URL('/water', req.url));
}

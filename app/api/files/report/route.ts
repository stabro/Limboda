import { NextResponse } from 'next/server';
import { requireUser } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import PDFDocument from 'pdfkit';

export async function GET() {
  await requireUser(['firmatecknare', 'styrelsen']);
  const latestByHouse = await prisma.waterReading.findMany({ orderBy: [{ houseNumber: 'asc' }, { readingDate: 'desc' }] });
  const seen = new Set<number>();
  const rows = latestByHouse.filter(r => (seen.has(r.houseNumber) ? false : (seen.add(r.houseNumber), true)));
  const doc = new PDFDocument();
  const chunks: Buffer[] = [];
  doc.on('data', (d) => chunks.push(d));
  doc.fontSize(16).text('Vattenavläsning underlag');
  doc.moveDown();
  rows.forEach((r) => doc.fontSize(11).text(`Hus ${r.houseNumber} | Datum ${r.readingDate.toISOString().slice(0, 10)} | Förbrukning ${r.periodConsumption.toFixed(2)} | Belopp ${r.invoiceAmount.toFixed(2)}`));
  doc.end();
  await new Promise((resolve) => doc.on('end', resolve));
  const pdf = Buffer.concat(chunks);
  const date = new Date().toISOString().slice(0,10);
  return new NextResponse(pdf, { headers: { 'Content-Type': 'application/pdf', 'Content-Disposition': `attachment; filename=Vattenavläsning_${date}.pdf` } });
}

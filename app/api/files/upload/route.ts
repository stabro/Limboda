import { NextResponse } from 'next/server';
import { requireUser } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import fs from 'fs/promises';
import path from 'path';

export async function POST(req: Request) {
  const user = await requireUser(['firmatecknare', 'styrelsen']);
  const form = await req.formData();
  const file = form.get('invoice');
  if (!(file instanceof File)) throw new Error('missing file');
  await fs.mkdir(path.join(process.cwd(), 'public', 'uploads'), { recursive: true });
  const fileName = `${Date.now()}_${file.name}`;
  const savePath = path.join(process.cwd(), 'public', 'uploads', fileName);
  await fs.writeFile(savePath, Buffer.from(await file.arrayBuffer()));
  await prisma.invoiceFile.create({ data: { fileName: file.name, filePath: `/uploads/${fileName}`, uploadedBy: user.id } });
  return NextResponse.redirect(new URL('/files', req.url));
}

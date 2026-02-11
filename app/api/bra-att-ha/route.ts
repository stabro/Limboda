import { NextResponse } from 'next/server';
import { requireUser } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { audit } from '@/lib/audit';

export async function POST(req: Request) {
  const user = await requireUser(['styrelsen']);
  const form = await req.formData();
  const deleteId = form.get('deleteId');
  if (deleteId) {
    await prisma.braAttHa.delete({ where: { id: String(deleteId) } });
    await audit(user.id, 'delete', 'BraAttHa', String(deleteId));
  } else {
    const created = await prisma.braAttHa.create({ data: { company: String(form.get('company')), phone: String(form.get('phone')), contactPerson: String(form.get('contactPerson') || ''), customerNumber: String(form.get('customerNumber') || ''), notes: String(form.get('notes') || '') } });
    await audit(user.id, 'create', 'BraAttHa', created.id, created);
  }
  return NextResponse.redirect(new URL('/bra-att-ha', req.url));
}

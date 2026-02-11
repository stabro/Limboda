import { NextResponse } from 'next/server';
import { requireUser } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { audit } from '@/lib/audit';

export async function POST(req: Request) {
  const user = await requireUser(['styrelsen']);
  const form = await req.formData();
  const created = await prisma.news.create({ data: { title: String(form.get('title')), body: String(form.get('body')), category: String(form.get('category')), authorId: user.id } });
  if (created.category === 'viktigt') {
    const subs = await prisma.pushSubscription.findMany();
    await audit(user.id, 'push', 'News', created.id, { deliveredTo: subs.length });
  }
  await audit(user.id, 'create', 'News', created.id, created);
  return NextResponse.redirect(new URL('/news', req.url));
}

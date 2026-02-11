import crypto from 'crypto';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { Role } from '@prisma/client';
import { prisma } from './prisma';

const COOKIE = 'limboda_session';

const hashToken = (v: string) => crypto.createHash('sha256').update(v).digest('hex');

export async function createSession(userId: string) {
  const token = crypto.randomBytes(32).toString('hex');
  await prisma.session.create({ data: { userId, tokenHash: hashToken(token), expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7) } });
  const cookieStore = await cookies();
  cookieStore.set(COOKIE, token, { httpOnly: true, sameSite: 'lax', path: '/' });
}

export async function clearSession() {
  const c = await cookies();
  const token = c.get(COOKIE)?.value;
  if (token) await prisma.session.deleteMany({ where: { tokenHash: hashToken(token) } });
  c.delete(COOKIE);
}

export async function getSessionUser() {
  const c = await cookies();
  const token = c.get(COOKIE)?.value;
  if (!token) return null;
  const session = await prisma.session.findUnique({ where: { tokenHash: hashToken(token) }, include: { user: true } });
  if (!session || session.expiresAt < new Date()) return null;
  return session.user;
}

export async function requireUser(roles?: Role[]) {
  const user = await getSessionUser();
  if (!user) redirect('/login');
  if (roles && !roles.includes(user.role)) redirect('/');
  return user;
}

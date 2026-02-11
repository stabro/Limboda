import { MarkRead } from '@/app/components/mark-read';
import { requireUser } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export default async function NewsDetail({ params }: { params: Promise<{id:string}> }) {
  const user = await requireUser();
  const { id } = await params;
  const n = await prisma.news.findUnique({ where: { id }, include: { reads: { include: { user: true } } } });
  if (!n) return <div>Hittades inte</div>;
  const users = await prisma.user.findMany();
  const readUserIds = new Set(n.reads.map(r=>r.userId));
  return <div className="space-y-3"><MarkRead newsId={n.id} /><h1 className="text-2xl font-bold">{n.title}</h1><p>{n.body}</p>{user.role==='styrelsen'&&n.category==='viktigt'&&<details className="bg-white border p-2"><summary>Läst av {n.reads.length}/{users.length}</summary><div className="grid grid-cols-2 mt-2"><div><h3 className="font-semibold">Läst</h3>{users.filter(u=>readUserIds.has(u.id)).map(u=><p key={u.id}>{u.name}</p>)}</div><div><h3 className="font-semibold">Inte läst</h3>{users.filter(u=>!readUserIds.has(u.id)).map(u=><p key={u.id}>{u.name}</p>)}</div></div></details>}</div>;
}

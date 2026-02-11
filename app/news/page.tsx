import Link from 'next/link';
import { requireUser } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export default async function NewsPage() {
  const user = await requireUser();
  const news = await prisma.news.findMany({ orderBy: { createdAt: 'desc' }, include: { reads: true } });
  const usersCount = await prisma.user.count();
  return <div className="space-y-4"><h1 className="text-2xl font-bold">Nyheter</h1>{user.role==='styrelsen' && <form action="/api/news" method="post" className="bg-white border p-3 max-w-xl space-y-2"><input name="title" className="w-full border p-2" placeholder="Titel" required /><textarea name="body" className="w-full border p-2" placeholder="Text" required/><select name="category" className="border p-2"><option value="info">info</option><option value="viktigt">viktigt</option></select><button className="bg-blue-600 text-white px-3 py-2 rounded">Publicera</button></form>}<ul className="space-y-2">{news.map(n=><li className="bg-white border p-2" key={n.id}><Link href={`/news/${n.id}`} className="font-semibold">{n.title}</Link> <span className="text-xs">({n.category})</span> {user.role==='styrelsen'&&n.category==='viktigt'&&<span className="ml-2 text-xs bg-slate-200 px-2 py-1 rounded">{n.reads.length}/{usersCount}</span>}</li>)}</ul></div>;
}

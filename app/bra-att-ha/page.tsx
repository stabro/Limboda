import { requireUser } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export default async function BraAttHa() {
  const user = await requireUser();
  const rows = await prisma.braAttHa.findMany({ orderBy: { createdAt: 'desc' } });
  return <div className="space-y-4"><h1 className="text-2xl font-bold">Bra att ha</h1>{user.role==='styrelsen'&&<form action="/api/bra-att-ha" method="post" className="bg-white border p-3 grid gap-2 max-w-xl"><input name="company" placeholder="Företag" className="border p-2" required/><input name="phone" placeholder="Telefonnummer" className="border p-2" required/><input name="contactPerson" placeholder="Kontaktperson" className="border p-2"/><input name="customerNumber" placeholder="Kundnummer" className="border p-2"/><textarea name="notes" placeholder="Anteckningar" className="border p-2"/><button className="bg-blue-600 text-white px-3 py-2 rounded">Lägg till</button></form>}<ul className="space-y-2">{rows.map(r=><li key={r.id} className="bg-white border p-3"><p className="font-semibold">{r.company}</p><p>{r.phone}</p><p>{r.contactPerson}</p><p>{r.customerNumber}</p><p>{r.notes}</p>{user.role==='styrelsen'&&<form action="/api/bra-att-ha" method="post"><input type="hidden" name="deleteId" value={r.id}/><button className="text-red-700 text-sm">Ta bort</button></form>}</li>)}</ul></div>;
}

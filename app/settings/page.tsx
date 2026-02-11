import { requireUser } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export default async function Settings() {
  await requireUser(['styrelsen']);
  const s = await prisma.setting.upsert({ where: { id:1 }, update: {}, create: { id: 1 } });
  return <form action="/api/settings" method="post" className="max-w-sm space-y-2"><h1 className="text-2xl font-bold">Prisinställningar</h1><label>WaterCostPerM3<input name="waterCostPerM3" defaultValue={s.waterCostPerM3} className="w-full border p-2"/></label><label>WaterPeriodCost<input name="waterPeriodCost" defaultValue={s.waterPeriodCost} className="w-full border p-2"/></label><button className="bg-blue-600 text-white px-3 py-2 rounded">Spara</button></form>;
}

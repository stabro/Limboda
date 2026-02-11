import { requireUser } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export default async function WaterPage() {
  const user = await requireUser();
  const readings = await prisma.waterReading.findMany({ where: { houseNumber: user.houseNumber }, orderBy: { readingDate: 'desc' } });
  const latest = readings[0]?.meterValue;
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Vattenförbrukning för Limboda {user.houseNumber}</h1>
      <form action="/api/water" method="post" encType="multipart/form-data" className="grid grid-cols-1 gap-2 max-w-xl bg-white p-4 border rounded">
        <h2 className="font-semibold">Skicka in vattenavläsning</h2>
        <input name="address" readOnly value={`Limbodavägen ${user.houseNumber}`} className="border p-2" />
        <input type="date" name="readingDate" defaultValue={new Date().toISOString().slice(0,10)} className="border p-2" required />
        <input type="number" step="0.01" name="meterValue" placeholder="Mätarställning" className="border p-2" required />
        <input type="file" name="image" accept="image/*" className="border p-2" />
        <button className="bg-blue-600 text-white px-3 py-2 rounded w-fit">Spara</button>
      </form>
      <table className="w-full bg-white border"><thead><tr className="text-left"><th>Datum</th><th>Periodisk förbrukning</th><th>Fakturabelopp</th></tr></thead><tbody>{readings.map(r => <tr key={r.id} className="border-t"><td>{r.readingDate.toISOString().slice(0,10)}</td><td>{r.periodConsumption.toFixed(2)}</td><td>{r.invoiceAmount.toFixed(2)} kr</td></tr>)}</tbody></table>
      <p>Senaste mätarställning: {latest ?? 'Ingen ännu'}</p>
    </div>
  );
}

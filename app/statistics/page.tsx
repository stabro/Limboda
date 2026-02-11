import { requireUser } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export default async function StatisticsPage() {
  await requireUser(['firmatecknare', 'styrelsen']);
  const latestByHouse = await prisma.$queryRaw<Array<{houseNumber:number;readingDate:string;periodConsumption:number;invoiceAmount:number}>>`
    SELECT wr.houseNumber, wr.readingDate, wr.periodConsumption, wr.invoiceAmount
    FROM WaterReading wr
    JOIN (SELECT houseNumber, MAX(readingDate) maxDate FROM WaterReading GROUP BY houseNumber) mx
      ON wr.houseNumber = mx.houseNumber AND wr.readingDate = mx.maxDate
    ORDER BY wr.houseNumber ASC
  `;
  const now = Date.now();
  const totalConsumption = latestByHouse.reduce((a,b)=>a+Number(b.periodConsumption),0);
  const totalInvoice = latestByHouse.reduce((a,b)=>a+Number(b.invoiceAmount),0);
  return <div><h1 className="text-2xl font-bold mb-3">Statistik</h1><table className="w-full bg-white border"><thead><tr><th>Hus</th><th>Datum</th><th>Förbrukning</th><th>Belopp</th></tr></thead><tbody>{latestByHouse.map(r=>{const old = now - new Date(r.readingDate).getTime() > 20*86400000; return <tr key={r.houseNumber} className="border-t"><td>{r.houseNumber}</td><td className={old?'text-red-600 font-semibold':''}>{String(r.readingDate).slice(0,10)}</td><td>{Number(r.periodConsumption).toFixed(2)}</td><td>{Number(r.invoiceAmount).toFixed(2)}</td></tr>;})}</tbody></table><p className="mt-3">Total förbrukning: {totalConsumption.toFixed(2)} m³ | Totalt belopp: {totalInvoice.toFixed(2)} kr</p></div>;
}

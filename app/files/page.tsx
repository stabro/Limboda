import { requireUser } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export default async function FilesPage() {
  await requireUser(['firmatecknare', 'styrelsen']);
  const files = await prisma.invoiceFile.findMany({ orderBy: { createdAt: 'desc' } });
  return <div className="space-y-4"><h1 className="text-2xl font-bold">PDF-underlag och fakturor</h1><a href="/api/files/report" className="inline-block bg-blue-600 text-white px-3 py-2 rounded">Spara underlag</a><form action="/api/files/upload" method="post" encType="multipart/form-data" className="bg-white border p-3 w-fit"><input type="file" name="invoice" required /><button className="ml-2 bg-green-600 text-white px-3 py-1 rounded">Ladda upp faktura</button></form><ul>{files.map(f=><li key={f.id}><a className="text-blue-700 underline" href={f.filePath}>{f.fileName}</a></li>)}</ul></div>;
}

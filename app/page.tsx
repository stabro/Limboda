import { getSessionUser } from '@/lib/auth';
export default async function Home() { const user = await getSessionUser(); return <div><h1 className="text-2xl font-bold">Limboda Samfällighet</h1><p>{user ? 'Välj en sida i menyn.' : 'Logga in för att använda appen.'}</p></div>; }

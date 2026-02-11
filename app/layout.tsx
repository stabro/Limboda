import './globals.css';
import Link from 'next/link';
import { getSessionUser } from '@/lib/auth';

export const metadata = { title: 'Limboda Samfällighet', manifest: '/manifest.webmanifest' };

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const user = await getSessionUser();
  return (
    <html lang="sv"><body><header className="bg-white border-b"><nav className="mx-auto max-w-6xl p-4 flex gap-4 text-sm"><Link href="/">Hem</Link>{user && <Link href="/water">Vatten</Link>}{user && <Link href="/statistics">Statistik</Link>}{user && <Link href="/files">Filer</Link>}<Link href="/news">Nyheter</Link><Link href="/bra-att-ha">Bra att ha</Link>{user?.role === 'styrelsen' && <Link href="/settings">Inställningar</Link>}<span className="ml-auto">{user ? `${user.name} (${user.role})` : ''}</span>{user ? <form action="/api/auth/logout" method="post"><button>Logga ut</button></form> : <Link href="/login">Logga in</Link>}</nav></header><main className="mx-auto max-w-6xl p-4">{children}</main></body></html>
  );
}

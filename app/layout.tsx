import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Limboda",
  description: "Water management and information system",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <nav style={{ padding: "1rem", borderBottom: "1px solid #ccc" }}>
          <ul style={{ listStyle: "none", display: "flex", gap: "2rem", margin: 0, padding: 0 }}>
            <li><a href="/">Home</a></li>
            <li><a href="/water-readings">Water Readings</a></li>
            <li><a href="/news">News</a></li>
            <li><a href="/bra-att-ha">Bra att ha</a></li>
            <li><a href="/admin">Admin</a></li>
          </ul>
        </nav>
        <main style={{ padding: "2rem" }}>
          {children}
        </main>
      </body>
    </html>
  );
}

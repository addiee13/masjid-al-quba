import type { Metadata } from "next";
import "./globals.css";
import Header from "../components/Header";

export const metadata: Metadata = {
  title: "Masjid Al-Quba",
  description: "Masjid Al-Quba - A place of worship and community",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Header />
        <main className="w-full max-w-full overflow-x-clip">{children}</main>
      </body>
    </html>
  );
}

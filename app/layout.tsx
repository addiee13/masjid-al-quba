import type { Metadata } from "next";
import { El_Messiri, Open_Sans } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";

const elMessiri = El_Messiri({
  variable: "--font-messiri",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const openSans = Open_Sans({
  variable: "--font-opensans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

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
      <body
        className={`${elMessiri.variable} ${openSans.variable} antialiased`}
      >
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}

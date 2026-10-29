import Navbar from "@/components/navbar/navbar";
import "./globals.css";
import { Geist, Geist_Mono } from "next/font/google";
import { PublicNav } from "@/components/navbar/nav-config";

const geistSans = Geist({ subsets: ["latin"], variable: "--font-geist-sans" });
const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="min-h-screen bg-background font-sans text-foreground antialiased flex flex-col">
        <Navbar links={PublicNav} userName="" />

        <div className="flex-1 flex flex-col">{children}</div>
      </body>
    </html>
  );
}

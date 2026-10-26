import { NavigationMenuDemo } from "@/components/navbar";
import "./globals.css";
import { Orbitron, JetBrains_Mono } from "next/font/google";

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="vi"
      className={`${orbitron.variable} ${jetBrainsMono.variable}`}
    >
      <body>
        <NavigationMenuDemo />
        <div className="p-6">{children}</div>
      </body>
    </html>
  );
}

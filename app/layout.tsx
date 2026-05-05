import type { Metadata } from "next";
import { Geist, Geist_Mono, Great_Vibes } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-script",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Farel Febryan - Undergraduate Student",
  description: "Your go-to engineer for Next.js projects",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geist.variable} ${geistMono.variable} ${greatVibes.variable} antialiased`}
        style={{
          backgroundColor: "#0f0f0f",
          color: "#ededed",
          fontFamily: "var(--font-geist), sans-serif",
        }}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
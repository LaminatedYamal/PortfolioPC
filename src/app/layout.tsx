import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import GtmTracker from "@/components/GtmTracker";
import CookieBanner from "@/components/ui/CookieBanner";
import LayoutShell from "@/components/LayoutShell";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pedro Coias | Hybrid Marketer & Technical Strategist",
  description: "Personal portfolio of Pedro Henrique Martins Coias. Showcasing projects in SEO, Web3, Strategy, Content Marketing, and Immersive 3D environments.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <body className="antialiased font-sans bg-background text-foreground selection:bg-accent-cyan selection:text-background">
        <GtmTracker gtmId={process.env.NEXT_PUBLIC_GTM_ID || "GTM-XXXXXXX"} />
        
        <LayoutShell>
          {children}
        </LayoutShell>
        
        <CookieBanner />
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import GtmTracker from "@/components/GtmTracker";
import CookieBanner from "@/components/ui/CookieBanner";
import Navbar from "@/components/ui/Navbar";

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
        
        {/* Global Navigation */}
        <Navbar />

        <main className="relative z-10 pt-20">
          {children}
        </main>

        <footer className="w-full border-t border-white/5 py-8 text-center text-sm text-foreground/50">
          <div className="w-full max-w-[1600px] mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-4">
            <p>© {new Date().getFullYear()} Pedro Henrique Martins Coias. All rights reserved.</p>
            <div className="flex gap-4">
              <a href="/privacy" className="hover:text-accent-cyan transition-colors">Privacy Policy</a>
            </div>
          </div>
        </footer>
        
        <CookieBanner />
      </body>
    </html>
  );
}

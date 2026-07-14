import type { Metadata } from "next";
import { Inter, Lora } from "next/font/google";
import "./globals.css";
import GtmTracker from "@/components/GtmTracker";
import CookieBanner from "@/components/ui/CookieBanner";
import LayoutShell from "@/components/LayoutShell";
import { LanguageProvider } from "@/components/LanguageContext";
import TabTitleManager from "@/components/TabTitleManager";
import Chatbot from "@/components/Chatbot";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pedro Cóias | Hybrid Marketer & Technical Strategist",
  description: "Personal portfolio of Pedro Henrique Martins Cóias. Showcasing projects in SEO, Web3, Strategy, Content Marketing, and Immersive 3D environments.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${lora.variable}`}>
      <body className="antialiased font-sans bg-background text-foreground selection:bg-accent-indigo selection:text-white">
        <GtmTracker gtmId={process.env.NEXT_PUBLIC_GTM_ID || "GTM-XXXXXXX"} />
        
        <LanguageProvider>
          <TabTitleManager />
          <LayoutShell>
            {children}
          </LayoutShell>
          
          <Chatbot />
          <CookieBanner />
        </LanguageProvider>
      </body>
    </html>
  );
}

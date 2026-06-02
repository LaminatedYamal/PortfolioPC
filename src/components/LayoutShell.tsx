'use client';

import { usePathname } from 'next/navigation';
import Navbar from './ui/Navbar';
import Link from 'next/link';

export default function LayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isStudio = pathname?.includes('/studio');

  if (isStudio) {
    // If we are in Sanity Studio, give it 100% of the viewport and hide site navigation/footer
    return <main className="w-full h-screen overflow-hidden bg-background">{children}</main>;
  }

  return (
    <>
      {/* Global Navigation */}
      <Navbar />

      <main className="relative pt-20">
        {children}
      </main>

      <footer className="w-full border-t border-white/5 py-8 text-center text-sm text-foreground/50">
        <div className="w-full max-w-[1600px] mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© {new Date().getFullYear()} Pedro Henrique Martins Coias. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-accent-sky transition-colors">Privacy Policy</Link>
          </div>
        </div>
      </footer>
    </>
  );
}

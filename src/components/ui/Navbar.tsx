'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/components/LanguageContext';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  const navLinks = [
    { href: '/', label: t.nav.home },
    { href: '/about', label: t.nav.about },
    { href: '/projects', label: t.nav.projects },
    { href: '/contact', label: t.nav.contact },
  ];

  return (
    <nav className="w-full border-b border-surface/50 backdrop-blur-md sticky top-0 z-40 bg-background/80">
      <div className="w-full max-w-[1600px] mx-auto px-6 md:px-12 py-4 flex justify-between items-center">
        <Link href="/" className="font-heading font-bold text-xl tracking-tight hover:opacity-80 transition-opacity">
          PEDRO<span className="text-accent-sky">.COIAS</span>
        </Link>
        
        {/* Desktop Links & Language Selector */}
        <div className="hidden md:flex items-center gap-6 text-sm font-medium">
          {navLinks.map(link => (
            <Link key={link.href} href={link.href} className="hover:text-accent-sky transition-colors">
              {link.label}
            </Link>
          ))}
          <div className="w-[1px] h-4 bg-white/10 ml-2"></div>
          <div className="flex items-center gap-1.5 text-[11px] tracking-wider font-semibold">
            <button 
              onClick={() => setLanguage('en')} 
              className={`hover:text-accent-sky transition-all px-1 py-0.5 rounded cursor-pointer ${
                language === 'en' ? 'text-accent-sky border-b-2 border-accent-sky' : 'text-foreground/40'
              }`}
            >
              EN
            </button>
            <span className="text-white/10">|</span>
            <button 
              onClick={() => setLanguage('pt')} 
              className={`hover:text-accent-sky transition-all px-1 py-0.5 rounded cursor-pointer ${
                language === 'pt' ? 'text-accent-sky border-b-2 border-accent-sky' : 'text-foreground/40'
              }`}
            >
              PT
            </button>
          </div>
        </div>

        {/* Mobile Hamburger Button */}
        <button 
          className="md:hidden p-2 -mr-2 text-white/80 hover:text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle mobile menu"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            {isMobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-white/5 bg-surface/95 backdrop-blur-xl absolute top-full left-0 w-full animate-in slide-in-from-top-2">
          <div className="px-6 py-4 flex flex-col gap-4">
            {navLinks.map(link => (
              <Link 
                key={link.href} 
                href={link.href} 
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-lg font-medium text-foreground/80 hover:text-accent-sky transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <div className="w-full h-[1px] bg-white/5 my-2"></div>
            <div className="flex gap-4 text-sm justify-center py-1">
              <button 
                onClick={() => { setLanguage('en'); setIsMobileMenuOpen(false); }} 
                className={`hover:text-accent-sky transition-all px-3 py-1 rounded-full text-xs font-semibold ${
                  language === 'en' ? 'text-accent-sky border border-accent-sky/20 bg-accent-sky/5' : 'text-foreground/50'
                }`}
              >
                English
              </button>
              <button 
                onClick={() => { setLanguage('pt'); setIsMobileMenuOpen(false); }} 
                className={`hover:text-accent-sky transition-all px-3 py-1 rounded-full text-xs font-semibold ${
                  language === 'pt' ? 'text-accent-sky border border-accent-sky/20 bg-accent-sky/5' : 'text-foreground/50'
                }`}
              >
                Português
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

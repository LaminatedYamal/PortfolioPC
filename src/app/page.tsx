'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/components/LanguageContext';

export default function Home() {
  const [imgError, setImgError] = useState(false);
  const { t } = useLanguage();

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] pb-20">
      {/* Hero Section */}
      <section className="w-full max-w-[1600px] mx-auto px-6 md:px-12 py-24 flex flex-col md:flex-row gap-12 lg:gap-24 items-center">
        <div className="flex-1 space-y-8">
          <div>
            <div className="inline-block px-4 py-1.5 rounded-full bg-surface border border-white/10 text-accent-ice text-sm font-semibold tracking-wide mb-6">
              {t.home.badge}
            </div>
            <h1 className="text-5xl md:text-7xl font-heading font-extrabold tracking-tight text-white leading-tight">
              {t.home.heroTitlePrefix} <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-sky to-accent-indigo">{t.home.heroTitleHighlight}</span>{t.home.heroTitleSuffix}
            </h1>
          </div>
          
          <p className="text-lg md:text-xl text-foreground/80 max-w-2xl leading-relaxed">
            {t.home.description}
          </p>
          
          <div className="flex flex-wrap gap-4 pt-4">
            <Link 
              href="/projects" 
              className="px-8 py-4 rounded-full bg-accent-indigo text-white font-medium hover:bg-accent-indigo/90 transition-all shadow-md"
            >
              {t.home.btnProjects}
            </Link>
            <Link 
              href="/about" 
              className="px-8 py-4 rounded-full border border-white/20 text-white font-medium hover:bg-white/5 transition-all"
            >
              {t.home.btnAbout}
            </Link>
          </div>
        </div>
        
        {/* Right side decorative graphic / Profile Picture */}
        <div className="flex-1 w-full hidden md:flex items-center justify-center">
          <div className="relative w-full aspect-square max-w-md">
            {/* Decorative background glow and rings */}
            <div className="absolute inset-0 bg-gradient-to-tr from-accent-sky/10 to-accent-indigo/15 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute inset-2 border border-white/10 rounded-full animate-spin-slow"></div>
            <div className="absolute inset-8 border border-white/5 rounded-full animate-spin-slow" style={{ animationDirection: 'reverse' }}></div>
            
            {/* Image / Fallback Container */}
            <div className="absolute inset-14 overflow-hidden rounded-full border-4 border-white/10 shadow-2xl bg-surface/50 backdrop-blur-md flex items-center justify-center group">
              {!imgError ? (
                <img 
                  src="https://i.redd.it/aiikp1e72r871.jpg" 
                  alt="Pedro Henrique Martins Coias" 
                  onError={() => setImgError(true)}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="text-center p-6">
                  <div className="text-4xl mb-2">👤</div>
                  <div className="font-heading font-semibold text-white">Pedro Coias</div>
                  <div className="text-xs text-foreground/50 mt-1">Creative Marketer</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

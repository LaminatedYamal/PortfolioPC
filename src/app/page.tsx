'use client';

import { useState } from 'react';

export default function Home() {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] pb-20">
      {/* Hero Section */}
      <section className="w-full max-w-[1600px] mx-auto px-6 md:px-12 py-24 flex flex-col md:flex-row gap-12 lg:gap-24 items-center">
        <div className="flex-1 space-y-8">
          <div>
            <div className="inline-block px-4 py-1.5 rounded-full bg-surface border border-white/10 text-accent-cyan text-sm font-semibold tracking-wide mb-6 shadow-[0_0_15px_rgba(0,180,216,0.2)]">
              Digital Marketing Professional
            </div>
            <h1 className="text-5xl md:text-7xl font-heading font-extrabold tracking-tight text-white leading-tight">
              I craft <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-cyan to-accent-cobalt">hybrid</span><br/>digital experiences.
            </h1>
          </div>
          
          <p className="text-lg md:text-xl text-foreground/80 max-w-2xl leading-relaxed">
            Hi, I'm Pedro Henrique Martins Coias. I specialize in merging technical strategy (SEO, Web3, Automations) 
            with creative marketing to drive measurable growth.
          </p>
          
          <div className="flex flex-wrap gap-4 pt-4">
            <a 
              href="/projects" 
              className="px-8 py-4 rounded-full bg-accent-royal text-white font-medium hover:bg-accent-royal/90 transition-all shadow-[0_0_20px_rgba(58,134,200,0.4)]"
            >
              View My Work
            </a>
            <a 
              href="/about" 
              className="px-8 py-4 rounded-full border border-white/20 text-white font-medium hover:bg-white/5 transition-all"
            >
              More About Me
            </a>
          </div>
        </div>
        
        {/* Right side decorative graphic / Profile Picture */}
        <div className="flex-1 w-full hidden md:flex items-center justify-center">
          <div className="relative w-full aspect-square max-w-md">
            {/* Decorative background glow and rings */}
            <div className="absolute inset-0 bg-gradient-to-tr from-accent-cyan/30 to-accent-cobalt/30 rounded-full blur-3xl animate-pulse"></div>
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
                <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center bg-gradient-to-br from-surface to-background text-foreground/80">
                  <span className="text-5xl mb-3">👤</span>
                  <h3 className="text-xl font-heading font-bold text-white mb-1">Pedro Coias</h3>
                  <p className="text-xs text-foreground/50 max-w-[200px]">Add your photo by saving a picture as <code className="text-accent-cyan">profile.jpg</code> in the <code className="text-accent-cyan">public/</code> folder.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

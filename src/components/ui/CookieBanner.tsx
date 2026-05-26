'use client';

import { useState, useEffect } from 'react';

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already accepted/rejected cookies
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setIsVisible(false);
    // Here we would push to GTM dataLayer that consent was granted
    if (typeof window !== 'undefined' && (window as any).dataLayer) {
      (window as any).dataLayer.push({ event: 'consent_granted' });
    }
  };

  const handleReject = () => {
    localStorage.setItem('cookie-consent', 'rejected');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 pb-safe">
      <div className="max-w-4xl mx-auto bg-surface/90 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex-1">
          <h3 className="font-heading font-semibold text-lg text-white mb-2">We respect your privacy</h3>
          <p className="text-sm text-foreground/80 leading-relaxed">
            We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. 
            By clicking "Accept All", you consent to our use of cookies.
          </p>
        </div>
        <div className="flex gap-3 shrink-0">
          <button 
            onClick={handleReject}
            className="px-5 py-2.5 rounded-full text-sm font-medium border border-white/20 hover:bg-white/5 transition-colors"
          >
            Reject Essential
          </button>
          <button 
            onClick={handleAccept}
            className="px-5 py-2.5 rounded-full text-sm font-medium bg-accent-cyan text-background hover:bg-accent-cyan/90 transition-colors shadow-[0_0_15px_rgba(0,180,216,0.3)]"
          >
            Accept All
          </button>
        </div>
      </div>
    </div>
  );
}

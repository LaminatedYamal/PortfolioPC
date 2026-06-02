'use client';

import { useEffect, useRef } from 'react';
import { useLanguage } from '@/components/LanguageContext';

export default function TabTitleManager() {
  const { language } = useLanguage();
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const originalTitleRef = useRef<string>('');

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Store the initial title
    originalTitleRef.current = document.title;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        // Start a 30-second timer when tab goes to background
        timerRef.current = setTimeout(() => {
          const funnyMessage = language === 'pt' 
            ? 'Ainda estás aí? 👀 | Pedro Coias' 
            : 'Still there? 👀 | Pedro Coias';
          document.title = funnyMessage;
        }, 30000);
      } else {
        // Clear the timer and restore original title when user returns
        if (timerRef.current) {
          clearTimeout(timerRef.current);
          timerRef.current = null;
        }
        // Restore title
        document.title = originalTitleRef.current;
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [language]);

  return null;
}

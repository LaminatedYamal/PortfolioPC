'use client';

import { useEffect, useRef } from 'react';
import { useLanguage } from '@/components/LanguageContext';

export default function TabTitleManager() {
  const { language } = useLanguage();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const originalTitleRef = useRef<string>('');
  const lastIndexRef = useRef<number>(-1);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Store the initial title on mount
    originalTitleRef.current = document.title;

    const getMessages = () => {
      if (language === 'pt') {
        return [
          'tudo bem, eu espero',
          'eu tenho tempo',
          'Ainda estás aí? 👀 | Pedro Coias'
        ];
      }
      return [
        'its okay ill wait',
        'i got time',
        'Still there? 👀 | Pedro Coias'
      ];
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        const messages = getMessages();
        
        // Define title rotation function with non-repeating sequence logic
        const rotateTitle = () => {
          let nextIndex = lastIndexRef.current;
          
          if (messages.length > 1) {
            // Keep selecting a random index until it's different from the last one
            while (nextIndex === lastIndexRef.current) {
              nextIndex = Math.floor(Math.random() * messages.length);
            }
          } else {
            nextIndex = 0;
          }
          
          document.title = messages[nextIndex];
          lastIndexRef.current = nextIndex;
        };

        // Trigger first rotation immediately on backgrounding
        rotateTitle();

        // Continue cycling every 15 seconds
        intervalRef.current = setInterval(rotateTitle, 15000);
      } else {
        // Clear active interval
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
        // Restore original page title
        document.title = originalTitleRef.current;
        lastIndexRef.current = -1; // Reset sequence tracking
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [language]);

  return null;
}

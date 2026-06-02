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
          'tudo bem, eu espero',              // 1
          'eu tenho tempo',                  // 2
          'Ainda estás aí? 👀 | Pedro Coias'  // 3
        ];
      }
      return [
        'its okay ill wait',                 // 1
        'i got time',                        // 2
        'Still there? 👀 | Pedro Coias'     // 3
      ];
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        const messages = getMessages();
        
        // Define title rotation function with exact sequential 3 -> 1 -> 2 order
        const rotateTitle = () => {
          // Indexes map to: [0 = 'its okay...', 1 = 'i got time', 2 = 'Still there?...']
          // Sequence should be 3, 1, 2 -> meaning index 2, then index 0, then index 1.
          const sequence = [2, 0, 1];
          let nextSequenceIndex = 0;

          if (lastIndexRef.current !== -1) {
            const currentSeqIdx = sequence.indexOf(lastIndexRef.current);
            nextSequenceIndex = (currentSeqIdx + 1) % sequence.length;
          }

          const nextIndex = sequence[nextSequenceIndex];
          document.title = messages[nextIndex];
          lastIndexRef.current = nextIndex;
        };

        // Trigger first rotation immediately on backgrounding (starts with 3)
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

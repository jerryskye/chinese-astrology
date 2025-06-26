'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    // This will scroll the window to the top on route changes.
    // Using a timeout to ensure it runs after Next.js's own scroll attempts
    // and after the new page content might have caused layout shifts.
    const timer = setTimeout(() => {
      window.scrollTo(0, 0);
    }, 0); // A timeout of 0 ms defers execution until the stack is clear.

    return () => clearTimeout(timer); // Cleanup the timer
  }, [pathname]);

  return null;
}

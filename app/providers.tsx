'use client';

import React, { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useStore } from './store/useStore';

export function Providers({ children }: { children: React.ReactNode }) {
    const { language } = useStore();
    const pathname = usePathname();

    useEffect(() => {
        // Handle Global Direction and Font based on Language
        const isArabic = language === 'ar';
        document.documentElement.dir = isArabic ? 'rtl' : 'ltr';
        document.documentElement.lang = language;
        document.body.style.fontFamily = isArabic ? 'Cairo, sans-serif' : 'Poppins, sans-serif';

        // Update body class for specific font handling if needed
        if (isArabic) {
            document.body.classList.add('font-arabic');
            document.body.classList.remove('font-sans');
        } else {
            document.body.classList.add('font-sans');
            document.body.classList.remove('font-arabic');
        }
    }, [language]);

    useEffect(() => {
        // Scroll to top on route change
        window.scrollTo(0, 0);
    }, [pathname]);

    return <>{children}</>;
}

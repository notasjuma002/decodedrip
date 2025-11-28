'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import Footer from './Footer';
import CartDrawer from './CartDrawer';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isHome = pathname === '/';

    return (
        <>
            <Navbar />
            <CartDrawer />
            <main className={`flex-grow min-h-screen ${isHome ? 'pt-0' : 'pt-28 md:pt-32'}`}>
                {children}
            </main>
            <Footer />
        </>
    );
}

'use client';

import React from 'react';
import { useStore } from '@/app/store/useStore';
import { locales } from '@/app/locales';

const Footer: React.FC = () => {
  const { language } = useStore();
  const t = locales[language].footer;

  return (
    <footer className="bg-morocco-dark text-morocco-neutral py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-center md:text-left rtl:md:text-right">
          <h3 className="text-2xl font-bold tracking-widest text-morocco-neutral uppercase">Atlas Lions</h3>
          <p className="text-morocco-gold text-sm mt-1">CAF 2025 Official Collection</p>
        </div>

        <div className="text-xs text-morocco-neutral/50">
          {t.rights}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
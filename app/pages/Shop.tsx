import React, { useState, useMemo } from "react";
import Link from "next/link";
import { countries } from "@/app/data/countries";
import { useStore } from "@/app/store/useStore";
import { locales } from "@/app/locales";

const Shop: React.FC = () => {
  const { language } = useStore();
  const t = locales[language].shop;

  return (
    <div className="min-h-screen bg-white">
      {/* Hero / Header */}
      <div className="bg-morocco-dark text-white py-16 text-center">
        <h1 className="text-4xl md:text-6xl font-bold uppercase tracking-widest mb-4 font-serif">
          Select Your Team
        </h1>
        <p className="text-lg opacity-80 max-w-2xl mx-auto px-4">
          CAF Africa Cup of Nations 2025
        </p>
      </div>

      {/* Countries Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 gap-6">
          {countries.map((country) => (
            <Link
              href={`/shop/${country.name}`}
              key={country.code}
              className="group flex flex-col items-center gap-3"
            >
              {/* Circular Flag Container */}
              <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden border-2 border-morocco-gold/50 shadow-lg transition-all duration-300 group-hover:border-morocco-red group-hover:scale-110 group-hover:shadow-xl bg-morocco-dark">
                <img
                  src={country.image}
                  alt={country.name}
                  className="w-full h-full object-cover"
                />
                {/* Shine Effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              {/* Country Name */}
              <h3 className="text-xs md:text-sm font-bold text-morocco-dark uppercase tracking-wider text-center group-hover:text-morocco-red transition-colors">
                {country.name}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Shop;

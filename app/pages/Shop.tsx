import React from "react";
import Link from "next/link";
import { countries } from "@/app/data/countries";
import { products } from "@/app/data/products";
import { useStore } from "@/app/store/useStore";
import { locales } from "@/app/locales";

// Helper function to get the hoodie product ID for a country
const getHoodieProductId = (countryName: string): string | null => {
  const product = products.find(
    (p) => p.country === countryName && p.category === "Hoodie"
  );
  return product?.id || null;
};

const Shop: React.FC = () => {
  const { language } = useStore();
  const t = locales[language].shop;

  return (
    <div className="min-h-screen bg-white">
      {/* Hero / Header */}
      <div className="relative bg-morocco-dark text-white py-16 text-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="/2ed/flags-section-choix-natoins.jpg"
            alt="CAF Nations"
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        <div className="relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold uppercase tracking-widest mb-4 font-serif">
            Select Your Team
          </h1>
          <p className="text-lg opacity-80 max-w-2xl mx-auto px-4">
            CAF Africa Cup of Nations 2025
          </p>
        </div>
      </div>

      {/* Countries Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 gap-6">
          {countries.map((country) => {
            const hoodieId = getHoodieProductId(country.name);
            const href = hoodieId ? `/product/${hoodieId}` : `/shop/${country.name}`;
            return (
              <Link
                href={href}
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
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Shop;

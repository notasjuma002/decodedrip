import React, { useState, useMemo } from 'react';
import { FaFilter } from 'react-icons/fa';
import ProductCard from '@/app/components/ProductCard';
import { products } from '@/app/data/products';
import { useStore } from '@/app/store/useStore';
import { locales } from '@/app/locales';

const Shop: React.FC = () => {
  const { language } = useStore();
  const t = locales[language].shop;

  const [filter, setFilter] = useState<string>('All');

  // Removed Accessories from categories
  const categories = ['All', 'Hoodie', 'T-Shirt', 'Sweater'];

  // Translation Helper for Categories
  const getCategoryLabel = (cat: string) => {
    if (cat === 'All') return t.filter_all;
    if (cat === 'Hoodie') return t.hoodie;
    if (cat === 'T-Shirt') return t.tshirt;
    if (cat === 'Sweater') return t.sweater;
    return cat;
  };

  // Filter Logic (removed sorting)
  const processedProducts = useMemo(() => {
    return filter === 'All'
      ? [...products]
      : products.filter(p => p.category === filter);
  }, [filter]);

  return (
    <div className="min-h-screen bg-white">

      {/* Premium Moroccan Hero Header */}
      <div className="relative bg-gradient-to-br from-morocco-red via-morocco-red to-morocco-dark overflow-hidden h-[50vh] min-h-[400px] flex items-center justify-center">
        {/* Moroccan Pattern Overlay */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDAgTCA2MCA2MCBNIDYwIDAgTCAwIDYwIiBzdHJva2U9IiNmZmYiIHN0cm9rZS13aWR0aD0iMC41IiBmaWxsPSJub25lIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')]"></div>
        </div>

        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-morocco-green/20 to-transparent"></div>

        {/* Content */}
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          {/* Decorative Moroccan Star */}
          <div className="mx-auto mb-6 relative">
            <div className="w-20 h-20 mx-auto relative">
              <div className="absolute inset-0 bg-morocco-gold rotate-45 opacity-30"></div>
              <div className="absolute inset-2 bg-morocco-gold rotate-45 opacity-50"></div>
              <div className="absolute inset-4 bg-white rotate-45"></div>
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-white uppercase tracking-[0.2em] font-sans drop-shadow-2xl mb-6">
            {t.title}
          </h1>
          <p className="text-morocco-gold text-xl md:text-2xl font-semibold tracking-[0.3em] uppercase drop-shadow-lg">
            {t.subtitle}
          </p>
        </div>

        {/* Bottom Decorative Border - Constrained Width */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-morocco-gold"></div>
      </div>

      {/* Simplified Filter Bar */}
      <div className="sticky top-24 z-30 bg-white border-b border-morocco-gold/20 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">

          {/* Category Pills - Centered */}
          <div className="flex justify-center flex-wrap gap-3">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-6 py-2.5 rounded-full font-bold uppercase tracking-wider text-sm transition-all duration-300 ${filter === cat
                  ? 'bg-morocco-red text-white shadow-md'
                  : 'bg-white text-morocco-dark border border-morocco-neutral hover:border-morocco-red'
                  }`}
              >
                {getCategoryLabel(cat)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Product Grid */}
        {processedProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {processedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-32 text-morocco-dark/40 border-2 border-dashed border-morocco-gold/30 rounded-2xl bg-morocco-neutral/30">
            <div className="w-24 h-24 bg-morocco-neutral rounded-full flex items-center justify-center mb-6">
              <FaFilter size={40} className="text-morocco-dark/20" />
            </div>
            <p className="text-2xl font-bold text-morocco-dark mb-2">No Items Found</p>
            <p className="text-morocco-dark/60 mb-6">Try adjusting your filters</p>
            <button
              onClick={() => setFilter('All')}
              className="bg-morocco-red text-white px-8 py-3 rounded-full font-bold uppercase tracking-wider hover:bg-morocco-dark transition-colors"
            >
              Show All Products
            </button>
          </div>
        )}

      </div>

      {/* Decorative Moroccan Footer Pattern */}
      <div className="relative mt-20 mb-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-4 justify-center">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-morocco-gold to-transparent"></div>
            <div className="w-3 h-3 bg-morocco-gold rotate-45"></div>
            <div className="w-4 h-4 bg-morocco-red rotate-45"></div>
            <div className="w-5 h-5 bg-morocco-green rotate-45"></div>
            <div className="w-4 h-4 bg-morocco-red rotate-45"></div>
            <div className="w-3 h-3 bg-morocco-gold rotate-45"></div>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-morocco-gold to-transparent"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
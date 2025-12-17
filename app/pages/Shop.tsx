import React, { useState, useMemo } from "react";
import ProductCard from "@/app/components/ProductCard";
import { products } from "@/app/data/products";
import { useStore } from "@/app/store/useStore";
import { locales } from "@/app/locales";

const Shop: React.FC = () => {
  const { language } = useStore();
  const t = locales[language].shop;

  const [filter, setFilter] = useState<string>("All");

  const categories = ["All", "Hoodie", "T-Shirt", "Sweater"];

  const getCategoryLabel = (cat: string) => {
    if (cat === "All") return t.filter_all;
    if (cat === "Hoodie") return t.hoodie;
    if (cat === "T-Shirt") return t.tshirt;
    if (cat === "Sweater") return t.sweater;
    return cat;
  };

  const processedProducts = useMemo(() => {
    return filter === "All"
      ? [...products]
      : products.filter((p) => p.category === filter);
  }, [filter]);

  return (
    <div className="min-h-screen bg-white">
      {/* Filter Bar */}
      <div className="sticky top-24 z-30 bg-white border-b border-morocco-dark/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-center flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-6 py-2 font-bold uppercase tracking-wider text-sm transition-all duration-200 ${
                  filter === cat
                    ? "bg-morocco-red text-white"
                    : "bg-morocco-neutral text-morocco-dark hover:bg-morocco-dark hover:text-white"
                }`}
              >
                {getCategoryLabel(cat)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Products */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {processedProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {processedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-morocco-dark/50">
            <p className="text-xl font-bold mb-4">No Items Found</p>
            <button
              onClick={() => setFilter("All")}
              className="bg-morocco-red text-white px-8 py-3 font-bold uppercase tracking-wider hover:bg-morocco-dark transition-colors"
            >
              Show All
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Shop;

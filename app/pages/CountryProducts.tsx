import React, { useMemo } from "react";
import Link from "next/link";
import { useStore } from "@/app/store/useStore";
import { locales } from "@/app/locales";
import { products } from "@/app/data/products";
import ProductCard from "@/app/components/ProductCard";

interface CountryProductsProps {
    countryName: string;
    categoryName: string;
}

const CountryProducts: React.FC<CountryProductsProps> = ({ countryName, categoryName }) => {
    const { language } = useStore();
    const t = locales[language].shop;

    const decodedCountry = decodeURIComponent(countryName);
    const decodedCategory = decodeURIComponent(categoryName);

    const filteredProducts = useMemo(() => {
        return products.filter((p) => {
            const countryMatch = p.country?.toLowerCase() === decodedCountry.toLowerCase();
            // Handle category matching (singular/plural or exact match)
            // The categories in data are "T-Shirt", "Hoodie", "Sweater", "Accessories"
            // The URL might be "T-Shirt" or "t-shirt"
            const categoryMatch = p.category.toLowerCase() === decodedCategory.toLowerCase();
            return countryMatch && categoryMatch;
        });
    }, [decodedCountry, decodedCategory]);

    return (
        <div className="min-h-screen bg-white">
            {/* Hero / Header */}
            <div className="bg-morocco-dark text-white py-12 text-center">
                <div className="max-w-7xl mx-auto px-4 relative">
                    <Link
                        href={`/shop/${countryName}`}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white uppercase text-sm font-bold tracking-widest"
                    >
                        ← Back
                    </Link>
                    <h1 className="text-3xl md:text-5xl font-bold uppercase tracking-widest mb-2 font-serif">
                        {decodedCountry}
                    </h1>
                    <p className="text-lg opacity-80 uppercase tracking-wider">
                        {decodedCategory}s
                    </p>
                </div>
            </div>

            {/* Products Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {filteredProducts.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {filteredProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-24 text-morocco-dark/50">
                        <p className="text-xl font-bold mb-4">No Items Found</p>
                        <p className="mb-8">We are working on adding more products for {decodedCountry}.</p>
                        <Link
                            href={`/shop/${countryName}`}
                            className="bg-morocco-red text-white px-8 py-3 font-bold uppercase tracking-wider hover:bg-morocco-dark transition-colors"
                        >
                            Browse Other Categories
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CountryProducts;

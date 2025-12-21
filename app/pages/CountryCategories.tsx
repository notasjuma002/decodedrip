import React from "react";
import Link from "next/link";
import { useStore } from "@/app/store/useStore";
import { locales } from "@/app/locales";
import { products } from "@/app/data/products";

interface CountryCategoriesProps {
    countryName: string;
}

const CountryCategories: React.FC<CountryCategoriesProps> = ({ countryName }) => {
    const { language } = useStore();
    const t = locales[language].shop;

    // Find a representative image for each category for this country, or fallback
    const getCategoryImage = (category: string) => {
        const product = products.find(
            (p) =>
                p.country === countryName &&
                p.category.toLowerCase() === category.toLowerCase()
        );
        if (product) return product.image;

        // Fallback images if no specific product found
        if (category === "T-Shirt") return "https://picsum.photos/seed/tshirt/800/600";
        if (category === "Hoodie") return "https://picsum.photos/seed/hoodie/800/600";
        return "https://picsum.photos/seed/other/800/600";
    };

    // Helper to get product ID for direct linking
    const getProductId = (category: string) => {
        const product = products.find(
            (p) =>
                p.country === countryName &&
                p.category.toLowerCase() === category.toLowerCase()
        );
        return product ? product.id : null;
    };

    const categories = [
        {
            name: "T-Shirt",
            label: t.tshirt,
            image: getCategoryImage("T-Shirt"),
            disabled: true,
            link: `/shop/${countryName}/T-Shirt`
        },
        {
            name: "Hoodie",
            label: t.hoodie,
            image: getCategoryImage("Hoodie"),
            disabled: false,
            // If product exists, link directly to it. Otherwise fallback to category page (though unlikely with current data)
            link: getProductId("Hoodie") ? `/product/${getProductId("Hoodie")}` : `/shop/${countryName}/Hoodie`
        },
    ];

    return (
        <div className="min-h-screen bg-white">
            {/* Hero / Header */}
            <div className="bg-morocco-dark text-white py-16 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-black/20 z-0"></div>
                <div className="relative z-10">
                    <h1 className="text-4xl md:text-6xl font-bold uppercase tracking-widest mb-4 font-serif">
                        {decodeURIComponent(countryName)}
                    </h1>
                    <p className="text-lg opacity-80 max-w-2xl mx-auto px-4">
                        Select Category
                    </p>
                </div>
            </div>

            {/* Categories Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    {categories.map((cat) => (
                        cat.disabled ? (
                            <div
                                key={cat.name}
                                className="group relative h-96 overflow-hidden rounded-lg shadow-lg bg-gray-200 cursor-not-allowed"
                            >
                                {/* No Image - Just Gray Background */}
                                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
                                    <h3 className="text-3xl font-bold text-gray-500 uppercase tracking-wider mb-4">
                                        {cat.label}
                                    </h3>
                                    <span className="inline-block bg-gray-300 text-gray-600 px-8 py-3 font-bold uppercase tracking-widest text-sm border border-gray-400/20">
                                        Coming Soon
                                    </span>
                                </div>
                            </div>
                        ) : (
                            <Link
                                href={cat.link}
                                key={cat.name}
                                className="group relative h-96 overflow-hidden rounded-lg shadow-lg cursor-pointer"
                            >
                                <img
                                    src={cat.image}
                                    alt={cat.label}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity" />
                                <div className="absolute bottom-0 left-0 right-0 p-8 text-center">
                                    <h3 className="text-3xl font-bold text-white uppercase tracking-wider mb-4">
                                        {cat.label}
                                    </h3>
                                    <span className="inline-block bg-morocco-red text-white px-8 py-3 font-bold uppercase tracking-widest text-sm hover:bg-white hover:text-morocco-red transition-colors">
                                        Shop Now
                                    </span>
                                </div>
                            </Link>
                        )
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CountryCategories;

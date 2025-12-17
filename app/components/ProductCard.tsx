import React from "react";
import Link from "next/link";
import { Product } from "../types";
import { useStore } from "@/app/store/useStore";
import { locales } from "@/app/locales";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { language } = useStore();
  const t = locales[language].common;
  const name = product.name[language];

  return (
    <Link
      href={`/product/${product.id}`}
      className="group relative overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 aspect-[3/4] block"
    >
      {/* Full-size Product Image */}
      <div className="absolute inset-0">
        <img
          src={product.image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
      </div>

      {/* Product Info - Overlaid at Bottom */}
      <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
        {/* Product Name */}
        <h3 className="text-lg font-bold mb-2 line-clamp-2 drop-shadow-lg">
          {name}
        </h3>

        {/* Price & Colors Row */}
        <div className="flex items-center justify-between mb-3">
          {/* Price */}
          <div className="flex items-center gap-1">
            <span className="font-bold text-2xl">{product.price}</span>
            <span className="text-sm opacity-90">MAD</span>
          </div>

          {/* Color Swatches */}
          <div className="flex gap-2">
            <div className="w-5 h-5 bg-black border-2 border-white shadow-md"></div>
            <div className="w-5 h-5 bg-white border-2 border-white/50 shadow-md"></div>
          </div>
        </div>

        {/* View Button */}
        <div className="bg-white text-morocco-dark px-4 py-2 text-center text-sm font-bold uppercase tracking-wider group-hover:bg-morocco-red group-hover:text-white transition-colors">
          {t.view_item}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;

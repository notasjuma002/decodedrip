import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { TbTruck, TbRefresh, TbCash, TbShieldCheck } from "react-icons/tb";
import { products } from "@/app/data/products";
import { countries } from "@/app/data/countries";
import { useStore } from "@/app/store/useStore";
import { locales } from "@/app/locales";

const ProductDetails: React.FC = () => {
  const params = useParams();
  const id = params?.id as string;
  const router = useRouter();
  const { addToCart, language } = useStore();
  const t = locales[language].common;
  const navT = locales[language].nav;

  const product = products.find((p) => p.id === id);

  const [selectedColor, setSelectedColor] = useState<"Black" | "White">(
    "Black",
  );
  const [selectedSize, setSelectedSize] = useState<string>("M");
  const sizes = ["S", "M", "L", "XL"];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  // Reset state when product changes
  useEffect(() => {
    if (product) {
      setCurrentImageIndex(0);
      setSelectedColor("Black");
    }
  }, [product]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-2xl text-morocco-dark mb-4">Product not found</p>
          <Link href="/shop" className="text-morocco-red hover:underline">
            {navT.shop}
          </Link>
        </div>
      </div>
    );
  }

  // Always use the main images regardless of color selection
  const currentImages =
    product.images && product.images.length > 0
      ? product.images
      : [product.image];

  // 2 Color variants only
  const colors = [
    { name: "Black", bgClass: "bg-black" },
    { name: "White", bgClass: "bg-white border-2 border-morocco-dark/20" },
  ];

  const handleColorChange = (color: "Black" | "White") => {
    setSelectedColor(color);
    // Images do not change based on color selection
  };

  const handleAddToCart = () => {
    addToCart(product, selectedColor, selectedSize, quantity);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedColor, selectedSize, quantity);
    router.push("/checkout");
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % currentImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + currentImages.length) % currentImages.length,
    );
  };

  return (
    <div className="bg-white min-h-screen pb-20">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 text-sm text-morocco-dark/50">
        <Link href="/" className="hover:text-morocco-red">
          {navT.home}
        </Link>
        <span className="mx-2">›</span>
        <Link href="/shop" className="hover:text-morocco-red">
          {navT.shop}
        </Link>
        {product.country && (
          <>
            <span className="mx-2">›</span>
            <Link href={`/shop/${product.country}`} className="hover:text-morocco-red">
              {product.country}
            </Link>
          </>
        )}
        <span className="mx-2">›</span>
        <span className="text-morocco-dark font-medium">
          {product.name[language]}
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* LEFT: Square Image Gallery */}
          <div className="flex flex-col gap-4">
            {/* Main Image - Square */}
            <div className="relative aspect-square w-full bg-morocco-neutral/20 overflow-hidden group shadow-lg">
              <img
                src={currentImages[currentImageIndex]}
                alt={`${product.name[language]} - ${selectedColor}`}
                className="w-full h-full object-cover transition-transform duration-500"
              />

              {/* Navigation Arrows */}
              {currentImages.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 flex items-center justify-center text-morocco-dark opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white shadow-lg"
                  >
                    <FaArrowLeft size={16} />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 flex items-center justify-center text-morocco-dark opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white shadow-lg"
                  >
                    <FaArrowRight size={16} />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnails - Square */}
            {currentImages.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {currentImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`relative aspect-square overflow-hidden border-2 transition-all ${currentImageIndex === idx ? "border-morocco-gold ring-2 ring-morocco-gold/30" : "border-transparent opacity-70 hover:opacity-100"}`}
                  >
                    <img
                      src={img}
                      alt={`Thumbnail ${idx}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT: Product Details */}
          <div className="flex flex-col">
            {/* Category & Title */}
            <span className="text-sm text-morocco-dark/50 uppercase tracking-wider mb-3">
              {product.category}
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-morocco-dark leading-tight mb-6">
              {product.name[language]}
            </h1>

            {/* Country Switcher - Compact Grid */}
            <div className="mb-8">
              <div className="flex flex-wrap gap-2">
                {countries.map((c) => {
                  // Find the hoodie product for this country
                  const countryProduct = products.find(
                    (p) => p.country === c.name && p.category === "Hoodie"
                  );

                  // If no hoodie exists for this country, skip or disable
                  if (!countryProduct) return null;

                  const isActive = product.country === c.name;

                  return (
                    <Link
                      key={c.code}
                      href={`/product/${countryProduct.id}`}
                      className={`flex-shrink-0 relative w-9 h-9 rounded-full overflow-hidden border-2 transition-all duration-200 ${isActive
                        ? "border-morocco-red scale-110 ring-1 ring-morocco-red/30"
                        : "border-morocco-neutral hover:border-morocco-gold hover:scale-105"
                        }`}
                      title={c.name}
                    >
                      <img
                        src={c.image}
                        alt={c.name}
                        className="w-full h-full object-cover"
                      />
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Price Based on Color Selection */}
            <div className="mb-8 pb-6 border-b border-morocco-neutral">
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold text-morocco-dark">
                  {selectedColor === "Black"
                    ? (product.priceBlack ?? product.price)
                    : (product.priceWhite ?? product.price)}
                </span>
                <span className="text-xl text-morocco-dark/60 font-medium">
                  MAD
                </span>
              </div>
            </div>

            {/* Feature Badges Row */}
            <div className="flex justify-between items-start gap-4 mb-8">
              <div className="flex flex-col items-center text-center flex-1">
                <TbTruck size={24} className="mb-2 text-morocco-dark" />
                <span className="font-bold text-morocco-dark text-xs">{t.free_delivery}</span>
              </div>
              <div className="flex flex-col items-center text-center flex-1">
                <TbRefresh size={24} className="mb-2 text-morocco-dark" />
                <span className="font-bold text-morocco-dark text-xs">{t.exchange_policy}</span>
              </div>
              <div className="flex flex-col items-center text-center flex-1">
                <TbCash size={24} className="mb-2 text-morocco-dark" />
                <span className="font-bold text-morocco-dark text-xs">{t.cash_on_delivery}</span>
              </div>
            </div>

            {/* Description */}
            <div className="mb-8 border-t border-morocco-neutral pt-6">
              <h3 className="font-bold text-morocco-dark mb-3 text-sm uppercase tracking-wider">
                {t.product_description_title}
              </h3>
              <p className="text-morocco-dark/70 leading-relaxed">
                {t.product_description}
              </p>
            </div>

            {/* Product Details */}
            <div className="mb-8">
              <h3 className="font-bold text-morocco-dark mb-3 text-sm uppercase tracking-wider">
                {t.product_details_title}
              </h3>
              <ul className="space-y-2 text-morocco-dark/70">
                <li className="flex items-start gap-2">
                  <span className="text-morocco-gold">•</span>
                  <span>{t.product_detail_1}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-morocco-gold">•</span>
                  <span>{t.product_detail_2}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-morocco-gold">•</span>
                  <span>{t.product_detail_3}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-morocco-gold">•</span>
                  <span>{t.product_detail_4}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-morocco-gold">•</span>
                  <span>{t.product_detail_5}</span>
                </li>
              </ul>
            </div>

            {/* Color Selection - Black & White Only */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <span className="font-bold text-morocco-dark">Color:</span>
                <span className="text-morocco-dark/70">{selectedColor}</span>
              </div>
              <div className="flex gap-3">
                {colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() =>
                      handleColorChange(color.name as "Black" | "White")
                    }
                    className={`w-14 h-14 border-2 flex items-center justify-center transition-all cursor-pointer ${selectedColor === color.name ? "border-morocco-dark ring-2 ring-morocco-dark/30 scale-110" : "border-morocco-neutral hover:border-morocco-dark/50 hover:scale-105"}`}
                  >
                    <div className={`w-10 h-10 ${color.bgClass}`} />
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <span className="font-bold text-morocco-dark">Quantity:</span>
              </div>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-12 h-12 border-2 border-morocco-neutral hover:border-morocco-dark flex items-center justify-center text-xl font-bold text-morocco-dark transition-all hover:bg-morocco-neutral"
                >
                  −
                </button>
                <span className="text-2xl font-bold text-morocco-dark min-w-[3rem] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-12 h-12 border-2 border-morocco-neutral hover:border-morocco-dark flex items-center justify-center text-xl font-bold text-morocco-dark transition-all hover:bg-morocco-neutral"
                >
                  +
                </button>
              </div>
            </div>

            {/* Size Selection - S, M, L, XL */}
            <div className="mb-10">
              <div className="flex items-center gap-2 mb-4">
                <span className="font-bold text-morocco-dark">Size:</span>
                <span className="text-morocco-dark/70">{selectedSize}</span>
              </div>
              <div className="flex gap-3">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-14 h-14 border-2 flex items-center justify-center font-bold text-lg transition-all cursor-pointer ${selectedSize === size ? "border-morocco-dark bg-morocco-dark text-white" : "border-morocco-neutral hover:border-morocco-dark/50 text-morocco-dark"}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={handleAddToCart}
                className="bg-morocco-red text-white h-16 font-bold uppercase tracking-wider hover:bg-morocco-dark transition-all shadow-lg hover:shadow-xl"
              >
                {t.add_to_cart}
              </button>
              <button
                onClick={handleBuyNow}
                className="bg-morocco-dark text-white h-16 font-bold uppercase tracking-wider hover:bg-morocco-green transition-all shadow-lg hover:shadow-xl"
              >
                {t.checkout}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;

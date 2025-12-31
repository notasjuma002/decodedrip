import React, { useState, useEffect, useRef } from "react";
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

  // Animated price state
  const [displayPrice, setDisplayPrice] = useState(
    product?.priceBlack ?? product?.price ?? 0
  );
  const animationRef = useRef<number | null>(null);

  // Get current actual price based on color
  const actualPrice = selectedColor === "Black"
    ? (product?.priceBlack ?? product?.price ?? 0)
    : (product?.priceWhite ?? product?.price ?? 0);

  // Animate price when color changes
  useEffect(() => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }

    const startPrice = displayPrice;
    const endPrice = actualPrice;
    const duration = 300; // ms
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function for smooth animation
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentPrice = Math.round(startPrice + (endPrice - startPrice) * easeOut);

      setDisplayPrice(currentPrice);

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [actualPrice]);

  // Reset state when product changes
  useEffect(() => {
    if (product) {
      setCurrentImageIndex(0);
      setSelectedColor("Black");
      setDisplayPrice(product.priceBlack ?? product.price);
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

          {/* RIGHT: Product Details - No Scroll, Essentials First */}
          <div className="flex flex-col">

            {/* Category & Title */}
            <span className="text-sm text-morocco-dark/50 uppercase tracking-wider mb-2">
              {product.category}
            </span>
            <h1 className="text-3xl md:text-4xl font-bold text-morocco-dark leading-tight mb-4">
              {product.name[language]}
            </h1>

            {/* Price */}
            <div className="flex items-baseline gap-2 mb-6">
              <span className="text-4xl font-bold text-morocco-dark transition-all">
                {displayPrice}
              </span>
              <span className="text-xl text-morocco-dark/60 font-medium">
                MAD
              </span>
            </div>

            {/* Options Section - Clean 2-Row Layout */}
            <div className="space-y-5 mb-6">

              {/* Row 1: Color + Quantity */}
              <div className="flex items-center justify-between">
                {/* Color */}
                <div className="flex items-center gap-4">
                  <span className="text-sm font-bold text-morocco-dark">Color</span>
                  <div className="flex gap-2">
                    {colors.map((color) => {
                      const colorPrice = color.name === "Black"
                        ? (product.priceBlack ?? product.price)
                        : (product.priceWhite ?? product.price);
                      return (
                        <button
                          key={color.name}
                          onClick={() => handleColorChange(color.name as "Black" | "White")}
                          className={`flex items-center gap-2 px-3 py-2 border-2 transition-all cursor-pointer ${selectedColor === color.name
                            ? "border-morocco-dark bg-morocco-dark/5"
                            : "border-morocco-neutral hover:border-morocco-dark/50"}`}
                        >
                          <div className={`w-5 h-5 ${color.bgClass}`} />
                          <span className={`text-sm font-medium ${selectedColor === color.name ? "text-morocco-dark" : "text-morocco-dark/60"}`}>
                            {colorPrice} MAD
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Quantity - Inline */}
                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold text-morocco-dark">Quantity</span>
                  <div className="flex items-center border-2 border-morocco-neutral">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-9 h-9 flex items-center justify-center text-lg font-bold text-morocco-dark hover:bg-morocco-neutral transition-all"
                    >
                      −
                    </button>
                    <span className="w-10 h-9 flex items-center justify-center text-lg font-bold text-morocco-dark border-x-2 border-morocco-neutral">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-9 h-9 flex items-center justify-center text-lg font-bold text-morocco-dark hover:bg-morocco-neutral transition-all"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Row 2: Size - Full Width */}
              <div className="flex items-center gap-4">
                <span className="text-sm font-bold text-morocco-dark">Size</span>
                <div className="flex gap-2 flex-1">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`flex-1 h-11 border-2 flex items-center justify-center font-bold text-sm transition-all cursor-pointer ${selectedSize === size
                        ? "border-morocco-dark bg-morocco-dark text-white"
                        : "border-morocco-neutral hover:border-morocco-dark/50 text-morocco-dark"}`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Buttons - Always Visible */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <button
                onClick={handleAddToCart}
                className="bg-morocco-red text-white h-14 font-bold uppercase tracking-wider hover:bg-morocco-dark transition-all cursor-pointer"
              >
                {t.add_to_cart}
              </button>
              <button
                onClick={handleBuyNow}
                className="bg-morocco-dark text-white h-14 font-bold uppercase tracking-wider hover:bg-morocco-green transition-all cursor-pointer"
              >
                {t.checkout}
              </button>
            </div>

            {/* Feature Badges - Below buttons */}
            <div className="flex justify-between items-start gap-4 py-6 border-t border-dashed border-morocco-neutral">
              <div className="flex flex-col items-center text-center flex-1">
                <TbTruck size={20} className="mb-1 text-morocco-dark" />
                <span className="font-medium text-morocco-dark text-[10px]">{t.free_delivery}</span>
              </div>
              <div className="flex flex-col items-center text-center flex-1">
                <TbRefresh size={20} className="mb-1 text-morocco-dark" />
                <span className="font-medium text-morocco-dark text-[10px]">{t.exchange_policy}</span>
              </div>
              <div className="flex flex-col items-center text-center flex-1">
                <TbCash size={20} className="mb-1 text-morocco-dark" />
                <span className="font-medium text-morocco-dark text-[10px]">{t.cash_on_delivery}</span>
              </div>
            </div>

            {/* Country Switcher - Secondary info below */}
            <div className="py-4 border-t border-dashed border-morocco-neutral">
              <span className="text-xs text-morocco-dark/50 uppercase tracking-wider mb-3 block">Other Countries</span>
              <div className="flex flex-wrap gap-2">
                {countries.map((c) => {
                  const countryProduct = products.find(
                    (p) => p.country === c.name && p.category === "Hoodie"
                  );
                  if (!countryProduct) return null;
                  const isActive = product.country === c.name;
                  return (
                    <Link
                      key={c.code}
                      href={`/product/${countryProduct.id}`}
                      className={`flex-shrink-0 relative w-8 h-8 rounded-full overflow-hidden border-2 transition-all duration-200 ${isActive
                        ? "border-morocco-red scale-110"
                        : "border-morocco-neutral/50 hover:border-morocco-gold hover:scale-105 opacity-60 hover:opacity-100"
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

            {/* Description - Compact */}
            <div className="py-4 border-t border-2 border-dashed border-morocco-neutral">
              <h3 className="font-bold text-morocco-dark mb-2 text-xs uppercase tracking-wider">
                {t.product_description_title}
              </h3>
              <p className="text-morocco-dark/60 text-sm leading-relaxed">
                {t.product_description}
              </p>
            </div>

            {/* Product Details - Compact */}
            <div className="py-4 border-t border-dashed border-morocco-neutral">
              <h3 className="font-bold text-morocco-dark mb-2 text-xs uppercase tracking-wider">
                {t.product_details_title}
              </h3>
              <ul className="space-y-1 text-morocco-dark/60 text-sm">
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;

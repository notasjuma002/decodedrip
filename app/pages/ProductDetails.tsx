import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { products } from '@/app/data/products';
import { useStore } from '@/app/store/useStore';
import { locales } from '@/app/locales';

const ProductDetails: React.FC = () => {
    const params = useParams();
    const id = params?.id as string;
    const router = useRouter();
    const { addToCart, language } = useStore();
    const t = locales[language].common;
    const navT = locales[language].nav;

    const product = products.find(p => p.id === id);

    const [selectedColor, setSelectedColor] = useState<'Black' | 'White'>('Black');
    const [selectedSize] = useState<string>('XL'); // Fixed to XL
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [quantity, setQuantity] = useState(1);

    // Reset state when product changes
    useEffect(() => {
        if (product) {
            setCurrentImageIndex(0);
            setSelectedColor('Black');
        }
    }, [product]);

    if (!product) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <p className="text-2xl text-morocco-dark mb-4">Product not found</p>
                    <Link href="/shop" className="text-morocco-red hover:underline">{navT.shop}</Link>
                </div>
            </div>
        );
    }

    // Different images for each color variant
    const blackImages = product.images && product.images.length > 0 ? product.images : [product.image];
    const whiteImages = product.images && product.images.length > 1 ? [product.images[1], product.images[2] || product.images[0]] : [product.image];

    // Get current images based on selected color
    const currentImages = selectedColor === 'Black' ? blackImages : whiteImages;

    // 2 Color variants only
    const colors = [
        { name: 'Black', bgClass: 'bg-black' },
        { name: 'White', bgClass: 'bg-white border-2 border-morocco-dark/20' }
    ];

    const handleColorChange = (color: 'Black' | 'White') => {
        setSelectedColor(color);
        setCurrentImageIndex(0); // Reset to first image when switching colors
    };

    const handleAddToCart = () => {
        addToCart(product, selectedColor, selectedSize, quantity);
    };

    const handleBuyNow = () => {
        addToCart(product, selectedColor, selectedSize, quantity);
        router.push('/checkout');
    };

    const nextImage = () => {
        setCurrentImageIndex((prev) => (prev + 1) % currentImages.length);
    };

    const prevImage = () => {
        setCurrentImageIndex((prev) => (prev - 1 + currentImages.length) % currentImages.length);
    };

    return (
        <div className="bg-white min-h-screen pb-20">
            {/* Breadcrumb */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 text-sm text-morocco-dark/50">
                <Link href="/" className="hover:text-morocco-red">{navT.home}</Link>
                <span className="mx-2">›</span>
                <Link href="/shop" className="hover:text-morocco-red">{navT.shop}</Link>
                <span className="mx-2">›</span>
                <span className="text-morocco-dark font-medium">{product.name[language]}</span>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <div className="grid lg:grid-cols-2 gap-12">

                    {/* LEFT: Square Image Gallery */}
                    <div className="flex flex-col gap-4">
                        {/* Main Image - Square */}
                        <div className="relative aspect-square w-full bg-morocco-neutral/20 overflow-hidden rounded-xl group shadow-lg">
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
                                        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 rounded-full flex items-center justify-center text-morocco-dark opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white shadow-lg"
                                    >
                                        <FaArrowLeft size={16} />
                                    </button>
                                    <button
                                        onClick={nextImage}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 rounded-full flex items-center justify-center text-morocco-dark opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white shadow-lg"
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
                                        className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${currentImageIndex === idx ? 'border-morocco-gold ring-2 ring-morocco-gold/30' : 'border-transparent opacity-70 hover:opacity-100'}`}
                                    >
                                        <img src={img} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover" />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* RIGHT: Product Details */}
                    <div className="flex flex-col">

                        {/* Category & Title */}
                        <span className="text-sm text-morocco-dark/50 uppercase tracking-wider mb-3">{product.category}</span>
                        <h1 className="text-4xl md:text-5xl font-bold text-morocco-dark leading-tight mb-6">
                            {product.name[language]}
                        </h1>

                        {/* Fixed Price Only */}
                        <div className="mb-8 pb-6 border-b border-morocco-neutral">
                            <div className="flex items-baseline gap-2">
                                <span className="text-4xl font-bold text-morocco-dark">
                                    {product.price}
                                </span>
                                <span className="text-xl text-morocco-dark/60 font-medium">MAD</span>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="mb-8">
                            <h3 className="font-bold text-morocco-dark mb-3 text-sm uppercase tracking-wider">Description</h3>
                            <p className="text-morocco-dark/70 leading-relaxed">
                                {product.description[language]}
                            </p>
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
                                        onClick={() => handleColorChange(color.name as 'Black' | 'White')}
                                        className={`w-14 h-14 rounded-xl border-2 flex items-center justify-center transition-all cursor-pointer ${selectedColor === color.name ? 'border-morocco-dark ring-2 ring-morocco-dark/30 scale-110' : 'border-morocco-neutral hover:border-morocco-dark/50 hover:scale-105'}`}
                                    >
                                        <div className={`w-10 h-10 rounded-lg ${color.bgClass}`} />
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
                                    className="w-12 h-12 rounded-xl border-2 border-morocco-neutral hover:border-morocco-dark flex items-center justify-center text-xl font-bold text-morocco-dark transition-all hover:bg-morocco-neutral"
                                >
                                    −
                                </button>
                                <span className="text-2xl font-bold text-morocco-dark min-w-[3rem] text-center">{quantity}</span>
                                <button
                                    onClick={() => setQuantity(quantity + 1)}
                                    className="w-12 h-12 rounded-xl border-2 border-morocco-neutral hover:border-morocco-dark flex items-center justify-center text-xl font-bold text-morocco-dark transition-all hover:bg-morocco-neutral"
                                >
                                    +
                                </button>
                            </div>
                        </div>

                        {/* Size Display - XL Only */}
                        <div className="mb-10">
                            <div className="flex items-center gap-2 mb-4">
                                <span className="font-bold text-morocco-dark">Size:</span>
                                <span className="font-bold text-morocco-dark">XL</span>
                            </div>
                            <div className="bg-morocco-neutral/30 border border-morocco-neutral rounded-xl px-6 py-4 inline-block">
                                <span className="text-sm font-bold text-morocco-dark">Available Size: XL</span>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="grid grid-cols-2 gap-4">
                            <button
                                onClick={handleAddToCart}
                                className="bg-morocco-red text-white h-16 rounded-xl font-bold uppercase tracking-wider hover:bg-morocco-dark transition-all shadow-lg hover:shadow-xl"
                            >
                                {t.add_to_cart}
                            </button>
                            <button
                                onClick={handleBuyNow}
                                className="bg-morocco-dark text-white h-16 rounded-xl font-bold uppercase tracking-wider hover:bg-morocco-green transition-all shadow-lg hover:shadow-xl"
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
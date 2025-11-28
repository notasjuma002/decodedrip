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
    const [selectedSize, setSelectedSize] = useState<string>('M');
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [quantity, setQuantity] = useState(1);

    // Reset state when product changes
    useEffect(() => {
        if (product) {
            setCurrentImageIndex(0);
            setQuantity(1);
            setSelectedSize('M');
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

    const images = product.images && product.images.length > 0 ? product.images : [product.image];
    const sizes = ['S', 'M', 'L', 'XL', 'XXL', '3XL'];

    // 3 Color variants
    const colors = [
        { name: 'Black', bgClass: 'bg-black' },
        { name: 'White', bgClass: 'bg-white border-2 border-morocco-dark/20' },
        { name: 'Red', bgClass: 'bg-morocco-red' }
    ];

    const handleAddToCart = () => {
        addToCart(product, selectedColor, selectedSize, quantity);
    };

    const handleBuyNow = () => {
        addToCart(product, selectedColor, selectedSize, quantity);
        router.push('/checkout');
    };

    const nextImage = () => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
    };

    const prevImage = () => {
        setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
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
                                src={images[currentImageIndex]}
                                alt={product.name[language]}
                                className="w-full h-full object-cover transition-transform duration-500"
                            />

                            {/* Navigation Arrows */}
                            {images.length > 1 && (
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
                        {images.length > 1 && (
                            <div className="grid grid-cols-4 gap-3">
                                {images.map((img, idx) => (
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

                        {/* Color Selection - 3 Variants */}
                        <div className="mb-8">
                            <div className="flex items-center gap-2 mb-4">
                                <span className="font-bold text-morocco-dark">Color:</span>
                                <span className="text-morocco-dark/70">{selectedColor}</span>
                            </div>
                            <div className="flex gap-3">
                                {colors.map((color) => (
                                    <button
                                        key={color.name}
                                        onClick={() => setSelectedColor(color.name as 'Black' | 'White')}
                                        className={`w-14 h-14 rounded-xl border-2 flex items-center justify-center transition-all ${selectedColor === color.name ? 'border-morocco-dark ring-2 ring-morocco-dark/30' : 'border-morocco-neutral hover:border-morocco-dark/50'}`}
                                    >
                                        <div className={`w-10 h-10 rounded-lg ${color.bgClass}`} />
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Size Selection */}
                        <div className="mb-10">
                            <div className="flex justify-between items-center mb-4">
                                <div className="flex gap-2">
                                    <span className="font-bold text-morocco-dark">Size:</span>
                                    <span className="font-bold text-morocco-dark">{selectedSize}</span>
                                </div>
                                <button className="text-xs underline text-morocco-dark/60 hover:text-morocco-red">
                                    {t.size_guide}
                                </button>
                            </div>
                            <div className="flex flex-wrap gap-3">
                                {sizes.map((size) => (
                                    <button
                                        key={size}
                                        onClick={() => setSelectedSize(size)}
                                        className={`min-w-[3.5rem] h-14 px-3 rounded-xl border-2 text-sm font-bold flex items-center justify-center transition-all ${selectedSize === size
                                            ? 'bg-morocco-dark text-white border-morocco-dark shadow-lg'
                                            : 'bg-white text-morocco-dark border-morocco-neutral hover:border-morocco-dark/50'
                                            }`}
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
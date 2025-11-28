import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaPlus, FaMinus, FaArrowRight } from 'react-icons/fa';
import { useStore } from '@/app/store/useStore';
import { products } from '@/app/data/products';
import { locales } from '@/app/locales';
import ProductCard from '@/app/components/ProductCard';

const Home: React.FC = () => {
  const { language } = useStore();
  const t = locales[language];
  const featuredProducts = products.filter(p => p.isFeatured).slice(0, 3);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  const faqs = [
    { question: t.faq.q1, answer: t.faq.a1 },
    { question: t.faq.q2, answer: t.faq.a2 },
    { question: t.faq.q3, answer: t.faq.a3 },
    { question: t.faq.q4, answer: t.faq.a4 }
  ];

  useEffect(() => {
    // Target: Dec 21, 2025
    const targetDate = new Date('2025-12-21T20:00:00').getTime();

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        clearInterval(timer);
      } else {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Full Screen Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="/hero.webp"
            alt="Morocco Stadium"
            className="w-full h-full object-cover object-center"
          />
          {/* Dark Overlay for Text Readability */}
          <div className="absolute inset-0 bg-black/40"></div>
          {/* Gradient at the bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black/80 to-transparent"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 text-center">
          <div className="max-w-5xl mx-auto flex flex-col items-center">

            {/* HERO COUNTDOWN - Compact */}
            <div className="mb-6 flex flex-col items-center animate-fadeIn">
              <span className="text-morocco-gold uppercase tracking-[0.3em] text-xs font-bold mb-3">{t.nav.launch}</span>
              <div className="flex items-center gap-3 md:gap-6 text-white font-serif">
                <div className="flex flex-col items-center">
                  <span className="text-2xl md:text-4xl font-bold">{timeLeft.days}</span>
                  <span className="text-[10px] uppercase opacity-60 tracking-wider">Days</span>
                </div>
                <span className="text-xl md:text-2xl text-morocco-gold/60 -mt-3">:</span>
                <div className="flex flex-col items-center">
                  <span className="text-2xl md:text-4xl font-bold">{timeLeft.hours}</span>
                  <span className="text-[10px] uppercase opacity-60 tracking-wider">Hrs</span>
                </div>
                <span className="text-xl md:text-2xl text-morocco-gold/60 -mt-3">:</span>
                <div className="flex flex-col items-center">
                  <span className="text-2xl md:text-4xl font-bold">{timeLeft.minutes}</span>
                  <span className="text-[10px] uppercase opacity-60 tracking-wider">Min</span>
                </div>
                <span className="text-xl md:text-2xl text-morocco-gold/60 -mt-3">:</span>
                <div className="flex flex-col items-center">
                  <span className="text-2xl md:text-4xl font-bold">{timeLeft.seconds}</span>
                  <span className="text-[10px] uppercase opacity-60 tracking-wider">Sec</span>
                </div>
              </div>
            </div>

            {/* Headline - Scaled Down to prevent crowding */}
            <h1 className="text-4xl md:text-6xl font-bold text-white leading-none tracking-tight font-sans uppercase mb-6 drop-shadow-2xl">
              {t.hero.headline}
            </h1>

            {/* Subtext Restored */}
            <p className="text-lg md:text-xl text-white/90 font-medium max-w-2xl mx-auto mb-10 drop-shadow-md">
              {t.hero.subtext}
            </p>

            {/* Custom Moroccan Split Button */}
            <div className="flex justify-center mt-4">
              <Link
                href="/shop"
                className="group relative inline-flex items-stretch shadow-2xl transform transition-transform duration-300 hover:-translate-y-1"
              >
                {/* Left Part: Text (Red) */}
                <div className="bg-morocco-red text-white px-8 py-4 flex items-center justify-center z-10 clip-path-left transition-colors group-hover:bg-[#8B2428]">
                  <span className="text-base md:text-lg tracking-widest uppercase font-bold whitespace-nowrap">
                    {t.hero.cta_primary}
                  </span>
                </div>

                {/* Right Part: Icon (Green) */}
                <div className="bg-morocco-green text-white px-6 py-4 flex items-center justify-center relative -ml-4 pl-8 clip-path-right transition-colors group-hover:bg-[#095239]">
                  <FaArrowRight size={18} className="transform -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                </div>
              </Link>
            </div>

            {/* CSS for clip-paths (Inline style injected for simplicity in this component) */}
            <style>{`
              .clip-path-left {
                clip-path: polygon(0 0, 100% 0, 85% 100%, 0% 100%);
              }
              .clip-path-right {
                clip-path: polygon(15% 0, 100% 0, 100% 100%, 0% 100%);
              }
              /* RTL adjustments */
              [dir="rtl"] .clip-path-left {
                 clip-path: polygon(0 0, 100% 0, 100% 100%, 15% 100%);
              }
              [dir="rtl"] .clip-path-right {
                 clip-path: polygon(0 0, 85% 0, 100% 100%, 0% 100%);
              }
              [dir="rtl"] .group .bg-morocco-green {
                 margin-left: 0;
                 margin-right: -1rem;
                 padding-left: 1.5rem;
                 padding-right: 2rem;
              }
            `}</style>

          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-morocco-dark uppercase tracking-widest">{t.common.featured}</h2>
            <div className="w-12 h-0.5 bg-morocco-gold mx-auto mt-4"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Showcase / Passion Section - UPDATED */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden bg-morocco-dark">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=2070&auto=format&fit=crop"
            alt="Fans"
            className="w-full h-full object-cover"
          />
          {/* Red Multiply Overlay */}
          <div className="absolute inset-0 bg-morocco-red/80 mix-blend-multiply opacity-80"></div>
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        </div>

        <div className="relative z-10 text-center max-w-4xl px-6 text-white animate-fadeIn">
          <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-widest mb-6 font-serif drop-shadow-xl">{t.common.authentic}</h2>
          <p className="text-lg md:text-2xl font-medium opacity-90 leading-relaxed mb-8 drop-shadow-md">{t.common.authentic_desc}</p>
          <div className="inline-block border border-white/30 bg-white/10 backdrop-blur text-white px-8 py-2 uppercase tracking-[0.2em] text-xs font-bold rounded-full">
            {t.common.licensed}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-morocco-neutral">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-morocco-dark uppercase tracking-widest mb-12">{t.faq.title}</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-morocco-dark/10">
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex justify-between items-center py-4 text-left rtl:text-right font-medium text-morocco-dark hover:text-morocco-red transition-colors"
                >
                  <span>{faq.question}</span>
                  {openFaq === index ? <FaMinus size={12} /> : <FaPlus size={12} />}
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${openFaq === index ? 'max-h-40 pb-4' : 'max-h-0'}`}>
                  <p className="text-morocco-dark/60 text-sm">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-24 bg-white border-t border-morocco-gold/20">
        <div className="max-w-xl mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold text-morocco-dark mb-4">{t.common.newsletter_title}</h3>
          <p className="text-morocco-dark/60 mb-8">{t.common.newsletter_desc}</p>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Email Address"
              className="flex-1 bg-morocco-neutral border-none p-4 text-sm focus:ring-1 focus:ring-morocco-gold outline-none"
            />
            <button className="bg-morocco-dark text-white px-6 py-4 text-sm font-bold uppercase tracking-widest hover:bg-morocco-red transition-colors">
              {t.common.subscribe}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
'use client';

import React from 'react';
import { FaTimes, FaTrash } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { useStore } from '@/app/store/useStore';
import { locales } from '@/app/locales';

const CartDrawer: React.FC = () => {
  const { cart, isCartOpen, toggleCart, removeFromCart, getCartTotal, language } = useStore();
  const router = useRouter();
  const t = locales[language];

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-morocco-dark/40 backdrop-blur-sm transition-opacity"
        onClick={() => toggleCart(false)}
      />

      {/* Drawer */}
      <div className="relative w-full max-w-md bg-morocco-neutral h-full shadow-2xl flex flex-col transform transition-transform duration-300 ease-out animate-slideIn">

        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-morocco-dark/10 bg-morocco-neutral">
          <h2 className="text-xl font-serif font-bold text-morocco-red">{t.cart.title}</h2>
          <button onClick={() => toggleCart(false)} className="text-morocco-dark hover:text-morocco-red">
            <FaTimes size={24} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-morocco-dark/50 space-y-4">
              <span className="text-lg">{t.cart.empty}</span>
              <button
                onClick={() => { toggleCart(false); router.push('/shop'); }}
                className="text-morocco-red underline hover:text-morocco-dark"
              >
                {t.nav.shop}
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.cartId} className="flex gap-4 p-4 border border-morocco-gold/20 rounded bg-white/50">
                <img src={item.image} alt={item.name[language]} className="w-20 h-20 object-cover rounded bg-morocco-neutral" />
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-semibold text-morocco-dark">{item.name[language]}</h3>
                    <div className="flex flex-wrap gap-x-3 text-sm text-morocco-dark/60 mt-1">
                      <p>{t.common.color}: {item.selectedColor}</p>
                      <p>{t.common.size}: {item.selectedSize}</p>
                    </div>
                    <p className="text-sm text-morocco-dark/60">{t.common.quantity}: {item.quantity}</p>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <span className="font-bold text-morocco-green">{item.price * item.quantity} MAD</span>
                    <button
                      onClick={() => removeFromCart(item.cartId)}
                      className="text-morocco-red/70 hover:text-morocco-red p-1"
                    >
                      <FaTrash size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="p-6 border-t border-morocco-dark/10 bg-white/50">
            <div className="flex justify-between items-center mb-6 text-lg font-bold text-morocco-dark">
              <span>{t.cart.subtotal}</span>
              <span>{getCartTotal()} MAD</span>
            </div>
            <button
              onClick={() => { toggleCart(false); router.push('/checkout'); }}
              className="w-full bg-morocco-green text-white py-4 font-bold tracking-wider hover:bg-morocco-dark transition-colors"
            >
              {t.cart.proceed}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem, Product, Language } from '@/app/types';

interface AppState {
  cart: CartItem[];
  language: Language;
  isCartOpen: boolean;

  // Actions
  setLanguage: (lang: Language) => void;
  toggleCart: (isOpen?: boolean) => void;
  addToCart: (product: Product, color: 'Black' | 'White', size: string, quantity: number) => void;
  removeFromCart: (cartId: string) => void;
  clearCart: () => void;
  getCartTotal: () => number;
}

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      cart: [],
      language: 'en',
      isCartOpen: false,

      setLanguage: (lang) => set({ language: lang }),

      toggleCart: (isOpen) => set((state) => ({
        isCartOpen: isOpen !== undefined ? isOpen : !state.isCartOpen
      })),

      addToCart: (product, color, size, quantity) => set((state) => {
        const existingItemIndex = state.cart.findIndex(
          (item) => item.id === product.id && item.selectedColor === color && item.selectedSize === size
        );

        if (existingItemIndex > -1) {
          // Update quantity if exact item exists
          const newCart = [...state.cart];
          newCart[existingItemIndex].quantity += quantity;
          return { cart: newCart, isCartOpen: true };
        } else {
          // Add new item
          const newItem: CartItem = {
            ...product,
            selectedColor: color,
            selectedSize: size,
            quantity,
            cartId: `${product.id}-${color}-${size}-${Date.now()}`
          };
          return { cart: [...state.cart, newItem], isCartOpen: true };
        }
      }),

      removeFromCart: (cartId) => set((state) => ({
        cart: state.cart.filter(item => item.cartId !== cartId)
      })),

      clearCart: () => set({ cart: [] }),

      getCartTotal: () => {
        const { cart } = get();
        return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
      }
    }),
    {
      name: 'atlas-lions-store',
      partialize: (state) => ({ cart: state.cart, language: state.language }),
    }
  )
);
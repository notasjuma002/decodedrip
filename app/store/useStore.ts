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
  updateQuantity: (cartId: string, newQuantity: number) => void;
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
        // Calculate the effective price based on color selection
        const effectivePrice = color === 'Black'
          ? (product.priceBlack ?? product.price)
          : (product.priceWhite ?? product.price);

        const existingItemIndex = state.cart.findIndex(
          (item) => item.id === product.id && item.selectedColor === color && item.selectedSize === size
        );

        if (existingItemIndex > -1) {
          // Update quantity if exact item exists
          const newCart = [...state.cart];
          newCart[existingItemIndex].quantity += quantity;
          return { cart: newCart };
        } else {
          // Add new item
          const newItem: CartItem = {
            ...product,
            selectedColor: color,
            selectedSize: size,
            quantity,
            effectivePrice,
            cartId: `${product.id}-${color}-${size}-${Date.now()}`
          };
          return { cart: [...state.cart, newItem] };
        }
      }),

      removeFromCart: (cartId) => set((state) => ({
        cart: state.cart.filter(item => item.cartId !== cartId)
      })),

      updateQuantity: (cartId, newQuantity) => set((state) => {
        if (newQuantity < 0) {
          newQuantity = 0;
        }
        const newCart = state.cart.map(item =>
          item.cartId === cartId ? { ...item, quantity: newQuantity } : item
        );
        return { cart: newCart };
      }),

      clearCart: () => set({ cart: [] }),

      getCartTotal: () => {
        const { cart } = get();
        return cart.reduce((total, item) => total + (item.effectivePrice * item.quantity), 0);
      }
    }),
    {
      name: 'atlas-lions-store',
      partialize: (state) => ({ cart: state.cart, language: state.language }),
    }
  )
);
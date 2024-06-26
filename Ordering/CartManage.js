import { create } from 'zustand';

const useCartStore = create((set) => ({
  cart: [],
  addToCart: (drink) => set((state) => ({ cart: [...state.cart, drink] })),
  removeFromCart: (drink) => set((state) => ({
    cart: state.cart.filter((item) => item.id !== drink.id),
  })),
}));

export default useCartStore;



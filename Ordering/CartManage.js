import { create } from 'zustand';

const useCartStore = create((set) => ({
  cart: [],
  addToCart: (drink) => set((state) => {
    const existingItem = state.cart.find((item) => item.drink.id === drink.id);
    if (existingItem) {
      return {
        cart: state.cart.map((item) =>
          item.drink.id === drink.id ? { ...item, quantity: item.quantity + 1 } : item
        ),
      };
    }
    return { cart: [...state.cart, { drink, quantity: 1 }] };
  }),
  removeFromCart: (drink) => set((state) => ({
    cart: state.cart.filter((item) => item.drink.id !== drink.id),
  })),
  decreaseQuantity: (drink) => set((state) => ({
    cart: state.cart.map((item) =>
      item.drink.id === drink.id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
    ),
  })),
  getSubtotal: (cart) => {
    
    return cart.reduce((total, item) => total + item.drink.price * item.quantity, 0);
  },
}));

export default useCartStore;



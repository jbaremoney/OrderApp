import { create } from 'zustand';

const useCartStore = create((set) => ({
  bar: "",
  setBar: (barId) => set(() => ({ bar: barId })),
  cart: [],
  clearCart: () => set(() => ({ cart: [], bar: "" })),
  addToCart: (drink, barId) => set((state) => {
    if (state.bar && state.bar !== barId) {
      throw new Error('You can only order from one bar at a time. Would you like to clear the cart?');
    }

    const existingItem = state.cart.find((item) => item.drink.id === drink.id);
    if (existingItem) {
      return {
        cart: state.cart.map((item) =>
          item.drink.id === drink.id ? { ...item, quantity: item.quantity + 1 } : item
        ),
      };
    }
    return { cart: [...state.cart, { drink, quantity: 1 }], bar: barId };
  }),
  removeFromCart: (drink) => set((state) => {
    const updatedCart = state.cart.filter((item) => item.drink.id !== drink.id);
    return {
      cart: updatedCart,
      bar: updatedCart.length === 0 ? "" : state.bar,
    };
  }),
  decreaseQuantity: (drink) => set((state) => {
    const updatedCart = state.cart.map((item) =>
      item.drink.id === drink.id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
    ).filter((item) => item.quantity > 0);

    return {
      cart: updatedCart,
      bar: updatedCart.length === 0 ? "" : state.bar,
    };
  }),
  getSubtotal: (cart) => {
    return cart.reduce((total, item) => total + item.drink.price * item.quantity, 0);
  },
}));

export default useCartStore;

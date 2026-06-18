import { create } from "zustand";
import { persist } from "zustand/middleware";
import toast from "react-hot-toast";

const useStore = create(
  persist(
    (set) => ({
      cart: [],
      wishlist: [],

      addTocart: (product) =>
        set((state) => {
          const exist = state.cart.find(
            (item) => item.id === product.id
          );

          if (exist) {
            toast.success(`${product.name} quantity increased`);

            return {
              cart: state.cart.map((item) =>
                item.id === product.id
                  ? {
                      ...item,
                      quantity: item.quantity + 1,
                    }
                  : item
              ),
            };
          }

          toast.success(`${product.name} added to cart`);

          return {
            cart: [...state.cart, { ...product, quantity: 1 }],
          };
        }),

      addToWishlist: (product) =>
        set((state) => {
          const exist = state.wishlist.find(
            (item) => item.id === product.id
          );

          if (exist) {
            toast.error(`${product.name} removed from wishlist`);

            return {
              wishlist: state.wishlist.filter(
                (item) => item.id !== product.id
              ),
            };
          }

          toast.success(`${product.name} added to wishlist`);

          return {
            wishlist: [...state.wishlist, product],
          };
        }),

      increasePopulation: (id) =>
        set((state) => {
          const product = state.cart.find(
            (item) => item.id === id
          );

          if (product) {
            toast.success(`${product.name} quantity increased`);
          }

          return {
            cart: state.cart.map((item) =>
              item.id === id
                ? {
                    ...item,
                    quantity: item.quantity + 1,
                  }
                : item
            ),
          };
        }),

      decreasePopulation: (id) =>
        set((state) => {
          const product = state.cart.find(
            (item) => item.id === id
          );

          if (!product) return state;

          if (product.quantity === 1) {
            toast.error(`${product.name} removed from cart`);
          } else {
            toast.success(`${product.name} quantity decreased`);
          }

          return {
            cart: state.cart
              .map((item) =>
                item.id === id
                  ? {
                      ...item,
                      quantity: item.quantity - 1,
                    }
                  : item
              )
              .filter((item) => item.quantity > 0),
          };
        }),
    }),
    {
      name: "cart-storage",
    }
  )
);

export default useStore;
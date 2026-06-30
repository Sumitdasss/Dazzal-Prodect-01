import { create } from "zustand";
import { persist } from "zustand/middleware";
import toast from "react-hot-toast";

const useStore = create(
  persist(
    (set) => ({
      cart: [],
      wishlist: [],

      users: [],

      user: null,
      register: (newUser) => {
        set((state) => ({
          users: [...state.users, newUser],
        }));
        toast.success("Account created successfully!");
      },

      login: (email, password) => {
        let success = false;

        set((state) => {
          const foundUser = state.users.find(
            (u) => u.email === email && u.password === password,
          );

          if (foundUser) {
            success = true;

            toast.success("Login successful!");

            return {
              user: foundUser,
            };
          } else {
            toast.error("Invalid email or password!");

            return {
              user: null,
            };
          }
        });

        return success;
      },
      logout: () => {
        set({
          user: null,
          
        });

        toast.success("Logout successfully!");
      },
      logoutDelet: () => {
        set({
          users: [],
          user: null,
          cart: [],
          wishlist: [],
        });

        toast.success("Account deleted successfully!");
      },

      addTocart: (product) =>
        set((state) => {
          if (!state.user) {
            toast.error("Please login first");

            return state;
          }

          const exist = state.cart.find((item) => item.id === product.id);

          if (exist) {
            toast.success(`${product.name} quantity increased`);

            return {
              cart: state.cart.map((item) =>
                item.id === product.id
                  ? {
                      ...item,
                      quantity: item.quantity + 1,
                    }
                  : item,
              ),
            };
          }

          toast.success(`${product.name} added to cart`);

          return {
            cart: [
              ...state.cart,
              {
                ...product,
                quantity: 1,
              },
            ],
          };
        }),

      addToWishlist: (product) =>
        set((state) => {
          const exist = state.wishlist.find((item) => item.id === product.id);

          if (exist) {
            toast.error(`${product.name} removed from wishlist`);

            return {
              wishlist: state.wishlist.filter((item) => item.id !== product.id),
            };
          }

          toast.success(`${product.name} added to wishlist`);

          return {
            wishlist: [...state.wishlist, product],
          };
        }),

      increasePopulation: (id) =>
        set((state) => {
          const product = state.cart.find((item) => item.id === id);

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
                : item,
            ),
          };
        }),

      removeFromCart: (id) =>
        set((state) => {
          const product = state.cart.find((item) => item.id == id);

          if (product) {
            toast.error(`${product.name} removed from cart`);
          }

          return {
            cart: state.cart.filter((item) => item.id != id),
          };
        }),

      decreasePopulation: (id) =>
        set((state) => {
          const product = state.cart.find((item) => item.id === id);

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
                  : item,
              )
              .filter((item) => item.quantity > 0),
          };
        }),
    }),
    {
      name: "cart-storage",
    },
  ),
);

export default useStore;

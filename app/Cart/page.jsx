"use client";
import Link from "next/link";
import useStore from "../Componant/Layout/Store/store";

const Cartpage = () => {
  const { cart, increasePopulation, decreasePopulation } = useStore();

  const total = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <section className="w-full max-w-360 mx-auto py-6 md:py-10 px-4">

      {/* Header (Desktop only) */}
      <div className="hidden md:grid grid-cols-4 bg-white shadow-sm rounded-md px-6 py-5 font-medium mb-6">
        <p>Product</p>
        <p>Price</p>
        <p>Quantity</p>
        <p className="text-right">Subtotal</p>
      </div>

      {/* Cart Items */}
      {cart.map((item, index) => {
const discountAmount =
            (item.originalPrice * item.discountPercentage) / 100;

          const finalPrice =item.originalPrice - discountAmount;
        return(
          <div
          key={index}
          className="bg-white shadow-sm rounded-md p-4 md:px-6 md:py-5 mb-4 md:mb-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:items-center">

            {/* Product */}
            <div className="flex items-center gap-4">
              <Link href={`/DetailPage/${item.id}`}>
                <img src={item.img} alt={item.name} className="w-14 md:w-16" />
              </Link>
              <p className="text-sm md:text-base">{item.name}</p>
            </div>

            {/* Price */}
            <p className="text-sm md:text-base">
              <span className="md:hidden font-semibold">Price: </span>
              ${finalPrice}
            </p>

            {/* Quantity */}
            <div className="flex items-center md:justify-start">
              <button
                className="border px-3 py-1 rounded-l-md"
                onClick={() => decreasePopulation(item.id)}
              >
                -
              </button>
              <span className="border-t border-b px-4 py-1">
                {item.quantity}
              </span>
              <button
                className="border px-3 py-1 rounded-r-md"
                onClick={() => increasePopulation(item.id)}
              >
                +
              </button>
            </div>

            {/* Subtotal */}
            <p className="text-sm md:text-base md:text-right">
              <span className="md:hidden font-semibold">Subtotal: </span>
              ${item.price * item.quantity}
            </p>
          </div>
        </div>
        )
      }
        
      )}

      {/* Buttons */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-10">
        <Link href="/Shop">
          <button className="w-full md:w-auto border px-6 py-3 rounded-md font-medium">
            Return To Shop
          </button>
        </Link>

        <Link href="/Shop">
          <button className="w-full md:w-auto border px-6 py-3 rounded-md font-medium">
            Update Cart
          </button>
        </Link>
      </div>

      {/* Bottom Section */}
      <div className="flex flex-col lg:flex-row gap-8 justify-between">

        {/* Coupon */}
        <div className="flex  gap-3 ">
          <input
            type="text"
            placeholder="Coupon Code"
            className="border pl-1 h-15 md:h-15 rounded-md outline-none"
          />

          <button className="bg-red-500 text-white px-6 h-15 md:h-15 rounded-md">
            Apply Coupon
          </button>
        </div>

        {/* Total */}
        <div className="border rounded-md p-6 w-full max-w-md">
          <h2 className="text-xl md:text-2xl font-semibold mb-6">
            Cart Total
          </h2>

          <div className="flex justify-between border-b pb-3 mb-3">
            <p>Subtotal:</p>
            <p>${total}</p>
          </div>

          <div className="flex justify-between border-b pb-3 mb-3">
            <p>Shipping:</p>
            <p>Free</p>
          </div>

          <div className="flex justify-between mb-6 font-semibold">
            <p>Total:</p>
            <p>${total}</p>
          </div>

          <Link href="/checkout">
            <button className="w-full bg-red-500 text-white py-3 rounded-md">
              Proceed to Checkout
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Cartpage;
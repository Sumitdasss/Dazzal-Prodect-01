"use"

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import Countdown from "./Time"
import  useStore  from "../../Componant/Layout/Store/store";
import {products} from "../../../Data/Data"
import { FaHeart, FaBalanceScale } from "react-icons/fa";

import "swiper/css";
import "swiper/css/navigation";
import Link from "next/link";
import { useState } from "react";

const FlashSale = () => {
  const [hoveredId, setHoveredId] = useState(null);
  const {addTocart}=useStore();
  return (
    <section className="max-w-[1440px] mx-auto px-4 md:px-0  my-10">
      <div className="bg-gradient-to-r from-[#E7D4BF] to-[#D89A56] rounded-2xl p-6">

        <div className="flex flex-col lg:flex-row justify-between gap-5 mb-6">

          <h2 className="text-xl lg:text-2xl font-bold leading-tight">
            🔥 Flash Sale ~ Guaranteed Lowest Price |
            Replacement Guarantee | Free Delivery
          </h2>

          <div className="flex items-center gap-3">
            <Countdown/>

            <a href="/Shop" className="bg-white px-5 py-2 rounded-lg font-medium">
              SEE ALL
            </a>
          </div>
        </div>

      <div className=" ">
              <div className="relative group overflow-hidden rounded-xl ">
            <Swiper
  modules={[Navigation, Autoplay]}

  loop={true}
  
  autoplay={{
    delay: 3000,
    disableOnInteraction: false,
  }}

  navigation={{
                    nextEl: ".swiper-button-next-custom",
                    prevEl: ".swiper-button-prev-custom",
                  }}
  spaceBetween={20}
  breakpoints={{
    0: {
      slidesPerView: 1,
    },
    640: {
      slidesPerView: 2,
    },
    768: {
      slidesPerView: 3,
    },
    1024: {
      slidesPerView: 4,
    },
    1280: {
      slidesPerView: 6,
    },
  }}
>
  {products.map((product) => (
    <SwiperSlide key={product.id}>
      <div  onMouseEnter={() => setHoveredId(product.id)}
  onMouseLeave={() => setHoveredId(null)} className="bg-white rounded-lg h-full shadow-sm hover:shadow-lg duration-300 relative overflow-hidden group">
 <div className={`absolute top-4 right-3 flex flex-col gap-2 z-20 transition-all duration-300 ${
    hoveredId === product.id
      ? "opacity-100 translate-x-0"
      : "opacity-0 translate-x-12"
  }`}>
  <button className="w-10 h-10 cursor-pointer bg-white shadow-md rounded-full flex items-center justify-center hover:bg-red-500 hover:text-white">
    <FaHeart size={16} />
  </button>

  <button className="w-10 h-10 cursor-pointer bg-white shadow-md rounded-full flex items-center justify-center hover:bg-black hover:text-white">
    <FaBalanceScale size={16} />
  </button>
</div>

        <div className="relative">
          <span className="absolute left-0 top-0 bg-[#C68A45] text-white text-xs px-2 py-1 rounded-br-lg z-10">
            {product.discountPercentage}%
          </span>

          <img
            src={product.img}
            alt={product.name}
            className="w-full h-52 object-contain p-4"
          />
        </div>

        <div className="p-4">
          <h3 className="text-center font-medium h-12 line-clamp-2">
            {product.name}
          </h3>

          <div className="mt-3">
            <span className="font-bold text-lg">
              ৳ {product.price.toLocaleString()}
            </span>

            <span className="ml-2 text-gray-500 line-through text-sm">
              ৳ {product.originalPrice.toLocaleString()}
            </span>
          </div>

          <div className="flex gap-2 mt-4">
             <Link href={`/DetailPage/${product.id}`}>
            <button className="flex-1 bg-[#081018] px-6 cursor-pointer text-white py-2 rounded-md">
              View
            </button>
</Link>
            <button onClick={()=>{addTocart(product)}} className="flex-1  cursor-pointer border py-2 rounded-md">
              Cart
            </button>
          </div>
        </div>

      </div>
    </SwiperSlide>
  ))}
</Swiper>

         
                <button className="swiper-button-prev-custom absolute left-4 top-1/2 md:opacity-0 md:group-hover:opacity-100 -translate-y-1/2 z-10 bg-black/30 hover:bg-black/50 p-2 rounded-full text-white   duration-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 19.5L8.25 12l7.5-7.5"
                    />
                  </svg>
                </button>

                {/* Next Button */}
                <button className="swiper-button-next-custom absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-black/30 hover:bg-black/50 p-2 rounded-full text-white md:opacity-0 md:group-hover:opacity-100 duration-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 4.5l7.5 7.5-7.5 7.5"
                    />
                  </svg>
                </button>
              </div>
            </div>
      </div>
    </section>
  );
};

export default FlashSale;
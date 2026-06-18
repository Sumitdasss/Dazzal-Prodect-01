/* eslint-disable @next/next/no-img-element */
"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import Infinity from "../Componant/Layout/InfoBar";
import Catagori from "../Componant/Layout/Catagori"
import FlashSale from "../Componant//Layout/Product"
import BestProduct from "../Componant/Layout/BestProduct"
import {Banner} from "../Componant/Layout/Bannner"
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const slides = [
  "https://dazzle.com.bd/_next/image?url=https%3A%2F%2Fdazzle.sgp1.cdn.digitaloceanspaces.com%2F110996%2Fxiaomi-17t-(1).jpg&w=1920&q=75",
  "https://dazzle.com.bd/_next/image?url=https%3A%2F%2Fdazzle.sgp1.cdn.digitaloceanspaces.com%2F109850%2Fmega-offer--(1).jpg&w=1920&q=75",
  "https://dazzle.com.bd/_next/image?url=https%3A%2F%2Fdazzle.sgp1.cdn.digitaloceanspaces.com%2F108047%2Fgamimg-v2-(1).jpg&w=1920&q=75",
  "https://dazzle.com.bd/_next/image?url=https%3A%2F%2Fdazzle.sgp1.cdn.digitaloceanspaces.com%2F94866%2FIPHONE-17-seriesv5.jpg.jpeg&w=1920&q=75",
  "https://dazzle.com.bd/_next/image?url=https%3A%2F%2Fdazzle.sgp1.cdn.digitaloceanspaces.com%2F94870%2Fgadget-v2.jpg.jpeg&w=1920&q=75",
  "https://dazzle.com.bd/_next/image?url=https%3A%2F%2Fdazzle.sgp1.cdn.digitaloceanspaces.com%2F85436%2Fsc-offer-main-banner.jpg&w=1920&q=75",
  "https://dazzle.com.bd/_next/image?url=https%3A%2F%2Fdazzle.sgp1.cdn.digitaloceanspaces.com%2F94865%2FEXCHANGE-NOW-v2.jpg.jpeg&w=1920&q=75",
  "https://dazzle.com.bd/_next/image?url=https%3A%2F%2Fdazzle.sgp1.cdn.digitaloceanspaces.com%2F110344%2Fall-outlet.jpg&w=1920&q=75",
];

const Page = () => {
  return (
    <div>
      <div className="bg-gray-200">
        <div className="max-w-[1440px] mx-auto px-4 md:px-0  py-4">
          <div className="flex flex-col lg:flex-row gap-4">
            
            {/* Main Slider */}
            <div className="w-full lg:w-2/3">
              <div className="relative group overflow-hidden rounded-xl h-[220px] sm:h-[350px] md:h-[450px] lg:h-[700px]">
                <Swiper
                  modules={[Navigation, Pagination, Autoplay]}
                  slidesPerView={1}
                  spaceBetween={0}
                   loop={true}
                  autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                  }}
                  pagination={{ clickable: true }}
                  navigation={{
                    nextEl: ".swiper-button-next-custom",
                    prevEl: ".swiper-button-prev-custom",
                  }}
                  className="h-full w-full"
                >
                  {slides.map((slide, index) => (
                    <SwiperSlide key={index}>
                      <img
                        src={slide}
                        alt={`Banner ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>

                {/* Previous Button */}
                <button className="swiper-button-prev-custom absolute left-4 top-1/2 md:opacity-0 md:group-hover:opacity-100 -translate-y-1/2 z-10 bg-black/30 hover:bg-white/50 p-2 rounded-full text-white   duration-300">
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
                <button className="swiper-button-next-custom absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-black/30 hover:bg-white/50 p-2 rounded-full text-white md:opacity-0 md:group-hover:opacity-100 duration-300">
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

            {/* Right Side Banners */}
            <div className="w-full lg:w-1/3 flex lg:flex-col gap-4">
              
              <div className="flex-1 overflow-hidden rounded-xl h-[150px] sm:h-[220px] lg:h-[302px]">
                <img
                  src="https://dazzle.com.bd/_next/image?url=https%3A%2F%2Fdazzle.sgp1.cdn.digitaloceanspaces.com%2F110995%2Fxiaomi-17t.jpg&w=1920&q=75"
                  alt="Top Banner"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1 overflow-hidden rounded-xl h-[150px] sm:h-[220px] lg:h-[302px]">
                <img
                  src="https://dazzle.com.bd/_next/image?url=https%3A%2F%2Fdazzle.sgp1.cdn.digitaloceanspaces.com%2F110994%2Fdazzle-mart.jpg&w=1920&q=75"
                  alt="Bottom Banner"
                  className="w-full h-full object-cover"
                />
              </div>

            </div>
          </div>
        </div>
      </div>

      <Infinity />
      <Catagori/>
      <FlashSale/>
      <BestProduct/>
      <Banner/>
    </div>
  );
};

export default Page;
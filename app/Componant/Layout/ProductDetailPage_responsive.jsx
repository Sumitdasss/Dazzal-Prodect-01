"use client";

import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper/modules";
import { FaHeart, FaBalanceScale } from "react-icons/fa";
import Link from "next/link";
import useStore from "./Store/store";
import { products } from "../../../Data/Data";
import { carePlans } from "../../../Data/Data";

export default function ProductDetailPage({ product }) {
  const [selectedColor, setSelectedColor] = useState(product?.color?.[0] || "");
  const [hoveredId, setHoveredId] = useState(null);
  const [selectedCare, setSelectedCare] = useState(null);
  const [mainDisplayImg, setMainDisplayImg] = useState(product?.img || "");
  const [agreeTerms, setAgreeTerms] = useState(false);
  
  const [showThumbs, setShowThumbs] = useState(false);

  const variants = Array.isArray(product?.VARIANT)
    ? product.VARIANT
    : product?.VARIANT
    ? [product.VARIANT]
    : [];

  const { addTocart, cart, removeFromCart } = useStore();

  const storeg = Array.isArray(product?.STORAGE)
    ? product.STORAGE
    : product?.STORAGE
    ? [product.STORAGE]
    : [];

  const relatedProducts = products.filter(
    (item) =>
      item.category === product?.category &&
      String(item.id) !== String(product?.id)
  );

  const [selectedStorage, setSelectedStorage] = useState(product?.STORAGE?.[0] || "");
  const [selectedRegion, setSelectedRegion] = useState(product?.Region || "");

  const careRef = useRef(null);

  useEffect(() => {
    const handleWheel = (e) => {
      const el = careRef.current;
      if (!el) return;
      const isAtTop = el.scrollTop === 0;
      const isAtBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 1;
      const speed = 4;
      if (e.deltaY > 0 && !isAtBottom) {
        e.preventDefault();
        el.scrollTop += e.deltaY * speed;
      }
      if (e.deltaY < 0 && !isAtTop) {
        e.preventDefault();
        el.scrollTop += e.deltaY * speed;
      }
    };
    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, []);

  const selectedCategories = ["Adapters", "Airpods"];

  if (!product) {
    return <div className="p-8 text-center text-gray-500">No product data found!</div>;
  }

  const progress = (product.availability / product.totalQty) * 100;

  const formatPrice = (amount) => {
    return amount ? `BDT ${amount.toLocaleString("en-IN")}` : "";
  };

  const carePrice = selectedCare ? selectedCare.price : 0;
  const finalTotal = product.price + carePrice;

  return (
    <div className="bg-gray-50 w-360 mx-auto min-h-screen px-3 py-4 sm:px-4 md:px-6 lg:px-8 md:py-8 font-sans antialiased text-gray-800">

      {/* Breadcrumb */}
      <nav className="text-xs text-gray-500 mb-4 md:mb-6 flex flex-wrap items-center gap-1">
        <span className="cursor-pointer hover:underline">🏠</span> /
        <span className="cursor-pointer hover:underline">{product.category || "Phones"}</span> /
        <span className="cursor-pointer hover:underline">{product.brand}</span> /
        <span className="text-gray-800 font-medium truncate max-w-[150px] sm:max-w-none">{product.name}</span>
      </nav>

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8">

        {/* ───── LEFT COLUMN ───── */}
        <div className="lg:col-span-7 flex flex-col gap-4">

          {/* Mobile: Horizontal thumbnails */}
          <div className="flex lg:hidden gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {product.thumbnails?.map((thumbUrl, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setMainDisplayImg(thumbUrl);
                  setSelectedColor(product.color?.[idx] || "");
                }}
                className={`flex-shrink-0 w-14 h-16 border-2 rounded-md overflow-hidden bg-white p-1 transition ${
                  mainDisplayImg === thumbUrl
                    ? "border-amber-600 shadow-sm"
                    : "border-gray-200"
                }`}
              >
                <img src={thumbUrl} alt={`Thumb ${idx + 1}`} className="w-full h-full object-contain" />
              </button>
            ))}
          </div>

          {/* Image Row — desktop: side by side, mobile: stacked handled above */}
          <div className="flex flex-row gap-3 items-start">

            {/* Desktop: Vertical thumbnails */}
            <div className="hidden lg:flex flex-col gap-3 flex-shrink-0">
              {product.thumbnails?.map((thumbUrl, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setMainDisplayImg(thumbUrl);
                    setSelectedColor(product.color?.[idx] || "");
                  }}
                  className={`w-14 h-16 xl:w-16 xl:h-20 border-2 rounded-md overflow-hidden bg-white p-1 transition ${
                    mainDisplayImg === thumbUrl
                      ? "border-amber-600 shadow-sm"
                      : "border-gray-200 hover:border-gray-400"
                  }`}
                >
                  <img src={thumbUrl} alt={`Thumb ${idx + 1}`} className="w-full h-full object-contain" />
                </button>
              ))}
            </div>

            {/* Main Image */}
            <div className="relative flex-1 bg-white border border-gray-100 rounded-xl p-4 sm:p-6 lg:p-8 flex items-center justify-center min-h-[280px] sm:min-h-[360px] lg:min-h-[450px] shadow-sm">
              {product.discountPercentage && (
                <span className="absolute top-3 left-3 bg-amber-700 text-white text-xs font-bold px-2 py-0.5 rounded-md">
                  {product.discountPercentage}% OFF
                </span>
              )}
              <img
                src={mainDisplayImg}
                alt={product.name}
                className="max-h-[250px] sm:max-h-[320px] lg:max-h-[400px] w-full object-contain transition-all duration-300"
              />
              <div className="absolute bottom-3 left-3 bg-amber-800 text-white text-[9px] uppercase font-bold tracking-wider px-2 py-1 rounded flex items-center gap-1.5 shadow">
                <span>dazzle Care+</span>
                <span className="bg-white text-amber-950 px-1 rounded text-[8px]">1 Year</span>
              </div>
              <button className="absolute bottom-3 right-3 p-1.5 bg-amber-100 text-amber-900 rounded-md hover:bg-amber-200 transition text-sm">
                ↔️
              </button>
            </div>
          </div>
        </div>

        {/* ───── RIGHT COLUMN ───── */}
        <div
          ref={careRef}
          className="lg:col-span-5 lg:max-h-[800px] lg:overflow-y-auto flex flex-col gap-4 scroll-smooth"
        >
          {/* Top Actions */}
          <div className="flex flex-wrap justify-between items-center gap-2">
            <span className="text-xs font-semibold border border-gray-300 rounded px-3 py-1 bg-white text-gray-600">
              Brand: {product.brand}
            </span>
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-1 text-xs border border-gray-300 bg-white px-2.5 py-1.5 rounded hover:bg-gray-50">
                🔄 Compare
              </button>
              <button className="p-1.5 border border-gray-300 bg-white rounded hover:bg-gray-50 text-gray-500">❤️</button>
              <button className="p-1.5 border border-gray-300 bg-white rounded hover:bg-gray-50 text-gray-500">🔗</button>
            </div>
          </div>

          {/* Specs & Pricing */}
          <div className="bg-gray-100/70 p-4 sm:p-5 rounded-xl border border-gray-200/60 flex flex-col gap-3">
            <div className="flex flex-wrap justify-between items-start gap-2">
              <div className="flex-1 min-w-0">
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900 leading-tight">{product.name}</h1>
                <div className="mt-1 inline-block text-xs bg-orange-100 text-orange-800 px-2 py-0.5 rounded font-medium">
                  {selectedColor} | {selectedRegion} | {selectedStorage}
                </div>
              </div>
              <div className="text-right flex-shrink-0">
                <div className="text-lg sm:text-xl font-bold text-amber-700">{formatPrice(product.price)}</div>
                <div className="text-xs text-gray-400 line-through">{formatPrice(product.originalPrice)}</div>
              </div>
            </div>

            {/* Ratings */}
            <div className="text-xs space-y-1.5 border-t border-b border-gray-200 py-3">
              <div className="flex flex-wrap items-center gap-2 text-gray-600">
                <span className="font-bold text-gray-800">4.8</span>
                <span className="text-amber-500">⭐⭐⭐⭐•</span>
                <span className="text-gray-400">(154 reviews)</span>
              </div>
              <div className="flex items-center gap-1 text-amber-800">
                👁️ <span className="font-semibold">{product.liveViews || 0} people</span> viewing now
              </div>
              <div className="flex items-center gap-1 text-orange-700">
                🔥 <span className="font-semibold">1 sold</span> in last 14 hours
              </div>
            </div>

            {/* Availability */}
            <div className="text-xs text-amber-900 bg-amber-50 p-2 rounded border border-amber-200/60 font-medium">
              Status:{" "}
              <span className="text-green-700 font-bold">
                {product.availability > 0 ? "In-Stock" : "Out-of-Stock"}
              </span>
              <div className="h-1 w-full max-w-[150px] bg-gray-200 rounded-full overflow-hidden my-1.5">
                <div
                  className="h-full bg-red-600 transition-all duration-[3000ms]"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <span className="text-black text-sm">Available: {product.availability}</span>
            </div>

            {/* Quick Specs */}
            <div className="text-xs text-gray-600 space-y-1 pt-1 border-t border-dashed border-gray-200">
              <p><strong>Processor:</strong> {product.Prosesor}</p>
              <p><strong>Display:</strong> {product.specifications?.display}</p>
              <p><strong>OS:</strong> {product.specifications?.os}</p>
            </div>
          </div>

          {/* Options */}
          <div className="bg-gray-100/70 p-4 sm:p-5 rounded-xl border border-gray-200/60 space-y-4">

            {/* Color */}
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-2">AVAILABLE COLORS:</label>
              <div className="flex flex-wrap gap-2">
                {product.color?.map((colorName, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setSelectedColor(colorName);
                      setMainDisplayImg(product.thumbnails?.[idx] || mainDisplayImg);
                    }}
                    className={`px-3 py-1 text-xs border rounded transition ${
                      selectedColor === colorName
                        ? "border-amber-500 bg-amber-100 text-amber-900"
                        : "border-gray-300 bg-white"
                    }`}
                  >
                    {colorName}
                  </button>
                ))}
              </div>
            </div>

            {/* Region */}
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5">REGION / VARIANT:</label>
              <div className="flex flex-wrap gap-2">
                {variants.map((variantName, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedRegion(variantName)}
                    className={`text-xs px-3 py-1.5 rounded border transition font-medium ${
                      selectedRegion === variantName
                        ? "bg-amber-100 text-amber-900 border-amber-400"
                        : "bg-white text-gray-600 border-gray-300"
                    }`}
                  >
                    {variantName}
                  </button>
                ))}
              </div>
            </div>

            {/* Storage */}
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5">STORAGE / RAM:</label>
              <div className="flex flex-wrap gap-2">
                {storeg.map((storageSize, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedStorage(storageSize)}
                    className={`text-xs px-4 py-1.5 rounded border transition font-medium ${
                      selectedStorage === storageSize
                        ? "bg-amber-100 text-amber-900 border-amber-400"
                        : "bg-white text-gray-600 border-gray-300 hover:border-gray-400"
                    }`}
                  >
                    {storageSize}
                  </button>
                ))}
              </div>
            </div>

            {/* Info Cards */}
            <div className="grid grid-cols-3 gap-2">
              <div className="bg-white border rounded-lg p-3 text-center">
                <p className="text-[10px] text-gray-500">Min. Booking</p>
                <h3 className="font-bold text-xs sm:text-sm mt-0.5">15,000 BDT</h3>
              </div>
              <div className="bg-white border rounded-lg p-3 text-center">
                <p className="text-[10px] text-gray-500">Points</p>
                <h3 className="font-bold text-xs sm:text-sm mt-0.5">100 pts</h3>
              </div>
              <div className="bg-white border rounded-lg p-3 text-center">
                <p className="text-[10px] text-gray-500">EMI</p>
                <h3 className="font-medium text-xs sm:text-sm mt-0.5">Available</h3>
              </div>
            </div>

            {/* Price Box */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="border rounded-lg p-3 bg-white">
                <h3 className="text-sm sm:text-base font-bold text-orange-500">
                  Offer: {formatPrice(product.price)}
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">Cash/Card/MFS</p>
              </div>
              <div className="border rounded-lg p-3 bg-white">
                <h3 className="text-sm font-bold">
                  Regular:{" "}
                  <span className="line-through text-gray-400">{formatPrice(product.originalPrice)}</span>
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">EMI from BDT 13,220/mo</p>
              </div>
            </div>

            <div className="text-sm">
              <span className="font-semibold">Estimated delivery:</span>
              <span className="text-blue-600 ml-1">0–3 days</span>
            </div>

            <div className="bg-black text-white p-3 rounded-lg font-semibold text-center text-sm">
              🔥 Buy More Save More!
            </div>

            {/* Accessories */}
            {selectedCategories.map((cat) => (
              <div key={cat} className="space-y-2">
                <h2 className="text-sm sm:text-base font-bold text-gray-800">{cat}</h2>
                {products
                  .filter((p) => p.category === cat)
                  .map((p) => {
                    const discountAmount = (p.originalPrice * p.discountPercentage) / 100;
                    const finalPrice = p.originalPrice - discountAmount;
                    const isAdded = cart.some((item) => String(item.id) === String(p.id));

                    return (
                      <div
                        key={p.id}
                        className="flex flex-col xs:flex-row xs:items-center xs:justify-between gap-2 p-3 border rounded-lg bg-white shadow-sm"
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <input
                            type="checkbox"
                            checked={isAdded}
                            onChange={() => {
                              const alreadyInCart = cart.some((item) => String(item.id) === String(p.id));
                              if (alreadyInCart) {
                                removeFromCart(p.id);
                              } else {
                                addTocart(p);
                              }
                            }}
                            className="w-4 h-4 accent-amber-500 shrink-0"
                          />
                          <img
                            src={p.img}
                            alt={p.name}
                            className="w-10 h-10 object-cover rounded shrink-0"
                          />
                          <p className="text-xs sm:text-sm font-medium text-gray-800 truncate">{p.name}</p>
                        </div>
                        <div className="flex items-center gap-2 pl-6 xs:pl-0 shrink-0">
                          <p className="text-sm font-semibold text-gray-900">৳ {finalPrice.toLocaleString()}</p>
                          <div className="px-2 py-0.5 flex items-center gap-1 text-xs font-semibold text-red-600 border border-dashed border-red-300 rounded-full bg-red-50">
                            <span>Save ৳{discountAmount.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            ))}

            {/* Dazzle Care */}
            <div className="rounded-lg overflow-hidden border border-gray-200">
              <div className="bg-[#11161a] text-white px-4 py-3">
                <h3 className="font-bold text-sm tracking-wide">Dazzle Care</h3>
              </div>
              <div className="bg-[#f0f2f5] p-3 space-y-2">
                {carePlans.map((item) => {
                  const isChecked = selectedCare?.id === item.id;
                  return (
                    <div
                      key={item.id}
                      onClick={() => setSelectedCare(isChecked ? null : item)}
                      className={`flex justify-between items-center p-3 rounded-md cursor-pointer select-none transition duration-200 ${
                        isChecked ? "bg-white shadow-sm" : "bg-[#e8ecef] hover:bg-[#e2e6ea]"
                      }`}
                    >
                      <div className="flex items-start gap-2 flex-1 pr-3 min-w-0">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => {}}
                          className="w-4 h-4 mt-0.5 accent-black cursor-pointer shrink-0"
                        />
                        {item.image && (
                          <img src={item.image} alt="" className="w-6 h-6 object-contain shrink-0" />
                        )}
                        <p className="text-xs sm:text-[13px] text-gray-800 font-medium leading-snug">
                          {item.name}
                        </p>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="block text-[10px] font-semibold text-gray-500">BDT</span>
                        <span className="block text-sm font-bold text-gray-900">
                          {item.price.toLocaleString("en-IN")}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Terms */}
              <div className="flex items-center gap-2 p-3 bg-white select-none">
                <input
                  type="checkbox"
                  id="terms"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="w-4 h-4 accent-green-500 cursor-pointer shrink-0"
                />
                <label htmlFor="terms" className="text-xs text-gray-700 cursor-pointer">
                  I agree to Dazzle{" "}
                  <a href="#terms" className="text-blue-600 underline hover:text-blue-800">
                    terms & conditions
                  </a>
                </label>
              </div>
            </div>

            {/* Total */}
            <h2 className="text-2xl sm:text-3xl font-bold text-orange-500">
              BDT {finalTotal.toLocaleString()}
            </h2>

            {/* CTA Buttons */}
            <div className="grid grid-cols-2 gap-3">
              <button onClick={()=>addTocart(product)} className="bg-black text-white py-3 sm:py-4 rounded-lg font-semibold text-sm hover:bg-gray-900 transition">
                ADD TO CART
              </button>
              <button className="border-2 border-black py-3 sm:py-4 rounded-lg font-semibold text-sm hover:bg-gray-50 transition">
                BUY NOW
              </button>
            </div>

            {/* Bottom Cards */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-green-500 text-white rounded-lg p-3 sm:p-4">
                <h3 className="font-bold text-base sm:text-xl">In Stock</h3>
                <p className="text-xs sm:text-sm mt-0.5">Check Delivery Time</p>
              </div>
              <div className="bg-gray-100 rounded-lg p-3 sm:p-4">
                <h3 className="font-bold text-sm sm:text-base">1 Year Apple</h3>
                <p className="text-xs sm:text-sm text-gray-500 mt-0.5">Warranty</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ───── RELATED PRODUCTS SWIPER ───── */}
      <div className="relative mt-8 md:mt-10 group overflow-hidden rounded-xl">
        <h2 className="text-base sm:text-lg font-bold text-gray-800 mb-4">Related Products</h2>
        <Swiper
          modules={[Navigation, Autoplay]}
          loop={true}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          navigation={{
            nextEl: ".swiper-button-next-custom",
            prevEl: ".swiper-button-prev-custom",
          }}
          spaceBetween={12}
          breakpoints={{
            0:    { slidesPerView: 1.3 },
            400:  { slidesPerView: 2 },
            640:  { slidesPerView: 2.5 },
            768:  { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
            1280: { slidesPerView: 5 },
          }}
        >
          {relatedProducts.map((relProduct) => {
            const discountAmount =
              (relProduct.originalPrice * relProduct.discountPercentage) / 100;
            const finalPrice = relProduct.originalPrice - discountAmount;

            return (
              <SwiperSlide key={relProduct.id}>
                <div
                  onMouseEnter={() => setHoveredId(relProduct.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  className="bg-white rounded-lg h-full shadow-sm hover:shadow-lg duration-300 relative overflow-hidden"
                >
                  {/* Hover Icons */}
                  <div
                    className={`absolute top-3 right-2 flex flex-col gap-1.5 z-20 transition-all duration-300 ${
                      hoveredId === relProduct.id
                        ? "opacity-100 translate-x-0"
                        : "opacity-0 translate-x-10"
                    }`}
                  >
                    <button className="w-8 h-8 cursor-pointer bg-white shadow-md rounded-full flex items-center justify-center hover:bg-red-500 hover:text-white transition">
                      <FaHeart size={13} />
                    </button>
                    <button className="w-8 h-8 cursor-pointer bg-white shadow-md rounded-full flex items-center justify-center hover:bg-black hover:text-white transition">
                      <FaBalanceScale size={13} />
                    </button>
                  </div>

                  {/* Image */}
                  <div className="relative">
                    <span className="absolute left-0 top-0 bg-[#C68A45] text-white text-[10px] px-1.5 py-0.5 rounded-br-lg z-10">
                      {relProduct.discountPercentage}%
                    </span>
                    <img
                      src={relProduct.img}
                      alt={relProduct.name}
                      className="w-full h-40 sm:h-48 object-contain p-3"
                    />
                  </div>

                  {/* Info */}
                  <div className="p-3">
                    <h3 className="text-center text-xs sm:text-sm font-medium h-10 line-clamp-2">
                      {relProduct.name}
                    </h3>
                    <div className="mt-2">
                      <span className="font-bold text-sm">৳ {finalPrice.toLocaleString()}</span>
                      <span className="ml-1 text-gray-500 line-through text-xs">
                        ৳ {relProduct.originalPrice.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex gap-1.5 mt-3">
                      <Link href={`/DetailPage/${relProduct.id}`} className="flex-1">
                        <button className="w-full bg-[#081018] cursor-pointer text-white py-1.5 text-xs rounded-md">
                          View
                        </button>
                      </Link>
                      <button
                        onClick={() => addTocart(relProduct)}
                        className="flex-1 cursor-pointer border py-1.5 text-xs rounded-md hover:bg-gray-50 transition"
                      >
                        Cart
                      </button>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>

        {/* Navigation Buttons */}
        <button className="swiper-button-prev-custom absolute left-2 top-1/2 opacity-100 md:opacity-0 md:group-hover:opacity-100 -translate-y-1/2 z-10 bg-black/40 hover:bg-black/60 p-1.5 sm:p-2 rounded-full text-white duration-300">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 sm:w-5 sm:h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>
        <button className="swiper-button-next-custom absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-black/40 hover:bg-black/60 p-1.5 sm:p-2 rounded-full text-white opacity-100 md:opacity-0 md:group-hover:opacity-100 duration-300">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 sm:w-5 sm:h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </button>
      </div>
    </div>
  );
}

"use client";

import React, { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper/modules";
import { FaHeart, FaBalanceScale } from "react-icons/fa";
import Link from "next/link";
import useStore from './Store/store';
import {products} from "../../../Data/Data"
import {carePlans} from "../../../Data/Data"
export default function ProductDetailPage({ product }) {
const [selectedColor, setSelectedColor] = useState(
  product?.color?.[0] || ""
);
const [openPickup, setOpenPickup] = useState(false);
const [showDeliveryModal, setShowDeliveryModal] = useState(false);
  const [hoveredId, setHoveredId] = useState(null);
const [selectedCare, setSelectedCare] = useState(null);
  const [mainDisplayImg, setMainDisplayImg] = useState(product?.img || "");
  const variants = Array.isArray(product?.VARIANT)? product.VARIANT: product?.VARIANT ? [product.VARIANT] : [];
  const {addTocart,cart,removeFromCart}=useStore()
 
const storeg = Array.isArray(product?.STORAGE)? product.STORAGE: product?.STORAGE? [product.STORAGE]: [];
 // ✅ এটা ঠিক আছে কিনা দেখো — id compare এ type মিলছে কিনা
const relatedProducts = products.filter(
  (item) => item.category === product.category && item.id !== product.id
);

  const [selectedStorage, setSelectedStorage] = useState(product?.STORAGE?.[0] || "");
  const [selectedRegion, setSelectedRegion] = useState(product?.Region || "");
const careRef = useRef(null);

useEffect(() => {
  const handleWheel = (e) => {
  const el = careRef.current;
  if (!el) return;

  const isAtTop = el.scrollTop === 0;
  const isAtBottom =
    el.scrollTop + el.clientHeight >= el.scrollHeight - 1;

  const speed = 4; // 1 = normal, 3 = fast, 5 = very fast

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

  return () =>
    window.removeEventListener("wheel", handleWheel);
}, []);

const selectedCategories = ["Adapters", "Airpods"];

  if (!product) {
    return <div className="p-8 text-center text-gray-500">No product data found!</div>;
  }
const progress=(product.availability/product.totalQty)*100

  const formatPrice = (amount) => {
    return amount ? `BDT ${amount.toLocaleString('en-IN')}` : '';
  };

  // discounted price clculate
const carePrice = selectedCare ? selectedCare.price : 0;

const finalTotal =
  product.price + carePrice;
  // discounted price clculate


  return (

    <div className="">
    <div   className="bg-gray-50 relative max-w-360 mx-auto min-w-0  p-4 md:p-8 font-sans antialiased text-gray-800">
      
     
      <nav className="text-xs text-gray-500 mb-6 flex items-center gap-1">
        <span className="cursor-pointer hover:underline">🏠</span> / 
        <span className="cursor-pointer hover:underline">{product.category || "Phones"}</span> / 
        <span className="cursor-pointer hover:underline">{product.brand}</span> / 
        <span className="text-gray-800 font-medium">{product.name}</span>
      </nav>

      <div className=" grid grid-cols-1 relative lg:grid-cols-12 gap-8 ">
        
      
        <div className="lg:col-span-7 sticky flex flex-row gap-4 items-start">
          
       
          <div className="flex  flex-col gap-3">
           
           
          
           {product.thumbnails?.map((thumbUrl, idx) => (

  <button
    key={idx}
    onClick={() => {
      setMainDisplayImg(thumbUrl);
      setSelectedColor(product.color[idx]);
    }}
    className={`w-16 h-20 border-2 rounded-md overflow-hidden bg-white p-1 transition ${
      mainDisplayImg === thumbUrl
        ? "border-amber-600 shadow-sm"
        : "border-gray-200 hover:border-gray-400"
    }`}
  >
    <img
      src={thumbUrl}
      alt={`Thumbnail ${idx + 1}`}
      className="w-full h-full object-contain"
    />
  </button>
))}
          </div>

          {/* Main Image View */}
          <div className="relative flex-1 bg-white border border-gray-100 rounded-xl p-8 flex items-center justify-center min-h-[450px] shadow-sm">
            {/* Discount Badge */}
            {product.discountPercentage && (
              <span className="absolute top-4 left-4 bg-amber-700 text-white text-xs font-bold px-2.5 py-1 rounded-md">
                {product.discountPercentage}% OFF
              </span>
            )}

            {/* Main Product Image (State Driven) */}
            <img 
              src={mainDisplayImg} 
              alt={product.name} 
              className="max-h-[400px] object-contain transition-all duration-300"
            />

            {/* Dazzle Care Badge Style */}
            <div className="absolute bottom-4 left-4 bg-amber-800 text-white text-[10px] uppercase font-bold tracking-wider px-3 py-1.5 rounded flex items-center gap-2 shadow">
              <span>dazzle Care+</span>
              <span className="bg-white text-amber-950 px-1 rounded text-[9px]">1 Year</span>
            </div>
            
            {/* Expand Button */}
            <button className="absolute bottom-4 right-4 p-2 bg-amber-100 text-amber-900 rounded-md hover:bg-amber-200 transition">
              ↔️
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN: Details Section (Takes 5 Cols) */}
        <div     ref={careRef} className="lg:col-span-5 max-h-[800px]  overflow-y-auto flex flex-col gap-5 scroll-smooth">
          
          {/* Top Actions & Brand */}
          <div className="flex justify-between items-center">
            <span className="text-xs font-semibold border border-gray-300 rounded px-3 py-1 bg-white text-gray-600">
              Brand : {product.brand}
            </span>
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-1 text-xs border border-gray-300 bg-white px-3 py-1.5 rounded hover:bg-gray-50">
                🔄 Compare
              </button>
              <button className="p-1.5 border border-gray-300 bg-white rounded hover:bg-gray-50 text-gray-500">
                ❤️
              </button>
              <button className="p-1.5 border border-gray-300 bg-white rounded hover:bg-gray-50 text-gray-500">
                🔗
              </button>
            </div>
          </div>

          {/* Main Specs & Pricing Container */}
          <div className="bg-gray-100/70 p-5 rounded-xl border border-gray-200/60 flex flex-col gap-3">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{product.name}</h1>
                <div className="mt-1 inline-block text-xs bg-orange-100 text-orange-800 px-2 py-0.5 rounded font-medium">
          {selectedColor} | {selectedRegion} | {selectedStorage}
                </div>
              </div>
              <div className="text-right">
                <div className="text-xl font-bold text-amber-700">{formatPrice(product.price)}</div>
                <div className="text-xs text-gray-400 line-through">{formatPrice(product.originalPrice)}</div>
              </div>
            </div>

            {/* Ratings & Social Proof */}
            <div className="text-xs space-y-1.5 border-t border-b border-gray-200 py-3 my-1">
              <div className="flex items-center gap-2 text-gray-600">
                <span className="font-bold text-gray-800">4.8</span>
                <span className="text-amber-500">⭐⭐⭐⭐•</span>
                <span className="text-gray-400">(154 customer reviews)</span>
              </div>
              <div className="flex items-center gap-1 text-amber-800">
                👁️ <span className="font-semibold">{product.liveViews || 0} people</span> viewing this product now
              </div>
              <div className="flex items-center gap-1 text-orange-700">
                🔥 <span className="font-semibold">1 sold</span> in last 14 hours
              </div>
            </div>

            {/* Availability */}
            <div className="text-xs text-amber-900 bg-amber-50 p-2 rounded border border-amber-200/60 font-medium">
              Status: <span className="text-green-700 font-bold">{product.availability>0?"In-Stock":"Out-of-Stock"}</span>
              <div className="h-1 w-[150px] bg-gray-200 rounded-full overflow-hidden mb-2">
   <div
  className="h-full bg-red-600 transition-all duration-[3000ms]"
  style={{ width: `${progress}%` }}
></div>


  </div>
  <span className="text-black text-[16px]">
 
  Available: {product.availability}
</span>
            </div>

            {/* Quick Tech Specs Highlights */}
            <div className="text-xs text-gray-600 space-y-1 pt-1 border-t border-dashed border-gray-200">
              <p><strong>Processor:</strong> {product.Prosesor}</p>
              <p><strong>Display:</strong> {product.specifications?.display}</p>
              <p><strong>OS:</strong> {product.specifications?.os}</p>
            </div>
          </div>

          {/* Configuration / Options Selectors */}
          <div className="bg-gray-100/70 p-5 rounded-xl border border-gray-200/60 space-y-4">
            
            {/* Color Option Pcker */}
            <div className="space-x-3">
              <label className="block text-xs font-bold text-gray-700 mb-2">
                AVAILABLE COLORS:
              </label>
            {product.color?.map((colorName, idx) => (
  <button
    key={idx}
    onClick={() => {
      setSelectedColor(colorName);
      setMainDisplayImg(product.thumbnails[idx]);
    }}
    className={`px-3 py-1  border rounded ${
      selectedColor === colorName
        ? "border-amber-500 bg-amber-100"
        : "border-gray-300"
    }`}
  >
    {colorName}
  </button>
))}
            </div>

            {/* Region/Variant Options Selector */}
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5">REGION / VARIANT:</label>
              <div className="flex flex-wrap gap-2">
                {variants.map((variantName, idx) => (
                  <button
                    key={idx}
                 onClick={() => setSelectedRegion(variantName)} // জাস্ট রিজিয়ন শর্টনেম সিলেক্ট করার জন্য
                   className={`text-xs px-3 flex py-1.5 rounded border transition font-medium ${
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

            {/* Storage Options Selector */}
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5">STORAGE / RAM:</label>
              <div className="flex flex-wrap gap-2">
                {storeg.map((storageSize, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedStorage(storageSize)}
                    className={`text-xs px-4 py-1.5 flex rounded border transition font-medium ${
                      selectedStorage === storageSize 
                        ? 'bg-amber-100 text-amber-900 border-amber-400' 
                        : 'bg-white text-gray-600 border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    {storageSize}
                  </button>
                ))}
              </div>
            </div>











<div className="w-full max-w-[500px] mx-auto space-y-4  ">

  {/* Top Info */}
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
    <div className="bg-gray-100 rounded p-4">
      <p className="text-xs text-gray-500">Minimum Booking</p>
      <h3 className="font-bold text-xl">15,000 BDT</h3>
    </div>

    <div className="bg-gray-100 rounded p-4">
      <p className="text-xs text-gray-500">Purchase Points</p>
      <h3 className="font-bold text-xl">100 Points</h3>
    </div>

    <div className="bg-gray-100 rounded p-4">
      <p className="text-xs text-gray-500">EMI Available</p>
      <h3 className="font-medium">Details</h3>
    </div>
  </div>

  {/* Price Box */}
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
    <div className="border rounded p-3">
      <h3 className="text-lg font-bold text-orange-500">
        Offer Price: {formatPrice(product.price)}
      </h3>
      <p className="text-sm text-gray-500">
        Cash/Card/MFS Payment
      </p>
    </div>

    <div className="border rounded p-3">
      <h3 className="text-base font-bold">
        Regular Price:
        <span className="line-through text-gray-400 ml-2">
          {formatPrice(product.originalPrice)}
        </span>
      </h3>
      <p className="text-sm text-gray-500">
        EMI Begin at BDT 13,220/month
      </p>
    </div>
  </div>

  {/* Delivery */}
  <div>
    <span className="font-semibold">Estimated delivery:</span>
    <span className="text-blue-600 ml-1">0-3 days</span>
  </div>

  {/* Buy More */}
  <div className="bg-black text-white p-3 rounded font-semibold text-center">
    🔥 Buy More Save More!
  </div>

  {/* Accessories */}
  {selectedCategories.map((cat) => (
    <div key={cat} className="space-y-2">

      <h2 className="text-base sm:text-lg font-bold text-gray-800 capitalize">
        {cat}
      </h2>

      {products
        .filter((p) => p.category === cat)
        .map((product) => {

          const discountAmount =
            (product.originalPrice * product.discountPercentage) / 100;

          const finalPrice =
            product.originalPrice - discountAmount;

          return (
           <div
  key={product.id}
  className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-3 border rounded-md bg-white shadow-sm"
>

  {/* Left side */}
  <div className="flex items-center gap-3 min-w-0">
    <input
     type="checkbox"
  
  onChange={() => {
    const isAdded = cart.some((item) => item.id === product.id);
  if (isAdded) {
    removeFromCart(product.id);
  } else {
    addTocart(product);
  }
}}
      className="w-4 h-4 accent-amber-500 shrink-0"
    />

    <img
      src={product.img}
      alt={product.name}
      className="w-10 h-10 sm:w-12 sm:h-12 object-cover rounded shrink-0"
    />

    <p className="text-sm font-medium text-gray-800 truncate">
      {product.name}
    </p>
  </div>

  {/* Right side */}
  <div className="flex items-center sm:justify-end gap-3 shrink-0">

    <p className="text-sm font-semibold text-gray-900 whitespace-nowrap">
      ৳ {finalPrice.toLocaleString()}
    </p>

   <div className="px-3 py-1 flex items-center gap-2 text-xs font-semibold text-red-600 border border-dashed border-red-300 rounded-full bg-red-50 whitespace-nowrap">
  <span>Save</span>
  <span>৳{discountAmount.toLocaleString()}</span>
</div>
  </div>

</div>
          );
        })}
    </div>
  ))}
 <div className="w-full max-w-[700px] font-sans antialiased">

  {/* Header */}
  <div className="bg-[#11161a] text-white flex items-center gap-3 px-5 py-4 rounded-t-lg">
    <h3 className="font-bold text-base tracking-wide">
      Dazzle Care
    </h3>
  </div>

  {/* Care Plans */}
  <div className="bg-[#f0f2f5] border border-t-0 border-gray-200 rounded-b-lg p-3 space-y-3">

    {carePlans.map((item) => {
      const isChecked = selectedCare?.id === item.id;

      return (
        <div
          key={item.id}
          onClick={() => setSelectedCare(isChecked ? null : item)}
          className={`
            flex justify-between items-center p-4 rounded-md cursor-pointer select-none
            transition duration-200
            ${isChecked ? "bg-white shadow-sm" : "bg-[#e8ecef] hover:bg-[#e2e6ea]"}
          `}
        >

          {/* LEFT SIDE */}
          <div className="flex items-start gap-3 flex-1 pr-4">

            <input
              type="checkbox"
              checked={isChecked}
              onChange={() => {}}
              className="w-5 h-5 mt-0.5 accent-black cursor-pointer"
            />

            <span className="text-sm mt-1">
              <img src={item.image} alt=""  />
            </span>

            <p className="text-[13.5px] text-gray-800 font-medium leading-relaxed">
              {item.name}
            </p>
          </div>

          {/* RIGHT SIDE */}
          <div className="text-right min-w-[100px]">
            <span className="block text-xs font-semibold text-gray-500">
              BDT
            </span>
            <span className="block text-sm font-bold text-gray-900 mt-0.5">
              {item.price.toLocaleString("en-IN")}
            </span>
          </div>

        </div>
      );
    })}
  </div>

  {/* Terms */}
  <div className="flex items-center gap-2 mt-4 px-1 select-none">

    <input
      type="checkbox"
      id="terms"
      onChange={(e) => setAgreeTerms(e.target.checked)}
      className="w-4 h-4 accent-green-500 cursor-pointer"
    />

    <label
      htmlFor="terms"
      className="text-[13px] text-gray-700 cursor-pointer"
    >
      I agree to Dazzle{" "}
      <a
        href="#terms"
        className="text-blue-600 underline hover:text-blue-800"
      >
        terms & conditions
      </a>
    </label>

  </div>

</div>
  {/* Total */}
  <h2 className="text-2xl sm:text-3xl font-bold text-orange-500">
    {finalTotal.toLocaleString()}
  </h2>

  {/* Buttons */}
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
    <button onClick={()=>addTocart(product)} className="bg-black text-white py-4 rounded font-semibold">
      ADD TO CART
    </button>

    <button className="border py-4 rounded font-semibold">
      BUY NOW
    </button>
  </div>

  {/* Bottom Cards */}
  <div onClick={() => setShowDeliveryModal(true)} className="grid grid-cols-1  sm:grid-cols-2 gap-3">
    <div className="bg-green-500 text-white rounded p-4">
      <h3 className="font-bold text-xl">In Stock</h3>
      <p className="text-sm">Check Delivery Time</p>




    </div>

    <div className="bg-gray-100 rounded p-4">
      <h3 className="font-bold">1 Year Apple</h3>
      <p className="text-sm text-gray-500">Warranty</p>
    </div>
  </div>

</div>










          </div>

        </div>



      

        
      </div>


{showDeliveryModal && (
  <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 p-4">
    
    <div className="relative bg-white w-full max-w-[500px] rounded-lg p-6 max-h-[80vh] overflow-y-auto">

      {/* Close */}
      <button
        onClick={() => setShowDeliveryModal(false)}
        className="absolute top-3 right-3 w-8 h-8 bg-[#e6c59d] rounded text-xl"
      >
        ×
      </button>

      {/* Header */}
      <div className="flex justify-center mb-6">
        <div className="bg-[#e6c59d] px-6 py-3 rounded">
          Delivery Timeline
        </div>
      </div>

      {/* Timeline */}
      <div className="space-y-3">

        <div className="bg-gray-100 p-3 rounded font-medium">
          Dazzle Product Regular Delivery Timeline:
        </div>

        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>Online/Head office</span>
            <span>2-4 days</span>
          </div>

          <div className="flex justify-between">
            <span>Dubai Branch</span>
            <span>7-15 days</span>
          </div>

          <div className="flex justify-between">
            <span>Jamuna Future Park</span>
            <span>1-3 days</span>
          </div>

          <div className="flex justify-between">
            <span>Finlay Square Branch</span>
            <span>1-3 days</span>
          </div>
          <div className="flex justify-between">
            <span>Jamuna Future Park
</span>
            <span>1 days</span>
          </div>

          <div className="flex justify-between">
            <span>Sanmar Ocean City</span>
            <span>1-3 days</span>
          </div>
        </div>

       <div className="mt-4">

  {/* Header */}
  <button
    onClick={() => setOpenPickup(!openPickup)}
    className="w-full bg-gray-100 p-3 rounded flex items-center justify-between font-medium"
  >
    <span>Dazzle product Store pick Up Timeline:</span>

    <span
      className={`transition-transform duration-300 ${
        openPickup ? "rotate-90" : ""
      }`}
    >
      ➜
    </span>
  </button>

  {/* Content */}
  <div
    className={`overflow-hidden transition-all duration-300 ${
      openPickup ? "max-h-[600px] mt-3" : "max-h-0"
    }`}
  >
    <div className="space-y-4">

      {/* Branch 1 */}
      <div>
        <div className="bg-[#e6c59d] px-4 py-3 flex justify-between">
          <span>If product available at “Finlay Branch”</span>
          <span className="font-semibold">Instant</span>
        </div>

        <div className="space-y-3 p-4">
          <div className="flex justify-between">
            <span>Sanmar Ocean City</span>
            <span>30 mins</span>
          </div>

          <div className="flex justify-between">
            <span>Jamuna Future Park</span>
            <span>1 days</span>
          </div>
        </div>
      </div>

      {/* Branch 2 */}
      <div>
        <div className="bg-[#e6c59d] px-4 py-3 flex justify-between">
          <span>If product available at “Sanmar Branch”</span>
          <span className="font-semibold">Instant</span>
        </div>

        <div className="space-y-3 p-4">
          <div className="flex justify-between">
            <span>Finlay Square Branch</span>
            <span>30 mins</span>
          </div>

          <div className="flex justify-between">
            <span>Jamuna Future Park</span>
            <span>1 days</span>
          </div>
        </div>
      </div>
      <div>
        <div className="bg-[#e6c59d] px-4 py-3 flex justify-between">
          <span>If product available at “Jamuna Branch““</span>
          <span className="font-semibold">Instant</span>
        </div>

        <div className="space-y-3 p-4">
          <div className="flex justify-between">
            <span>Finlay Square Branch</span>
            <span>1 mins</span>
          </div>

          <div className="flex justify-between">
            <span>Sanmar Ocean City</span>
            <span>1 days</span>
          </div>
          <div className="flex justify-between">
            <span>If product available at “Dubai Branch“</span>
            <span>3-10 days</span>
          </div>
        </div>

        <div className="bg-gray-400/60 py-3 px-3">
          nside Chittagong & Dhaka Express Delivery ( Single day/ within 3 hours) possible if product available nearby store
        </div>
      </div>

    </div>
  </div>

</div>

      </div>
    </div>
  </div>
)}

    </div>



<section className="max-w-[1440px] mx-auto px-4 md:px-0  my-10">
      <div className="bg-gradient-to-r from-[#E7D4BF] to-[#D89A56] rounded-2xl p-6">

        <div className="flex flex-col lg:flex-row justify-between gap-5 mb-6">

          <h2 className="text-xl lg:text-2xl font-bold leading-tight">
           Related Products
          </h2>

          <div className="flex items-center gap-3">
           

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
  {relatedProducts.map((product) => {
     const discountAmount =
    (product.originalPrice * product.discountPercentage) / 100;

  const finalPrice = product.originalPrice - discountAmount;


return(
<SwiperSlide key={product.id}>
    <div
      onMouseEnter={() => setHoveredId(product.id)}
      onMouseLeave={() => setHoveredId(null)}
      className="bg-white rounded-lg h-full shadow-sm hover:shadow-lg duration-300 relative overflow-hidden group"
    >
      <div
        className={`absolute top-4 right-3 flex flex-col gap-2 z-20 transition-all duration-300 ${
          hoveredId === product.id
            ? "opacity-100 translate-x-0"
            : "opacity-0 translate-x-12"
        }`}
      >
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
            ৳ {finalPrice.toLocaleString()}
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

          <button
            onClick={() => addTocart(product)}
            className="flex-1 cursor-pointer border py-2 rounded-md"
          >
            Cart
          </button>
        </div>
      </div>
    </div>
  </SwiperSlide>
)





  }
  
  
  
)}
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



    </div>
  );
}
"use client"; 

import React, { useState } from 'react';

export default function ProductDetailPage({ product }) {
const [selectedColor, setSelectedColor] = useState(
  product?.color?.[0] || ""
);
  const [mainDisplayImg, setMainDisplayImg] = useState(product?.img || "");
  const variants = Array.isArray(product?.VARIANT)? product.VARIANT: product?.VARIANT ? [product.VARIANT] : [];
  
  
const storeg = Array.isArray(product?.STORAGE)? product.STORAGE: product?.STORAGE? [product.STORAGE]: [];

console.log("Product:", product);
console.log("VARIANT:", product?.VARIANT);
console.log("Type:", typeof product?.VARIANT);
  const [selectedStorage, setSelectedStorage] = useState(product?.STORAGE?.[0] || "");
  const [selectedRegion, setSelectedRegion] = useState(product?.Region || "");

  if (!product) {
    return <div className="p-8 text-center text-gray-500">No product data found!</div>;
  }


  const formatPrice = (amount) => {
    return amount ? `BDT ${amount.toLocaleString('en-IN')}` : '';
  };

  return (
    <div className="bg-gray-50 max-w-360 mx-auto min-h-screen p-4 md:p-8 font-sans antialiased text-gray-800">
      
     
      <nav className="text-xs text-gray-500 mb-6 flex items-center gap-1">
        <span className="cursor-pointer hover:underline">🏠</span> / 
        <span className="cursor-pointer hover:underline">{product.category || "Phones"}</span> / 
        <span className="cursor-pointer hover:underline">{product.brand}</span> / 
        <span className="text-gray-800 font-medium">{product.name}</span>
      </nav>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        
      
        <div className="lg:col-span-7 flex flex-row gap-4 items-start">
          
       
          <div className="flex flex-col gap-3">
           
           
          
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
        <div className="lg:col-span-5 flex flex-col gap-5">
          
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
              Status: <span className="text-green-700 font-bold">{product.availability}</span>
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

          </div>

        </div>
      </div>
    </div>
  );
}
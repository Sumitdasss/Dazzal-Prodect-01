"use client"

import Link from "next/link";
import { useState, useMemo } from 'react';
import { useSearchParams } from "next/navigation";
import { products } from "../../Data/Data";
import { FaFilter } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";
import  useStore  from "../Componant/Layout/Store/store";

import { FaHeart, FaBalanceScale } from "react-icons/fa";


export default function ProductPage() {
  const {addTocart}=useStore();
  const searchParams = useSearchParams();
const category = searchParams.get("category");

const brand = searchParams.get("brand");
  const [hoveredId, setHoveredId] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [minPrice, setMinPrice] = useState(5000);
  const [maxPrice, setMaxPrice] = useState(250490);
  const [availability, setAvailability] = useState('');
  const [isFilterOpen, setisFilterOpen] = useState(false);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedProsesor, setSelectedProsesor] = useState([]);
  const [selectedRam, setSelectedRam] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState([]);
  const [selectedVARIANT, setSelectedVARIANT] = useState([]);
  const [selectedSIM, setSelectedSIM] = useState([]);
  const [selectedSTORAGE, setSelectedSTORAGE] = useState([]);
  const [sortBy, setSortBy] = useState('Default');


 const brandsList = [...new Set(products.map(item => item.brand))];

  const handelmenue =()=>{
    setisFilterOpen(!isFilterOpen)
  }
  
const colorsList = useMemo(() => {
  return [...new Set(
    products.flatMap(p => p.color || [])
  )];
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [products]);
  const Prosesorlist = useMemo(() => {
    return Array.from(new Set(products.map(p => p.Prosesor).filter(Boolean)));
  }, []);
 
const Ramlist = useMemo(() => {
  return [...new Set(
    products.flatMap(p => p.ram || [])
  )];
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [products]);
 
const VARIANTlist = useMemo(() => {
  return [...new Set(
    products.flatMap(p => p.VARIANT || [])
  )];
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [products]);
  const Regionlist = useMemo(() => {
    return Array.from(new Set(products.map(p => p.Region).filter(Boolean)));
  }, []);
 
  const SIMlist = useMemo(() => {
    return Array.from(new Set(products.map(p => p.SIM).filter(Boolean)));
  }, []);
 
const STORAGElist = useMemo(() => {
  return [...new Set(
    products.flatMap(p => p.STORAGE).filter(Boolean)
  )];
}, []);



  const handleColorChange = (color) => {
    setSelectedColors(prev => 
      prev.includes(color) ? prev.filter(c => c !== color) : [...prev, color]
    );
  };
  const handleProsesorChange = (Prosesor) => {
    setSelectedProsesor(prev => 
      prev.includes(Prosesor) ? prev.filter(c => c !== Prosesor) : [...prev, Prosesor]
    );
  };
  const handleRamChange = (ram) => {
    setSelectedRam(prev => 
      prev.includes(ram) ? prev.filter(c => c !== ram) : [...prev, ram]
    );
  };
  const handleRegionChange = (Region) => {
    setSelectedRegion(prev => 
      prev.includes(Region) ? prev.filter(c => c !== Region) : [...prev, Region]
    );
  };
  const handleVARIANTChange = (VARIANT) => {
    setSelectedVARIANT(prev => 
      prev.includes(VARIANT) ? prev.filter(c => c !== VARIANT) : [...prev, VARIANT]
    );
  };
  const handleSIMChange = (SIM) => {
    setSelectedSIM(prev => 
      prev.includes(SIM) ? prev.filter(c => c !== SIM) : [...prev, SIM]
    );
  };
  const handleSTORAGEChange = (STORAGE) => {
    setSelectedSTORAGE(prev => 
      prev.includes(STORAGE) ? prev.filter(c => c !== STORAGE) : [...prev, STORAGE]
    );
  };

  // Reset Filters
  const clearFilters = () => {
    setSelectedBrand(null);
    setMinPrice(5000);
    setMaxPrice(250490);
    setAvailability('');
    setSelectedColors([]);
    setSortBy('Default');
  };

  // Filtering & Sorting Logic
  const filteredProducts = useMemo(() => {
  let result = [...products];

if (category) {
  result = result.filter(
    (p) => p.category?.toLowerCase() === category.toLowerCase()
  );
}
if (brand) {
  result = result.filter(
    (p) => p.brand?.toLowerCase() === brand.toLowerCase()
  );
}


  if (selectedBrand) {
    result = result.filter(p => p.brand === selectedBrand);
  }

  result = result.filter(
    p => p.price >= minPrice && p.price <= maxPrice
  );

  if (availability) {
    result = result.filter(p => p.availability === availability);
  }

  if (selectedColors.length) {
    result = result.filter(p =>
      p.color?.some(c => selectedColors.includes(c))
    );
  }

  

  if (selectedProsesor.length) {
    result = result.filter(p =>
      selectedProsesor.includes(p.Prosesor)
    );
  }

  if (selectedRam.length) {
    result = result.filter(p => Array.isArray(p.ram) ? p.ram.some(r => selectedRam.includes(r)) : selectedRam.includes(p.ram)
    );
  }

  if (selectedRegion.length) {
    result = result.filter(p =>
      selectedRegion.includes(p.Region)
    );
  }

  if (selectedVARIANT.length) {
    result = result.filter(p =>  Array.isArray(p.VARIANT)   ? p.VARIANT.some(v => selectedVARIANT.includes(v)): selectedVARIANT.includes(p.VARIANT)
    );
  }

  if (selectedSIM.length) {
    result = result.filter(p =>
      selectedSIM.includes(p.SIM)
    );
  }

  if (selectedSTORAGE.length) {
    result = result.filter(p =>Array.isArray(p.STORAGE)? p.STORAGE.some(s => selectedSTORAGE.includes(s)) : selectedSTORAGE.includes(p.STORAGE)
    );
  }

  if (sortBy === "Low to High") {
    result.sort((a, b) => a.price - b.price);
  }

  if (sortBy === "High to Low") {
    result.sort((a, b) => b.price - a.price);
  }

  return result;
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [
  products,
  selectedBrand,
  minPrice,
  maxPrice,
  availability,
  selectedColors,
  selectedProsesor,
  selectedRam,
  selectedRegion,
  selectedVARIANT,
  selectedSIM,
  selectedSTORAGE,
  sortBy,
  category,
brand
]);
  return (
    <div className="bg-[#FCFBFA]  text-gray-800 font-sans antialiased p-4 md:p-8">
      <div className="max-w-360 mx-auto space-y-6">
        
        {/* Top Brand Sliders/Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {brandsList.map((brand, index) => (
  <button
    key={index}
    onClick={() => setSelectedBrand(brand)}
    className={`px-5 py-2 rounded-full border text-sm font-medium transition-all whitespace-nowrap ${
      selectedBrand === brand
        ? "border-[#C5A880] bg-[#C5A880] text-white"
        : "border-gray-200 bg-white hover:border-[#C5A880] text-gray-600"
    }`}
  >
    {brand}
  </button>
))}
        </div>

        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
         
          {/* Sidebar Filters */}
          <aside className={` fixed top-0 left-0 z-50
    w-[300px] h-screen overflow-y-auto
    bg-white p-5 shadow-xl transition-transform duration-300

    ${
      isFilterOpen ? "translate-x-0" : "-translate-x-full"
    }

    md:translate-x-0
    md:static
    md:w-auto
    md:h-auto
    md:shadow-sm
    lg:sticky
    lg:top-4`}>
            
            {/* Price Range Section */}
            <div>
              <div className="flex justify-between items-center bg-gray-100 p-3 rounded-md mb-4 cursor-pointer">
                <span className="text-sm font-bold tracking-wide uppercase text-gray-700">Price Range</span>
            <button
                    onClick={() => setisFilterOpen(false)}
                    className="p-2 rounded-lg md:hidden text-gray-800 hover:bg-gray-200 transition-colors"
                  >
                    <RxCross1 />
                  </button>
              </div>
              <div className="px-1 space-y-4">
                <input 
                  type="range" 
                  min="11990" 
                  max="150490" 
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-[#C5A880]"
                />
                <div className="flex gap-3">
                  <input 
                    type="number" 
                    value={minPrice} 
                    onChange={(e) => setMinPrice(Number(e.target.value))}
                    className="w-full border border-gray-200 rounded p-2 text-center text-sm focus:outline-none focus:border-[#C5A880]" 
                  />
                  <input 
                    type="number" 
                    value={maxPrice} 
                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                    className="w-full border border-gray-200 rounded p-2 text-center text-sm focus:outline-none focus:border-[#C5A880]" 
                  />
                </div>
              </div>
            </div>

            {/* Filter Action Buttons */}
            <div className="flex gap-2 pt-2">
              <button onClick={clearFilters} className="w-1/2 bg-[#EFE6DB] text-[#8C6D41] py-2.5 rounded font-medium text-xs uppercase tracking-wider hover:bg-[#e4d6c5] transition-colors">
                Clear Filters
              </button>
              <button className="w-1/2 bg-[#111] text-white py-2.5 rounded font-medium text-xs uppercase tracking-wider hover:bg-black transition-colors">
                Filter Range
              </button>
            </div>

            {/* Availability Section */}
            <div>
              <div className="flex justify-between mt-5 items-center bg-gray-100 p-3 rounded-md mb-3">
                <span className="text-sm font-bold tracking-wide uppercase text-gray-700">Availability</span>
  
              </div>
              <div className="space-y-2 px-1">
                {["In-Stock", "Pre-Order","Out-of-Stock"].map((status) => (
                  <label key={status} className="flex items-center gap-3 text-sm cursor-pointer text-gray-600">
                    <input 
                      type="radio" 
                      name="availability" 
                      checked={availability === status}
                      onChange={() => setAvailability(status)}
                      className="accent-[#C5A880] h-4 w-4" 
                    />
                    {status}
                  </label>
                ))}
              </div>
            </div>

            {/* Color Section */}
            <div>
              <div className="flex justify-between items-center bg-gray-100 p-3 rounded-md mb-3">
                <span className="text-sm font-bold tracking-wide uppercase text-gray-700">Color</span>
  
              </div>
              <div className="space-y-2 px-1 max-h-40 overflow-y-auto">
                {colorsList.map((color, index) => (
                  <label key={index} className="flex items-center gap-3 text-sm cursor-pointer text-gray-600">
                    <input 
                      type="checkbox" 
                      checked={selectedColors.includes(color)}
                      onChange={() => handleColorChange(color)}
                      className="accent-[#C5A880] rounded h-4 w-4 border-gray-300" 
                    />
                    {color}
                  </label>
                ))}
              </div>
            </div>

            {/* prosesor */}
            <div>
              <div className="flex justify-between items-center bg-gray-100 p-3 rounded-md mb-3">
                <span className="text-sm font-bold tracking-wide uppercase text-gray-700">Prosesor</span>
  
              </div>
              <div className="space-y-2 px-1 max-h-40 overflow-y-auto">
                {Prosesorlist.map((color, index) => (
                  <label key={index} className="flex items-center gap-3 text-sm cursor-pointer text-gray-600">
                    <input 
                      type="checkbox" 
                      checked={selectedProsesor.includes(color)}
                      onChange={() => handleProsesorChange(color)}
                      className="accent-[#C5A880] rounded h-4 w-4 border-gray-300" 
                    />
                    {color}
                  </label>
                ))}
              </div>
            </div>

            <div>

              <div className="flex justify-between items-center bg-gray-100 p-3 rounded-md mb-3">
                <span className="text-sm font-bold tracking-wide uppercase text-gray-700">Ram/Storeag</span>
  
              </div>
              <div className="space-y-2 px-1 max-h-40 overflow-y-auto">
                {Ramlist.map((color, index) => (
                  <label key={index} className="flex items-center gap-3 text-sm cursor-pointer text-gray-600">
                    <input 
                      type="checkbox" 
                      checked={selectedRam.includes(color)}
                      onChange={() => handleRamChange(color)}
                      className="accent-[#C5A880] rounded h-4 w-4 border-gray-300" 
                    />
                    {color}
                  </label>
                ))}
              </div>
            </div>
            <div>

              <div className="flex justify-between items-center bg-gray-100 p-3 rounded-md mb-3">
                <span className="text-sm font-bold tracking-wide uppercase text-gray-700">REGION</span>
  
              </div>
              <div className="space-y-2 px-1 max-h-40 overflow-y-auto">
                {Regionlist.map((color, index) => (
                  <label key={index} className="flex items-center gap-3 text-sm cursor-pointer text-gray-600">
                    <input 
                      type="checkbox" 
                      checked={selectedRegion.includes(color)}
                      onChange={() => handleRegionChange(color)}
                      className="accent-[#C5A880] rounded h-4 w-4 border-gray-300" 
                    />
                 
                    {color}
                  </label>
                ))}
              </div>
            </div>
            <div>

              <div className="flex justify-between items-center bg-gray-100 p-3 rounded-md mb-3">
                <span className="text-sm font-bold tracking-wide uppercase text-gray-700">REGION/VARIANT</span>
  
              </div>
              <div className="space-y-2 px-1 max-h-40 overflow-y-auto">
                {VARIANTlist.map((color, index) => (
                  <label key={index} className="flex items-center gap-3 text-sm cursor-pointer text-gray-600">
                    <input 
                      type="checkbox" 
                      checked={selectedVARIANT.includes(color)}
                      onChange={() => handleVARIANTChange(color)}
                      className="accent-[#C5A880] rounded h-4 w-4 border-gray-300" 
                    />
                 
                    {color}
                  </label>

               
                ))}
              </div>
            </div>
            <div>

              <div className="flex justify-between items-center bg-gray-100 p-3 rounded-md mb-3">
                <span className="text-sm font-bold tracking-wide uppercase text-gray-700">SIM/NETWORK</span>
  
              </div>
              <div className="space-y-2 px-1 max-h-40 overflow-y-auto">
                {SIMlist.map((color, index) => (
                  <label key={index} className="flex items-center gap-3 text-sm cursor-pointer text-gray-600">
                    <input 
                      type="checkbox" 
                      checked={selectedSIM.includes(color)}
                      onChange={() => handleSIMChange(color)}
                      className="accent-[#C5A880] rounded h-4 w-4 border-gray-300" 
                    />
              
                    {color}
                  </label>

               
                ))}
              </div>
            </div>
            <div>

              <div className="flex justify-between items-center bg-gray-100 p-3 rounded-md mb-3">
                <span className="text-sm font-bold tracking-wide uppercase text-gray-700">STORAGE</span>
  
              </div>
              <div className="space-y-2 px-1 max-h-40 overflow-y-auto">
                {STORAGElist.map((color, index) => (
                  <label key={index} className="flex items-center gap-3 text-sm cursor-pointer text-gray-600">
                    <input 
                      type="checkbox" 
                      checked={selectedSTORAGE.includes(color)}
                      onChange={() => handleSTORAGEChange(color)}
                      className="accent-[#C5A880] rounded h-4 w-4 border-gray-300" 
                    />
              
                    {color}
                  </label>

               
                ))}
              </div>
            </div>

          </aside>






        















          

          {/* Product Grid Area */}
          <main className="lg:col-span-3 space-y-4">
            
            {/* Control Bar Header */}
            <div className="bg-white  border border-gray-100 p-4 rounded-lg flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shadow-sm">
              <div>
                <h1 className="text-lg font-bold text-gray-900">Products Of Phones</h1>
                <p className="text-xs text-gray-500 mt-0.5">Showing 1 to {filteredProducts.length} items from {products.length} Products</p>
              </div>
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border  border-gray-200 bg-gray-50 rounded-md px-4 py-2 text-sm focus:outline-none focus:border-[#C5A880] w-full sm:w-auto"
              >
                <option>Default</option>
                <option>Low to High</option>
                <option>High to Low</option>
              </select>
               <button onClick={handelmenue} className="flex md:hidden items-center gap-2 border border-[#bfa280]/60 hover:border-[#bfa280] px-3 md:px-4 py-2 rounded-md text-[#dda96a] transition-colors"><FaFilter/>FILTER</button>
            </div>

            {/* Products Grid */}
            {filteredProducts.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-lg border border-gray-100 text-gray-400">
                No products match your current filtering criteria.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {filteredProducts.map((product) => (
                  <div key={product.id}  onMouseEnter={() => setHoveredId(product.id)}
  onMouseLeave={() => setHoveredId(null)} className="bg-white border border-gray-100 rounded-lg p-4 flex flex-col justify-between relative shadow-sm hover:shadow-md transition-shadow group">
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
                    {/* Upper Badges */}
                    <div className="absolute top-3 left-3 z-10 flex flex-col gap-1">
                      {product.discount && (
                        <span className="bg-[#BA8E55] text-white font-bold text-[10px] px-2 py-0.5 rounded-sm">
                          {product.discount}
                        </span>
                      )}
                    </div>
                    {product.isHot && (
                      <div className="absolute top-3 right-3 z-10 bg-black text-[#E8C28A] text-[10px] font-semibold px-2 py-0.5 rounded-sm flex items-center gap-1">
                        <span className="w-1 h-1 bg-red-500 rounded-full animate-ping"></span>
                        Hot Product
                      </div>
                    )}

                    {/* Image Box */}
                     <Link href={`/DetailPage/${product.id}`}>
                    <div className="w-full h-48 flex items-center justify-center overflow-hidden mb-4 rounded bg-gray-50 p-2">
                     <img 
                        src={product.img} 
                        alt={product.name} 
                        className="max-h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-300"
                      />
                     
                    </div>
                     </Link>

                    {/* Meta Info */}
                    <div className="text-center space-y-1.5 flex-grow">
                      {/* Warranty Tag */}
                      <div className="inline-flex items-center gap-1 text-[10px] text-gray-500 border border-gray-200 px-1.5 py-0.5 rounded bg-gray-50">
                        <span className="font-bold text-[#8C6D41]">1 YEAR</span> Warranty
                      </div>
                      <h3 className="font-semibold text-sm text-gray-800 line-clamp-1 group-hover:text-[#BA8E55] transition-colors">
                        {product.name}
                      </h3>
                      <div className="flex justify-center items-center gap-2">
                        <span className="text-sm font-bold text-gray-900">৳ {product.price?.toLocaleString()}</span>
                        {product.originalPrice && (
                          <span className="text-xs text-gray-400 line-through">৳ {product.originalPrice?.toLocaleString()}</span>
                        )}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2 mt-4 pt-2 border-t border-gray-50">
 <Link href={`/DetailPage/${product.id}`}>
                      <button className="px-7 cursor-pointer bg-black text-white text-xs py-2 rounded font-medium hover:bg-gray-900 transition-colors">

                        View
                        
                      </button>
                        </Link>
                      <button onClick={()=>addTocart(product)} className="w-2/3 bg-[#FCF7F0] border border-[#EFE6DB] text-[#8C6D41] text-xs py-2 rounded font-semibold hover:bg-[#BA8E55] hover:text-white hover:border-[#BA8E55] transition-all">
                        ADD TO CART
                      </button>
                    </div>

                  </div>
                ))}
              </div>
            )}

          </main>
        </div>
      </div>
    </div>
  );
}
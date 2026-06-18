/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useRef, useState } from "react";
import { FaGift, FaFileInvoice } from "react-icons/fa";
import { LuMenu } from "react-icons/lu";
import { RxCross1 } from "react-icons/rx";
import { FaAngleRight } from "react-icons/fa6";
import { CgShoppingCart } from "react-icons/cg";
import { categories } from "../Data/Data";
import useStore from "./Componant/Layout/Store/store";
import Link from "next/link";
import { products } from "../Data/Data";
const Heading = () => {
  const getBrandsByCategory = (category) => {
  return [...new Set(  products.filter((p) => p?.category?.toLowerCase().trim() ===category?.toLowerCase().trim()) .map((p) => p.brand))];};

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMenuOpen2, setIsMenuOpen2] = useState(false);
  const menuRef = useRef(null);
  const [openMenu2, setOpenMenu2] = useState(null);
  const [search, setSearch] = useState("");

  const { cart } = useStore();
  const totalItems = cart.length;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen2(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const toggleMenu2 = () => {
    setIsMenuOpen2(!isMenuOpen2);
  };
  const handleSearch = () => {
    console.log(search);
  };

  const [activeCategory, setActiveCategory] = useState(categories[0]);
  return (
    <div className="">
      <div className="w-full border-b hidden md:block border-gray-200 bg-white text-xs text-slate-700 overflow-x-auto whitespace-nowrap scrollbar-none">
        <div className="max-w-[1440px] mx-auto h-10 flex items-center justify-between max-w-[600px] md:min-w-0">
          <div className="flex items-center gap-2 font-medium">
            <svg
              className="w-4 h-4 text-slate-800"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.387a12.017 12.017 0 01-4.522-4.522c-.154-.44.011-.927.387-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
              />
            </svg>
            <a
              href="tel:09638001122"
              className="hover:text-blue-600 text-[14px] md:text-[16px] transition-colors"
            >
              09638001122
            </a>
          </div>

          <div className="flex items-center gap-4 md:gap-6 font-semibold uppercase tracking-wider text-[11px]">
            <a
              href="#order-tracking"
              className="hover:text-blue-600 text-[12px] transition-colors"
            >
              Order Tracking
            </a>
            <a
              href="#gift"
              className="hover:text-blue-600 transition-colors text-[12px] flex items-center gap-1"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 inline-block"></span>
              Gift
            </a>
            <a
              href="#blogs"
              className="hover:text-blue-600 transition-colors text-[12px] flex items-center gap-1"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 inline-block"></span>
              Blogs
            </a>
            <a
              href="#emi-policy"
              className="hover:text-blue-600 text-[12px] transition-colors"
            >
              EMI Policy
            </a>
            <a
              href="#store-location"
              className="hover:text-blue-600 text-[12px] transition-colors"
            >
              Store Location
            </a>
          </div>
        </div>
      </div>

      <div className="w-full bg-[#11161a] text-white py-3 md:py-4 px-4 border-b border-gray-800">
        <div className="max-w-[1440px] mx-auto flex md:items-center justify-between gap-4">
          <div className="flex items-center justify-between w-full md:w-auto">
            <div className="shrink-0">
              <img
                src="https://dazzle.com.bd/brandlogo/logo.svg"
                alt="logo"
                className="h-6 md:h-auto"
              />
            </div>
          </div>

          <div className="flex flex-1 w-full max-w-2xl items-center gap-2">
            <div className="relative w-full">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search products..."
                className="w-37.5 md:w-full bg-white text-gray-800 pl-4 pr-4 py-2 md:py-2.5 rounded-lg text-sm focus:outline-none placeholder-gray-400 font-medium"
              />
            </div>
            <button
              onClick={handleSearch}
              className="bg-[#e9cdb3] hover:bg-[#dfbe9f] text-gray-900 p-2 md:p-2.5 rounded-lg transition-colors flex items-center justify-center flex-shrink-0"
            >
              <svg
                className="w-5 h-5 stroke-[2.5]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.604 10.604z"
                />
              </svg>
            </button>

            <div className="relative">
              <button
                onClick={toggleMenu}
                className="md:hidden p-2 border border-white/20 rounded-lg text-white hover:bg-gray-800 transition-colors"
              >
                <LuMenu size={20} />
              </button>

              <div
                className={`w-90 h-screen fixed top-0 left-0 bg-white/40 backdrop-blur-[10px] text-black font-sans shadow-2xl border-r border-white/30 flex flex-col z-50 overflow-hidden ring-1 ring-white/20 transition-transform duration-300 ${
                  isMenuOpen ? "translate-x-0" : "-translate-x-full"
                }`}
              >
                <div className="p-6 pb-4 flex items-center justify-between">
                  <div className="w-32">
                    <img
                      src="https://dazzle.com.bd/brandlogo/logo.svg"
                      alt="Dazzle"
                      className="h-auto w-full"
                    />
                  </div>
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    className="p-2 rounded-lg text-gray-800 hover:bg-gray-200 transition-colors"
                  >
                    <RxCross1 />
                  </button>
                </div>

                <nav className="flex-1 overflow-y-auto px-6 py-4 space-y-6 custom-scrollbar">
                  <span className="gap-2 font-bold tracking-wider text-gray-800 group-hover:text-black uppercase flex items-center">
                    <img
                      src="https://dazzle.com.bd/_next/image?url=%2Fcategory.png&w=16&q=75"
                      alt="alt"
                    />{" "}
                    ALL CATEGORIES
                  </span>

                  {/* PHONES */}
                  {categories.map((item) => (
                    <div key={item.name} className="w-full">
                      <button
                        onClick={() =>
                          setOpenMenu2(
                            openMenu2 === item.name ? null : item.name,
                          )
                        }
                        className="w-full text-[13px] py-2 flex items-center justify-between gap-2 font-bold tracking-wider text-gray-800 uppercase"
                      >
                        <span className="flex items-center gap-2">
                          <img src={item.icon} alt={item.name} />
                          {item.name}
                        </span>

                        <FaAngleRight
                          className={`transition-transform duration-300 ${
                            openMenu2 === item.name ? "rotate-90" : ""
                          }`}
                        />
                      </button>

                      <div
                        className={`overflow-hidden transition-all w-full bg-white shadow-lg rounded-md duration-300 ${
                          openMenu2 === item.name ? "max-h-100" : "max-h-0"
                        }`}
                      >
                         {getBrandsByCategory(item.name).map((brand, idx) => (
    <li
      key={idx}
      className="px-5 py-2.5 hover:bg-[#064e3b] hover:text-[#5eead4] text-[12px] uppercase"
    >
      <Link href={`/Shop?category=${item.name}&brand=${brand}`}>
            {brand}
          </Link>
    </li>
  ))}
                      </div>
                    </div>
                  ))}

                  {/* TABLET */}

                  <div className="flex items-center justify-between group cursor-pointer">
                    <span className="text-[13px] py-1 flex items-center gap-2 font-bold tracking-wider text-gray-800 group-hover:text-black uppercase">
                      <img
                        src="https://dazzle.com.bd/images/categories/2.svg"
                        alt="SMART TV"
                      />{" "}
                      Order Tracking
                    </span>
                  </div>
                  <div className="flex items-center justify-between group cursor-pointer">
                    <span className="text-[13px] py-1 flex items-center gap-2 font-bold tracking-wider text-gray-800 group-hover:text-black uppercase">
                      <img
                        src="https://dazzle.com.bd/gift.svg"
                        alt="SMART TV"
                      />{" "}
                      Gift
                    </span>
                  </div>
                  <div className="flex items-center justify-between group cursor-pointer">
                    <span className="text-[13px] py-1 flex items-center gap-2 font-bold tracking-wider text-gray-800 group-hover:text-black uppercase">
                      <img
                        src="https://dazzle.com.bd/_next/image?url=%2Fonline-exclusive.png&w=16&q=75"
                        alt="SMART TV"
                      />{" "}
                      ONLINE EXCLUSIVE
                    </span>
                  </div>
                </nav>

                <div className="h-1.5 w-full bg-linear-to-r from-amber-200/50 via-amber-500/50 to-transparent opacity-30"></div>
              </div>
            </div>
          </div>

          <div className="md:flex lg:flex hidden md:block items-center gap-2 md:gap-3 text-xs font-semibold tracking-wider whitespace-nowrap pb-1 md:pb-0">
            <a
              href="#offer"
              className="flex items-center gap-1.5 bg-[#1a2228] border border-gray-800 hover:border-amber-500/50 px-3 md:px-4 py-2 rounded-full text-[#dda96a] transition-all"
            >
              <span className="flex items-center gap-1">
                OFFER <FaGift className="text-[#dda96a] text-[14px]" />
              </span>
            </a>

            <a
              href="#pre-order"
              className="flex items-center gap-2 border border-[#bfa280]/60 hover:border-[#bfa280] px-3 md:px-4 py-2 rounded-md text-[#dda96a] transition-colors"
            >
              <FaFileInvoice className="w-4 h-4 text-[#dda96a]" />
              <span>PRE ORDER</span>
            </a>

            <Link
              href="/Cart"
              className="relative flex items-center gap-2 border border-[#bfa280]/60 hover:border-[#bfa280] px-3 md:px-4 py-2 rounded-md text-[#dda96a] transition-colors "
            >
              <div className="relative">
                <CgShoppingCart />
              </div>
              <span className="absolute -top-2 z-30 -right-2 flex items-center justify-center min-w-[18px] h-[18px] rounded-full bg-red-600 text-white text-[10px] font-bold">
                {totalItems}
              </span>
              <span>CART</span>
            </Link>
            <a
              href="#login"
              className="border border-[#bfa280]/60 hover:border-[#bfa280] px-3 md:px-4 py-2 rounded-md text-[#dda96a] transition-colors"
            >
              LOGIN
            </a>
          </div>
        </div>
      </div>

      <div className="w-full hidden md:block bg-white border-b border-gray-100 shadow-sm px-4">
        <div className="max-w-[1440px] mx-auto flex items-center justify-between py-2.5 md:py-3 gap-4">
          <div ref={menuRef} className="relative">
            <button
              onClick={toggleMenu2}
              className="hidden md:block p-2.5 border border-[#e9cdb3] rounded-lg text-gray-700 hover:bg-gray-50 transition-colors flex-shrink-0"
            >
              <LuMenu size={24} />
            </button>

            <div
              className={`absolute top-15 left-0 z-50 w-[700px] duration-500 bg-white rounded-lg shadow-xl overflow-hidden ${
                isMenuOpen2 ? "max-h-[600px]" : "max-h-0"
              }`}
            >
              <div className="flex h-[500px]">
                {/* Categories */}
                <div className="w-52 border-r bg-gray-50 overflow-y-auto">
                  {categories.map((cat) => (
                    <div
                      key={cat.name}
                      onClick={() => setActiveCategory(cat)}
                      className={`px-4 py-3 cursor-pointer transition-colors ${
                        activeCategory.name === cat.name
                          ? "bg-amber-100 font-semibold"
                          : "hover:bg-gray-100"
                      }`}
                    >
                      {cat.name}
                    </div>
                  ))}
                </div>

                {/* Brands */}
                <div className="flex-1 p-6 overflow-y-auto">
                  <h3 className="text-lg font-semibold mb-6 text-gray-800">
                    Popular Brands
                  </h3>

                  <div className="grid grid-cols-3 gap-6">
                    {activeCategory?.sub?.map((brand) => (
                      <div
                        key={brand.name}
                        className="flex flex-col items-center justify-center p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition"
                      >
                        <img
                          src={brand.logo}
                          alt={brand.name}
                          className="h-12 w-auto object-contain"
                        />

                        <span className="mt-2 text-sm text-gray-600 text-center">
                          {brand.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <ul className="flex items-center gap-5 md:gap-7 whitespace-nowrap py-1">
            {/* PHONES */}
            <li className="relative group">
              <Link
                href="/Shop"
                className="flex items-center gap-2 text-slate-800 hover:text-[#bfa280] transition-colors flex-shrink-0"
              >
                <img
                  src="https://dazzle.com.bd/images/categories/1.svg"
                  alt="PHONES"
                  className="w-5 h-5 md:w-6 md:h-6 flex-shrink-0"
                />
                <span className="text-[11px] font-bold tracking-wider">
                  PHONES
                </span>
              </Link>
              {/* Dropdown Content */}
              <div className="w-[220px] max-h-0 opacity-0 absolute top-full left-0 bg-white shadow-xl rounded-b-lg border border-gray-100 z-50 overflow-hidden transition-all duration-300 pointer-events-none group-hover:max-h-[500px] group-hover:opacity-100 group-hover:pointer-events-auto text-black">
              <ul className="flex flex-col">
  {getBrandsByCategory("Phones").map((item, idx) => (
    <li
      key={idx}
      className="px-5 py-2.5 hover:bg-[#064e3b] hover:text-[#5eead4] text-[12px] uppercase"
    >
      <Link href={`/Shop?brand=${item}`}>
        {item}
      </Link>
    </li>
  ))}
</ul>
              </div>
            </li>

            {/* TABLET */}
            <li className="relative group">
              <a
                href="#"
                className="flex items-center gap-2 text-slate-800 hover:text-[#bfa280] transition-colors flex-shrink-0"
              >
                <img
                  src="https://dazzle.com.bd/images/categories/2.svg"
                  alt="TABLET"
                  className="w-5 h-5 md:w-6 md:h-6 flex-shrink-0"
                />
                <span className="text-[11px] font-bold tracking-wider">
                  TABLET
                </span>
              </a>
              <div className="w-[220px] max-h-0 opacity-0 absolute top-full left-0 bg-white shadow-xl rounded-b-lg border border-gray-100 z-50 overflow-hidden transition-all duration-300 pointer-events-none group-hover:max-h-[500px] group-hover:opacity-100 group-hover:pointer-events-auto text-black">
                <ul className="flex flex-col">
                 {getBrandsByCategory("TABLET").map((item, idx) => (
  <li key={idx} className="px-5 py-2.5 hover:bg-[#064e3b] hover:text-[#5eead4] text-[12px] uppercase">
<Link href={`/Shop?brand=${item}`}>
    {item}
    </Link>
  </li>
))}
                </ul>
              </div>
            </li>

            {/* LAPTOP */}
            <li className="relative group">
              <a
                href="#"
                className="flex items-center gap-2 text-slate-800 hover:text-[#bfa280] transition-colors flex-shrink-0"
              >
                <img
                  src="https://dazzle.com.bd/images/categories/3.svg"
                  alt="LAPTOP"
                  className="w-5 h-5 md:w-6 md:h-6 flex-shrink-0"
                />
                <span className="text-[11px] font-bold tracking-wider">
                  LAPTOP
                </span>
              </a>
              <div className="w-[220px] max-h-0 opacity-0 absolute top-full left-0 bg-white shadow-xl rounded-b-lg border border-gray-100 z-50 overflow-hidden transition-all duration-300 pointer-events-none group-hover:max-h-[500px] group-hover:opacity-100 group-hover:pointer-events-auto text-black">
                <ul className="flex flex-col">
                      {getBrandsByCategory("LAPTOP").map((item, idx) => (
  <li key={idx} className="px-5 py-2.5 hover:bg-[#064e3b] hover:text-[#5eead4] text-[12px] uppercase">
<Link href={`/Shop?brand=${item}`}>
    {item}
    </Link>
  </li>
))}
                </ul>
              </div>
            </li>

            {/* SMART WATCH */}
            <li className="relative group">
              <a
                href="#"
                className="flex items-center gap-2 text-slate-800 hover:text-[#bfa280] transition-colors flex-shrink-0"
              >
                <img
                  src="https://dazzle.com.bd/images/categories/4.svg"
                  alt="SMART WATCH"
                  className="w-5 h-5 md:w-6 md:h-6 flex-shrink-0"
                />
                <span className="text-[11px] font-bold tracking-wider">
                  SMART WATCH
                </span>
              </a>
              <div className="w-[220px] max-h-0 opacity-0 absolute top-full left-0 bg-white shadow-xl rounded-b-lg border border-gray-100 z-50 overflow-hidden transition-all duration-300 pointer-events-none group-hover:max-h-[500px] group-hover:opacity-100 group-hover:pointer-events-auto text-black">
                <ul className="flex flex-col">
                    {getBrandsByCategory(" SMART WATCH").map((item, idx) => (
  <li key={idx} className="px-5 py-2.5 hover:bg-[#064e3b] hover:text-[#5eead4] text-[12px] uppercase">
<Link href={`/Shop?brand=${item}`}>
    {item}
    </Link>
  </li>
))}
                </ul>
              </div>
            </li>

            {/* GADGET */}
            <li className="relative group">
              <a
                href="#"
                className="flex items-center gap-2 text-slate-800 hover:text-[#bfa280] transition-colors flex-shrink-0"
              >
                <img
                  src="https://dazzle.com.bd/images/categories/6.svg"
                  alt="GADGET"
                  className="w-5 h-5 md:w-6 md:h-6 flex-shrink-0"
                />
                <span className="text-[11px] font-bold tracking-wider">
                  GADGET
                </span>
              </a>
              <div className="w-[220px] max-h-0 opacity-0 absolute top-full left-0 bg-white shadow-xl rounded-b-lg border border-gray-100 z-50 overflow-hidden transition-all duration-300 pointer-events-none group-hover:max-h-[500px] group-hover:opacity-100 group-hover:pointer-events-auto text-black">
                <ul className="flex flex-col">
                  {getBrandsByCategory("GADGET").map((item, idx) => (
  <li key={idx} className="px-5 py-2.5 hover:bg-[#064e3b] hover:text-[#5eead4] text-[12px] uppercase">
<Link href={`/Shop?brand=${item}`}>
    {item}
    </Link>
  </li>
))}
                </ul>
              </div>
            </li>

            {/* ACCESSORIES */}
            <li className="relative group">
              <a
                href="#"
                className="flex items-center gap-2 text-slate-800 hover:text-[#bfa280] transition-colors flex-shrink-0"
              >
                <img
                  src="https://dazzle.com.bd/images/categories/7.svg"
                  alt="ACCESSORIES"
                  className="w-5 h-5 md:w-6 md:h-6 flex-shrink-0"
                />
                <span className="text-[11px] font-bold tracking-wider">
                  ACCESSORIES
                </span>
              </a>
              <div className="w-[220px] max-h-0 opacity-0 absolute top-full left-0 bg-white shadow-xl rounded-b-lg border border-gray-100 z-50 overflow-hidden transition-all duration-300 pointer-events-none group-hover:max-h-[500px] group-hover:opacity-100 group-hover:pointer-events-auto text-black">
                <ul className="flex flex-col">
                    {getBrandsByCategory("ACCESSORIES").map((item, idx) => (
  <li key={idx} className="px-5 py-2.5 hover:bg-[#064e3b] hover:text-[#5eead4] text-[12px] uppercase">
<Link href={`/Shop?brand=${item}`}>
    {item}
    </Link>
  </li>
))}
                </ul>
              </div>
            </li>

            {/* SOUNDS */}
            <li className="relative group">
              <a
                href="#"
                className="flex items-center gap-2 text-slate-800 hover:text-[#bfa280] transition-colors flex-shrink-0"
              >
                <img
                  src="https://dazzle.com.bd/images/categories/5.svg"
                  alt="SOUNDS"
                  className="w-5 h-5 md:w-6 md:h-6 flex-shrink-0"
                />
                <span className="text-[11px] font-bold tracking-wider">
                  SOUNDS
                </span>
              </a>
              <div className="w-[220px] max-h-0 opacity-0 absolute top-full left-0 bg-white shadow-xl rounded-b-lg border border-gray-100 z-50 overflow-hidden transition-all duration-300 pointer-events-none group-hover:max-h-[500px] group-hover:opacity-100 group-hover:pointer-events-auto text-black">
                <ul className="flex flex-col">
                   {getBrandsByCategory("SOUNDS").map((item, idx) => (
  <li key={idx} className="px-5 py-2.5 hover:bg-[#064e3b] hover:text-[#5eead4] text-[12px] uppercase">
<Link href={`/Shop?brand=${item}`}>
    {item}
    </Link>
  </li>
))}
                </ul>
              </div>
            </li>

            {/* SMART TV */}
            <li className="relative group">
              <a
                href="#"
                className="flex items-center gap-2 text-slate-800 hover:text-[#bfa280] transition-colors flex-shrink-0"
              >
                <img
                  src="https://dazzle.com.bd/images/categories/8.svg"
                  alt="SMART TV"
                  className="w-5 h-5 md:w-6 md:h-6 flex-shrink-0"
                />
                <span className="text-[11px] font-bold tracking-wider">
                  SMART TV
                </span>
              </a>
              <div className="w-[220px] max-h-0 opacity-0 absolute top-full left-0 bg-white shadow-xl rounded-b-lg border border-gray-100 z-50 overflow-hidden transition-all duration-300 pointer-events-none group-hover:max-h-[500px] group-hover:opacity-100 group-hover:pointer-events-auto text-black">
                <ul className="flex flex-col">
                    {getBrandsByCategory("SMART TV").map((item, idx) => (
  <li key={idx} className="px-5 py-2.5 hover:bg-[#064e3b] hover:text-[#5eead4] text-[12px] uppercase">
<Link href={`/Shop?brand=${item}`}>
    {item}
    </Link>
  </li>
))}
                </ul>
              </div>
            </li>
          </ul>

          {/* রাইট বাটন */}
          <button className="bg-[#11161a] text-[#dda96a] px-4 md:px-6 py-2 md:py-2.5 rounded-lg text-[10px] md:text-[11px] font-bold tracking-widest hover:bg-black transition-all flex-shrink-0">
            ONLINE EXCLUSIVE
          </button>
        </div>
      </div>
    </div>
  );
};

export default Heading;

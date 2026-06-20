'use client';

import React, { useState } from 'react';
// react-icons থেকে প্রয়োজনীয় আইকনগুলো ইম্পোর্ট করা হয়েছে
import { FaUser, FaLock, FaEye, FaEyeSlash, FaGoogle } from 'react-icons/fa';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className=" bg-gray-50 flex items-center justify-center p-4 md:p-10">
      <div className="max-w-360 w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-white rounded-2xl p-6 md:p-12 shadow-sm">
        
        {/* Left Side: Illustration */}
        <div className="hidden md:flex justify-center items-center">
          <img 
            src="https://dazzle.com.bd/images/auth/login_img.svg" 
            alt="Login Security Illustration" 
            className="w-full max-w-md h-auto object-contain"
          />
        </div>

        {/* Right Side: Login Form */}
        <div className="w-full max-w-md mx-auto">
          <h2 className="text-xl md:text-2xl font-semibold text-gray-800 text-center mb-8">
            Continue with Username
          </h2>

          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            {/* Email/Phone Input */}
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-gray-400">
                <FaUser size={16} />
              </span>
              <input
                type="text"
                placeholder="Email or phone number"
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-orange-200 transition text-sm text-gray-700 placeholder-gray-400"
              />
            </div>

            {/* Password Input */}
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-gray-400">
                <FaLock size={16} />
              </span>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full pl-10 pr-10 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-orange-200 transition text-sm text-gray-700 placeholder-gray-400"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
              </button>
            </div>

            {/* Forgot Password */}
            <div className="text-right">
              <a href="#" className="text-xs text-gray-500 font-medium hover:underline">
                Forget Password?
              </a>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-[#FDF0E6] text-gray-800 font-bold py-3 px-4 rounded-lg hover:bg-[#fbe4d3] transition text-sm tracking-wider uppercase"
            >
              LOGIN
            </button>
          </form>

          {/* OR Separator 1 */}
          <div className="relative flex py-5 items-center">
            <div className="flex-grow border-t border-dashed border-gray-200"></div>
            <span className="flex-shrink mx-4 text-gray-400 text-xs">or</span>
            <div className="flex-grow border-t border-dashed border-gray-200"></div>
          </div>

          {/* Alternate Login Link */}
          <div className="text-center">
            <a href="#" className="text-xs text-gray-700 font-semibold underline hover:text-black">
              Login with Phone number
            </a>
          </div>

          {/* Register Link */}
          <div className="text-center mt-6 text-xs text-gray-700 font-medium">
         
            <a href="#" className="text-[#D4AF37] font-semibold hover:underline">
              Register
            </a>
          </div>

          {/* OR Separator 2 */}
          <div className="relative flex py-6 items-center">
            <div className="flex-grow border-t border-gray-200"></div>
            <span className="flex-shrink mx-4 text-gray-400 text-xs">or</span>
            <div className="flex-grow border-t border-gray-200"></div>
          </div>

          {/* Google Login Button */}
          <button className="w-full flex items-center justify-center gap-2.5 border border-gray-200 py-2.5 rounded-lg hover:bg-gray-50 transition text-sm font-medium text-gray-700">
            <FaGoogle className="text-[#4285F4]" size={16} />
            <span>Login with Google</span>
          </button>

        </div>
      </div>
    </div>
  );
}
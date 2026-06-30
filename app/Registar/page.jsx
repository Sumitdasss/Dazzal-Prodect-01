/* eslint-disable @next/next/no-html-link-for-pages */
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import useStore from "../Componant/Layout/Store/store";
import { User, Mail, Phone, Lock, EyeOff } from "lucide-react";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();

  const register = useStore((state) => state.register);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");

  const [image, setImage] = useState("");
  const [address, setaddress] = useState("");

  // Image Convert
  function handleImage(e) {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

     reader.onload = ()=>{

 console.log(reader.result);

 setImage(reader.result);

};

      reader.readAsDataURL(file);
    }
  }

  function handleRegister(e) {
    e.preventDefault();

    const userData = {
      id: Date.now(),
      name,
      email,
      password,
      phone,
      address,
      image: image,
    };

    register(userData);

    router.push("/Login");
  }

  return (
    <div className="min-h-screen bg-[#F4F6F8] flex items-center justify-center p-4 md:p-10">
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 items-center gap-10 md:gap-16">
        {/* Left Side: Illustration */}
        <div className="hidden md:flex justify-center items-center">
          <div className="relative w-full max-w-md h-[400px]">
            <img
              src="https://dazzle.com.bd/images/auth/register_img.svg"
              alt="Registration Illustration"
              className="object-contain w-full h-full"
            />
          </div>
        </div>

        {/* Right Side: Registration Form Card */}
        <div className="bg-white rounded-lg p-8 md:p-12 shadow-sm max-w-md w-full mx-auto">
          <h2 className="text-xl md:text-2xl font-semibold text-center text-gray-800 mb-8">
            Lets join with us.
          </h2>

          <form className="space-y-4" onSubmit={handleRegister}>
            <div className="flex justify-center relative">
              <div className="w-28 h-28 rounded-full overflow-hidden bg-gray-200">
               <img
  src={image || "https://i.pravatar.cc/150"}
  alt="Profile preview"
  className="w-full h-full object-cover"
/>
              </div>

              <label className="absolute bottom-0 right-32 bg-blue-600 text-white p-3 rounded-full cursor-pointer">
                <User />
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={handleImage}
                />
              </label>
            </div>

            {/* Name Input */}
            <div className="relative flex items-center">
              <User className="absolute left-3 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Type your name..."
                className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:border-gray-400 text-sm placeholder-gray-400 text-gray-700"
              />
            </div>

            {/* Email Input */}
            <div className="relative flex items-center">
              <Mail className="absolute left-3 text-gray-400 w-5 h-5" />
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Email..."
                className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:border-gray-400 text-sm placeholder-gray-400 text-gray-700"
              />
            </div>

            {/* Phone Input */}
            <div className="relative flex items-center">
              <Phone className="absolute left-3 text-gray-400 w-5 h-5" />
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Phone..."
                className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:border-gray-400 text-sm placeholder-gray-400 text-gray-700"
              />
            </div>
            <div className="relative flex items-center">
              <Phone className="absolute left-3 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={address}
                onChange={(e) => setaddress(e.target.value)}
                placeholder="Address"
                className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:border-gray-400 text-sm placeholder-gray-400 text-gray-700"
              />
            </div>

            {/* Password Input */}
            <div className="relative flex items-center">
              <Lock className="absolute left-3 text-gray-400 w-5 h-5" />
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Password"
                className="w-full pl-11 pr-10 py-3 border border-gray-200 rounded-md focus:outline-none focus:border-gray-400 text-sm placeholder-gray-400 text-gray-700"
              />
              <button
                type="button"
                className="absolute right-3 text-gray-400 hover:text-gray-600"
              >
                <EyeOff className="w-5 h-5" />
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-[#F5EBE1] text-gray-800 font-medium py-3 rounded-md transition duration-200 text-xs tracking-wider border border-transparent hover:border-gray-300 active:scale-[0.99]"
            >
              REGISTER NOW
            </button>
          </form>

          {/* Login Link */}
          <div className="text-center mt-8 text-xs font-medium text-gray-800">
            Already have an account?{" "}
            <Link href="/login" className="text-[#C5A85C] hover:underline">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

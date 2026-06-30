"use client"
import React, { useState } from 'react';
import useStore from '../Componant/Layout/Store/store';
import { User, Mail, Phone, MapPin, Camera, LogOut, Save, ShieldCheck } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
const  router=useRouter()
    const user = useStore((state) => state.user);
  // ডেমো ইউজার ডাটা স্টেট (ভবিষ্যতে API থেকে আসবে)
  const logout = useStore(
 state=>state.logout
);
  const delet = useStore(
 state=>state.logoutDelet
);
  const handleLogout = ()=>{

 logout();

 router.push("/Login");

};
  const handleDelet = ()=>{

 delet();

 router.push("/Login");

};
  const handleUpdate = (e) => {
    e.preventDefault();
    alert('Profile updated successfully!');
  };

  return (
    <div className="min-h-screen bg-[#F4F6F8] flex items-center justify-center p-4 md:p-10">
      <div className="bg-white rounded-lg p-6 md:p-10 shadow-sm max-w-2xl w-full mx-auto">
        
        {/* Header / Title */}
        <div className="flex items-center justify-between border-b border-gray-100 pb-5 mb-8">
          <div>
            <h2 className="text-xl md:text-2xl font-semibold text-gray-800">Account Settings</h2>
            <p className="text-xs text-gray-400 mt-1">Manage your profile details and account security</p>
          </div>
          <div className="hidden sm:flex items-center gap-1 bg-green-50 text-green-700 text-xs px-2.5 py-1 rounded-full font-medium">
            <ShieldCheck className="w-4 h-4" /> Verified User
          </div>
        </div>

        {/* Profile Avatar Section */}
        <div className="flex flex-col items-center justify-center mb-8">
          <div className="relative w-24 h-24 rounded-full border-4 border-[#F5EBE1] overflow-hidden bg-gray-50">
          
            <img
              src={user?.image || "https://i.pravatar.cc/150"} 
              alt="Profile Picture" 
          
              className="object-cover"
            />
            {/* Camera Overlay Icon */}
            <button className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-200">
              <Camera className="w-5 h-5 text-white" />
            </button>
          </div>
          <h3 className="text-lg font-medium text-gray-800 mt-3">{user?.name}</h3>
          <p className="text-xs text-gray-400">{user?.email}</p>
        </div>

        {/* Profile Details Form */}
        <form className="space-y-5" onSubmit={handleUpdate}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Name Input */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Full Name</label>
              <div className="relative flex items-center">
                <User className="absolute left-3 text-gray-400 w-4 h-4" />
                <input
 type="text"
 value={user?.name || ""}
 onChange={(e)=>(e.target.value)}
className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-md focus:outline-none focus:border-gray-400 text-sm text-gray-700"
/>
             
              </div>
            </div>

            {/* Email Input (Disabled/Read-only generally) */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Email Address</label>
              <div className="relative flex items-center opacity-70">
                <Mail className="absolute left-3 text-gray-400 w-4 h-4" />
                <input
                  type="email"
                 value={user?.email || ""}
                 onChange={(e)=>(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-100 bg-gray-50 rounded-md text-sm text-gray-500 cursor-not-allowed"
                />
              </div>
            </div>

            {/* Phone Input */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Phone Number</label>
              <div className="relative flex items-center">
                <Phone className="absolute left-3 text-gray-400 w-4 h-4" />
                <input 
                  type="tel" 
                 value={user?.phone || ""}
                  onChange={(e) => (e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-md focus:outline-none focus:border-gray-400 text-sm text-gray-700"
                />
              </div>
            </div>

            {/* Address Input */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Location / Address</label>
              <div className="relative flex items-center">
                <MapPin className="absolute left-3 text-gray-400 w-4 h-4" />
                <input 
                  type="text" 
                  value={user?.address || ""}
                  onChange={(e) => (e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-md focus:outline-none focus:border-gray-400 text-sm text-gray-700"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Logout Button */}
            <button 
              type="button"
              onClick={handleLogout}
              className="w-full sm:w-auto flex items-center justify-center gap-2 text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 font-medium px-4 py-2.5 rounded-md transition duration-200 text-xs tracking-wider"
            >
              <LogOut className="w-4 h-4" /> LOG OUT
            </button>
            <button 
              type="button"
              onClick={handleDelet}
              className="w-full sm:w-auto flex items-center justify-center gap-2 text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 font-medium px-4 py-2.5 rounded-md transition duration-200 text-xs tracking-wider"
            >
              <LogOut className="w-4 h-4" />Account Delet
            </button>

            {/* Save Changes Button */}
            <button 
              type="submit" 
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#F5EBE1] hover:bg-[#ebdcd0] text-gray-800 font-medium px-6 py-2.5 rounded-md transition duration-200 text-xs tracking-wider border border-transparent active:scale-[0.99]"
            >
              <Save className="w-4 h-4" /> SAVE CHANGES
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
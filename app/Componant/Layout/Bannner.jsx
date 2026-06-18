import React from 'react'

export const Banner = () => {
  return (
    <div className="max-w-[1440px] mx-auto  md:px-8">
  <div className="w-full overflow-hidden rounded-lg border border-gray-100 shadow-sm">
    <img 
      src="https://dazzle.com.bd/_next/image?url=https%3A%2F%2Fdazzle.sgp1.cdn.digitaloceanspaces.com%2F64087%2Fwhy-dazzle-care.jpg&w=1920&q=75" 
      alt="Why Dazzle Care" 
      className="w-full h-auto object-cover block select-none pointer-events-none"
    />
  </div>
</div>
  )
}
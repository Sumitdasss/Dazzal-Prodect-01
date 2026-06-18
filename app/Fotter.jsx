export default function Footer() {
  return (
    <footer className="bg-black text-white px-6 py-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-10">

        {/* Left Section */}
        <div>
         <div className="w-32">
                    <img
                      src="https://dazzle.com.bd/brandlogo/logo.svg"
                      alt="Dazzle"
                      className="h-auto w-full"
                    />
                  </div>

          <button className="flex items-center mt-5 gap-2 border border-gray-400 px-4 py-2 rounded-md text-sm mb-4">
            📍 Store Location
          </button>

          <div className="flex gap-3 mb-4">
            <div className="w-8 h-8 flex items-center justify-center border rounded">f</div>
            <div className="w-8 h-8 flex items-center justify-center border rounded">in</div>
            <div className="w-8 h-8 flex items-center justify-center border rounded">ig</div>
            <div className="w-8 h-8 flex items-center justify-center border rounded">yt</div>
          </div>

          <p className="text-sm">Email: admin@dazzle.com.bd</p>
          <p className="text-sm">Phone: 09638001122</p>
        </div>

        {/* Company */}
        <div>
          <h2 className="font-semibold mb-4">COMPANY</h2>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>About Us</li>
            <li>Career</li>
            <li>Our Brands</li>
            <li>Blogs</li>
            <li>Press Coverage</li>
            <li>Order Tracking</li>
            <li>Trade In</li>
          </ul>
        </div>

        {/* Help Center */}
        <div>
          <h2 className="font-semibold mb-4">HELP CENTER</h2>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>FAQ</li>
            <li>Support Center</li>
            <li>Announcement</li>
            <li>Corporate</li>
            <li>Feedback</li>
            <li>Sitemap</li>
          </ul>
        </div>

        {/* Terms */}
        <div>
          <h2 className="font-semibold mb-4">TERMS & CONDITIONS</h2>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>Terms & Conditions</li>
            <li>Refund Policy</li>
            <li>Privacy Policy</li>
            <li>Warranty Policy</li>
            <li>Exchange Policy</li>
            <li>EMI Policy</li>
            <li>Others Policy</li>
          </ul>
        </div>

        {/* Stay Connected */}
        <div>
          <h2 className="font-semibold mb-4">STAY CONNECTED</h2>
          <div className="text-sm text-gray-300 space-y-3">
            <p>Branch 1: Jamuna Future Park, Dhaka</p>
            <p>Branch 2: West Court, Dhaka</p>
            <p>Branch 3: Chittagong</p>
            <p>Branch 4: Bashundhara City</p>
            <p>Branch 5: Meridien, Dhaka</p>
          </div>
        </div>

      </div>
    </footer>
  );
}
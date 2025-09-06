export default function Footer() {
  return (
    <footer className="mt-16 bg-gradient-to-r from-indigo-600/90 via-purple-600/90 to-pink-600/90 backdrop-blur-xl text-white py-10 relative z-10">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 grid grid-cols-1 md:grid-cols-3 gap-10">
        
        {/* Brand Info */}
        <div>
          <h2 className="text-2xl font-bold tracking-wide mb-3">🛍️ ShopEase</h2>
          <p className="text-sm text-indigo-100">
            ShopEase is your trusted destination for seamless shopping. 
            Find the latest products, enjoy exclusive deals, and shop with confidence.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-indigo-100">
            <li className="hover:text-white transition">About Us</li>
            <li className="hover:text-white transition">Privacy Policy</li>
            <li className="hover:text-white transition">Terms & Conditions</li>
            <li className="hover:text-white transition">Contact Us</li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Stay in the Loop</h3>
          <p className="text-sm text-indigo-100 mb-3">
            Subscribe to get updates on new arrivals & special offers
          </p>
          <div className="flex space-x-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-2 w-full rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button className="px-4 py-2 bg-white text-indigo-600 rounded-lg font-semibold hover:bg-indigo-50 transition">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="mt-10 border-t border-white/20 pt-6 text-center text-sm text-indigo-100">
        <p>© {new Date().getFullYear()} RM&R. All rights reserved.</p>
        <p className="mt-1 text-xs">Made with ❤️ using React & TailwindCSS</p>
      </div>
    </footer>
  );
}

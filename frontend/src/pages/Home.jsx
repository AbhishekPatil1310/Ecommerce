import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const categories = [
  { id: 1, name: "Tech", image: "https://m.media-amazon.com/images/I/41BK-0tJ6nL._SX300_SX300_.jpg" },
  { id: 2, name: "Clothing", image: "https://m.media-amazon.com/images/I/61JxTwwj-5L._AC_UL480_FMwebp_QL65_.jpg" },
  { id: 3, name: "Home & Kitchen", image: "https://m.media-amazon.com/images/I/81rDE6gGxnL._SX522_.jpg" },
];

const featuredProducts = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: "₹2,499",
    image: "https://m.media-amazon.com/images/I/81lYNV0dX3L._SY450_.jpg",
  },
  {
    id: 2,
    name: "Smart Watch",
    price: "₹3,299",
    image: "https://m.media-amazon.com/images/I/41BK-0tJ6nL._SY300_SX300_QL70_FMwebp_.jpg",
  },
  {
    id: 3,
    name: "Eco-Friendly Backpack",
    price: "₹1,521",
    image: "https://m.media-amazon.com/images/I/81rDE6gGxnL._SX522_.jpg",
  },
];

const trendingProducts = [
  {
    id: 4,
    name: "Gaming Mouse",
    price: "₹2,999",
    image: "https://m.media-amazon.com/images/I/618P7R3gswL._SY450_.jpg",
  },
  {
    id: 5,
    name: "Bluetooth Speaker",
    price: "₹2,999",
    image: "https://m.media-amazon.com/images/I/91bo3kxdR6L._AC_UY327_FMwebp_QL65_.jpg",
  },
];

export default function HomePage() {
  const user = useSelector((s) => s.auth.user);
  const navigate = useNavigate();

  const handleExploreClick = () => {
    if (user) navigate("/search");
    else navigate("/signin");
  };

  // Fade-in effect on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("opacity-100", "translate-y-0");
          }
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll(".fade-section").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="font-sans text-gray-900 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 min-h-screen">
      {/* Hero / Promotion Banner */}
      <section className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white text-center py-24 px-6 rounded-b-3xl relative overflow-hidden drop-shadow-lg">
        <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-4 drop-shadow-md">
          Welcome Back!
        </h1>
        <p className="mt-2 text-xl md:text-2xl max-w-3xl mx-auto font-light drop-shadow-sm">
          Discover your favorite products at unbeatable prices.
        </p>
        <button
          onClick={handleExploreClick}
          className="mt-8 px-8 py-3 rounded-full bg-white text-indigo-700 font-semibold text-lg shadow-lg hover:shadow-2xl hover:scale-105 transition transform duration-300"
        >
          Explore Now
        </button>
      </section>

      {/* Categories */}
      <section className="py-14 px-6 max-w-7xl mx-auto">
        <h2 className="text-4xl font-extrabold mb-10 text-center text-indigo-700 drop-shadow-sm">
          Shop by Category
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-8">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="fade-section opacity-0 translate-y-6 cursor-pointer group bg-white/60 backdrop-blur-lg rounded-2xl p-6 flex flex-col items-center justify-center hover:shadow-xl hover:bg-white transition-all duration-500"
              onClick={() => navigate(`/category/${cat.name.toLowerCase()}`)}
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="w-24 h-24 object-cover mb-3 rounded-full border-4 border-indigo-300 group-hover:border-pink-400 transition-all duration-500"
              />
              <span className="text-indigo-800 font-semibold text-lg">{cat.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-14 px-6 max-w-7xl mx-auto bg-white/70 backdrop-blur-lg rounded-3xl shadow-lg border border-indigo-200">
        <h2 className="text-4xl font-extrabold mb-12 text-center text-indigo-800 drop-shadow-md">
          Featured Products
        </h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10">
          {featuredProducts.map((product) => (
            <div
              key={product.id}
              className="fade-section opacity-0 translate-y-6 relative group bg-white/90 rounded-2xl border border-indigo-100 shadow-md hover:shadow-2xl hover:-translate-y-3 transition-all duration-500 overflow-hidden cursor-pointer"
            >
              <img
                src={product.image}
                alt={product.name}
                className="relative w-full h-64 object-cover rounded-t-2xl group-hover:scale-105 transition-transform duration-500"
              />
              <div className="p-6 text-center">
                <h4 className="text-2xl font-semibold text-indigo-900">{product.name}</h4>
                <p className="text-xl text-indigo-700 mt-2">{product.price}</p>
                <button className="mt-6 px-6 py-3 bg-indigo-600 text-white rounded-full shadow-lg hover:bg-indigo-700 hover:shadow-xl transition transform duration-300">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Trending Products */}
      <section className="py-14 px-6 max-w-7xl mx-auto">
        <h2 className="text-4xl font-extrabold mb-12 text-center text-indigo-700 drop-shadow-sm">
          Trending Now
        </h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10">
          {trendingProducts.map((product) => (
            <div
              key={product.id}
              className="fade-section opacity-0 translate-y-6 relative group bg-white/90 backdrop-blur-lg rounded-2xl border border-indigo-200 shadow-md hover:shadow-2xl hover:-translate-y-3 transition-all duration-500 overflow-hidden cursor-pointer"
            >
              <img
                src={product.image}
                alt={product.name}
                className="relative w-full h-64 object-cover rounded-t-2xl group-hover:scale-105 transition-transform duration-500"
              />
              <div className="p-6 text-center">
                <h4 className="text-2xl font-semibold text-indigo-900">{product.name}</h4>
                <p className="text-xl text-indigo-700 mt-2">{product.price}</p>
                <button className="mt-6 px-6 py-3 bg-indigo-600 text-white rounded-full shadow-lg hover:bg-indigo-700 hover:shadow-xl transition transform duration-300">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

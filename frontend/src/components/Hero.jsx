import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const user = useSelector((s) => s.auth.user);
  const navigate = useNavigate();

  const featuredProducts = [
    {
      id: 1,
      name: "Wireless Headphones",
      price: "$99",
      image: "https://m.media-amazon.com/images/I/81lYNV0dX3L._SY450_.jpg",
    },
    {
      id: 2,
      name: "Smart Watch",
      price: "$149",
      image: "https://m.media-amazon.com/images/I/41BK-0tJ6nL._SY300_SX300_QL70_FMwebp_.jpg",
    },
    {
      id: 3,
      name: "Eco-Friendly Backpack",
      price: "$59",
      image: "https://m.media-amazon.com/images/I/81rDE6gGxnL._SX522_.jpg",
    },
  ];

  // Simple fade-in on scroll
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

    document.querySelectorAll(".fade-section").forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleExploreClick = () => {
    if (user) {
      navigate("/dashboard"); // navigate to dashboard if authenticated
    } else {
      navigate("/signin"); // or redirect to sign-in page if not logged in
    }
  };

  return (
    <div id="home" className="font-sans text-gray-800">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 text-white text-center py-28 px-6 overflow-hidden">
        {/* Floating decorative shapes */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white/20 rounded-full blur-2xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-pink-300/30 rounded-full blur-2xl animate-bounce"></div>
          <div className="absolute top-1/2 left-1/4 w-28 h-28 bg-orange-200/30 rounded-full blur-2xl animate-spin-slow"></div>
        </div>

        <h1 className="relative text-4xl md:text-6xl font-extrabold drop-shadow-lg">
          Shop the Latest Trends
        </h1>
        <p className="relative mt-4 text-lg md:text-xl max-w-2xl mx-auto">
          Affordable. Stylish. Delivered to your door with love.
        </p>
        <button
          onClick={handleExploreClick}
          className="relative mt-6 px-6 py-3 bg-white/20 backdrop-blur-lg rounded-full border border-white/40 hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.6)] transition-all shadow-lg"
        >
          Explore Now
        </button>
      </section>

      {/* Features Section */}
      <section className="flex flex-col md:flex-row justify-around items-center gap-8 py-16 px-6 bg-gradient-to-br from-gray-50 to-white">
        {[
          {
            icon: "🛒",
            title: "Wide Selection",
            text: "From fashion to gadgets, we’ve got it all.",
          },
          {
            icon: "🚚",
            title: "Fast Delivery",
            text: "Get your orders in 2-3 days with free shipping.",
          },
          {
            icon: "💳",
            title: "Secure Payments",
            text: "Your information is encrypted and safe.",
          },
        ].map((item, idx) => (
          <div
            key={idx}
            className="fade-section opacity-0 translate-y-6 text-center bg-white/60 backdrop-blur-md rounded-xl p-6 border border-transparent bg-clip-padding shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-500"
          >
            <h3 className="text-4xl">{item.icon}</h3>
            <h4 className="mt-3 text-2xl font-bold text-gray-800">{item.title}</h4>
            <p className="mt-2 text-gray-600">{item.text}</p>
          </div>
        ))}
      </section>

      {/* Featured Products */}
      <section className="py-20 px-6 bg-gradient-to-br from-gray-100 to-gray-200">
        <h2 className="text-4xl font-extrabold text-center mb-10 text-gray-800">
          Featured Products
        </h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10 max-w-7xl mx-auto">
          {featuredProducts.map((product) => (
            <div
              key={product.id}
              className="fade-section opacity-0 translate-y-6 relative group bg-white/70 backdrop-blur-md rounded-xl border border-gray-200 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-purple-500 via-pink-500 to-orange-400 opacity-0 group-hover:opacity-100 transition-opacity blur-lg"></div>

              <img
                src={product.image}
                alt={product.name}
                className="relative w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="relative p-5 text-center">
                <h4 className="text-xl font-semibold text-gray-800">{product.name}</h4>
                <p className="text-lg text-gray-700 mt-2">{product.price}</p>
                <button className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 hover:shadow-[0_0_15px_rgba(147,51,234,0.6)] transition">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Hero;

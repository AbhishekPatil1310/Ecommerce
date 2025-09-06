import { useEffect, useState } from "react";
import { fetchCart } from "../api/userApi";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate,useOutletContext } from "react-router-dom";
import ScrollToTopButton from "../components/ScroleToTop";


export default function CartList() {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
    const { mainRef } = useOutletContext();


  useEffect(() => {
    async function loadCart() {
      try {
        const data = await fetchCart();
        setCart(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error fetching cart:", err);
      } finally {
        setLoading(false);
      }
    }
    loadCart();
  }, []);

  // Calculate total price
  const totalPrice = cart.reduce((sum, item) => {
    const price = item.price ?? item.ad?.price ?? 0;
    const quantity = item.quantity ?? 1;
    return sum + price * quantity;
  }, 0);

  if (loading)
    return (
      <div className="flex justify-center items-center h-[60vh] bg-gradient-to-br from-purple-50 to-indigo-100">
        <motion.p
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1, repeat: Infinity }}
          className="text-lg font-medium text-gray-600"
        >
          Loading cart...
        </motion.p>
      </div>
    );

  if (cart.length === 0)
    return (
      <div className="flex justify-center items-center h-[60vh] bg-gradient-to-br from-purple-50 to-indigo-100">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-xl font-semibold text-gray-700"
        >
          Your cart is empty 🛒
        </motion.p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-100 py-10 px-4 md:px-10 relative">
      {/* Title */}
      <motion.h2
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold mb-6 text-center text-gray-800 tracking-tight"
      >
        🛒 Your Shopping Cart
      </motion.h2>

      {/* Cart List */}
      <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence>
          {cart.map((item) => (
            <motion.li
              key={item._id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              whileHover={{
                scale: 1.03,
                boxShadow: "0px 6px 20px rgba(0,0,0,0.15)",
              }}
              className="bg-white/80 backdrop-blur-md border border-gray-100 rounded-xl shadow-lg p-5 flex flex-col items-center transition-all duration-300"
            >
              {item.ad ? (
                <>
                  <img
                    src={item.ad.imageUrl}
                    alt={item.ad.description}
                    className="w-full h-48 object-cover rounded-lg mb-4 shadow-sm"
                  />
                  <div className="text-center flex-1 flex flex-col justify-between w-full">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">
                        {item.ad.adType}
                      </h3>
                      <p className="text-sm text-gray-500 mb-2">
                        {item.ad.description}
                      </p>
                      <p className="text-base font-bold text-gray-900">
                        ₹{item.price ?? item.ad.price} × {item.quantity ?? 1} ={" "}
                        <span className="text-indigo-600">
                          ₹
                          {(item.price ?? item.ad.price) *
                            (item.quantity ?? 1)}
                        </span>
                      </p>
                    </div>

                    {/* View Details Button */}
                    <button
                      onClick={() => navigate(`/ad/${item.ad._id}`)}
                      className="mt-4 w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-2 px-4 rounded-lg shadow-md hover:opacity-90 transition-all font-medium"
                    >
                      View Details
                    </button>
                  </div>
                </>
              ) : (
                <p className="text-red-500">Ad details not available</p>
              )}
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>

      {/* Floating Checkout Bar */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.4 }}
        className="fixed bottom-0 left-0 z-50 w-full bg-white/80 backdrop-blur-md shadow-lg border-t border-gray-200 px-6 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
      >
        <p className="text-lg font-semibold text-gray-800">
          Total: <span className="text-indigo-600">₹{totalPrice}</span>
        </p>
        <button className="bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:opacity-90 transition">
          Proceed to Checkout
        </button>
      </motion.div>
      <ScrollToTopButton scrollRef={mainRef}/>
    </div>
  );
}

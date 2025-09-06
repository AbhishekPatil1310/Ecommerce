import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  fetchAdById,
  fetchRelatedAds,
  removeFromCart,
  addToCart,
  fetchCart,
} from "../api/userApi";
import { submitAdFeedback } from "../api/feedBack";
import ScrollToTopButton from "../components/ScroleToTop";
import GoBackButton from "../components/BackButton";


export default function AdDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [ad, setAd] = useState(null);
  const [relatedAds, setRelatedAds] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cartLoading, setCartLoading] = useState(false);
  const [quantity, setQuantity] = useState(1);

  // Feedback states
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [feedbackLoading, setFeedbackLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const adData = await fetchAdById(id);
        const mainAd = adData.ad || adData;
        setAd(mainAd);

        if (mainAd) {
          const relatedArray = await fetchRelatedAds(mainAd.tags, mainAd.adType);
          setRelatedAds(relatedArray);
        }

        const cart = await fetchCart();
        setCartItems(cart);
      } catch (err) {
        console.error("Fetch failed:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const isInCart = ad && cartItems.some((item) => item.ad?._id === ad._id);

  const handleCartClick = async () => {
    if (!ad) return;
    setCartLoading(true);

    try {
      if (isInCart) {
        await removeFromCart(ad._id);
      } else {
        await addToCart(ad._id, quantity);
      }

      const updatedCart = await fetchCart();
      setCartItems(updatedCart);
    } catch (err) {
      console.error("Cart operation failed:", err);
    } finally {
      setCartLoading(false);
    }
  };

  const handleBuyNow = () => {
    if (!ad) return;
    navigate("/checkout", {
      state: {
        items: [
          {
            adId: ad._id,
            productName: ad.productName,
            price: ad.price,
            quantity: quantity,
            imageUrl: ad.imageUrl,
            feedbacks: ad.feedbacks,
          },
        ],
        totalAmount: ad.price * quantity,
      },
    });
  };

  // ✅ Handle feedback submission
  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();
    if (!rating || rating < 1 || rating > 5) {
      alert("Please select a valid rating (1-5).");
      return;
    }
    if (!comment.trim()) {
      alert("Please write a comment.");
      return;
    }

    try {
      setFeedbackLoading(true);
      await submitAdFeedback(ad._id, comment, rating);
      alert("Feedback submitted successfully!");
      setRating(0);
      setComment("");
    } catch (err) {
      console.error(err);
      alert("Failed to submit feedback.");
    } finally {
      setFeedbackLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-indigo-500"></div>
      </div>
    );
  }

  if (!ad) return <p className="text-center mt-10">Ad not found 😕</p>;

  return (
    <div className="p-6 md:p-10 bg-gradient-to-br from-indigo-100/80 via-purple-100/70 to-pink-50 min-h-screen">
      {/* Glassmorphism Card */}
      <div className="backdrop-blur-lg bg-white/70 shadow-2xl rounded-3xl p-8 mb-10 border border-white/40 transition-all duration-300 hover:shadow-xl">
        {/* Main Product Image */}
        <div className="flex justify-center mb-6">
          <img
            src={ad.imageUrl}
            alt={ad.productName || ad.description}
            className="max-h-80 object-contain rounded-2xl shadow-md transform hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* Product Info */}
        <h2 className="text-3xl font-bold text-indigo-900 drop-shadow-sm mb-3">
          {ad.productName}
        </h2>
        <p className="text-lg text-gray-700 italic mb-6">{ad.description}</p>

        {/* Price Section */}
        {ad.price && (
          <p className="text-2xl font-extrabold text-indigo-700 mb-6">
            ₹{ad.price}
          </p>
        )}

        {/* Feedback Section */}
        <div className="mt-6 border-t border-indigo-100 pt-6">
          <h3 className="text-lg font-semibold mb-4 text-indigo-800">
            User Feedbacks 🌟
          </h3>

          {ad.feedbacks && ad.feedbacks.length > 0 ? (
            <div className="space-y-4">
              {ad.feedbacks.map((fb) => (
                <div
                  key={fb._id}
                  className="p-4 rounded-2xl bg-gradient-to-tr from-white/80 to-indigo-50/60 shadow-sm border border-indigo-100 hover:shadow-md transition-all"
                >
                  <p className="font-semibold text-indigo-600">
                    {fb.userName || "Anonymous"}
                  </p>
                  <p className="text-yellow-500 text-lg">
                    {"★".repeat(fb.rating)}{" "}
                    {"☆".repeat(5 - fb.rating)}
                  </p>
                  <p className="text-gray-700">{fb.comment}</p>
                  <p className="text-gray-400 text-xs">
                    {new Date(fb.createdAt).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No feedback yet.</p>
          )}
        </div>

        {/* Quantity */}
        {!isInCart && (
          <div className="my-4">
            <label className="mr-3 font-medium text-gray-700">Quantity:</label>
            <input
              type="number"
              min={1}
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="border rounded-lg px-3 py-2 w-24 focus:ring-2 focus:ring-indigo-400"
            />
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-4 flex-wrap my-6">
          <GoBackButton />
          <button
            onClick={handleCartClick}
            disabled={cartLoading}
            className={`px-5 py-2 rounded-xl text-white shadow-lg transform hover:scale-105 transition-all ${isInCart
              ? "bg-red-500 hover:bg-red-600"
              : "bg-green-500 hover:bg-green-600"
              }`}
          >
            {cartLoading
              ? "Processing..."
              : isInCart
                ? "🛒 Remove from Cart"
                : "➕ Add to Cart"}
          </button>
          <button
            onClick={handleBuyNow}
            className="px-5 py-2 rounded-xl bg-indigo-500 text-white shadow-lg hover:bg-indigo-600 transform hover:scale-105 transition-all"
          >
            ⚡ Buy Now
          </button>
        </div>

        {/* ✅ Feedback Form */}
        <div className="mt-8 border-t border-indigo-100 pt-6">
          <h3 className="text-xl font-semibold mb-3 text-indigo-800">💬 Leave Your Feedback</h3>
          <form onSubmit={handleFeedbackSubmit} className="space-y-4">
            <div>
              <label className="block mb-1 font-medium text-gray-700">Rating:</label>
              <select
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
                className="border rounded-lg px-3 py-2 w-36 focus:ring-2 focus:ring-indigo-400"
              >
                <option value={0}>Select...</option>
                {[1, 2, 3, 4, 5].map((star) => (
                  <option key={star} value={star}>
                    {star} Star{star > 1 && "s"}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-700">Comment:</label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="border rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-indigo-400"
                rows={3}
                placeholder="Write your feedback..."
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={feedbackLoading}
              className="px-5 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl shadow-md hover:scale-105 transform transition-all"
            >
              {feedbackLoading ? "⏳ Submitting..." : "✅ Submit Feedback"}
            </button>
          </form>
        </div>
      </div>

      {/* Related Ads Section */}
      <h3 className="text-2xl font-bold text-indigo-800 mb-6">✨ Related Products</h3>
      {relatedAds.length === 0 ? (
        <p className="text-gray-500">No related products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {relatedAds.map((item) => (
            <div
              key={item._id}
              onClick={() => navigate(`/ad/${item._id}`)}
              className="backdrop-blur-lg bg-white/80 rounded-2xl shadow-lg overflow-hidden cursor-pointer border border-white/40 hover:shadow-2xl hover:scale-105 transition-all duration-500"
            >
              <div className="h-44 flex items-center justify-center bg-gray-100">
                <img
                  src={item.imageUrl}
                  alt={item.productName || item.description}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              <div className="p-4 text-center">
                <p className="font-semibold text-indigo-700 line-clamp-2">
                  {item.productName || item.description || "No title"}
                </p>
                {item.price && (
                  <p className="text-indigo-600 font-bold mt-2">₹{item.price}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      <ScrollToTopButton />
    </div>
  );
}

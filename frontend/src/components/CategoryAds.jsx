import { useParams, useNavigate, useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchAdsByCategory } from "../api/userApi";
import PriceBar from "../components/pricebar";
import ScrollToTopButton from "../components/ScroleToTop";

export default function CategoryAds() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { mainRef } = useOutletContext();

  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [maxPrice, setMaxPrice] = useState(5000);

  const categoryMap = {
    1: "Kitchen & Home Appliances",
    2: "cloathing",
    3: "tech",
  };

  useEffect(() => {
    const adType = categoryMap[id];
    if (!adType) return;
    setLoading(true);
    fetchAdsByCategory(adType, maxPrice)
      .then((adsData) => setAds(Array.isArray(adsData) ? adsData : []))
      .catch((err) => console.error("Fetch failed:", err))
      .finally(() => setLoading(false));
  }, [id, maxPrice]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 md:p-8 min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <h2 className="text-3xl font-extrabold text-gray-900 mb-4 border-b-2 border-indigo-500 inline-block pb-2">
        Ads in{" "}
        <span className="text-indigo-600">{categoryMap[id] || "Unknown Category"}</span>
      </h2>

      <PriceBar maxPrice={maxPrice} setMaxPrice={setMaxPrice} />

      {ads.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-60 text-gray-500">
          <p className="text-xl">No product found in this price range 😕</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {ads.map((ad) => (
            <div
              key={ad._id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
            >
              <div className="relative h-48 flex items-center justify-center bg-gray-100">
                <img
                  src={ad.imageUrl}
                  alt={ad.description}
                  className="max-h-full max-w-full object-contain transition-transform duration-500 hover:scale-105"
                />
                <span className="absolute top-3 left-3 bg-indigo-600 text-white px-3 py-1 rounded-full text-xs font-semibold shadow">
                  {ad.adType}
                </span>
              </div>

              <div className="p-4 flex flex-col h-full">
                <p className="text-gray-800 font-semibold text-lg line-clamp-2 mb-1">{ad.description}</p>
                <p className="text-indigo-600 font-bold text-xl mt-1 mb-4">₹{ad.price}</p>

                <button
                  onClick={() => navigate(`/ad/${ad._id}`)}
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-2 px-4 rounded-lg hover:opacity-90 transition duration-200 font-medium shadow-md"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pass mainRef to ScrollToTopButton */}
      <ScrollToTopButton scrollRef={mainRef} />
      
    </div>
  );
}

import { useState } from 'react';
import { searchAds } from '../api/productApi';
import GoBackButton from '../components/BackButton';

export default function SearchPage() {
  const [keyword, setKeyword] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    const data = await searchAds(keyword);
    setResults(data);
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100">
      <div className="max-w-7xl mx-auto px-6 w-full">
        <GoBackButton />
      </div>
      <div className="p-6 max-w-7xl mx-auto w-full">
        <h1 className="text-3xl font-extrabold mb-8 text-indigo-900 drop-shadow-md">
          Search Ads
        </h1>
        <div className="flex gap-4 mb-10">
          <input
            type="text"
            placeholder="Search by product or type"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            className="flex-1 rounded-xl border border-indigo-300 px-5 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          />
          <button
            onClick={handleSearch}
            className="bg-indigo-600 text-white rounded-xl px-6 py-3 font-semibold shadow-lg hover:bg-indigo-700 active:scale-95 transition transform duration-300"
            disabled={loading}
          >
            Search
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center my-20">
            <svg
              className="animate-spin h-12 w-12 text-indigo-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8H4z"
              />
            </svg>
          </div>
        ) : results.length > 0 ? (
          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((ad) => (
              <div
                key={ad._id}
                className="bg-white/70 backdrop-blur-md rounded-2xl border border-indigo-200 shadow-md hover:shadow-xl transition-shadow cursor-pointer overflow-hidden"
                onClick={() => window.open(`/ad/${ad._id}`, "_self")}
                tabIndex={0}
                role="button"
                onKeyDown={(e) =>
                  e.key === "Enter" && window.open(`/ad/${ad._id}`, "_self")
                }
              >
                <img
                  src={ad.imageUrl}
                  alt={ad.productName}
                  className="w-full h-56 object-cover rounded-t-2xl transition-transform duration-500 group-hover:scale-105"
                />
                <div className="p-5">
                  <h2 className="text-indigo-900 font-bold text-xl truncate">
                    {ad.productName}
                  </h2>
                  <p className="text-indigo-700 mt-2 font-medium">Type: {ad.adType}</p>
                  <p className="text-indigo-700 font-semibold">Price: ₹{ad.price}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="mt-20 text-center text-indigo-400 font-semibold text-lg select-none">
            No ads found.
          </p>
        )}
      </div>
    </div>
  );
}

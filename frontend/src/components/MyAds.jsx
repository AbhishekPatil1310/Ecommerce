import React, { useEffect, useState } from "react";
import { fetchMyAds,deleteAd, updateAd } from "../api/userApi"; 

export default function MyAds() {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAd, setEditingAd] = useState(null);
  const [formData, setFormData] = useState({ productName: "", description: "", tags: "" });

  useEffect(() => {
    loadAds();
  }, []);

  const loadAds = async () => {
    try {
      setLoading(true);
      const data = await fetchMyAds();
      setAds(data);
    } catch (err) {
      setError("Failed to fetch your ads.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Delete handler
  const handleDelete = async (adId) => {
    if (!window.confirm("Are you sure you want to delete this ad?")) return;
    try {
      await deleteAd(adId);
      setAds((prev) => prev.filter((ad) => ad._id !== adId));
    } catch (err) {
      alert("Failed to delete ad");
    }
  };

  // ✅ Open modal with ad data
  const openEditModal = (ad) => {
    setEditingAd(ad);
    setFormData({
      productName: ad.productName,
      description: ad.description,
      tags: ad.tags?.join(", ") || "",
    });
    setIsModalOpen(true);
  };

  // ✅ Save update
  const handleUpdate = async () => {
    if (!editingAd) return;
    try {
      await updateAd(editingAd._id, {
        productName: formData.productName,
        description: formData.description,
        tags: formData.tags.split(",").map((t) => t.trim()).filter(Boolean),
      });

      await loadAds();
      setIsModalOpen(false);
      setEditingAd(null);
    } catch (err) {
      alert("Failed to update ad");
    }
  };

  if (loading) return <p className="text-center mt-10">Loading your ads...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;
  if (ads.length === 0)
    return <p className="text-center mt-10 text-gray-600">You have no ads yet.</p>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-6">Your Ads</h2>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {ads.map((ad) => (
          <div
            key={ad._id}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <img
              src={ad.imageUrl}
              alt={ad.productName}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="font-semibold text-lg">{ad.productName}</h3>
              <p className="text-gray-600 mt-1">{ad.adType}</p>
              <p className="text-indigo-600 font-bold mt-2">${ad.price}</p>
              <p className="text-gray-500 text-sm mt-2">
                {ad.feedbacks?.length || 0} Feedbacks
              </p>
              <div className="mt-3 flex gap-2">
                <button
                  className="bg-blue-500 text-white px-3 py-1 rounded"
                  onClick={() => openEditModal(ad)}
                >
                  Update
                </button>
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded"
                  onClick={() => handleDelete(ad._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ✅ Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 relative">
            <h3 className="text-xl font-bold mb-4">Update Ad</h3>

            <input
              type="text"
              className="w-full border p-2 rounded mb-3"
              placeholder="Product Name"
              value={formData.productName}
              onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
            />
            <textarea
              className="w-full border p-2 rounded mb-3"
              placeholder="Description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
            <input
              type="text"
              className="w-full border p-2 rounded mb-3"
              placeholder="Comma separated tags"
              value={formData.tags}
              onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
            />

            <div className="flex justify-end gap-2">
              <button
                className="bg-gray-400 text-white px-4 py-2 rounded"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="bg-green-500 text-white px-4 py-2 rounded"
                onClick={handleUpdate}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

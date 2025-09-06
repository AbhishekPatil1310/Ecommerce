import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { placeOrder, fetchUserAddresses } from "../api/userApi";
import { Dialog } from "@headlessui/react";

export default function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();

  const { items = [], totalAmount = 0 } = location.state || {};
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [orderNo, setOrderNo] = useState("");

  // Address handling
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [addressLoading, setAddressLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setAddressLoading(true);
      const addr = await fetchUserAddresses();
      setAddresses(addr);
      setAddressLoading(false);
    })();
  }, []);

  const handleBuy = async () => {
    if (!selectedAddress) {
      alert("Please select a delivery address before placing your order.");
      return;
    }

    setLoading(true);
    try {
      if (items.length === 0) {
        alert("No items to purchase.");
        setLoading(false);
        return;
      }

      const item = items[0];
      const res = await placeOrder({
        adId: item.adId,
        total: totalAmount,
        quantity: item.quantity,
        address: selectedAddress, // changed key
      });


      setOrderNo(res?.orderNo || `ORD${Date.now()}`);
      setShowPopup(true);
    } catch (err) {
      console.error("Order save failed:", err);
      alert("Something went wrong! Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="p-6 text-center">
        <p className="text-gray-500">No items to checkout.</p>
        <button
          onClick={() => navigate("/")}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Go Home
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>

      {/* Address Selection */}
      <div className="bg-white p-4 rounded-xl shadow-md mb-6">
        <h2 className="font-semibold mb-3">Select Delivery Address</h2>
        {addressLoading ? (
          <p className="text-gray-500">Loading addresses...</p>
        ) : addresses.length === 0 ? (
          <p className="text-red-500">No saved addresses found.</p>
        ) : (
          <div className="space-y-3">
            {addresses.map((addr, idx) => (
              <label
                key={idx}
                className="flex items-center gap-3 border p-3 rounded-lg cursor-pointer hover:bg-gray-50"
              >
                <input
                  type="radio"
                  name="deliveryAddress"
                  value={idx}
                  checked={selectedAddress === addr}
                  onChange={() => setSelectedAddress(addr)}
                />
                <div>
                  <p className="font-medium">{addr.label || "Address"}</p>
                  <p className="text-sm text-gray-600">
                    {addr.city}, {addr.state} - {addr.postalCode}
                  </p>
                  <p className="text-sm text-gray-500">📞 {addr.mobileNo}</p>
                </div>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Order Items */}
      <div className="bg-white p-4 rounded-xl shadow-md">
        {items.map((item, idx) => (
          <div
            key={idx}
            className="flex items-center gap-4 border-b border-gray-200 pb-4 mb-4"
          >
            <img
              src={item.imageUrl}
              alt={item.productName}
              className="w-20 h-20 object-contain"
            />
            <div className="flex-1">
              <p className="font-semibold">{item.productName}</p>
              <p className="text-gray-500">Qty: {item.quantity}</p>
              <p className="text-indigo-600 font-bold">
                ₹{item.price * item.quantity}
              </p>
            </div>
          </div>
        ))}

        <div className="flex justify-between items-center text-lg font-semibold">
          <span>Total:</span>
          <span className="text-indigo-600">₹{totalAmount}</span>
        </div>

        <button
          onClick={handleBuy}
          disabled={loading}
          className="mt-6 w-full px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50"
        >
          {loading ? "Processing..." : "Buy Now"}
        </button>
      </div>

      {/* Confirmation Popup */}
      <Dialog
        open={showPopup}
        onClose={() => {
          setShowPopup(false);
          navigate("/");
        }}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center p-4">
          <Dialog.Panel className="bg-white rounded-xl p-6 max-w-sm mx-auto text-center shadow-lg">
            <img
              src="/confirmed.jpg"
              alt="Order Confirmed"
              className="w-24 h-24 mx-auto mb-4"
            />
            <Dialog.Title className="text-lg font-bold mb-2">
              Order Confirmed 🎉
            </Dialog.Title>
            <p className="text-gray-600 mb-1">
              <span className="font-semibold">Order No:</span> {orderNo}
            </p>
            <p className="text-gray-600 mb-4">
              <span className="font-semibold">Status:</span> Pending
            </p>
            <p className="text-gray-500 mb-4">
              Your order has been placed successfully!
            </p>
            <button
              onClick={() => navigate(-1)}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Go Home
            </button>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
}

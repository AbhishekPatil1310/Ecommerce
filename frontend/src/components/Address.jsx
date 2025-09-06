import { useEffect, useState } from "react";
import { fetchUserAddresses, addAddress, updateAddress, deleteAddress } from "../api/userApi";
import { motion, AnimatePresence } from "framer-motion";
import GoBackButton from "../components/BackButton";

export default function UserAddresses() {
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ label: "", city: "", state: "", postalCode: "", mobileNo: "" });
  const [editId, setEditId] = useState(null);
  const [processing, setProcessing] = useState(false);

  const loadAddresses = async () => {
    setLoading(true);
    const data = await fetchUserAddresses();
    setAddresses(data);
    setLoading(false);
  };

  useEffect(() => { loadAddresses(); }, []);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setProcessing(true);
    try {
      if (editId) { await updateAddress(editId, form); setEditId(null); }
      else { await addAddress(form); }
      setForm({ label: "", city: "", state: "", postalCode: "", mobileNo: "" });
      loadAddresses();
    } catch (err) { console.error("Failed to save address:", err); }
    finally { setProcessing(false); }
  };

  const handleEdit = addr => {
    setForm({ label: addr.label, city: addr.city, state: addr.state, postalCode: addr.postalCode, mobileNo: addr.mobileNo });
    setEditId(addr._id);
  };

  const handleDelete = async id => {
    if (!window.confirm("Are you sure you want to delete this address?")) return;
    setProcessing(true);
    try { await deleteAddress(id); loadAddresses(); }
    catch (err) { console.error("Failed to delete address:", err); }
    finally { setProcessing(false); }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-[60vh] bg-gradient-to-br from-purple-50 to-indigo-100">
        <motion.p animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 1, repeat: Infinity }} className="text-lg font-medium text-gray-600">
          Loading addresses...
        </motion.p>
      </div>
    );

  return (
    <div id="Top" className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-100 p-6 md:p-12">
      <GoBackButton />
      <h2 className="text-3xl font-extrabold mb-8 text-gray-800 text-center">📍 My Addresses</h2>
      <motion.form initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} onSubmit={handleSubmit} className="mb-10 bg-white/80 backdrop-blur-md p-8 rounded-xl shadow-lg space-y-4 border border-gray-100">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">{editId ? "✏️ Edit Address" : "➕ Add New Address"}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {["label", "city", "state", "postalCode", "mobileNo"].map(field => (
            <input key={field} type="text" name={field} value={form[field]} onChange={handleChange} required
              placeholder={field === "label" ? "Label (Home, Work...)" : field === "mobileNo" ? "Mobile Number" : field === "postalCode" ? "Postal Code" : field.charAt(0).toUpperCase() + field.slice(1)}
              className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 transition" />
          ))}
        </div>
        <button type="submit" disabled={processing} className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-2 rounded-lg hover:opacity-90 transition font-medium shadow-md">
          {processing ? "Saving..." : editId ? "Update Address ✅" : "Add Address ➕"}
        </button>
      </motion.form>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {addresses.map(addr => (
            <motion.div key={addr._id} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} whileHover={{ scale: 1.02, boxShadow: "0px 6px 20px rgba(0,0,0,0.1)" }}
              className="bg-white/80 backdrop-blur-md border border-gray-100 p-6 rounded-xl shadow-md flex flex-col justify-between transition-all">
              <div className="mb-4">
                <p className="font-semibold text-lg text-gray-800">{addr.label}</p>
                <p className="text-gray-600">{addr.city}, {addr.state}</p>
                <p className="text-gray-600">{addr.postalCode}</p>
                <p className="text-gray-600">📞 {addr.mobileNo}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => handleEdit(addr)} className="flex-1 bg-yellow-400 text-white py-2 rounded-lg hover:bg-yellow-500 transition font-medium shadow">Edit ✏️</button>
                <button onClick={() => handleDelete(addr._id)} className="flex-1 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition font-medium shadow">Delete ❌</button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

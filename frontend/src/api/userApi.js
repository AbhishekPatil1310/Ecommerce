import axios from 'axios';

export async function uploadAd(form) {
  const data = new FormData();
  Object.entries(form).forEach(([key, val]) => {
    if (key === 'file' && val) data.append('file', val);
    else if (val !== undefined && val !== null) data.append(key, val);
  });

  const response = await axios.post(
    `${import.meta.env.VITE_API_URL}/upload-ad`,
    data,
    { withCredentials: true }
  );

  return response.data;
}


export async function fetchUserProfile() {
  try {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/profile`, {
      withCredentials: true,

    });
    return res.data;
  } catch (err) {
    console.error('Profile fetch failed:', err);
    return null;
  }
}

export async function fetchAdsByCategory(adType, maxPrice) {
  try {
    const url = `${import.meta.env.VITE_API_URL}/category/${adType}${maxPrice ? `?maxPrice=${maxPrice}` : ''
      }`;

    const res = await axios.get(url, { withCredentials: true });
    return Array.isArray(res.data) ? res.data : [];
  } catch (err) {
    console.error('Fetch ads by category failed:', err);
    return []; // Always return an array to avoid .map() crash
  }
}



export async function addToCart(adId, quantity = 1) {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_API_URL}/cart/${adId}`,
      { quantity }, // empty request body
      {
        withCredentials: true,
      }
    );
    return res.data;
  } catch (err) {
    console.error("Add to cart failed:", err.response?.data || err.message);
    return null;
  }
}



export async function fetchCart() {
  try {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/cart`, {
      withCredentials: true, // ✅ now in config, not body
    });
    return res.data;
  } catch (err) {
    console.error("Failed to fetch cart:", err.response?.data || err.message);
    return [];
  }
}

export async function removeFromCart(adId) {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_API_URL}/remove-from-cart`,
      { adId },
      { withCredentials: true }
    );
    return res.data;
  } catch (err) {
    console.error("Failed to remove from cart:", err.response?.data || err.message);
    return { success: false, message: "Failed to remove from cart" };
  }
}

export async function fetchAdById(id) {
  try {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/ad/${id}`, {
      withCredentials: true,
    });
    return res.data;
  } catch (err) {
    console.error("Fetch ad by ID failed:", err.response?.data || err.message);
    return null;
  }
}


export async function fetchRelatedAds(tags, adType) {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_API_URL}/related-ads`,
      { tags, adType },
      { withCredentials: true }
    );
    console.log('related ads:', res.data);

    return Array.isArray(res.data.relatedAds) ? res.data.relatedAds : [];
  } catch (err) {
    console.error("Fetch related ads failed:", err);
    return [];
  }
}



export async function addAddress(addressData) {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_API_URL}/Address`,
      addressData,
      { withCredentials: true }
    );
    return res.data;
  } catch (err) {
    console.error("Failed to add address:", err.response?.data || err.message);
    return { success: false, message: "Failed to add address" };
  }
}

export async function updateAddress(addressId, updatedData) {
  try {
    const res = await axios.put(
      `${import.meta.env.VITE_API_URL}/Address/${addressId}`,
      updatedData,
      { withCredentials: true }
    );
    return res.data;
  } catch (err) {
    console.error("Failed to update address:", err.response?.data || err.message);
    return { success: false, message: "Failed to update address" };
  }
}

export async function updateAd(adId, updatedData) {
  try {
    const res = await axios.put(
      `${import.meta.env.VITE_API_URL}/ads/${adId}`,
      updatedData,
      { withCredentials: true }
    );
    return res.data;
  } catch (err) {
    console.error("Failed to update ad:", err.response?.data || err.message);
    return { success: false, message: "Failed to update ad" };
  }
}

// ✅ Delete Ad
export async function deleteAd(adId) {
  try {
    const res = await axios.delete(
      `${import.meta.env.VITE_API_URL}/ads/${adId}`,
      { withCredentials: true }
    );
    return res.data;
  } catch (err) {
    console.error("Failed to delete ad:", err.response?.data || err.message);
    return { success: false, message: "Failed to delete ad" };
  }
}


export async function deleteAddress(addressId) {
  try {
    const res = await axios.delete(
      `${import.meta.env.VITE_API_URL}/Address/${addressId}`,
      { withCredentials: true }
    );
    return res.data;
  } catch (err) {
    console.error("Failed to delete address:", err.response?.data || err.message);
    return { success: false, message: "Failed to delete address" };
  }
}


export async function fetchUserAddresses() {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_API_URL}/GetAddress`,
      { withCredentials: true }
    );
    return res.data.addresses || [];
  } catch (err) {
    console.error("Failed to fetch addresses:", err.response?.data || err.message);
    return [];
  }
}




export async function placeOrder(order) {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_API_URL}/orders`,
      order,
      {
        withCredentials: true,
        headers: { "Content-Type": "application/json" }
      }
    );
    console.log('oredrPrint: ', res.data)
    return res.data;
  } catch (error) {
    const message = error.response?.data?.error || "Failed to place order";
    throw new Error(message);
  }
}


export const fetchMyAds = async () => {
  try {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/GetMyAds`, {
      withCredentials: true,
    });

    return res.data.ads || [];
  } catch (err) {
    console.error('Failed to load your ads:', err);
    throw err;
  }
}


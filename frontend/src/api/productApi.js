import axios from 'axios';

export async function searchAds(keyword) {
  try {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/products/search`, {
      params: { keyword },
      withCredentials: true,
    });
    return res.data;
  } catch (err) {
    console.error(err);
    return [];
  }
}


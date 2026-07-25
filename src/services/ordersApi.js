import api from "../lib/api";
import { toast } from "react-hot-toast";

export async function getOrders(currentPage, token) {
  try {
    const res = await api.get(
      `https://e-commerce-api-3wara.vercel.app/orders/my?page=${currentPage}&limit=10`,
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );
    const data = res.data;

    return data;
  } catch (error) {
    toast.error(error.res?.data?.message || error.message);
    console.error(error);
    throw error;
  }
}

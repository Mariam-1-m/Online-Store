import { useEffect, useState } from "react";
import api from "../../lib/api";
import Loader from "../Loader";
import {Trash2, Heart, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

export default function WishListComponent() {
  const [wishlistData, setWishlistData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addtocartloading, setaddtocartloading] = useState(false);
  const fetchWishlist = async () => {
    try {
      const response = await api.get("/wishlists/my");
      window.dispatchEvent(new Event("wishlistUpdated"));
      const products = await response.data.wishlist.products;
      const uniqueProducts = products.filter(
        (item, index, self) =>
          index === self.findIndex((p) => p._id === item._id),
      );
      setWishlistData(uniqueProducts);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchWishlist();
  }, []);
  console.log(wishlistData);

  const deleteItemFromWishlist = async (productId) => {
    try {
      const response = await api.delete(`/wishlists/remove/${productId}`);
      window.dispatchEvent(new Event("wishlistUpdated"));
      console.log("product deleted from wishlist succsess");
      toast.success("product Deleted From Wishlist Successfully!");
      window.dispatchEvent(new Event("wishlistItemDeleted"));
      fetchWishlist();
    } catch (err) {
      console.log(err);
    }
  };

  const addProductToCart = async (productId) => {
    try {
      setaddtocartloading(true);
      const response = await api.post("/carts/items", {
        productId: productId,
        quantity: 1,
      });
      window.dispatchEvent(new Event("cartUpdated"));
      console.log(response.data);
      toast.success("product added to cart Successfully");
    } catch (err) {
      console.log(err);
    } finally {
      setaddtocartloading(false);
    }
  };
  if (loading) {
    return <Loader />;
  }
  return (
    <>
      <div className="max-w-7xl mx-auto px-4 py-8 animate-fade-in">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-6">
          My Wishlist
        </h2>

        {wishlistData?.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#12162f]">
            <div className="w-20 h-20 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-6">
              <Heart
                size={34}
                className="text-slate-500 dark:text-slate-400"
                strokeWidth={1.8}
              />
            </div>

            <h3 className="text-2xl font-semibold text-slate-800 dark:text-white">
              Your wishlist is empty
            </h3>

            <p className="mt-3 max-w-md text-sm text-slate-500 dark:text-slate-400">
              Save items you love to your wishlist. They'll be waiting for you
              here.
            </p>

            <Link
              to="/products"
              className="mt-8 inline-flex items-center gap-2 rounded-lg bg-[#4f13f3] px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#3f0fd1] hover:scale-105"
            >
              <ShoppingBag size={18} />
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlistData.map((pro, inx) => (
              <div
                key={inx}
                className="bg-white dark:bg-[#12162f] rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden"
              >
                <img
                  src={pro.images?.[0].url}
                  alt={pro.name}
                  className="w-full h-80 object-cover"
                />

                <div className="p-4">
                  <h3 className="text-md font-medium text-slate-800 dark:text-white line-clamp-2 mb-2 hover:text-[#4f13f3] cursor-pointer">
                    {pro.name}
                  </h3>

                  <div className="flex gap-2 mt-2">
                    <span className="text-md font-bold text-[#4f13f3]">
                      EGP {pro.discountPrice}
                    </span>
                    <span className="text-md font-bold text-gray-400 line-through">
                      EGP {pro.price}
                    </span>
                  </div>

                  <div className="flex gap-2 mt-4">
                    <button
                      onClick={() => addProductToCart(pro._id)}
                      className="flex-1 py-2 bg-[#4f13f3] text-white text-sm font-medium rounded-lg hover:bg-[#3f0fd1] flex items-center justify-center gap-2"
                    >
                      <ShoppingBag size={16} />
                      Add To Cart
                    </button>

                    <button
                      onClick={() => deleteItemFromWishlist(pro._id)}
                      className="p-2 bg-red-50 dark:bg-red-900/20 text-red-500 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30"
                    ><Trash2/></button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

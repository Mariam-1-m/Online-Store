import React, { useState, useEffect } from "react";
import { Check } from "lucide-react";
import HeroSection from "../components/Home/HeroSection.jsx";
import ShopByCategory from "../components/Home/ShopByCategory.jsx";
import FeaturedWorks from "../components/Home/FeaturedWorks.jsx";
import HowItWorks from "../components/Home/HowItWorks.jsx";
import Subscribtion from "../components/Home/Subscribtion.jsx";

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [wishlist, setWishlist] = useState({});
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    fetch("https://e-commerce-api-3wara.vercel.app/products?page=1&limit=8")
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        setProducts(data.products || []);
      })
      .catch(function (error) {
        console.error("Error fetching products:", error);
      });
  }, []);


  function toggleWishlist(productId) {
    let messageText = "";

    if (wishlist[productId] === true) {
      setWishlist({ ...wishlist, [productId]: false });
      messageText = "Removed from Wishlist";
    } else {
      setWishlist({ ...wishlist, [productId]: true });
      messageText = "Added to Wishlist";
    }

    const newToast = {
      id: Date.now(),
      text: messageText,
    };

    setToasts(function (prevToasts) {
      return [...prevToasts, newToast];
    });

    setTimeout(function () {
      setToasts(function (prevToasts) {
        return prevToasts.filter(function (toast) {
          return toast.id !== newToast.id;
        });
      });
    }, 3000);
  }

  return (
    <div className=" min-h-screen  flex flex-col">
    
      <div className="fixed top-6 left-1/2 -translate-x-1/2 flex flex-col gap-2 z-50 items-center">
        {toasts.map(function (toast) {
          return (
            <div
              key={toast.id}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 text-sm font-medium"
            >
              <Check size={18} className="text-green-300" />
              <span>{toast.text}</span>
            </div>
          );
        })}
      </div>

      <HeroSection />
      <ShopByCategory products={products} />
      <FeaturedWorks
        products={products}
        wishlist={wishlist}
        onToggleWishlist={toggleWishlist}
      />
      <HowItWorks />
      <Subscribtion />
    </div>
  );
}
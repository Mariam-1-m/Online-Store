import React from "react";
import { Heart, ShoppingCart, ArrowRight } from "lucide-react";

export default function FeaturedWorks({ products, wishlist, onToggleWishlist }) {
  return (
    <div className="w-full flex flex-col items-center gap-6 py-6 px-4">
    
      <div className="w-full max-w-7xl mx-auto flex items-center justify-between px-4">
        <div className="text-left">
          <h2 className="text-3xl font-bold ">Featured Products</h2>
          <p className="text-slate-400">Handpicked just for you</p>
        </div>
        <a href="#" className="flex items-center gap-1 mr-1 text-indigo-400 font-medium hover:text-indigo-300">
          View All <ArrowRight size={18} />
        </a>
      </div>

     
      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 px-4">
        {products.map(function (product) {
          const isOutOfStock = product.stock === 0;
          const hasDiscount = product.discountPrice > 0;

          let priceToShow = product.price;
          let discountPercent = 0;

          if (hasDiscount) {
            priceToShow = product.discountPrice;
            const savedMoney = product.price - product.discountPrice;
            discountPercent = Math.round((savedMoney / product.price) * 100);
          }

          const ratingStars =
            "★".repeat(Math.round(product.averageRating || 0)) +
            "☆".repeat(5 - Math.round(product.averageRating || 0));

          return (
            <div
              key={product._id}
              style={{ height: "560px" }}
              className="group relative dark:bg-[#131b2e] border-slate-200 dark:border-[#23304a] bg-slate-50 rounded-2xl flex flex-col overflow-hidden border-2  hover:border-indigo-500 transition-colors"
            >
              
              <div className="absolute top-3 left-3 bg-blue-500/50 group-hover:bg-blue-500/80 transition-colors  text-xs font-bold px-2.5 py-1 rounded-xl z-10">
                {product.category}
              </div>

             
              {hasDiscount && (
                <div className="absolute top-3 right-12 bg-red-600/50 group-hover:bg-red-600/80 transition-colors  text-xs font-bold px-2.5 py-1 rounded-xl z-10">
                  -{discountPercent}%
                </div>
              )}

            
              <button
                onClick={function () {
                  onToggleWishlist(product._id);
                }}
                disabled={isOutOfStock}
                className={`absolute top-3 right-3 dark:bg-[#131b2e] border-slate-200 dark:border-[#23304a] bg-white/80 rounded-full p-2 z-10 ${
                  isOutOfStock ? "cursor-not-allowed opacity-60" : ""
                }`}
              >
                <Heart
                  size={18}
                  fill={wishlist[product._id] ? "currentColor" : "none"}
                  className={
                    isOutOfStock
                      ? "text-slate-400"
                      : wishlist[product._id]
                      ? "text-red-500/70"
                      : "text-slate-400"
                  }
                />
              </button>

             
              <div className="relative w-full h-2/3 dark:bg-[#131b2e] border-slate-200 dark:border-[#23304a] bg-white/80 flex items-center justify-center p-5 overflow-hidden">
                <img
                  src={product.images?.[0]?.url}
                  alt={product.name}
                  className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-110"
                />

                {isOutOfStock && (
                  <>
                    <div className="absolute inset-0 bg-black/60"></div>
                    <span className="absolute px-3 py-1 rounded-full bg-black/60 backdrop-blur-sm  text-xs font-bold z-10">
                      Out of Stock
                    </span>
                  </>
                )}
              </div>

          
              <div className="flex flex-col justify-between p-4 h-1/3 ">
                <div>
                  <p className="font-medium text-base">{product.name}</p>
                  <p className="text-xs text-amber-500 mt-1">
                    {ratingStars} ({product.numReviews || 0})
                  </p>
                </div>

                <p className="font-bold text-indigo-400 text-lg">
                  EGP {priceToShow}{" "}
                  {hasDiscount && (
                    <span className="text-xs text-slate-500 dark:text-slate-400 line-through font-normal">
                      EGP {product.price}
                    </span>
                  )}
                </p>

                {isOutOfStock ? (
                  <button
                    disabled
                    className="bg-slate-400  text-sm py-2 rounded-lg cursor-not-allowed flex items-center justify-center gap-1"
                  >
                    <ShoppingCart size={16} /> Out of Stock
                  </button>
                ) : (
                  <button className="bg-indigo-600 text-white text-sm py-2 rounded-lg flex items-center justify-center gap-1">
                    <ShoppingCart size={16} /> Add to Cart
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
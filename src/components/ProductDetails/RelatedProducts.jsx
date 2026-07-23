import { Link } from "react-router-dom";
import { Heart, ShoppingCart, Star } from "lucide-react";

function RelatedProducts({
  relatedProducts,
  handleWishlistItem,
  handleAddToCartItem,
}) {
  return (
    <div className="mx-auto mt-12 w-[80%]">
      <h2 className="mb-6 text-3xl font-bold text-[var(--text-primary)]"> Related Products </h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {relatedProducts.map((item) => (
          <Link
            key={item._id}
            to={`/products/${item._id}`}
            className="group relative overflow-hidden rounded-2xl border border-[var(--border-main)] bg-[var(--bg-primary)] p-4 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
            <span className="absolute left-3 top-3 rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-600"> {item.category} </span>
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleWishlistItem(item._id);
              }}
              className="absolute right-3 top-3 rounded-full bg-white p-2 shadow transition hover:bg-red-100 hover:text-red-500">
              <Heart size={18} />
            </button>

            <div className="overflow-hidden rounded-xl">
              <img
                src={item.images?.[0]?.url}
                alt={item.name}
                className="mx-auto h-44 object-contain transition-transform duration-300 group-hover:scale-110" />
            </div>

            <h3 className="mt-4 text-lg font-semibold text-[var(--text-primary)]">  {item.name}  </h3>
            <p className="mt-1 text-sm text-gray-500">  {item.brand} </p>
            <div className="mt-3 flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={16}
                  className={
                    star <= Math.round(item.averageRating || 0)
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-300"
                  }/>
              ))}
              <span className="ml-2 text-sm text-gray-400"> ({item.numReviews}) </span>
            </div>
            <div className="mt-3">
              <span className="text-xl font-bold text-blue-600">  EGP {item.discountPrice || item.price} </span>
              {item.discountPrice > 0 && (
                <span className="ml-2 text-gray-400 line-through">
                  EGP {item.price}
                </span>
              )}
            </div>
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleAddToCartItem(item._id);
              }}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 py-2 text-white transition hover:bg-blue-700" >
              <ShoppingCart size={18} /> Add to Cart
           </button>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default RelatedProducts;
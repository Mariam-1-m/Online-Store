import { Star, Heart, ShoppingCart, Plus, Minus } from "lucide-react";

function ProductInfo({
  product,
  quantity,
  setQuantity,
  handleAddToCart,
  handleAddToWishlist,
}) {
  return (
    <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
      {/* Left Side */}
      <div className="rounded-2xl border border-[var(--border-main)] bg-[var(--bg-primary)] p-6">
        <div className="flex h-[450px] items-center justify-center rounded-xl bg-[var(--background)] overflow-hidden">
          <img
            src={product?.images?.[0]?.url}
            alt="Product"
            className="h-[420px] w-full object-contain transition-all duration-300"
          />
        </div>
      </div>

      {/* Right Side */}
      <div className="flex flex-col gap-3 rounded-2xl border border-[var(--border-main)] bg-[var(--bg-primary)] p-8">
        <div className="flex items-center gap-2 text-sm">
          <span className="font-semibold text-sky-500">{product?.brand}</span>
          <span className="text-gray-400">{product?.category}</span>
        </div>
        <h1 className="text-4xl font-bold leading-none text-[var(--text-primary)]">  {product?.name} </h1>
        <div className="flex items-center gap-2">
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={18}
                className={
                  star <= Math.round(product?.averageRating || 0)
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-300"
                }
              />
            ))}
          </div>
          <span className="text-sm text-gray-400"> ({product?.numReviews}) </span>
          <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700"> {product?.stock > 0 ? "In Stock" : "Out of Stock"} </span>
        </div>
        <div className="mt-4 flex items-center gap-3">
          <span className="text-4xl font-bold text-blue-600">  EGP {product?.price} </span>
          <span className="text-xl text-gray-400 line-through">  EGP {product?.discountPrice} </span>
          <span className="rounded-md bg-red-100 px-2 py-1 text-sm font-semibold text-red-600">
            -{Math.round(
                 ((product?.price - product?.discountPrice) / product?.price) * 100
            )} %
          </span>
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <div className="flex items-center rounded-lg border border-gray-300">
            <button
              className="p-3"
              onClick={() =>
                setQuantity((prev) => (prev > 1 ? prev - 1 : 1))
              }>
              <Minus size={18} />
            </button>
            <span className="w-12 text-center font-semibold">  {quantity} </span>
            <button
              className="p-3"
              onClick={() => setQuantity((prev) => prev + 1)}>
              <Plus size={18} />
            </button>
          </div>
          <button
            onClick={handleAddToCart}
            className="flex flex-1 h-12 items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-white hover:bg-blue-700">
            <ShoppingCart size={20} /> Add To Cart
          </button>

          <button
            onClick={handleAddToWishlist}
            className="rounded-xl border border-gray-300 p-3 hover:bg-red-100" >
            <Heart
              className="text-gray-500 hover:fill-red-500 hover:text-red-500"
              size={22}
            />
          </button>
        </div>
        <p className="mt-4 max-w-md leading-8 text-gray-500">  {product?.description}  </p>
      </div>
    </div>
  );
}

export default ProductInfo;
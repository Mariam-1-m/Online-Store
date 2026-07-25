import { Star } from "lucide-react";

function ProductTabs({
  activeTab,
  setActiveTab,
  product,
  rating,
  setRating,
  review,
  setReview,
  handleSubmitReview,
}) {
  return (
    <div className="mx-auto mt-10 w-[80%] rounded-2xl border border-[var(--border-main)] bg-[var(--bg-primary)] p-8">
      {/* Tabs */}
      <div className="flex gap-8 border-b border-[var(--border-main)]">
        <button
          onClick={() => setActiveTab("description")}
          className={`pb-3 text-lg font-medium transition ${
            activeTab === "description"
              ? "border-b-2 border-blue-600 text-blue-600"
              : "text-gray-500"
          }`}>  Description
        </button>
        <button
          onClick={() => setActiveTab("reviews")}
          className={`pb-3 text-lg font-medium transition ${
            activeTab === "reviews"
              ? "border-b-2 border-blue-600 text-blue-600"
              : "text-gray-500"
          }`}>  Reviews ({product?.numReviews})
        </button>
      </div>
      {/* Description */}
      {activeTab === "description" && (
        <div className="mt-6">
          <p className="max-w-3xl leading-8 text-gray-500">   {product?.description} </p>
        </div>
      )}

      {/* Reviews */}
      {activeTab === "reviews" && (
        <div className="mt-6">
          <h3 className="mb-4 text-2xl font-semibold"> Write a Review  </h3>
          <div className="mb-4 flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={22}
                onClick={() => setRating(star)}
                className={`cursor-pointer transition-all duration-200 hover:scale-110 ${
                  star <= rating
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-300 hover:text-yellow-400"
                }`}
              />
            ))}
          </div>
          <textarea
            rows={5}
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder="Share your thoughts..."
            className="mt-2 w-full resize-none rounded-xl border border-gray-300 bg-transparent p-4 text-[var(--text-primary)] outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          />
          <button
            onClick={handleSubmitReview}
            className="mt-5 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-blue-700 active:scale-95">
            Submit Review
          </button>
          <p className="mt-6 text-center text-sm text-gray-400">  No reviews yet. Be the first to review this product. </p>
        </div>
      )}
    </div>
  );
}

export default ProductTabs;
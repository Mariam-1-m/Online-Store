import { Heart, ShoppingCart, Star } from 'lucide-react'

const FALLBACK_IMAGE =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='640' height='480' viewBox='0 0 640 480'%3E%3Crect width='640' height='480' fill='%23eef1f5'/%3E%3Cpath d='M238 179h164v122H238z' fill='%23d6dce5'/%3E%3Ccircle cx='283' cy='219' r='19' fill='%23eef1f5'/%3E%3Cpath d='m249 282 48-47 31 31 26-24 37 40z' fill='%23b9c2cf'/%3E%3C/svg%3E"

const priceFormatter = new Intl.NumberFormat('en-EG', {
  style: 'currency',
  currency: 'EGP',
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
})

function ProductCard({
  product,
  onAddToCart,
  onProductSelect,
  onToggleWishlist,
  isWishlisted = false,
  isAdding = false,
  wasAdded = false,
}) {
  const regularPrice = Number(product.price) || 0
  const discountPrice = Number(product.discountPrice) || 0
  const hasDiscount = discountPrice > 0 && discountPrice < regularPrice
  const displayPrice = hasDiscount ? discountPrice : regularPrice
  const discountPercentage = hasDiscount
    ? Math.round(((regularPrice - discountPrice) / regularPrice) * 100)
    : 0
  const imageUrl = product.images?.find((image) => image?.url)?.url
  const rating = Number(product.averageRating) || 0
  const reviewCount = Number(product.numReviews) || 0
  const isOutOfStock = Number(product.stock) <= 0
  const productName = product.name || 'Unnamed product'

  return (
    <article className="shop-product-card">
      <div className="shop-product-image-wrap">
        <img
          className="shop-product-image"
          src={imageUrl || FALLBACK_IMAGE}
          alt={productName}
          loading="lazy"
          onError={(event) => {
            event.currentTarget.onerror = null
            event.currentTarget.src = FALLBACK_IMAGE
          }}
        />
        <div className="shop-card-badges">
          {product.category && (
            <span className="shop-category-badge">{product.category}</span>
          )}
          {hasDiscount && (
            <span className="shop-discount-badge">-{discountPercentage}%</span>
          )}
          <button
            className={`shop-wishlist-button${isWishlisted ? ' is-selected' : ''}`}
            type="button"
            onClick={() => onToggleWishlist?.(product)}
            aria-label={`${isWishlisted ? 'Remove' : 'Add'} ${productName} ${
              isWishlisted ? 'from' : 'to'
            } wishlist`}
            aria-pressed={isWishlisted}
          >
            <Heart
              aria-hidden="true"
              size={16}
              fill={isWishlisted ? 'currentColor' : 'none'}
            />
          </button>
        </div>
        {isOutOfStock && <span className="shop-stock-badge">Out of stock</span>}
      </div>

      <div className="shop-product-content">
        {typeof onProductSelect === 'function' ? (
          <button
            className="shop-product-title shop-product-title-button"
            type="button"
            onClick={() => onProductSelect(product)}
          >
            {productName}
          </button>
        ) : (
          <h3 className="shop-product-title">{productName}</h3>
        )}

        <div
          className="shop-rating"
          aria-label={`${rating.toFixed(1)} out of 5 stars, ${reviewCount} reviews`}
        >
          <span className="shop-stars" aria-hidden="true">
            {Array.from({ length: 5 }, (_, index) => (
              <Star
                key={index}
                size={15}
                className={index < Math.round(rating) ? 'is-filled' : ''}
                fill="currentColor"
              />
            ))}
          </span>
          <span className="shop-review-count">({reviewCount})</span>
        </div>

        <div className="shop-price-row">
          <strong>{priceFormatter.format(displayPrice)}</strong>
          {hasDiscount && <del>{priceFormatter.format(regularPrice)}</del>}
        </div>

        <button
          className="shop-add-button"
          type="button"
          onClick={() => onAddToCart?.(product)}
          disabled={isOutOfStock || isAdding || wasAdded}
          aria-label={`Add ${productName} to cart`}
        >
          <ShoppingCart aria-hidden="true" size={16} />
          {isAdding
            ? 'Adding...'
            : wasAdded
              ? 'Added'
              : isOutOfStock
                ? 'Out of Stock'
                : 'Add to Cart'}
        </button>
      </div>
    </article>
  )
}

export default ProductCard

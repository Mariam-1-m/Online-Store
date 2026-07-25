import {
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  PackageSearch,
} from 'lucide-react'
import ProductCard from './ProductCard'

function ProductSkeleton() {
  return (
    <div className="shop-product-card shop-skeleton-card" aria-hidden="true">
      <div className="shop-skeleton shop-skeleton-image" />
      <div className="shop-product-content">
        <div className="shop-skeleton shop-skeleton-line is-short" />
        <div className="shop-skeleton shop-skeleton-line" />
        <div className="shop-skeleton shop-skeleton-line is-medium" />
        <div className="shop-skeleton shop-skeleton-button" />
      </div>
    </div>
  )
}

function ProductsCards({
  products = [],
  loading = false,
  error = '',
  onRetry,
  onProductSelect,
  onAddToCart,
  onToggleWishlist,
  wishlistProductIds = [],
  currentPage = 1,
  totalPages = 0,
  onPageChange,
  pendingCartProductId = null,
  cartFeedbackProductId = null,
  onClearFilters,
  skeletonCount = 8,
}) {
  if (error) {
    return (
      <div className="shop-state-card" role="alert">
        <AlertCircle aria-hidden="true" size={38} />
        <h2>Unable to load products</h2>
        <p>{error}</p>
        <button type="button" onClick={onRetry}>
          Try Again
        </button>
      </div>
    )
  }

  if (loading && products.length === 0) {
    return (
      <div className="shop-product-grid" aria-label="Loading products">
        {Array.from({ length: skeletonCount }, (_, index) => (
          <ProductSkeleton key={`product-skeleton-${index + 1}`} />
        ))}
        <span className="shop-sr-only" role="status">
          Loading products
        </span>
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className="shop-state-card">
        <PackageSearch aria-hidden="true" size={42} />
        <h2>No products found</h2>
        <p>Try changing your search or clearing the selected filters.</p>
        <button type="button" onClick={onClearFilters}>
          Clear Filters
        </button>
      </div>
    )
  }

  const wishlistIds =
    wishlistProductIds instanceof Set
      ? wishlistProductIds
      : new Set(wishlistProductIds)

  return (
    <>
      <div className={`shop-product-grid${loading ? ' is-loading' : ''}`}>
        {products.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            onAddToCart={onAddToCart}
            onProductSelect={onProductSelect}
            onToggleWishlist={onToggleWishlist}
            isWishlisted={wishlistIds.has(product._id)}
            isAdding={pendingCartProductId === product._id}
            wasAdded={cartFeedbackProductId === product._id}
          />
        ))}
      </div>

      {totalPages > 1 && (
        <nav className="shop-pagination" aria-label="Products pagination">
          <button
            type="button"
            onClick={() => onPageChange?.(currentPage - 1)}
            disabled={loading || currentPage <= 1}
            aria-label="Previous products page"
          >
            <ChevronLeft aria-hidden="true" size={18} />
            Previous
          </button>
          <span aria-live="polite">
            Page <strong>{currentPage}</strong> of {totalPages}
          </span>
          <button
            type="button"
            onClick={() => onPageChange?.(currentPage + 1)}
            disabled={loading || currentPage >= totalPages}
            aria-label="Next products page"
          >
            Next
            <ChevronRight aria-hidden="true" size={18} />
          </button>
        </nav>
      )}
    </>
  )
}

export default ProductsCards

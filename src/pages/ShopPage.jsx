import { useCallback, useEffect, useRef, useState } from 'react'
import { Filter, X } from 'lucide-react'
import ProductsCards from '../components/Shop/ProductsCards'
import Searchbar from '../components/Shop/Searchbar'
import Sidebar from '../components/Shop/Sidebar'
import api from '../lib/api'
import '../components/Shop/Shop.css'
const FILTER_PAGE_SIZE = 100
const DEFAULT_PAGE_SIZE = 10
const EMPTY_FILTERS = {
  category: '',
  brand: '',
  minPrice: '',
  maxPrice: '',
  sort: '',
}
const priceFormatter = new Intl.NumberFormat('en-EG', {
  style: 'currency',
  currency: 'EGP',
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
})
let filterOptionsRequest

function productsFrom(response) {
  return Array.isArray(response?.data?.products) ? response.data.products : []
}
async function loadFilterOptions() {
  if (filterOptionsRequest) return filterOptionsRequest

  filterOptionsRequest = (async () => {
    const firstResponse = await api.get('/products/search', {
      params: { page: 1, limit: FILTER_PAGE_SIZE },
    })
    const firstProducts = productsFrom(firstResponse)
    const totalPages = Math.max(1, Number(firstResponse.data?.totalPages) || 1)
    const remainingResponses = await Promise.all(
      Array.from({ length: totalPages - 1 }, (_, index) =>
        api.get('/products/search', {
          params: { page: index + 2, limit: FILTER_PAGE_SIZE },
        }),
      ),
    )
    const products = remainingResponses.reduce(
      (all, response) => all.concat(productsFrom(response)),
      firstProducts,
    )
    const uniqueValues = (field) =>
      [...new Set(products.map((product) => product?.[field]).filter(Boolean))].sort(
        (first, second) => first.localeCompare(second),
      )

    return { categories: uniqueValues('category'), brands: uniqueValues('brand') }
  })().catch((error) => {
    filterOptionsRequest = undefined
    throw error
  })

  return filterOptionsRequest
}

function buildQuery(page, limit, search, filters) {
  const params = { page, limit }
  if (search) params.search = search
  if (filters.category) params.category = filters.category
  if (filters.brand) params.brand = filters.brand
  if (filters.sort) params.sort = filters.sort
  if (filters.minPrice !== '' && Number.isFinite(Number(filters.minPrice))) {
    params.minPrice = Number(filters.minPrice)
  }
  if (filters.maxPrice !== '' && Number.isFinite(Number(filters.maxPrice))) {
    params.maxPrice = Number(filters.maxPrice)
  }
  return params
}

function friendlyError(error) {
  if (error?.message === 'Network error please check your connection') {
    return error.message
  }
  if (typeof error?.response?.data?.message === 'string') {
    return error.response.data.message
  }
  return "We couldn't load the products. Please try again."
}

function getActiveFilterChips(filters) {
  const formatPrice = (value) => {
    const number = Number(value)
    return Number.isFinite(number) ? priceFormatter.format(number) : value
  }
  return [
    filters.category && {
      key: 'category',
      label: filters.category,
      ariaLabel: `Remove category filter ${filters.category}`,
    },
    filters.brand && {
      key: 'brand',
      label: filters.brand,
      ariaLabel: `Remove brand filter ${filters.brand}`,
    },
    filters.minPrice !== '' && {
      key: 'minPrice',
      label: `Min: ${formatPrice(filters.minPrice)}`,
      ariaLabel: `Remove minimum price filter ${formatPrice(filters.minPrice)}`,
    },
    filters.maxPrice !== '' && {
      key: 'maxPrice',
      label: `Max: ${formatPrice(filters.maxPrice)}`,
      ariaLabel: `Remove maximum price filter ${formatPrice(filters.maxPrice)}`,
    },
  ].filter(Boolean)
}

function ShopPage({
  onAddToCart,
  onProductSelect,
  onToggleWishlist,
  wishlistProductIds = [],
  pageSize = DEFAULT_PAGE_SIZE,
}) {
  const limit =
    Number.isInteger(Number(pageSize)) && Number(pageSize) > 0
      ? Number(pageSize)
      : DEFAULT_PAGE_SIZE
  const [products, setProducts] = useState([])
  const [totalPages, setTotalPages] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [search, setSearch] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const [filters, setFilters] = useState(EMPTY_FILTERS)
  const [filterOptions, setFilterOptions] = useState({
    categories: [],
    brands: [],
  })
  const [filterOptionsLoading, setFilterOptionsLoading] = useState(true)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [retryCount, setRetryCount] = useState(0)
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [isBrandExpanded, setIsBrandExpanded] = useState(false)
  const [pendingCartId, setPendingCartId] = useState(null)
  const [cartFeedbackId, setCartFeedbackId] = useState(null)
  const [localWishlistIds, setLocalWishlistIds] = useState([])
  const cartFeedbackTimer = useRef(null)

  useEffect(() => {
    const timer = window.setTimeout(
      () => setDebouncedSearch(search.trim()),
      400,
    )
    return () => window.clearTimeout(timer)
  }, [search])

  useEffect(() => {
    let active = true
    loadFilterOptions()
      .then((options) => {
        if (active) setFilterOptions(options)
      })
      .catch(() => {
        if (active) setFilterOptions({ categories: [], brands: [] })
      })
      .finally(() => {
        if (active) setFilterOptionsLoading(false)
      })
    return () => {
      active = false
    }
  }, [])

  useEffect(() => {
    const controller = new AbortController()

    async function fetchProducts() {
      setLoading(true)
      setError('')
      try {
        const response = await api.get('/products/search', {
          params: buildQuery(currentPage, limit, debouncedSearch, filters),
          signal: controller.signal,
        })
        if (controller.signal.aborted) return
        setProducts(productsFrom(response))
        setTotalPages(Number(response.data?.totalPages) || 0)
      } catch (requestError) {
        if (
          controller.signal.aborted ||
          requestError?.code === 'ERR_CANCELED'
        ) {
          return
        }
        setProducts([])
        setTotalPages(0)
        setError(friendlyError(requestError))
      } finally {
        if (!controller.signal.aborted) setLoading(false)
      }
    }

    fetchProducts()
    return () => controller.abort()
  }, [currentPage, debouncedSearch, filters, limit, retryCount])

  useEffect(() => {
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setIsFilterOpen(false)
    }
    document.addEventListener('keydown', closeOnEscape)
    return () => document.removeEventListener('keydown', closeOnEscape)
  }, [])

  useEffect(
    () => () => {
      if (cartFeedbackTimer.current) {
        window.clearTimeout(cartFeedbackTimer.current)
      }
    },
    [],
  )

  const updateFilter = useCallback((name, value) => {
    setCurrentPage(1)
    setFilters((current) => ({ ...current, [name]: value }))
  }, [])

  const updateSearch = useCallback((value) => {
    setCurrentPage(1)
    setSearch(value)
  }, [])

  const clearFilters = useCallback(() => {
    setCurrentPage(1)
    setSearch('')
    setDebouncedSearch('')
    setFilters(EMPTY_FILTERS)
    setIsBrandExpanded(false)
    setIsFilterOpen(false)
  }, [])

  const changePage = useCallback(
    (nextPage) => {
      if (
        loading ||
        nextPage < 1 ||
        nextPage > totalPages ||
        nextPage === currentPage
      ) {
        return
      }
      setCurrentPage(nextPage)
      document.querySelector('.shop-products-page')?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    },
    [currentPage, loading, totalPages],
  )

  const addToCart = useCallback(
    async (product) => {
      if (pendingCartId) return
      setPendingCartId(product._id)
      try {
        if (onAddToCart) {
          await onAddToCart(product)
        } else {
          setCartFeedbackId(product._id)
          window.clearTimeout(cartFeedbackTimer.current)
          cartFeedbackTimer.current = window.setTimeout(
            () => setCartFeedbackId(null),
            1200,
          )
        }
      } catch {
        setCartFeedbackId(null)
      } finally {
        setPendingCartId(null)
      }
    },
    [onAddToCart, pendingCartId],
  )

  const toggleWishlist = useCallback(
    (product) => {
      if (onToggleWishlist) return onToggleWishlist(product)
      setLocalWishlistIds((ids) =>
        ids.includes(product._id)
          ? ids.filter((id) => id !== product._id)
          : [...ids, product._id],
      )
    },
    [onToggleWishlist],
  )

  const hasActiveFilters = Object.values(filters).some((value) => value !== '')
  const activeFilterChips = getActiveFilterChips(filters)
  const visibleWishlistIds = onToggleWishlist
    ? wishlistProductIds
    : localWishlistIds

  return (
    <section className="shop-products-page" aria-label="Products shop">
      <div className="shop-shell">
        <div className="shop-toolbar">
          <Searchbar value={search} onChange={updateSearch} />
          <button
            className="shop-filter-trigger"
            type="button"
            onClick={() => setIsFilterOpen(true)}
            aria-label="Open product filters"
            aria-expanded={isFilterOpen}
          >
            <Filter size={18} aria-hidden="true" />
            <span>Filters</span>
          </button>
          {isFilterOpen && (
            <button
              className="shop-filter-backdrop"
              type="button"
              aria-label="Close product filters"
              onClick={() => setIsFilterOpen(false)}
            />
          )}
        </div>
        {activeFilterChips.length > 0 && (
          <div className="shop-active-filters" aria-label="Active product filters">
            {activeFilterChips.map((chip) => (
              <button
                className="shop-filter-chip"
                type="button"
                key={chip.key}
                onClick={() => updateFilter(chip.key, '')}
                aria-label={chip.ariaLabel}
              >
                <span>{chip.label}</span>
                <X aria-hidden="true" size={13} strokeWidth={2.2} />
              </button>
            ))}
            <button
              className="shop-clear-all-text"
              type="button"
              onClick={clearFilters}
            >
              Clear all
            </button>
          </div>
        )}

        <div className="shop-layout">
          <Sidebar
            categories={filterOptions.categories}
            brands={filterOptions.brands}
            selectedCategory={filters.category}
            selectedBrand={filters.brand}
            minPrice={filters.minPrice}
            maxPrice={filters.maxPrice}
            sort={filters.sort}
            onCategoryChange={(value) => updateFilter('category', value)}
            onBrandChange={(value) => updateFilter('brand', value)}
            onMinPriceChange={(value) => updateFilter('minPrice', value)}
            onMaxPriceChange={(value) => updateFilter('maxPrice', value)}
            onSortChange={(value) => updateFilter('sort', value)}
            onClearFilters={clearFilters}
            hasActiveFilters={hasActiveFilters}
            isBrandExpanded={isBrandExpanded}
            onToggleBrand={() => setIsBrandExpanded((value) => !value)}
            isOpen={isFilterOpen}
            onClose={() => setIsFilterOpen(false)}
            disabled={filterOptionsLoading}
          />
          <main className="shop-results" aria-live="polite">
            <ProductsCards
              products={products}
              loading={loading}
              error={error}
              onRetry={() => setRetryCount((count) => count + 1)}
              onProductSelect={onProductSelect}
              onAddToCart={addToCart}
              onToggleWishlist={toggleWishlist}
              wishlistProductIds={visibleWishlistIds}
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={changePage}
              pendingCartProductId={pendingCartId}
              cartFeedbackProductId={cartFeedbackId}
              onClearFilters={clearFilters}
              skeletonCount={Math.min(limit, 8)}
            />
          </main>
        </div>
      </div>
    </section>
  )
}

export default ShopPage

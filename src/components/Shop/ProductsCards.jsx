import { useCallback, useEffect, useMemo, useState } from "react";
import {
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  Heart,
  PackageSearch,
  ShoppingCart,
  Star,
  X,
} from "lucide-react";
import api from "../../lib/api";
import Searchbar from "./Searchbar";
import Sidebar from "./Sidebar";

const FILTER_PAGE_SIZE = 100;
const EMPTY_FILTERS = {
  category: "",
  brand: "",
  minPrice: "",
  maxPrice: "",
  sort: "",
};

const FALLBACK_IMAGE =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='640' height='480' viewBox='0 0 640 480'%3E%3Crect width='640' height='480' fill='%23eef1f5'/%3E%3Cpath d='M238 179h164v122H238z' fill='%23d6dce5'/%3E%3Ccircle cx='283' cy='219' r='19' fill='%23eef1f5'/%3E%3Cpath d='m249 282 48-47 31 31 26-24 37 40z' fill='%23b9c2cf'/%3E%3C/svg%3E";

const priceFormatter = new Intl.NumberFormat("en-EG", {
  style: "currency",
  currency: "EGP",
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
});

let filterOptionsRequest;

function getProductsFromResponse(response) {
  return Array.isArray(response?.data?.products) ? response.data.products : [];
}

async function fetchFilterOptions() {
  if (!filterOptionsRequest) {
    filterOptionsRequest = (async () => {
      const firstResponse = await api.get("/products/search", {
        params: { page: 1, limit: FILTER_PAGE_SIZE },
      });
      const firstProducts = getProductsFromResponse(firstResponse);
      const totalPages = Math.max(1, Number(firstResponse.data?.totalPages) || 1);

      const remainingResponses =
        totalPages > 1
          ? await Promise.all(
              Array.from({ length: totalPages - 1 }, (_, index) =>
                api.get("/products/search", {
                  params: { page: index + 2, limit: FILTER_PAGE_SIZE },
                }),
              ),
            )
          : [];

      const allProducts = remainingResponses.reduce(
        (items, response) => items.concat(getProductsFromResponse(response)),
        firstProducts,
      );
      const categories = [
        ...new Set(allProducts.map((product) => product?.category).filter(Boolean)),
      ].sort((a, b) => a.localeCompare(b));
      const brands = [
        ...new Set(allProducts.map((product) => product?.brand).filter(Boolean)),
      ].sort((a, b) => a.localeCompare(b));

      return { categories, brands };
    })().catch((error) => {
      filterOptionsRequest = undefined;
      throw error;
    });
  }

  return filterOptionsRequest;
}

function getFriendlyError(error) {
  if (error?.message === "Network error please check your connection") {
    return error.message;
  }

  if (typeof error?.response?.data?.message === "string") {
    return error.response.data.message;
  }

  return "We couldn't load the products. Please try again.";
}

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
  );
}

function ProductCard({
  product,
  onAddToCart,
  onProductSelect,
  onToggleWishlist,
  pendingCartId,
}) {
  const regularPrice = Number(product.price) || 0;
  const discountPrice = Number(product.discountPrice) || 0;
  const hasDiscount = discountPrice > 0 && discountPrice < regularPrice;
  const displayPrice = hasDiscount ? discountPrice : regularPrice;
  const discountPercentage = hasDiscount
    ? Math.round(((regularPrice - discountPrice) / regularPrice) * 100)
    : 0;
  const imageUrl = product.images?.find((image) => image?.url)?.url;
  const rating = Number(product.averageRating) || 0;
  const reviewCount = Number(product.numReviews) || 0;
  const isOutOfStock = Number(product.stock) <= 0;
  const isAdding = pendingCartId === product._id;

  return (
    <article className="shop-product-card">
      <div className="shop-product-image-wrap">
        <img
          className="shop-product-image"
          src={imageUrl || FALLBACK_IMAGE}
          alt={product.name || "Product"}
          loading="lazy"
          onError={(event) => {
            event.currentTarget.onerror = null;
            event.currentTarget.src = FALLBACK_IMAGE;
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
            className="shop-wishlist-button"
            type="button"
            onClick={() => onToggleWishlist?.(product)}
            aria-label={`Toggle ${product.name || "product"} in wishlist`}
          >
            <Heart aria-hidden="true" size={16} />
          </button>
        </div>
        {isOutOfStock && <span className="shop-stock-badge">Out of stock</span>}
      </div>

      <div className="shop-product-content">
        {typeof onProductSelect === "function" ? (
          <button
            className="shop-product-title shop-product-title-button"
            type="button"
            onClick={() => onProductSelect(product)}
          >
            {product.name || "Unnamed product"}
          </button>
        ) : (
          <h3 className="shop-product-title">{product.name || "Unnamed product"}</h3>
        )}

        <div
          className="shop-rating"
          aria-label={`${rating.toFixed(1)} out of 5 stars, ${reviewCount} reviews`}
        >
          <span className="shop-stars" aria-hidden="true">
            {Array.from({ length: 5 }, (_, index) => (
              <Star
                key={`rating-star-${index + 1}`}
                size={15}
                className={index < Math.round(rating) ? "is-filled" : ""}
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
          onClick={() => onAddToCart(product)}
          disabled={isOutOfStock || isAdding}
          aria-label={`Add ${product.name || "product"} to cart`}
        >
          <ShoppingCart aria-hidden="true" size={16} />
          {isAdding ? "Adding..." : isOutOfStock ? "Out of Stock" : "Add to Cart"}
        </button>
      </div>
    </article>
  );
}

function ProductsCards({
  onAddToCart,
  onProductSelect,
  onToggleWishlist,
  pageSize = 10,
}) {
  const normalizedPageSize = useMemo(() => {
    const numericPageSize = Number(pageSize);
    return Number.isInteger(numericPageSize) && numericPageSize > 0
      ? numericPageSize
      : 10;
  }, [pageSize]);
  const [products, setProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [filters, setFilters] = useState(EMPTY_FILTERS);
  const [filterOptions, setFilterOptions] = useState({
    categories: [],
    brands: [],
  });
  const [filterOptionsLoading, setFilterOptionsLoading] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [requestVersion, setRequestVersion] = useState(0);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [pendingCartId, setPendingCartId] = useState(null);
  const activeFilterChips = useMemo(() => {
    const chips = [];

    if (filters.category) {
      chips.push({
        key: "category",
        label: filters.category,
        ariaLabel: `Remove category filter ${filters.category}`,
      });
    }
    if (filters.brand) {
      chips.push({
        key: "brand",
        label: filters.brand,
        ariaLabel: `Remove brand filter ${filters.brand}`,
      });
    }
    if (filters.minPrice !== "") {
      const value = Number(filters.minPrice);
      const label = Number.isFinite(value)
        ? priceFormatter.format(value)
        : filters.minPrice;
      chips.push({
        key: "minPrice",
        label: `Min: ${label}`,
        ariaLabel: `Remove minimum price filter ${label}`,
      });
    }
    if (filters.maxPrice !== "") {
      const value = Number(filters.maxPrice);
      const label = Number.isFinite(value)
        ? priceFormatter.format(value)
        : filters.maxPrice;
      chips.push({
        key: "maxPrice",
        label: `Max: ${label}`,
        ariaLabel: `Remove maximum price filter ${label}`,
      });
    }

    return chips;
  }, [filters.brand, filters.category, filters.maxPrice, filters.minPrice]);
  const hasResettableFilters = Boolean(
    filters.category ||
      filters.brand ||
      filters.minPrice !== "" ||
      filters.maxPrice !== "" ||
      filters.sort,
  );

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setDebouncedSearch(searchValue.trim());
    }, 400);

    return () => window.clearTimeout(timeoutId);
  }, [searchValue]);

  useEffect(() => {
    let isActive = true;

    fetchFilterOptions()
      .then((options) => {
        if (isActive) setFilterOptions(options);
      })
      .catch(() => {
        if (isActive) setFilterOptions({ categories: [], brands: [] });
      })
      .finally(() => {
        if (isActive) setFilterOptionsLoading(false);
      });

    return () => {
      isActive = false;
    };
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    async function loadProducts() {
      setLoading(true);
      setError("");

      const params = { page, limit: normalizedPageSize };
      if (debouncedSearch) params.search = debouncedSearch;
      if (filters.category) params.category = filters.category;
      if (filters.brand) params.brand = filters.brand;
      if (filters.sort) params.sort = filters.sort;
      if (filters.minPrice !== "" && Number.isFinite(Number(filters.minPrice))) {
        params.minPrice = Number(filters.minPrice);
      }
      if (filters.maxPrice !== "" && Number.isFinite(Number(filters.maxPrice))) {
        params.maxPrice = Number(filters.maxPrice);
      }

      try {
        const response = await api.get("/products/search", {
          params,
          signal: controller.signal,
        });
        if (controller.signal.aborted) return;

        setProducts(getProductsFromResponse(response));
        setTotalPages(Number(response.data?.totalPages) || 0);
      } catch (requestError) {
        if (controller.signal.aborted || requestError?.code === "ERR_CANCELED") return;
        setProducts([]);
        setTotalPages(0);
        setError(getFriendlyError(requestError));
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    loadProducts();
    return () => controller.abort();
  }, [
    debouncedSearch,
    filters.brand,
    filters.category,
    filters.maxPrice,
    filters.minPrice,
    filters.sort,
    normalizedPageSize,
    page,
    requestVersion,
  ]);

  const updateFilter = useCallback((name, value) => {
    setPage(1);
    setFilters((current) => ({ ...current, [name]: value }));
  }, []);

  const handleSearchChange = useCallback((value) => {
    setPage(1);
    setSearchValue(value);
  }, []);

  const clearFilters = useCallback(() => {
    setPage(1);
    setSearchValue("");
    setDebouncedSearch("");
    setFilters(EMPTY_FILTERS);
    setIsFilterOpen(false);
  }, []);

  const handleAddToCart = useCallback(
    async (product) => {
      if (typeof onAddToCart !== "function" || pendingCartId) return;

      setPendingCartId(product._id);
      try {
        await onAddToCart(product);
      } catch {
        // Cart integration owns its notification and error handling.
      } finally {
        setPendingCartId(null);
      }
    },
    [onAddToCart, pendingCartId],
  );

  const goToPage = useCallback(
    (nextPage) => {
      if (loading || nextPage < 1 || nextPage > totalPages || nextPage === page) {
        return;
      }
      setPage(nextPage);
      document.querySelector(".shop-products-page")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    },
    [loading, page, totalPages],
  );

  const showInitialSkeleton = loading && products.length === 0 && !error;

  return (
    <section className="shop-products-page" aria-label="Products shop">
      <style>{SHOP_STYLES}</style>
      <div className="shop-shell">
        <Searchbar
          searchValue={searchValue}
          onSearchChange={handleSearchChange}
          onOpenFilters={() => setIsFilterOpen(true)}
          loading={loading}
        />

        {activeFilterChips.length > 0 && (
          <div className="shop-active-filters" aria-label="Active product filters">
            {activeFilterChips.map((chip) => (
              <button
                className="shop-filter-chip"
                type="button"
                key={chip.key}
                onClick={() => updateFilter(chip.key, "")}
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
          {isFilterOpen && (
            <button
              className="shop-filter-backdrop"
              type="button"
              aria-label="Close product filters"
              onClick={() => setIsFilterOpen(false)}
            />
          )}
          <Sidebar
            categories={filterOptions.categories}
            brands={filterOptions.brands}
            selectedCategory={filters.category}
            selectedBrand={filters.brand}
            minPrice={filters.minPrice}
            maxPrice={filters.maxPrice}
            sort={filters.sort}
            onCategoryChange={(value) => updateFilter("category", value)}
            onBrandChange={(value) => updateFilter("brand", value)}
            onMinPriceChange={(value) => updateFilter("minPrice", value)}
            onMaxPriceChange={(value) => updateFilter("maxPrice", value)}
            onSortChange={(value) => updateFilter("sort", value)}
            onClearFilters={clearFilters}
            canClearFilters={hasResettableFilters}
            isOpen={isFilterOpen}
            onClose={() => setIsFilterOpen(false)}
            disabled={filterOptionsLoading}
          />

          <main className="shop-results" aria-live="polite">
            {error ? (
              <div className="shop-state-card" role="alert">
                <AlertCircle aria-hidden="true" size={38} />
                <h2>Unable to load products</h2>
                <p>{error}</p>
                <button type="button" onClick={() => setRequestVersion((value) => value + 1)}>
                  Try Again
                </button>
              </div>
            ) : showInitialSkeleton ? (
              <div className="shop-product-grid" aria-label="Loading products">
                {Array.from({ length: Math.min(normalizedPageSize, 8) }, (_, index) => (
                  <ProductSkeleton key={`product-skeleton-${index + 1}`} />
                ))}
                <span className="shop-sr-only" role="status">
                  Loading products
                </span>
              </div>
            ) : products.length === 0 ? (
              <div className="shop-state-card">
                <PackageSearch aria-hidden="true" size={42} />
                <h2>No products found</h2>
                <p>Try changing your search or clearing the selected filters.</p>
                <button type="button" onClick={clearFilters}>
                  Clear Filters
                </button>
              </div>
            ) : (
              <>
                <div className={`shop-product-grid${loading ? " is-loading" : ""}`}>
                  {products.map((product) => (
                    <ProductCard
                      key={product._id}
                      product={product}
                      onAddToCart={handleAddToCart}
                      onProductSelect={onProductSelect}
                      onToggleWishlist={onToggleWishlist}
                      pendingCartId={pendingCartId}
                    />
                  ))}
                </div>

                {totalPages > 1 && (
                  <nav className="shop-pagination" aria-label="Products pagination">
                    <button
                      type="button"
                      onClick={() => goToPage(page - 1)}
                      disabled={loading || page <= 1}
                      aria-label="Previous products page"
                    >
                      <ChevronLeft aria-hidden="true" size={18} />
                      Previous
                    </button>
                    <span aria-live="polite">
                      Page <strong>{page}</strong> of {totalPages}
                    </span>
                    <button
                      type="button"
                      onClick={() => goToPage(page + 1)}
                      disabled={loading || page >= totalPages}
                      aria-label="Next products page"
                    >
                      Next
                      <ChevronRight aria-hidden="true" size={18} />
                    </button>
                  </nav>
                )}
              </>
            )}
          </main>
        </div>
      </div>
    </section>
  );
}

const SHOP_STYLES = `
  .shop-products-page {
    --shop-bg: #f7fafc;
    --shop-surface: #ffffff;
    --shop-surface-muted: #f1f5f7;
    --shop-text: #25202b;
    --shop-text-muted: #77717e;
    --shop-border: #e8e6ec;
    --shop-primary: #5b35d5;
    --shop-primary-hover: #4b29bf;
    --shop-accent-soft: #eee9ff;
    --shop-danger: #d84f69;
    --shop-shadow: 0 2px 8px rgba(53, 45, 76, 0.045);
    width: 100%;
    min-height: 70vh;
    box-sizing: border-box;
    color: var(--shop-text);
    background: var(--shop-bg);
    color-scheme: light;
    text-align: left;
  }

  .dark .shop-products-page {
    --shop-bg: #0f172a;
    --shop-surface: #182235;
    --shop-surface-muted: #222d40;
    --shop-text: #f3f4f6;
    --shop-text-muted: #a9b0bd;
    --shop-border: #303b4d;
    --shop-primary: #8062ec;
    --shop-primary-hover: #9278ee;
    --shop-accent-soft: #302853;
    --shop-danger: #fb7185;
    --shop-shadow: 0 14px 38px rgba(0, 0, 0, 0.24);
    color-scheme: dark;
  }

  @media (prefers-color-scheme: dark) {
    .shop-products-page {
      --shop-bg: #0f172a;
      --shop-surface: #182235;
      --shop-surface-muted: #222d40;
      --shop-text: #f3f4f6;
      --shop-text-muted: #a9b0bd;
      --shop-border: #303b4d;
      --shop-primary: #8062ec;
      --shop-primary-hover: #9278ee;
      --shop-accent-soft: #302853;
      --shop-danger: #fb7185;
      --shop-shadow: 0 14px 38px rgba(0, 0, 0, 0.24);
      color-scheme: dark;
    }
  }

  .light .shop-products-page {
    --shop-bg: #f7fafc;
    --shop-surface: #ffffff;
    --shop-surface-muted: #f1f5f7;
    --shop-text: #25202b;
    --shop-text-muted: #77717e;
    --shop-border: #e8e6ec;
    --shop-primary: #5b35d5;
    --shop-primary-hover: #4b29bf;
    --shop-accent-soft: #eee9ff;
    --shop-danger: #d84f69;
    --shop-shadow: 0 2px 8px rgba(53, 45, 76, 0.045);
    color-scheme: light;
  }

  .shop-products-page *,
  .shop-products-page *::before,
  .shop-products-page *::after { box-sizing: border-box; }
  .shop-products-page button,
  .shop-products-page input,
  .shop-products-page select { font: inherit; }
  .shop-products-page button { cursor: pointer; }
  .shop-products-page button:disabled { cursor: not-allowed; opacity: 0.58; }

  .shop-shell { width: min(1340px, 100%); margin: 0 auto; padding: 24px 20px 36px; }
  .shop-sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; border: 0; }

  .shop-toolbar { display: grid; grid-template-columns: minmax(0, 1fr) auto; align-items: center; gap: 12px; margin-bottom: 22px; }
  .shop-search-field { position: relative; display: flex; align-items: center; min-height: 52px; color: var(--shop-text-muted); background: var(--shop-surface); border: 1px solid var(--shop-border); border-radius: 13px; box-shadow: 0 4px 18px rgba(35, 30, 49, 0.04); }
  .shop-search-field > svg { position: absolute; left: 16px; pointer-events: none; }
  .shop-search-field input { width: 100%; height: 50px; padding: 0 96px 0 48px; color: var(--shop-text); background: transparent; border: 0; outline: 0; font-size: 15px; }
  .shop-search-field input::placeholder { color: var(--shop-text-muted); font-size: 15px; }
  .shop-search-field:focus-within { border-color: var(--shop-primary); box-shadow: 0 0 0 3px color-mix(in srgb, var(--shop-primary) 16%, transparent); }
  .shop-search-status { position: absolute; right: 15px; font-size: 12px; color: var(--shop-text-muted); }
  .shop-filter-trigger { display: none; height: 46px; align-items: center; gap: 8px; padding: 0 15px; color: #fff; background: var(--shop-primary); border: 0; border-radius: 10px; }

  .shop-active-filters { display: flex; min-height: 30px; flex-wrap: wrap; align-items: center; gap: 7px; margin: 0 0 18px; }
  .shop-filter-chip { display: inline-flex; min-height: 30px; align-items: center; gap: 4px; padding: 3px 10px 3px 12px; color: var(--shop-primary); background: var(--shop-accent-soft); border: 0; border-radius: 999px; font-size: 13px; line-height: 1; }
  .shop-filter-chip:hover { background: color-mix(in srgb, var(--shop-primary) 15%, var(--shop-accent-soft)); }
  .shop-clear-all-text { min-height: 28px; padding: 2px 6px; color: #ef4444; background: transparent; border: 0; font-size: 13px; font-weight: 500; }
  .shop-clear-all-text:hover { text-decoration: underline; }

  .shop-layout { display: grid; grid-template-columns: 235px minmax(0, 1fr); align-items: start; gap: 24px; }
  .shop-sidebar { position: sticky; top: 18px; padding: 4px 0; color: var(--shop-text); }
  .shop-sidebar-heading { display: none; align-items: center; justify-content: space-between; margin-bottom: 22px; }
  .shop-sidebar-heading h2 { margin: 0; color: var(--shop-text); font-size: 20px; font-weight: 700; }
  .shop-sidebar-close { display: grid; width: 36px; height: 36px; place-items: center; color: var(--shop-text); background: transparent; border: 1px solid var(--shop-border); border-radius: 9px; }
  .shop-filter-group { min-width: 0; margin: 0 0 18px; padding: 0; border: 0; }
  .shop-filter-group legend { width: 100%; margin-bottom: 7px; color: var(--shop-text); font-size: 14px; font-weight: 600; }
  .shop-radio-option { display: flex; align-items: center; gap: 8px; min-height: 26px; font-size: 13.5px; color: var(--shop-text-muted); cursor: pointer; text-transform: capitalize; }
  .shop-radio-option input { width: 15px; height: 15px; margin: 0; accent-color: var(--shop-primary); }
  .shop-radio-option:has(input:checked) { color: var(--shop-text); font-weight: 650; }
  .shop-filter-note { margin: 4px 0 0; font-size: 12px; color: var(--shop-text-muted); }
  .shop-price-fields { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
  .shop-price-fields input { width: 100%; height: 40px; padding: 0 10px; color: var(--shop-text); background: var(--shop-surface); border: 1px solid var(--shop-border); border-radius: 9px; outline: 0; font-size: 13.5px; }
  .shop-price-fields input:focus { border-color: var(--shop-primary); box-shadow: 0 0 0 3px color-mix(in srgb, var(--shop-primary) 14%, transparent); }
  .shop-sort-group > label { display: block; margin-bottom: 7px; color: var(--shop-text); font-size: 14px; font-weight: 600; }
  .shop-sort-group select { width: 100%; height: 40px; padding: 0 34px 0 11px; color: var(--shop-text); background: var(--shop-surface); border: 1px solid var(--shop-border); border-radius: 9px; outline: 0; font-size: 13.5px; }
  .shop-sort-group select:focus { border-color: var(--shop-primary); box-shadow: 0 0 0 3px color-mix(in srgb, var(--shop-primary) 14%, transparent); }
  .shop-brand-details { margin: -3px 0 18px; border-bottom: 1px solid var(--shop-border); }
  .shop-brand-details summary { display: flex; min-height: 36px; align-items: center; justify-content: space-between; gap: 10px; color: var(--shop-text); font-size: 14px; font-weight: 600; cursor: pointer; list-style: none; }
  .shop-brand-details summary::-webkit-details-marker { display: none; }
  .shop-brand-details summary::after { content: '+'; color: var(--shop-primary); font-size: 20px; font-weight: 400; }
  .shop-brand-details[open] summary::after { content: '\\2212'; }
  .shop-brand-details summary span { max-width: 120px; margin-left: auto; overflow: hidden; color: var(--shop-primary); font-size: 11px; font-weight: 600; text-overflow: ellipsis; white-space: nowrap; }
  .shop-brand-details .shop-filter-group { max-height: 210px; margin: 0; padding: 2px 0 12px; overflow-y: auto; scrollbar-width: thin; }
  .shop-sidebar.is-disabled .shop-brand-details summary { opacity: 0.58; }
  .shop-clear-filters { display: flex; width: 100%; height: 38px; align-items: center; justify-content: center; gap: 6px; padding: 0 8px; color: var(--shop-primary); background: transparent; border: 1px solid var(--shop-primary); border-radius: 9px; font-size: 13px; font-weight: 500; }
  .shop-clear-filters:hover:not(:disabled) { color: #fff; background: var(--shop-primary); }
  .shop-filter-backdrop { display: none; }

  .shop-results { min-width: 0; }
  .shop-product-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 20px; transition: opacity 160ms ease; }
  .shop-product-grid.is-loading { opacity: 0.55; pointer-events: none; }
  .shop-product-card { display: flex; min-width: 0; overflow: hidden; flex-direction: column; background: var(--shop-surface); border: 1px solid var(--shop-border); border-radius: 13px; box-shadow: var(--shop-shadow); transition: transform 180ms ease, box-shadow 180ms ease; }
  .shop-product-card:hover { transform: translateY(-2px); box-shadow: 0 8px 20px rgba(53, 45, 76, 0.08); }
  .shop-product-image-wrap { position: relative; height: 230px; overflow: hidden; background: var(--shop-surface-muted); }
  .shop-product-image { display: block; width: 100%; height: 100%; object-fit: contain; padding: 19px; }
  .shop-card-badges { position: absolute; top: 11px; right: 11px; left: 11px; display: flex; align-items: center; gap: 7px; pointer-events: none; }
  .shop-category-badge, .shop-discount-badge, .shop-stock-badge { display: inline-flex; align-items: center; min-height: 24px; padding: 4px 9px; border-radius: 999px; font-size: 12px; font-weight: 700; line-height: 1; }
  .shop-category-badge { max-width: 48%; margin-right: auto; overflow: hidden; color: var(--shop-primary); background: var(--shop-accent-soft); text-overflow: ellipsis; text-transform: lowercase; white-space: nowrap; }
  .shop-discount-badge { color: var(--shop-danger); background: color-mix(in srgb, var(--shop-danger) 13%, var(--shop-surface)); }
  .shop-wishlist-button { display: grid; width: 28px; height: 28px; flex: 0 0 28px; place-items: center; padding: 0; color: var(--shop-text-muted); background: color-mix(in srgb, var(--shop-surface) 94%, transparent); border: 1px solid var(--shop-border); border-radius: 50%; box-shadow: 0 1px 4px rgba(35, 30, 49, 0.06); pointer-events: auto; }
  .shop-wishlist-button:hover { color: var(--shop-danger); border-color: color-mix(in srgb, var(--shop-danger) 45%, var(--shop-border)); }
  .shop-stock-badge { position: absolute; right: 11px; bottom: 11px; color: #fff; background: rgba(31, 36, 48, 0.78); font-size: 11px; }
  .shop-product-content { display: flex; min-height: 170px; flex: 1; flex-direction: column; padding: 11px 13px 13px; }
  .shop-product-title { display: -webkit-box; height: 40px; min-height: 40px; margin: 0 0 2px; overflow: hidden; color: var(--shop-text); font-size: 15px; font-weight: 650; line-height: 1.32; text-align: left; -webkit-box-orient: vertical; -webkit-line-clamp: 2; }
  .shop-product-title-button { width: 100%; padding: 0; background: transparent; border: 0; }
  .shop-product-title-button:hover { color: var(--shop-primary); }
  .shop-rating { display: flex; min-height: 19px; align-items: center; gap: 7px; margin-bottom: 4px; font-size: 12px; }
  .shop-stars { display: inline-flex; align-items: center; gap: 2px; color: #dce3ec; }
  .shop-stars .is-filled { color: #ffae00; }
  .shop-review-count { color: var(--shop-text-muted); }
  .shop-price-row { display: flex; min-height: 25px; flex-wrap: wrap; align-items: baseline; gap: 8px; margin-bottom: 5px; }
  .shop-price-row strong { color: var(--shop-primary); font-size: 19px; font-weight: 650; line-height: 1.2; }
  .shop-price-row del { color: var(--shop-text-muted); font-size: 13px; }
  .shop-add-button { display: flex; width: 100%; height: 38px; min-height: 38px; align-items: center; justify-content: center; gap: 7px; margin-top: auto; color: #fff; background: var(--shop-primary); border: 0; border-radius: 8px; font-size: 14px; font-weight: 600; transition: background 150ms ease, transform 150ms ease; }
  .shop-add-button:hover:not(:disabled) { background: var(--shop-primary-hover); transform: translateY(-1px); }

  .shop-state-card { display: flex; min-height: 360px; flex-direction: column; align-items: center; justify-content: center; padding: 38px 20px; color: var(--shop-text-muted); background: var(--shop-surface); border: 1px dashed var(--shop-border); border-radius: 14px; text-align: center; }
  .shop-state-card > svg { margin-bottom: 13px; color: var(--shop-primary); }
  .shop-state-card h2 { margin: 0 0 7px; color: var(--shop-text); font-size: 20px; }
  .shop-state-card p { max-width: 430px; margin: 0 0 19px; font-size: 14px; }
  .shop-state-card button { min-height: 40px; padding: 0 18px; color: #fff; background: var(--shop-primary); border: 0; border-radius: 8px; font-weight: 650; }

  .shop-skeleton-card:hover { transform: none; }
  .shop-skeleton { overflow: hidden; background: var(--shop-surface-muted); background-image: linear-gradient(90deg, transparent, color-mix(in srgb, var(--shop-surface) 70%, transparent), transparent); background-size: 200% 100%; animation: shop-shimmer 1.35s infinite; }
  .shop-skeleton-image { height: 230px; }
  .shop-skeleton-line { width: 100%; height: 13px; margin-bottom: 11px; border-radius: 5px; }
  .shop-skeleton-line.is-short { width: 44%; }
  .shop-skeleton-line.is-medium { width: 68%; }
  .shop-skeleton-button { width: 100%; height: 40px; margin-top: auto; border-radius: 8px; }
  @keyframes shop-shimmer { to { background-position: -200% 0; } }

  .shop-pagination { display: flex; align-items: center; justify-content: center; gap: 18px; margin-top: 30px; color: var(--shop-text-muted); font-size: 13px; }
  .shop-pagination button { display: inline-flex; min-height: 40px; align-items: center; gap: 6px; padding: 0 13px; color: var(--shop-text); background: var(--shop-surface); border: 1px solid var(--shop-border); border-radius: 8px; }
  .shop-pagination button:hover:not(:disabled) { color: var(--shop-primary); border-color: var(--shop-primary); }
  .shop-products-page :focus-visible { outline: 3px solid color-mix(in srgb, var(--shop-primary) 55%, transparent); outline-offset: 2px; }

  @media (max-width: 1240px) {
    .shop-product-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
    .shop-product-image-wrap, .shop-skeleton-image { height: 215px; }
  }

  @media (max-width: 1020px) {
    .shop-layout { grid-template-columns: 1fr; }
    .shop-filter-trigger { display: inline-flex; }
    .shop-product-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
    .shop-product-image-wrap, .shop-skeleton-image { height: 230px; }
    .shop-sidebar { position: fixed; z-index: 50; top: 0; bottom: 0; left: 0; width: min(330px, 88vw); overflow-y: auto; padding: 24px; background: var(--shop-surface); box-shadow: 20px 0 45px rgba(9, 12, 20, 0.22); transform: translateX(-110%); transition: transform 220ms ease; }
    .shop-sidebar.is-open { transform: translateX(0); }
    .shop-sidebar-heading { display: flex; }
    .shop-filter-backdrop { position: fixed; z-index: 40; inset: 0; display: block; width: 100%; height: 100%; padding: 0; background: rgba(11, 15, 24, 0.52); border: 0; }
  }

  @media (max-width: 620px) {
    .shop-shell { padding: 16px 14px 30px; }
    .shop-toolbar { grid-template-columns: 1fr; margin-bottom: 18px; }
    .shop-filter-trigger { width: 100%; justify-content: center; }
    .shop-product-grid { grid-template-columns: 1fr; gap: 14px; }
    .shop-product-image-wrap { height: 230px; }
    .shop-product-image { padding: 16px; }
    .shop-product-content { min-height: 168px; padding: 11px 13px 13px; }
    .shop-product-title { font-size: 15px; }
    .shop-price-row strong { font-size: 19px; }
    .shop-add-button { font-size: 14px; }
    .shop-pagination { gap: 9px; }
    .shop-pagination button { padding: 0 10px; font-size: 0; }
    .shop-pagination button svg { width: 20px; height: 20px; }
  }

`;

export default ProductsCards;

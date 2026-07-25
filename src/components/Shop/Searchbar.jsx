import { Search, SlidersHorizontal } from "lucide-react";

function Searchbar({
  searchValue = "",
  onSearchChange,
  onOpenFilters,
  loading = false,
}) {
  return (
    <div className="shop-toolbar" aria-busy={loading}>
      <div className="shop-search-field">
        <Search aria-hidden="true" size={18} strokeWidth={1.8} />
        <label className="shop-sr-only" htmlFor="shop-product-search">
          Search products
        </label>
        <input
          id="shop-product-search"
          type="search"
          value={searchValue}
          onChange={(event) => onSearchChange?.(event.target.value)}
          placeholder="Search products..."
          autoComplete="off"
        />
        {loading && <span className="shop-search-status">Updating...</span>}
      </div>

      <button
        className="shop-filter-trigger"
        type="button"
        onClick={onOpenFilters}
        aria-label="Open product filters"
      >
        <SlidersHorizontal aria-hidden="true" size={18} />
        Filters
      </button>
    </div>
  );
}

export default Searchbar;

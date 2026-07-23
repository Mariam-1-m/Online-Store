import { useEffect } from "react";
import { RotateCcw, X } from "lucide-react";

const SORT_OPTIONS = [
  { value: "", label: "Default" },
  { value: "price_asc", label: "Price Low to High" },
  { value: "price_desc", label: "Price High to Low" },
  { value: "rating", label: "Rating" },
  { value: "popular", label: "Popular" },
  { value: "oldest", label: "Oldest" },
];

function Sidebar({
  categories = [],
  brands = [],
  selectedCategory = "",
  selectedBrand = "",
  minPrice = "",
  maxPrice = "",
  sort = "",
  onCategoryChange,
  onBrandChange,
  onMinPriceChange,
  onMaxPriceChange,
  onSortChange,
  onClearFilters,
  canClearFilters = false,
  isOpen = false,
  onClose,
  disabled = false,
}) {
  useEffect(() => {
    if (!isOpen) return undefined;

    const closeOnEscape = (event) => {
      if (event.key === "Escape") onClose?.();
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [isOpen, onClose]);

  return (
    <aside
      className={`shop-sidebar${isOpen ? " is-open" : ""}${disabled ? " is-disabled" : ""}`}
      aria-label="Product filters"
    >
      <div className="shop-sidebar-heading">
        <h2>Filters</h2>
        <button
          className="shop-sidebar-close"
          type="button"
          onClick={onClose}
          aria-label="Close product filters"
        >
          <X aria-hidden="true" size={20} />
        </button>
      </div>

      <fieldset className="shop-filter-group" disabled={disabled}>
        <legend>Category</legend>
        <label className="shop-radio-option">
          <input
            type="radio"
            name="shop-category"
            value=""
            checked={!selectedCategory}
            onChange={() => onCategoryChange?.("")}
          />
          <span>All categories</span>
        </label>
        {categories.map((category) => (
          <label className="shop-radio-option" key={category}>
            <input
              type="radio"
              name="shop-category"
              value={category}
              checked={selectedCategory === category}
              onChange={() => onCategoryChange?.(category)}
            />
            <span>{category}</span>
          </label>
        ))}
        {!disabled && categories.length === 0 && (
          <p className="shop-filter-note">No categories available.</p>
        )}
      </fieldset>

      <fieldset className="shop-filter-group" disabled={disabled}>
        <legend>Price Range</legend>
        <div className="shop-price-fields">
          <label>
            <span className="shop-sr-only">Minimum price</span>
            <input
              type="number"
              min="0"
              inputMode="decimal"
              value={minPrice}
              onChange={(event) => onMinPriceChange?.(event.target.value)}
              placeholder="Min"
              aria-label="Minimum price"
            />
          </label>
          <label>
            <span className="shop-sr-only">Maximum price</span>
            <input
              type="number"
              min="0"
              inputMode="decimal"
              value={maxPrice}
              onChange={(event) => onMaxPriceChange?.(event.target.value)}
              placeholder="Max"
              aria-label="Maximum price"
            />
          </label>
        </div>
      </fieldset>

      <div className="shop-filter-group shop-sort-group">
        <label htmlFor="shop-sort-select">Sort By</label>
        <select
          id="shop-sort-select"
          value={sort}
          onChange={(event) => onSortChange?.(event.target.value)}
          disabled={disabled}
        >
          {SORT_OPTIONS.map((option) => (
            <option key={option.value || "default"} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <details className="shop-brand-details">
        <summary>
          Brand
          {selectedBrand && <span>{selectedBrand}</span>}
        </summary>
        <fieldset className="shop-filter-group" disabled={disabled}>
          <legend className="shop-sr-only">Brand</legend>
          <label className="shop-radio-option">
            <input
              type="radio"
              name="shop-brand"
              value=""
              checked={!selectedBrand}
              onChange={() => onBrandChange?.("")}
            />
            <span>All brands</span>
          </label>
          {brands.map((brand) => (
            <label className="shop-radio-option" key={brand}>
              <input
                type="radio"
                name="shop-brand"
                value={brand}
                checked={selectedBrand === brand}
                onChange={() => onBrandChange?.(brand)}
              />
              <span>{brand}</span>
            </label>
          ))}
          {!disabled && brands.length === 0 && (
            <p className="shop-filter-note">No brands available.</p>
          )}
        </fieldset>
      </details>

      <button
        className="shop-clear-filters"
        type="button"
        onClick={onClearFilters}
        disabled={disabled || !canClearFilters}
      >
        <RotateCcw aria-hidden="true" size={15} />
        Clear All Filters
      </button>
    </aside>
  );
}

export default Sidebar;

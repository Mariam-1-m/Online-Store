import { RotateCcw, X } from 'lucide-react'

const SORT_OPTIONS = [
  { value: '', label: 'Default' },
  { value: 'price_asc', label: 'Price: Low to High' },
  { value: 'price_desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Top Rated' },
  { value: 'popular', label: 'Most Popular' },
  { value: 'oldest', label: 'Oldest' },
]

function FilterRadioList({
  name,
  options,
  selectedValue,
  allLabel,
  onChange,
}) {
  return (
    <div className="shop-radio-list">
      <label className="shop-radio-option">
        <input
          type="radio"
          name={name}
          value=""
          checked={!selectedValue}
          onChange={() => onChange?.('')}
        />
        <span>{allLabel}</span>
      </label>
      {options.map((option) => (
        <label className="shop-radio-option" key={option}>
          <input
            type="radio"
            name={name}
            value={option}
            checked={selectedValue === option}
            onChange={() => onChange?.(option)}
          />
          <span>{option}</span>
        </label>
      ))}
    </div>
  )
}

function Sidebar({
  categories = [],
  brands = [],
  selectedCategory = '',
  selectedBrand = '',
  minPrice = '',
  maxPrice = '',
  sort = '',
  onCategoryChange,
  onBrandChange,
  onMinPriceChange,
  onMaxPriceChange,
  onSortChange,
  onClearFilters,
  hasActiveFilters = false,
  isBrandExpanded = false,
  onToggleBrand,
  isOpen = false,
  onClose,
  disabled = false,
}) {
  return (
    <aside
      className={`shop-sidebar${isOpen ? ' is-open' : ''}`}
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
          <X size={19} aria-hidden="true" />
        </button>
      </div>

      <fieldset className="shop-filter-group" disabled={disabled}>
        <legend>Category</legend>
        <FilterRadioList
          name="product-category"
          options={categories}
          selectedValue={selectedCategory}
          allLabel="All Categories"
          onChange={onCategoryChange}
        />
      </fieldset>

      <fieldset className="shop-filter-group" disabled={disabled}>
        <legend>Price Range</legend>
        <div className="shop-price-inputs">
          <label>
            <span className="shop-sr-only">Minimum price</span>
            <input
              type="number"
              inputMode="decimal"
              min="0"
              placeholder="Min"
              value={minPrice}
              onChange={(event) => onMinPriceChange?.(event.target.value)}
            />
          </label>
          <label>
            <span className="shop-sr-only">Maximum price</span>
            <input
              type="number"
              inputMode="decimal"
              min="0"
              placeholder="Max"
              value={maxPrice}
              onChange={(event) => onMaxPriceChange?.(event.target.value)}
            />
          </label>
        </div>
      </fieldset>

      <div className="shop-filter-group">
        <label className="shop-filter-title" htmlFor="shop-sort">
          Sort By
        </label>
        <select
          id="shop-sort"
          className="shop-sort-select"
          value={sort}
          onChange={(event) => onSortChange?.(event.target.value)}
          disabled={disabled}
        >
          {SORT_OPTIONS.map((option) => (
            <option key={option.value || 'default'} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div
        className={`shop-brand-details${isBrandExpanded ? ' is-open' : ''}`}
      >
        <button
          className="shop-brand-summary"
          type="button"
          aria-expanded={isBrandExpanded}
          aria-controls="shop-brand-options"
          onClick={onToggleBrand}
        >
          Brand
        </button>
        {isBrandExpanded && (
          <fieldset
            id="shop-brand-options"
            className="shop-filter-group shop-brand-list"
            disabled={disabled}
          >
            <legend className="shop-sr-only">Brand</legend>
            <FilterRadioList
              name="product-brand"
              options={brands}
              selectedValue={selectedBrand}
              allLabel="All Brands"
              onChange={onBrandChange}
            />
          </fieldset>
        )}
      </div>

      <button
        className="shop-clear-filters"
        type="button"
        onClick={onClearFilters}
        disabled={!hasActiveFilters}
      >
        <RotateCcw aria-hidden="true" />
        Clear All Filters
      </button>
    </aside>
  )
}

export default Sidebar

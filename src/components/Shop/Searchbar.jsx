import { Search } from 'lucide-react'

function Searchbar({
  value = '',
  onChange,
  placeholder = 'Search products...',
  disabled = false,
}) {
  return (
    <label className="shop-search-field">
      <span className="shop-sr-only">Search products</span>
      <Search aria-hidden="true" />
      <input
        type="search"
        value={value}
        onChange={(event) => onChange?.(event.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        autoComplete="off"
      />
    </label>
  )
}

export default Searchbar

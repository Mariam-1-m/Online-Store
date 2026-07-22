export function formatCurrency(value) {
  if (value == null || Number.isNaN(Number(value))) return "";

  return new Intl.NumberFormat("en-EG", {
    style: "currency",
    currency: "EGP",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Number(value));
}

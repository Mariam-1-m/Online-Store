import clsx from "clsx";

export default function PaginationButton({
  active = false,
  disabled = false,
  onClick,
  children,
}) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={clsx(
        "flex h-7 w-7 items-center justify-center rounded-lg border text-xs transition",
        "border-slate-200 dark:border-slate-700",
        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-40",
        active
          ? "bg-indigo-600 text-slate-50"
          : "text-slate-500 hover:text-indigo-600 hover:border-indigo-600",
      )}
    >
      {children}
    </button>
  );
}

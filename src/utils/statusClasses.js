export const statusClasses = {
  pending:
    "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400",

  confirmed: "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400",

  processing:
    "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400",

  shipped: "bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-400",

  delivered:
    "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400",

  cancelled: "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400",

  returned:
    "bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400",
};

export const baseStatusClasses =
  "inline-flex items-center gap-1.5 capitalize rounded-full font-medium px-2.5 py-0.5 text-xs";

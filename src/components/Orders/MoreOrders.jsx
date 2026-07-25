function MoreOrders({ limit, setLimit, totalOrders }) {
  const handleLimit = () => {
    if (limit < totalOrders) {
      setLimit((prevLimit) => prevLimit + 10);
    }
  };

  return (
    <div className="text-center">
      <button
        className="inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-600 px-4 py-2 text-sm"
        onClick={handleLimit}
      >
        Load More
      </button>
    </div>
  );
}

export default MoreOrders;

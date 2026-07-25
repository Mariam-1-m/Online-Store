import PaginationButton from "./PaginationButton";

function OrderPagination({ currentPage, setCurrentPage, totalPages }) {
  return (
    <div className="flex items-center justify-between py-3">
      <p className="text-xs text-slate-400">
        Page{" "}
        <span className="font-medium text-slate-600 dark:text-slate-300">
          {currentPage}
        </span>{" "}
        of{" "}
        <span className="font-medium text-slate-600 dark:text-slate-300">
          {totalPages}
        </span>
      </p>
      <div className="flex items-center justify-center gap-2">
        {/* Previous */}
        <PaginationButton
          disabled={currentPage <= 1}
          onClick={() => setCurrentPage((page) => page - 1)}
        >
          &lt;
        </PaginationButton>

        {Array.from({ length: totalPages }, (_, i) => {
          const page = i + 1;

          return (
            <PaginationButton
              key={page}
              active={currentPage === page}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </PaginationButton>
          );
        })}

        {/* Next */}
        <PaginationButton
          disabled={currentPage >= totalPages}
          onClick={() => setCurrentPage((page) => page + 1)}
        >
          &gt;
        </PaginationButton>
      </div>
    </div>
  );
}

export default OrderPagination;

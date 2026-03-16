

import './pagination.css';

export default function Pagination({ categoryPerPage, length, handlePagination, currentPage }:any) {
  const totalPages = Math.ceil(length / categoryPerPage);

  const generatePages = () => {
    const pages = [];

    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    pages.push(1);

    if (currentPage <= 4) {
      pages.push(2, 3, 4);
      pages.push("...");
    } else if (currentPage >= totalPages - 3) {
      pages.push("...");
    } else {
      pages.push("...");
      pages.push(currentPage - 1, currentPage, currentPage + 1);
      pages.push("...");
    }

    pages.push(totalPages - 1, totalPages);
    return pages;
  };

  const pages = generatePages();

  const handlePrev = () => {
    if (currentPage > 1) {
      handlePagination(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      handlePagination(currentPage + 1);
    }
  };

  return (
    <div className="pagination">
      <button onClick={handlePrev} disabled={currentPage === 1} className="nav-button">
        Prev
      </button>

      {pages.map((page, index) =>
        page === "..." ? (
          <span key={`dots-${index}`} className="dots">...</span>
        ) : (
          <button
            key={page}
            onClick={() => handlePagination(page)}
            className={currentPage === page ? "active" : ""}
          >
            {page}
          </button>
        )
      )}

      <button onClick={handleNext} disabled={currentPage === totalPages} className="nav-button">
        Next
      </button>
    </div>
  );
}

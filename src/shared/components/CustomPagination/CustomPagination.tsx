import React from "react";

interface CustomPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function CustomPagination({
  currentPage,
  totalPages,
  onPageChange,
}: CustomPaginationProps) {
  // دالة تساعدنا نعرض أرقام الصفحات بشكل ذكي
  const getPageNumbers = () => {
    const maxPagesToShow = 5;
    const pages: (number | string)[] = [];

    if (totalPages <= maxPagesToShow) {
      // لو الصفحات قليلة → نعرضهم كلهم
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
      return pages;
    }

    // حالة الصفحات كتير
    pages.push(1);

    let startPage = Math.max(2, currentPage - 1);
    let endPage = Math.min(totalPages - 1, currentPage + 1);

    // ضبط النطاق لو قريب من البداية أو النهاية
    if (currentPage <= 3) {
      endPage = 5;
    }
    if (currentPage >= totalPages - 2) {
      startPage = totalPages - 4;
    }

    if (startPage > 2) {
      pages.push("...");
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (endPage < totalPages - 1) {
      pages.push("...");
    }

    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  const pages = getPageNumbers();

  return (
    <div className="flex items-center justify-center gap-2 mt-8 flex-wrap">
      {/* زر Previous */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`
          flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium
          transition-all duration-200
          ${
            currentPage === 1
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 active:bg-gray-100"
          }
        `} >
        Prev
      </button>

      {/* أرقام الصفحات */}
      {pages.map((page, idx) => (
        <React.Fragment key={idx}>
          {page === "..." ? (
            <span className="px-3 py-2 text-gray-500">...</span>
          ) : (
            <button
              onClick={() => onPageChange(page as number)}
              className={`
                w-10 h-10  rounded-lg text-sm font-medium
                transition-all duration-200
                cursor-pointer
                ${
                  currentPage === page
                    ? "bg-orange-700 text-white shadow-md"
                    : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400"
                }
              `}
            >
              {page}
            </button>
          )}
        </React.Fragment>
      ))}

      {/* زر Next */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`
          flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium
          transition-all duration-200
          ${
            currentPage === totalPages
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 active:bg-gray-100"
          }
        `}
      >
        Next
      </button>
    </div>
  );
}
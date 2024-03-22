import React from "react";
import {
  MdNavigateNext,
  MdNavigateBefore,
  MdFirstPage,
  MdLastPage,
} from "react-icons/md";
import "@styles/Pagination.css";
import { usePokemonPaginationContext } from "../context/PaginationContext";

const Pagination = () => {
  const {
    currentPage,
    totalPages,
    setCurrentPage,
    loading,
  } = usePokemonPaginationContext();

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const renderPaginationButtons = () => {
    const buttons = [];
    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, startPage + 4);

    for (let page = startPage; page <= endPage; page++) {
      buttons.push(
        <button
          key={page}
          onClick={() => handlePageChange(page)}
          className={currentPage === page ? "active" : ""}
        >
          {page}
        </button>
      );
    }

    return buttons;
  };

  return (
    <div className="pagination">
      <MdFirstPage
      className="icon-pagination"
        onClick={() => handlePageChange(1)}
        disabled={currentPage === 1 || loading}
        size={40}
      />
      <MdNavigateBefore
      className="icon-pagination"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1 || loading}
        size={40}
      />
      {renderPaginationButtons()}
      <MdNavigateNext
      className="icon-pagination"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages || loading}
        size={40}
      />
      <MdLastPage
      className="icon-pagination"
        onClick={() => handlePageChange(totalPages)}
        disabled={currentPage === totalPages || loading}
        size={40}
      />
    </div>
  );
};

export default Pagination;

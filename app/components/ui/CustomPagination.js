import React, { useEffect, useMemo, useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from "./pagination";

const CustomPagination = ({
  totalRecords,
  pageSize = 9,
  onPageChange,
  initialPage = 1,
  className,
}) => {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const totalPages = useMemo(
    () => Math.ceil(totalRecords / pageSize),
    [totalRecords, pageSize]
  );

  useEffect(() => {
    onPageChange?.(currentPage);
  }, [currentPage, onPageChange]);

  const getPageNumbers = () => {
    const delta = 1;
    const pages = [];

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      pages.push(i);
    }

    if (currentPage - delta > 2) pages.unshift("...");
    if (currentPage + delta < totalPages - 1) pages.push("...");

    pages.unshift(1);
    if (totalPages > 1) pages.push(totalPages);

    return pages;
  };

  if (totalPages <= 1) return null;

  return (
    <div className={`mt-8 ${className}`}>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
              className={
                currentPage === 1 ? "pointer-events-none opacity-50" : ""
              }
            />
          </PaginationItem>

          {getPageNumbers().map((page, idx) => (
            <PaginationItem key={idx}>
              {page === "..." ? (
                <PaginationEllipsis />
              ) : (
                <PaginationLink
                  isActive={page === currentPage}
                  onClick={() => setCurrentPage(page)}
                  className={
                    page === currentPage ? "bg-[hsl(var(--primary))]" : ""
                  }
                >
                  {page}
                </PaginationLink>
              )}
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationNext
              onClick={() =>
                currentPage < totalPages && setCurrentPage(currentPage + 1)
              }
              className={
                currentPage === totalPages
                  ? "pointer-events-none opacity-50"
                  : ""
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default CustomPagination;

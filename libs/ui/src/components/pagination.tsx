import { cn } from "@reactive-resume/utils";
import { CaretLeft, CaretRight, DotsThree } from "@phosphor-icons/react";
import { forwardRef } from "react";

import { Button } from "./button";

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  showFirstLast?: boolean;
  showPrevNext?: boolean;
  maxVisiblePages?: number;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export const Pagination = forwardRef<HTMLDivElement, PaginationProps>(
  (
    {
      currentPage,
      totalPages,
      onPageChange,
      showFirstLast = true,
      showPrevNext = true,
      maxVisiblePages = 5,
      className,
      size = "md",
      ...props
    },
    ref
  ) => {
    if (totalPages <= 1) return null;

    const getVisiblePages = () => {
      const pages: (number | string)[] = [];
      const halfVisible = Math.floor(maxVisiblePages / 2);
      
      let startPage = Math.max(1, currentPage - halfVisible);
      let endPage = Math.min(totalPages, currentPage + halfVisible);

      // Adjust if we're near the beginning or end
      if (currentPage <= halfVisible) {
        endPage = Math.min(totalPages, maxVisiblePages);
      }
      if (currentPage > totalPages - halfVisible) {
        startPage = Math.max(1, totalPages - maxVisiblePages + 1);
      }

      // Add first page and ellipsis if needed
      if (startPage > 1) {
        pages.push(1);
        if (startPage > 2) {
          pages.push("...");
        }
      }

      // Add visible pages
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      // Add ellipsis and last page if needed
      if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
          pages.push("...");
        }
        pages.push(totalPages);
      }

      return pages;
    };

    const visiblePages = getVisiblePages();

    const sizeClasses = {
      sm: "h-8 px-3 text-xs",
      md: "h-9 px-4 text-sm",
      lg: "h-10 px-5 text-base",
    };

    return (
      <div
        ref={ref}
        className={cn("flex items-center justify-center gap-1", className)}
        {...props}
      >
        {/* First Page Button */}
        {showFirstLast && currentPage > 1 && (
          <Button
            variant="outline"
            size="icon"
            onClick={() => onPageChange(1)}
            className={cn(sizeClasses[size])}
            aria-label="Go to first page"
          >
            <CaretLeft className="h-4 w-4" />
            <CaretLeft className="h-4 w-4 -ml-2" />
          </Button>
        )}

        {/* Previous Page Button */}
        {showPrevNext && currentPage > 1 && (
          <Button
            variant="outline"
            size="icon"
            onClick={() => onPageChange(currentPage - 1)}
            className={cn(sizeClasses[size])}
            aria-label="Go to previous page"
          >
            <CaretLeft className="h-4 w-4" />
          </Button>
        )}

        {/* Page Numbers */}
        {visiblePages.map((page, index) => {
          if (page === "...") {
            return (
              <div
                key={`ellipsis-${index}`}
                className={cn(
                  "flex items-center justify-center",
                  sizeClasses[size]
                )}
              >
                <DotsThree className="h-4 w-4" />
              </div>
            );
          }

          const pageNumber = page as number;
          const isActive = pageNumber === currentPage;

          return (
            <Button
              key={pageNumber}
              variant={isActive ? "primary" : "outline"}
              size="icon"
              onClick={() => onPageChange(pageNumber)}
              className={cn(
                sizeClasses[size],
                isActive && "bg-primary text-primary-foreground"
              )}
              aria-label={`Go to page ${pageNumber}`}
              aria-current={isActive ? "page" : undefined}
            >
              {pageNumber}
            </Button>
          );
        })}

        {/* Next Page Button */}
        {showPrevNext && currentPage < totalPages && (
          <Button
            variant="outline"
            size="icon"
            onClick={() => onPageChange(currentPage + 1)}
            className={cn(sizeClasses[size])}
            aria-label="Go to next page"
          >
            <CaretRight className="h-4 w-4" />
          </Button>
        )}

        {/* Last Page Button */}
        {showFirstLast && currentPage < totalPages && (
          <Button
            variant="outline"
            size="icon"
            onClick={() => onPageChange(totalPages)}
            className={cn(sizeClasses[size])}
            aria-label="Go to last page"
          >
            <CaretRight className="h-4 w-4" />
            <CaretRight className="h-4 w-4 -ml-2" />
          </Button>
        )}
      </div>
    );
  }
);

Pagination.displayName = "Pagination";

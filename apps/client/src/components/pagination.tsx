import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (pageNumber: number) => void;
  onNextPage: () => void;
  onPrevPage: () => void;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  isLoading?: boolean;
  className?: string;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
  onNextPage,
  onPrevPage,
  hasNextPage,
  hasPreviousPage,
  isLoading = false,
  className = '',
}) => {
  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push('...');
        pageNumbers.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pageNumbers.push(1);
        pageNumbers.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pageNumbers.push(i);
        }
      } else {
        pageNumbers.push(1);
        pageNumbers.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push('...');
        pageNumbers.push(totalPages);
      }
    }
    
    return pageNumbers;
  };

  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className={`flex justify-end px-6 py-4 bg-secondary/5 border-t border-secondary/20 ${className}`}>
      {/* <div className="text-sm text-primary/70">
        Page {currentPage} of {totalPages}
      </div> */}
      
      <div className="flex items-center space-x-2">
        {/* Previous Button */}
        <button
          onClick={onPrevPage}
          disabled={!hasPreviousPage || isLoading}
          className="px-3 py-2 text-sm font-medium text-primary bg-white border border-secondary/20 rounded-md hover:bg-secondary/5 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Previous
        </button>
        
        {/* Page Numbers */}
        <div className="flex items-center space-x-1">
          {getPageNumbers().map((pageNumber, index) => (
            <button
              key={index}
              onClick={() => typeof pageNumber === 'number' ? onPageChange(pageNumber) : null}
              disabled={pageNumber === '...' || isLoading}
              className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                pageNumber === currentPage
                  ? 'bg-primary text-white'
                  : pageNumber === '...'
                  ? 'text-primary/50 cursor-default'
                  : 'text-primary bg-white border border-secondary/20 hover:bg-secondary/5'
              }`}
            >
              {pageNumber}
            </button>
          ))}
        </div>
        
        {/* Next Button */}
        <button
          onClick={onNextPage}
          disabled={!hasNextPage || isLoading}
          className="px-3 py-2 text-sm font-medium text-primary bg-white border border-secondary/20 rounded-md hover:bg-secondary/5 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Next
        </button>
      </div>
      
      {/* Items per page info */}
      {/* <div className="text-sm text-primary/70">
        {itemsPerPage} items per page
      </div> */}
    </div>
  );
}; 
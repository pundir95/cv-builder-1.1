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
export declare const Pagination: import('react').ForwardRefExoticComponent<PaginationProps & import('react').RefAttributes<HTMLDivElement>>;

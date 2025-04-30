export declare const useBreakpoint: () => {
    breakpoint: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | null;
    minWidth: number | null;
    maxWidth: number | null | undefined;
    isMobile: boolean;
    isTablet: boolean;
    isDesktop: boolean;
    devicePixelRatio: number;
};

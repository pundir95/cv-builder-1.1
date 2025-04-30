import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";
export declare const ScrollArea: import('react').ForwardRefExoticComponent<Omit<ScrollAreaPrimitive.ScrollAreaProps & import('react').RefAttributes<HTMLDivElement>, "ref"> & {
    allowOverflow?: boolean;
    hideScrollbar?: boolean;
    orientation?: "vertical" | "horizontal";
} & import('react').RefAttributes<HTMLDivElement>>;
export declare const ScrollBar: import('react').ForwardRefExoticComponent<Omit<ScrollAreaPrimitive.ScrollAreaScrollbarProps & import('react').RefAttributes<HTMLDivElement>, "ref"> & import('react').RefAttributes<HTMLDivElement>>;

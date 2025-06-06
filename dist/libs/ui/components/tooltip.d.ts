import * as TooltipPrimitive from "@radix-ui/react-tooltip";
export declare const TooltipProvider: import('react').FC<TooltipPrimitive.TooltipProviderProps>;
export declare const TooltipRoot: import('react').FC<TooltipPrimitive.TooltipProps>;
export declare const TooltipTrigger: import('react').ForwardRefExoticComponent<TooltipPrimitive.TooltipTriggerProps & import('react').RefAttributes<HTMLButtonElement>>;
export declare const TooltipContent: import('react').ForwardRefExoticComponent<Omit<TooltipPrimitive.TooltipContentProps & import('react').RefAttributes<HTMLDivElement>, "ref"> & import('react').RefAttributes<HTMLDivElement>>;
type TooltipProps = React.ComponentPropsWithoutRef<typeof TooltipContent> & {
    content: React.ReactNode;
};
export declare const Tooltip: ({ content, children, ...props }: TooltipProps) => import("react/jsx-runtime").JSX.Element;
export {};

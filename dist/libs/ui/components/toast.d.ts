import { VariantProps } from 'class-variance-authority';
import * as ToastPrimitives from "@radix-ui/react-toast";
export declare const ToastProvider: import('react').FC<ToastPrimitives.ToastProviderProps>;
export declare const ToastViewport: import('react').ForwardRefExoticComponent<Omit<ToastPrimitives.ToastViewportProps & import('react').RefAttributes<HTMLOListElement>, "ref"> & import('react').RefAttributes<HTMLOListElement>>;
export declare const Toast: import('react').ForwardRefExoticComponent<Omit<ToastPrimitives.ToastProps & import('react').RefAttributes<HTMLLIElement>, "ref"> & VariantProps<(props?: ({
    variant?: "error" | "default" | "primary" | "secondary" | "warning" | "info" | "success" | null | undefined;
} & import('class-variance-authority/dist/types').ClassProp) | undefined) => string> & import('react').RefAttributes<HTMLLIElement>>;
export declare const ToastAction: import('react').ForwardRefExoticComponent<Omit<ToastPrimitives.ToastActionProps & import('react').RefAttributes<HTMLButtonElement>, "ref"> & import('react').RefAttributes<HTMLButtonElement>>;
export declare const ToastClose: import('react').ForwardRefExoticComponent<Omit<ToastPrimitives.ToastCloseProps & import('react').RefAttributes<HTMLButtonElement>, "ref"> & import('react').RefAttributes<HTMLButtonElement>>;
export declare const ToastTitle: import('react').ForwardRefExoticComponent<Omit<ToastPrimitives.ToastTitleProps & import('react').RefAttributes<HTMLDivElement>, "ref"> & import('react').RefAttributes<HTMLDivElement>>;
export declare const ToastDescription: import('react').ForwardRefExoticComponent<Omit<ToastPrimitives.ToastDescriptionProps & import('react').RefAttributes<HTMLDivElement>, "ref"> & import('react').RefAttributes<HTMLDivElement>>;
export type ToastProps = React.ComponentPropsWithoutRef<typeof Toast>;
export type ToastActionElement = React.ReactElement<typeof ToastAction>;

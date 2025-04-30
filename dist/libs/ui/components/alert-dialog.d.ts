import { ButtonProps } from './button';
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";
export declare const AlertDialog: import('react').FC<AlertDialogPrimitive.AlertDialogProps>;
export declare const AlertDialogTrigger: import('react').ForwardRefExoticComponent<AlertDialogPrimitive.AlertDialogTriggerProps & import('react').RefAttributes<HTMLButtonElement>>;
export declare const AlertDialogPortal: {
    (props: AlertDialogPrimitive.AlertDialogPortalProps): import("react/jsx-runtime").JSX.Element;
    displayName: string | undefined;
};
export declare const AlertDialogOverlay: import('react').ForwardRefExoticComponent<Omit<AlertDialogPrimitive.AlertDialogOverlayProps & import('react').RefAttributes<HTMLDivElement>, "ref"> & import('react').RefAttributes<HTMLDivElement>>;
export declare const AlertDialogContent: import('react').ForwardRefExoticComponent<Omit<AlertDialogPrimitive.AlertDialogContentProps & import('react').RefAttributes<HTMLDivElement>, "ref"> & import('react').RefAttributes<HTMLDivElement>>;
export declare const AlertDialogHeader: {
    ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>): import("react/jsx-runtime").JSX.Element;
    displayName: string;
};
export declare const AlertDialogFooter: {
    ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>): import("react/jsx-runtime").JSX.Element;
    displayName: string;
};
export declare const AlertDialogTitle: import('react').ForwardRefExoticComponent<Omit<AlertDialogPrimitive.AlertDialogTitleProps & import('react').RefAttributes<HTMLHeadingElement>, "ref"> & import('react').RefAttributes<HTMLHeadingElement>>;
export declare const AlertDialogDescription: import('react').ForwardRefExoticComponent<Omit<AlertDialogPrimitive.AlertDialogDescriptionProps & import('react').RefAttributes<HTMLParagraphElement>, "ref"> & import('react').RefAttributes<HTMLParagraphElement>>;
export declare const AlertDialogAction: import('react').ForwardRefExoticComponent<Omit<AlertDialogPrimitive.AlertDialogActionProps & import('react').RefAttributes<HTMLButtonElement>, "ref"> & {
    variant?: ButtonProps["variant"];
} & import('react').RefAttributes<HTMLButtonElement>>;
export declare const AlertDialogCancel: import('react').ForwardRefExoticComponent<Omit<AlertDialogPrimitive.AlertDialogCancelProps & import('react').RefAttributes<HTMLButtonElement>, "ref"> & import('react').RefAttributes<HTMLButtonElement>>;

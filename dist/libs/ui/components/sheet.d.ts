import { VariantProps } from 'class-variance-authority';
import { sheetVariants } from '../variants/sheet';
import * as SheetPrimitive from "@radix-ui/react-dialog";
export declare const Sheet: import('react').FC<SheetPrimitive.DialogProps>;
export declare const SheetTrigger: import('react').ForwardRefExoticComponent<SheetPrimitive.DialogTriggerProps & import('react').RefAttributes<HTMLButtonElement>>;
export declare const SheetClose: import('react').ForwardRefExoticComponent<SheetPrimitive.DialogCloseProps & import('react').RefAttributes<HTMLButtonElement>>;
export declare const SheetPortal: {
    (props: SheetPrimitive.DialogPortalProps): import("react/jsx-runtime").JSX.Element;
    displayName: string | undefined;
};
export declare const SheetOverlay: import('react').ForwardRefExoticComponent<Omit<SheetPrimitive.DialogOverlayProps & import('react').RefAttributes<HTMLDivElement>, "ref"> & import('react').RefAttributes<HTMLDivElement>>;
export type SheetContentProps = {
    showClose?: boolean;
} & React.ComponentPropsWithoutRef<typeof SheetPrimitive.Content> & VariantProps<typeof sheetVariants>;
export declare const SheetContent: import('react').ForwardRefExoticComponent<{
    showClose?: boolean;
} & Omit<SheetPrimitive.DialogContentProps & import('react').RefAttributes<HTMLDivElement>, "ref"> & VariantProps<(props?: ({
    side?: "top" | "right" | "bottom" | "left" | null | undefined;
} & import('class-variance-authority/dist/types').ClassProp) | undefined) => string> & import('react').RefAttributes<HTMLDivElement>>;
export declare const SheetHeader: {
    ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>): import("react/jsx-runtime").JSX.Element;
    displayName: string;
};
export declare const SheetFooter: {
    ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>): import("react/jsx-runtime").JSX.Element;
    displayName: string;
};
export declare const SheetTitle: import('react').ForwardRefExoticComponent<Omit<SheetPrimitive.DialogTitleProps & import('react').RefAttributes<HTMLHeadingElement>, "ref"> & import('react').RefAttributes<HTMLHeadingElement>>;
export declare const SheetDescription: import('react').ForwardRefExoticComponent<Omit<SheetPrimitive.DialogDescriptionProps & import('react').RefAttributes<HTMLParagraphElement>, "ref"> & import('react').RefAttributes<HTMLParagraphElement>>;

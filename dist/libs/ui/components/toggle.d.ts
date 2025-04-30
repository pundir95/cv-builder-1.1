import { VariantProps } from 'class-variance-authority';
import * as TogglePrimitive from "@radix-ui/react-toggle";
export declare const Toggle: import('react').ForwardRefExoticComponent<Omit<TogglePrimitive.ToggleProps & import('react').RefAttributes<HTMLButtonElement>, "ref"> & VariantProps<(props?: ({
    variant?: "default" | "outline" | null | undefined;
    size?: "sm" | "md" | "lg" | null | undefined;
} & import('class-variance-authority/dist/types').ClassProp) | undefined) => string> & import('react').RefAttributes<HTMLButtonElement>>;

import { VariantProps } from 'class-variance-authority';
import { buttonVariants } from '../variants/button';
export type ButtonProps = {
    asChild?: boolean;
    loading?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<typeof buttonVariants>;
export declare const Button: import('react').ForwardRefExoticComponent<{
    asChild?: boolean;
    loading?: boolean;
} & import('react').ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<(props?: ({
    variant?: "error" | "link" | "primary" | "secondary" | "warning" | "info" | "success" | "outline" | "ghost" | null | undefined;
    size?: "sm" | "md" | "lg" | "icon" | null | undefined;
} & import('class-variance-authority/dist/types').ClassProp) | undefined) => string> & import('react').RefAttributes<HTMLButtonElement>>;

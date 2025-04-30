import { VariantProps } from 'class-variance-authority';
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group";
export declare const ToggleGroup: import('react').ForwardRefExoticComponent<(ToggleGroupPrimitive.ToggleGroupSingleProps | ToggleGroupPrimitive.ToggleGroupMultipleProps) & import('react').RefAttributes<HTMLDivElement>>;
export declare const ToggleGroupItem: import('react').ForwardRefExoticComponent<Omit<ToggleGroupPrimitive.ToggleGroupItemProps & import('react').RefAttributes<HTMLButtonElement>, "ref"> & VariantProps<(props?: ({
    variant?: "default" | "outline" | null | undefined;
    size?: "sm" | "md" | "lg" | null | undefined;
} & import('class-variance-authority/dist/types').ClassProp) | undefined) => string> & import('react').RefAttributes<HTMLButtonElement>>;

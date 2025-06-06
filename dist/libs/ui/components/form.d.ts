import { ControllerProps, FieldPath, FieldValues } from 'react-hook-form';
import type * as LabelPrimitive from "@radix-ui/react-label";
export declare const FormField: <TFieldValues extends FieldValues = FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>>({ ...props }: ControllerProps<TFieldValues, TName>) => import("react/jsx-runtime").JSX.Element;
export declare const FormItem: import('react').ForwardRefExoticComponent<import('react').HTMLAttributes<HTMLDivElement> & import('react').RefAttributes<HTMLDivElement>>;
export declare const FormLabel: import('react').ForwardRefExoticComponent<Omit<LabelPrimitive.LabelProps & import('react').RefAttributes<HTMLLabelElement>, "ref"> & import('react').RefAttributes<HTMLLabelElement>>;
export declare const FormControl: import('react').ForwardRefExoticComponent<Omit<import('@radix-ui/react-slot').SlotProps & import('react').RefAttributes<HTMLElement>, "ref"> & import('react').RefAttributes<HTMLElement>>;
export declare const FormDescription: import('react').ForwardRefExoticComponent<import('react').HTMLAttributes<HTMLParagraphElement> & import('react').RefAttributes<HTMLParagraphElement>>;
export declare const FormMessage: import('react').ForwardRefExoticComponent<import('react').HTMLAttributes<HTMLParagraphElement> & import('react').RefAttributes<HTMLParagraphElement>>;
export { FormProvider as Form } from 'react-hook-form';

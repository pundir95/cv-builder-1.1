import { FieldPath, FieldValues } from 'react-hook-form';
type FormFieldContextValue<TFieldValues extends FieldValues = FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>> = {
    name: TName;
};
export declare const FormFieldContext: import('react').Context<FormFieldContextValue<FieldValues, string>>;
type FormItemContextValue = {
    id: string;
};
export declare const FormItemContext: import('react').Context<FormItemContextValue>;
export declare const useFormField: () => {
    invalid: boolean;
    isDirty: boolean;
    isTouched: boolean;
    isValidating: boolean;
    error?: import('react-hook-form').FieldError;
    id: string;
    name: string;
    formItemId: string;
    formDescriptionId: string;
    formMessageId: string;
};
export {};

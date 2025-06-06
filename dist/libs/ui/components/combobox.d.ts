export type ComboboxOption = {
    value: string;
    label: React.ReactNode;
};
type ComboboxPropsSingle = {
    options: ComboboxOption[];
    emptyText?: string;
    clearable?: boolean;
    selectPlaceholder?: string;
    searchPlaceholder?: string;
    multiple?: false;
    value?: string;
    onValueChange?: (value: string) => void;
};
type ComboboxPropsMultiple = {
    options: ComboboxOption[];
    emptyText?: string;
    clearable?: boolean;
    selectPlaceholder?: string;
    searchPlaceholder?: string;
    multiple: true;
    value?: string[];
    onValueChange?: (value: string[]) => void;
};
export type ComboboxProps = ComboboxPropsSingle | ComboboxPropsMultiple;
export declare const Combobox: import('react').ForwardRefExoticComponent<ComboboxProps & import('react').RefAttributes<HTMLInputElement>>;
export {};

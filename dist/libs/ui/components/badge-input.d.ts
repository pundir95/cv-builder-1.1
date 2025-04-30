import { Dispatch, SetStateAction } from 'react';
import { InputProps } from './input';
export declare const BadgeInput: import('react').ForwardRefExoticComponent<Omit<InputProps, "value" | "onChange"> & {
    value: string[];
    onChange: (value: string[]) => void;
    setPendingKeyword?: Dispatch<SetStateAction<string>>;
} & import('react').RefAttributes<HTMLInputElement>>;

import { Dispatch, SetStateAction } from 'react';
type Theme = "system" | "dark" | "light";
type UseThemeOutput = {
    theme: Theme;
    isDarkMode: boolean;
    toggleTheme: () => void;
    setTheme: Dispatch<SetStateAction<Theme>>;
};
export declare const useTheme: () => UseThemeOutput;
export {};

import { type Dispatch, type SetStateAction, useEffect, useState } from "react";
import { useLocalStorage, useMediaQuery } from "usehooks-ts";

const COLOR_SCHEME_QUERY = "(prefers-color-scheme: light)";

type Theme = "system" | "dark" | "light";

type UseThemeOutput = {
  theme: Theme;
  isDarkMode: boolean;
  toggleTheme: () => void;
  setTheme: Dispatch<SetStateAction<Theme>>;
};

export const useTheme = (): UseThemeOutput => {
  const isDarkOS = useMediaQuery(COLOR_SCHEME_QUERY);
  const [isDarkMode, setDarkMode] = useState<boolean>(false);
  const [theme, setTheme] = useLocalStorage<Theme>("theme", "light");

  useEffect(() => {
    setTheme("light");
  }, [theme]);

  useEffect(() => {
  
  }, [theme, isDarkOS]);

  function toggleTheme() {
    const toggleDict: Record<Theme, Theme> = {
      light: "light",
      system: "light",
      dark: "light",
    };

    setTheme("light");
  }

  return {
    theme,
    setTheme,
    isDarkMode,
    toggleTheme,
  };
};

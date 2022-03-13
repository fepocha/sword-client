import { useState, createContext, useContext, useRef, useEffect } from 'react';
import { useFetcher } from 'remix';
import { WithChildren } from '~/types';

enum Theme {
  DARK = 'dark',
  LIGHT = 'light'
}
const themes = Object.values(Theme);
const THEME_STORAGE_KEY = 'wordssay-theme';

interface ThemeContextType {
  theme: Theme | null;
  isDarkmode: boolean;
  toggleTheme: () => void;
}
interface SsrThemeProps {
  ssrTheme: Theme;
}

const isTheme = (value: unknown): value is Theme => (
  typeof value === 'string' && themes.includes(value as Theme)
);

const useTheme = ({ ssrTheme }: SsrThemeProps): ThemeContextType => {
  const [theme, setTheme] = useState<Theme>(ssrTheme);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === Theme.DARK ? Theme.LIGHT : Theme.DARK);
  };

  const persistTheme = useFetcher();

  const persistThemeRef = useRef(persistTheme);
  useEffect(() => {
    persistThemeRef.current = persistTheme;
  }, [persistTheme]);

  const isMounted = useRef(false);

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      return;
    }
    if (!theme) return;

    persistThemeRef.current.submit({ [THEME_STORAGE_KEY]: theme }, { action: 'action/set-theme', method: 'post' });
  }, [theme]);

  return {
    theme,
    toggleTheme,
    isDarkmode: theme === Theme.DARK,
  };
};

const ThemeContext = createContext<null | ThemeContextType>(null);

function ThemeProvider({ children, ssrTheme }: WithChildren<SsrThemeProps>) {
  const themeContextValue = useTheme({ ssrTheme });

  return (
    <ThemeContext.Provider value={themeContextValue}>
      {children}
    </ThemeContext.Provider>
  );
}

const useThemeContext = () => {
  const context = useContext(ThemeContext);

  if (context === null) {
    throw new Error('useThemeContext should be used within a ThemeProvider');
  }

  return context;
};

export { isTheme, Theme, THEME_STORAGE_KEY,ThemeProvider, useThemeContext };

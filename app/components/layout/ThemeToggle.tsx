import { ChangeEvent, useEffect, useState } from "react"
import { LocalStorage } from "~/utils/local-storage";

const THEME_STORAGE_KEY = 'wordssay-theme';
const THEME = {
  DARK: 'dark',
  LIGHT: 'light',
} as const;

const DarkmodeStorage = LocalStorage(THEME_STORAGE_KEY);

export function ThemeToggle() {
  const [isDarkmode, setIsDarkmode] = useState(false);

  useEffect(() => {
    setIsDarkmode(
      DarkmodeStorage.get()
        ? DarkmodeStorage.get() === THEME.DARK
        : window.matchMedia('(prefers-color-scheme: dark)').matches
    );
  }, []);

  useEffect(() => {
    if (isDarkmode) {
      document.documentElement.classList.add(THEME.DARK);
      DarkmodeStorage.set(THEME.DARK);
    } else {
      document.documentElement.classList.remove(THEME.DARK);
      DarkmodeStorage.set(THEME.LIGHT);
    }
  }, [isDarkmode]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIsDarkmode(e.target.checked);
  };

  return (
    <div>
      <label htmlFor="themeToggle">
        {isDarkmode ? 'Dark' : 'Light'}
        <input
          id="themeToggle"
          type="checkbox"
          checked={isDarkmode}
          onChange={handleChange}
        />
      </label>
    </div>
  )
}

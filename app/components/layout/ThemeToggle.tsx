import { useThemeContext } from '~/context/theme';
import { MoonIcon, SunIcon } from '@heroicons/react/outline';

export function ThemeToggle() {
  const { isDarkmode, toggleTheme } = useThemeContext();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="text-black-dark w-6 h-6"
    >
      {isDarkmode ? <MoonIcon className="w-full h-full"/> : <SunIcon className="w-full h-full"/>}
    </button>
  );
}

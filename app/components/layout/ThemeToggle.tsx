import { useThemeContext } from '~/context/theme';

export function ThemeToggle() {
  const { isDarkmode, toggleTheme } = useThemeContext();

  return (
    <div>
      <button type="button" onClick={toggleTheme}>
        {isDarkmode ? 'Dark' : 'Light'}
      </button>
    </div>
  );
}

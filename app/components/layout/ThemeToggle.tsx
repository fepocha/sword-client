import { useDarkmode } from "~/hooks/use-darkmode";

export function ThemeToggle() {
  const {isDarkmode, toggleDarkmode} = useDarkmode();

  return (
    <div>
      <label htmlFor="themeToggle">
        {isDarkmode ? 'Dark' : 'Light'}
        <input
          id="themeToggle"
          type="checkbox"
          checked={isDarkmode}
          onChange={toggleDarkmode}
        />
      </label>
    </div>
  )
}

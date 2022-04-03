import { NavLink, Outlet } from 'remix';
import { ThemeToggle } from '~/components/layout/ThemeToggle';

export default function Layout() {
  return (
    <div className="root-container">
      <header className="flex border-b-[1px] justify-between items-center px-[20px]">
        <nav>
          <ul>
            <li>
              <NavLink
                to="/word/new"
                prefetch="intent"
                className={({ isActive }) => isActive ? 'active-menu' : ''}
              >
                Add a new word
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/word/random"
                prefetch="intent"
                className={({ isActive }) => isActive ? 'active-menu' : ''}
              >
                Play Games
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/tutorial"
                prefetch="intent"
                className={({ isActive }) => isActive ? 'active-menu' : ''}
              >
                Tutorial
              </NavLink>
            </li>
          </ul>
        </nav>
        <h1>Wordssay</h1>
        <ThemeToggle />
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

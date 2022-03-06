import { NavLink, Outlet } from "remix";
import { ThemeToggle } from "~/components/layout/ThemeToggle";

export default function Layout() {
  return (
    <div className="w-full min-h-screen bg-white-light text-black-dark">
      <header>
        <h1>Wordssay</h1>
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
        <ThemeToggle />
      </header>
      <main>
        <Outlet />
      </main>
      <footer>Footer</footer>
    </div>
  );
}

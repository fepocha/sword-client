import { NavLink, Outlet } from "remix";

export default function Layout() {
  return (
    <>
      <header>
        <h1>SWORD</h1>
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
      </header>
      <main>
        <Outlet />
      </main>
      <footer>Footer</footer>
    </>
  );
}

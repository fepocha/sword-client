import { NavLink , Outlet } from 'remix';
import { Navigation } from '~/components/layout/Navigation';
import { ThemeToggle } from '~/components/layout/ThemeToggle';

export default function Layout() {
  return (
    <div className="root-container">
      <header className="fixed top-0 left-0 w-full h-header flex border-b-[1px] border-gray-light justify-between items-center px-[20px] z-50">
        <Navigation />
        <h1>
          <NavLink
            to="/word/random"
            prefetch="intent"
          >
            Wordssay
          </NavLink>
        </h1>
        <ThemeToggle />
      </header>
      <main className="pt-header">
        <Outlet />
      </main>
    </div>
  );
}

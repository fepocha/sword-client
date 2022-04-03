import { NavLink , Outlet } from 'remix';
import { NavigationMenu } from '~/components/layout/NavigationMenu';
import { ThemeToggle } from '~/components/layout/ThemeToggle';

export default function Layout() {
  return (
    <div className="root-container">
      <header className="fixed top-0 left-0 w-full h-header flex border-b-[1px] border-gray-light justify-between items-center px-[20px] z-50">
        <NavigationMenu />
        <h1 className="text-md">
          <NavLink
            to="/word/random"
            prefetch="intent"
          >
            Words&apos;say
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

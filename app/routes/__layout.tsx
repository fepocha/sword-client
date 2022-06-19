import { NavLink , Outlet } from 'remix';
import { NavigationMenu } from '~/components/layout/NavigationMenu';
import { ThemeToggle } from '~/components/layout/ThemeToggle';
import { DialogProvider } from '~/context/dialog';
import { ToastProvider } from '~/context/toast';

export default function Layout() {
  return (
    <div className="root-container">
      <header className="fixed top-0 left-0 w-full h-header-height flex border-b-[1px] border-gray-light justify-between items-center px-[20px] z-50">
        <NavigationMenu />
        <div className="text-md">
          <NavLink
            to="/play"
            prefetch="intent"
          >
            Word&apos;s Say
          </NavLink>
        </div>
        <ThemeToggle />
      </header>
      <main className="pt-header-height">
        <DialogProvider>
          <ToastProvider>
            <Outlet />
          </ToastProvider>
        </DialogProvider>
      </main>
    </div>
  );
}

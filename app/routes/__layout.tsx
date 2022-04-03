import { Outlet } from 'remix';
import { Navigation } from '~/components/layout/Navigation';
import { ThemeToggle } from '~/components/layout/ThemeToggle';

export default function Layout() {
  return (
    <div className="root-container">
      <header className="flex border-b-[1px] justify-between items-center px-[20px]">
        <Navigation />
        <h1>Wordssay</h1>
        <ThemeToggle />
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

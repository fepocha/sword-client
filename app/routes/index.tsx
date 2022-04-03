import { NavLink } from '@remix-run/react';
import TypewriterText from '~/components/Text/TypewriterText';

export default function Index() {
  return (
    <section className="main-container">
      <div className="flex flex-col justify-center items-center min-h-screen">
        <div className="py-10">
          <TypewriterText type="h1" className="text-2xl sm:text-4xl lg:text-5xl">
            Welcome to <span className="text-orange-light">Words-say</span>
          </TypewriterText>
        </div>
        <div className="py-3">
          <NavLink
            to="/word/random"
            prefetch="intent"
            className={({ isActive }) => (isActive ? 'active-menu' : '')}
          >
            Play Games
          </NavLink>
        </div>
      </div>
    </section>
  );
}

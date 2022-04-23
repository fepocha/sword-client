import { NavLink } from '@remix-run/react';
import TypewriterText from '~/components/Text/TypewriterText';
import classNames from 'classnames';

export default function Index() {
  return (
    <section className="root-container">
      <div className="flex flex-col justify-center items-center min-h-screen">
        <div className="py-10">
          <TypewriterText type="h1" className="text-2xl sm:text-4xl lg:text-5xl">
            Welcome to <span className="text-orange-light">Word&apos;s say</span>
          </TypewriterText>
        </div>
        <div className="py-3">
          <NavLink
            to="/play"
            prefetch="intent"
            className={({ isActive }) => classNames({ 'active-menu': isActive })}
          >
            Play Games
          </NavLink>
        </div>
      </div>
    </section>
  );
}

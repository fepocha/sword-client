import classNames from 'classnames';
import { useState } from 'react';
import { NavLink  } from 'remix';

const NAVIGATION = [
  {
    path: '/word/new',
    displayName: 'Add a new word'
  },
  {
    path: '/word/random',
    displayName: 'Play Games'
  },
  {
    path: '/tutorial',
    displayName: 'Tutorial'
  },
];

export function Navigation() {
  const [isExpanded, setExpanded] = useState(true);

  const handleMenuToggle = () => {
    setExpanded(prevExpanded => !prevExpanded);
  };

  return (
    <>
      <button type="button" onClick={handleMenuToggle}>Menu</button>
      {isExpanded && (
        <nav className="fixed top-header left-0 w-full z-10 bg-white-mid text-center h-[calc(100vh-theme(space.header))] py-10">
          <ul className="grid gap-8">
            {NAVIGATION.map(({ path, displayName }) => (
              <li key={path} className="text-2xl">
                <NavLink
                  to={path}
                  prefetch="intent"
                  className={({ isActive }) => classNames('relative', { 'after:absolute after:bottom-0 after:left-0 after:block after:w-full after:h-2 after:bg-orange-dark after:-z-10': isActive })}
                  onClick={handleMenuToggle}
              >
                  {displayName}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </>
  );
}

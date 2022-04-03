import classNames from 'classnames';
import { NavLink  } from 'remix';

export function Navigation() {
  return (
    <nav>
      <ul>
        <li>
          <NavLink
            to="/word/new"
            prefetch="intent"
            className={({ isActive }) => classNames({ 'active-menu': isActive })}
              >
            Add a new word
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/word/random"
            prefetch="intent"
            className={({ isActive }) => classNames({ 'active-menu': isActive })}
              >
            Play Games
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/tutorial"
            prefetch="intent"
            className={({ isActive }) => classNames({ 'active-menu': isActive })}
              >
            Tutorial
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

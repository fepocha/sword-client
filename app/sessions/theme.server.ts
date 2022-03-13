import { createCookieSessionStorage } from 'remix';
import { Theme, isTheme, THEME_STORAGE_KEY } from '~/context/theme';

const sessionSecret = process.env.SESSION_SECRET;

if (!sessionSecret) {
  throw new Error('SESSION_SECRET must be set');
}

const { getSession, commitSession } = createCookieSessionStorage({
  cookie: {
    name: 'wordssay-theme-session',
    httpOnly: true,
    path: '/',
    sameSite: 'lax',
    secrets: [sessionSecret],
    secure: true,
  },
});

export const getThemeSession = async (request: Request) => {
  const session = await getSession(request.headers.get('Cookie'));

  return {
    getTheme: () => {
      const themeValue = session.get(THEME_STORAGE_KEY);
      return isTheme(themeValue) ? themeValue : Theme.DARK;
    },
    setTheme: (theme: Theme) => session.set(THEME_STORAGE_KEY, theme),
    commit: () => commitSession(session),
  };
};

import { json, redirect } from 'remix';
import type { ActionFunction, LoaderFunction } from 'remix';

import { getThemeSession } from '~/sessions/theme.server';
import { isTheme, THEME_STORAGE_KEY } from '~/context/theme';

export const action: ActionFunction = async ({ request }) => {
  const themeSession = await getThemeSession(request);

  const requestText = await request.text();
  const form = new URLSearchParams(requestText);
  const theme = form.get(THEME_STORAGE_KEY);

  if (!isTheme(theme)) {
    return json(
      {
        success: false,
        message: `theme value of ${theme} is not a valid theme`,
      },
      { status: 500 }
    );
  }

  themeSession.setTheme(theme);
  return json(
    { success: true },
    {
      headers: { 'Set-Cookie': await themeSession.commit() }
    }
  )
};

export const loader: LoaderFunction = () => redirect('/', { status: 404 });

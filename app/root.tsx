import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData
} from 'remix';
import type { MetaFunction, LinksFunction, LoaderFunction } from 'remix';
import clsx from 'clsx';
import { getThemeSession } from '~/sessions/theme.server';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import styles from './styles/tailwind.css';
import { Theme, ThemeProvider, useThemeContext } from './context/theme';

type LoaderData = {
  theme: Theme;
};

const queryClient = new QueryClient();

export const meta: MetaFunction = () => ({ title: 'Wordssay' });
export const links: LinksFunction = () => [{ rel: 'stylesheet', href: styles }];

export const loader: LoaderFunction = async ({ request }) => {
  const themeSession = await getThemeSession(request);

  const data: LoaderData = {
    theme: themeSession.getTheme(),
  };

  return data;
};

function App() {
  const { theme } = useThemeContext();

  return (
    <html lang="ko" className={clsx(theme)}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <QueryClientProvider client={queryClient}>
          <Outlet />
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export default function AppWithProvider() {
  const data = useLoaderData<LoaderData>();

  return (
    <ThemeProvider ssrTheme={data.theme}>
      <App />
    </ThemeProvider>
  );
}

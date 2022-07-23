import React from 'react';
import { useLocation, useMatches } from '@remix-run/react';
import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration, useLoaderData } from 'remix';
import type { MetaFunction, LinksFunction, LoaderFunction } from 'remix';
import clsx from 'clsx';
import { getThemeSession } from '~/sessions/theme.server';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import PwaIcons from '~/components/PwaIcons';
import styles from './styles/tailwind.css';
import { Theme, ThemeProvider, useThemeContext } from './context/theme';

let isMount = true;
type LoaderData = { theme: Theme; ENV: Record<string, string | undefined> };
const queryClient = new QueryClient();
export const meta: MetaFunction = () => ({ title: 'Wordssay' });
export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: styles },
  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  {
    rel: 'preconnect',
    href: 'https://fonts.gstatic.com',
    crossOrigin: 'anonymous',
  },
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Special+Elite&display=swap',
  },
];
export const loader: LoaderFunction = async ({ request }) => {
  const themeSession = await getThemeSession(request);
  const data: LoaderData = {
    theme: themeSession.getTheme(),
    ENV: { API_BASE_URL: process.env.API_BASE_URL },
  };
  return data;
};
function App() {
  const { theme } = useThemeContext();
  const { ENV } = useLoaderData();
  const location = useLocation();
  const matches = useMatches();

  React.useEffect(() => {
    const mounted = isMount;
    isMount = false;
    if ('serviceWorker' in navigator) {
      if (navigator.serviceWorker.controller) {
        navigator.serviceWorker.controller?.postMessage({
          type: 'REMIX_NAVIGATION',
          isMount: mounted,
          location,
          matches,
          manifest: window.__remixManifest,
        });
      } else {
        const listener = async () => {
          await navigator.serviceWorker.ready;
          navigator.serviceWorker.controller?.postMessage({
            type: 'REMIX_NAVIGATION',
            isMount: mounted,
            location,
            matches,
            manifest: window.__remixManifest,
          });
        };
        navigator.serviceWorker.addEventListener('controllerchange', listener);
        return () => {
          navigator.serviceWorker.removeEventListener('controllerchange', listener);
        };
      }
    }
  }, [location]);

  return (
    <html lang="ko" className={clsx(theme)}>
      <head>
        <PwaIcons />
        <link rel="manifest" href="/resources/manifest.webmanifest" />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta /> <Links />
      </head>
      <body>
        <QueryClientProvider client={queryClient}>
          <Outlet /> <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
        <ScrollRestoration /> {/* eslint-disable-next-line react/no-danger */}
        <script
          dangerouslySetInnerHTML={{
            __html: `window.ENV = ${JSON.stringify(ENV)}`,
          }}
        />
        <Scripts /> <LiveReload />
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

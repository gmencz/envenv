import React from 'react';
import { FullpageLoader } from './components/fullpage-loader';
import { useIsUserLoggedInQuery } from './generated/graphql';
import { ThemeProvider } from 'styled-components';
import { lightTheme } from './utils/theme';

const AuthenticatedApp = React.lazy(() => import('./authenticated-app'));
const UnauthenticatedApp = React.lazy(() => import('./unauthenticated-app'));

export const App: React.FC = () => {
  const { data: auth } = useIsUserLoggedInQuery();

  return (
    <ThemeProvider theme={lightTheme}>
      <React.Suspense fallback={<FullpageLoader />}>
        {auth?.isLoggedIn ? <AuthenticatedApp /> : <UnauthenticatedApp />}
      </React.Suspense>
    </ThemeProvider>
  );
};

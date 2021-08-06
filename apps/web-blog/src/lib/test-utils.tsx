import { render } from '@testing-library/react';
import * as React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { RouterContext } from 'next/dist/next-server/lib/router-context';
import { NextRouter } from 'next/router';

const mockRouter: NextRouter = {
  isReady: true,
  basePath: '',
  pathname: '/',
  route: '/',
  asPath: '/',
  query: {},
  push: jest.fn(() => Promise.resolve(true)),
  replace: jest.fn(() => Promise.resolve(true)),
  reload: jest.fn(() => Promise.resolve(true)),
  prefetch: jest.fn(() => Promise.resolve()),
  back: jest.fn(() => Promise.resolve(true)),
  beforePopState: jest.fn(() => Promise.resolve(true)),
  events: {
    on: jest.fn(),
    off: jest.fn(),
    emit: jest.fn(),
  },
  isFallback: false,
  isLocaleDomain: false,
  isPreview: false,
};

export const renderWithProviders = (component: React.ReactElement) => {
  const client = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return render(
    <RouterContext.Provider value={{ ...mockRouter }}>
      <QueryClientProvider client={client}>{component}</QueryClientProvider>
    </RouterContext.Provider>,
  );
};

export * from '@testing-library/react';

import React from 'react';
import { Provider } from 'react-redux';
import { Toaster } from 'sonner';

import { ClerkProvider } from '@clerk/clerk-react';

import { ThemeProvider } from './components/theme/theme-provider';
import { store } from './redux/store';

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error('Add your Clerk Publishable Key to the .env file');
}

function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Provider store={store}>
        <ThemeProvider defaultTheme="system" storageKey="alignify-theme">
          <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
            {children}
          </ClerkProvider>
          <Toaster />
        </ThemeProvider>
      </Provider>
    </>
  );
}

export default Providers;

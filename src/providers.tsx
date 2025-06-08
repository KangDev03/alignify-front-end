import React from 'react';
import { Provider } from 'react-redux';
import { Toaster } from 'sonner';

import { GoogleOAuthProvider } from '@react-oauth/google';

// import { ClerkProvider } from '@clerk/clerk-react';
import { ThemeProvider } from './components/theme/theme-provider';
import { store } from './redux/store';

// const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

// if (!PUBLISHABLE_KEY) {
//   throw new Error('Add your Clerk Publishable Key to the .env file');
// }
function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Provider store={store}>
        <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
          <ThemeProvider defaultTheme="system" storageKey="alignify-theme">
            {/* <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/"> */}
            {children}
            {/* </ClerkProvider> */}
            <Toaster />
          </ThemeProvider>
        </GoogleOAuthProvider>
      </Provider>
    </>
  );
}

export default Providers;

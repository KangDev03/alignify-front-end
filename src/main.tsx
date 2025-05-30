import './global.css';

import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';

import { GoogleOAuthProvider } from '@react-oauth/google';

import Providers from './providers';
import Router from './router';

const CLIENT_ID = '136808391187-o5vdain002hlpj62998pfs58ko3qa0sh.apps.googleusercontent.com';
createRoot(document.getElementById('root')!).render(
  <Providers>
    <GoogleOAuthProvider clientId={CLIENT_ID}>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </GoogleOAuthProvider>
  </Providers>,
);

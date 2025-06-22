import './global.css';

import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import { Buffer } from 'buffer';
import process from 'process';

import Providers from './providers';
import Router from './router';

(window as Window & typeof globalThis).Buffer = Buffer;
declare global {
  interface Window {
    process: typeof process;
  }
}
window.process = process;
createRoot(document.getElementById('root')!).render(
  <Providers>
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  </Providers>,
);

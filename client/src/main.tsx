import React from 'react';
import ReactDOM from 'react-dom/client';

import { ShopProvider } from './context/ShopContext.tsx';
import { AlertProvider } from './context/AlertContext.tsx';

import App from './App.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AlertProvider>
      <ShopProvider>
        <App />
      </ShopProvider>
    </AlertProvider>
  </React.StrictMode>
)

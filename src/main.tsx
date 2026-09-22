import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { CartProvider } from './context/CartContext';
import { CurrencyProvider } from './context/CurrencyContext';
import './styles/index.css';
import { WizzTechProtectionProvider } from "@wizztech/protection";
import "@wizztech/protection/dist/style.css";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <WizzTechProtectionProvider platformUrl={import.meta.env.VITE_WIZZTECH_PLATFORM_URL}>
      <CurrencyProvider>
        <CartProvider>
            <App />
        </CartProvider>
      </CurrencyProvider>
    </WizzTechProtectionProvider>
  </React.StrictMode>
);
import React, { createContext, useContext, useState, useEffect } from 'react';

export type Currency = 'PKR' | 'USD';

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  toggleCurrency: () => void;
  formatPrice: (priceUSD: number, pricePKR: number) => string;
  getRawPrice: (priceUSD: number, pricePKR: number) => number;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currency, setCurrencyState] = useState<Currency>(() => {
    const saved = localStorage.getItem('elhsan_currency');
    return (saved === 'USD' || saved === 'PKR') ? saved : 'PKR';
  });

  const setCurrency = (curr: Currency) => {
    setCurrencyState(curr);
    localStorage.setItem('elhsan_currency', curr);
  };

  const toggleCurrency = () => {
    setCurrency(currency === 'PKR' ? 'USD' : 'PKR');
  };

  const formatPrice = (priceUSD: number, pricePKR: number): string => {
    if (currency === 'PKR') {
      return `Rs ${pricePKR.toLocaleString()}`;
    }
    return `$${priceUSD.toFixed(0)}`;
  };

  const getRawPrice = (priceUSD: number, pricePKR: number): number => {
    return currency === 'PKR' ? pricePKR : priceUSD;
  };

  return (
    <CurrencyContext.Provider
      value={{
        currency,
        setCurrency,
        toggleCurrency,
        formatPrice,
        getRawPrice,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = (): CurrencyContextType => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};

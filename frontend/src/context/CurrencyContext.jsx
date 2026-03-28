import { createContext, useContext, useState } from "react";

const CurrencyContext = createContext();

export function CurrencyProvider({ children }) {
  const [currency, setCurrency] = useState("USD");

  const exchangeRate = 50;

  const convertPrice = (price) => {
    const numericPrice = Number(price || 0);

    if (currency === "EGP") {
      return numericPrice * exchangeRate;
    }

    return numericPrice;
  };

  const formatPrice = (price) => {
    const converted = convertPrice(price);

    return currency === "EGP"
      ? `E£${converted.toFixed(2)}`
      : `$${converted.toFixed(2)}`;
  };

  const toggleCurrency = () => {
    setCurrency((prev) => (prev === "USD" ? "EGP" : "USD"));
  };

  return (
    <CurrencyContext.Provider
      value={{ currency, toggleCurrency, convertPrice, formatPrice }}
    >
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  return useContext(CurrencyContext);
}
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { CartProvider } from "./context/CartContext";
import { ThemeProvider } from "./context/ThemeContext";
import { FavoritesProvider } from "./context/FavoritesContext";
import { LanguageProvider } from "./context/LanguageContext";
import { CurrencyProvider } from "./context/CurrencyContext";
import { CouponProvider } from "./context/CouponContext";
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <LanguageProvider>
      <ThemeProvider>
        <CurrencyProvider>
          <CouponProvider>
            <FavoritesProvider>
              <CartProvider>
                <Toaster position="top-right" />
                <App />
              </CartProvider>
            </FavoritesProvider>
          </CouponProvider>
        </CurrencyProvider>
      </ThemeProvider>
    </LanguageProvider>
  </React.StrictMode>
);
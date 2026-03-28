import { Link, useNavigate } from "react-router-dom";
import {
  FiShoppingCart,
  FiHeart,
  FiSearch,
  FiMoon,
  FiSun,
  FiMenu,
  FiX,
} from "react-icons/fi";
import { useCart } from "../context/CartContext";
import { useTheme } from "../context/ThemeContext";
import { useState } from "react";
import { useFavorites } from "../context/FavoritesContext";
import { useLanguage } from "../context/LanguageContext";
import { useCurrency } from "../context/CurrencyContext";

function Navbar() {
  const { cartCount } = useCart();
  const { theme, toggleTheme } = useTheme();
  const { favorites } = useFavorites();
  const { language, toggleLanguage } = useLanguage();
  const { currency, toggleCurrency } = useCurrency();

  const [searchTerm, setSearchTerm] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigate = useNavigate();

  const handleSearch = (e) => {
    if (e.key === "Enter" && searchTerm.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchTerm)}`);
      setIsMobileMenuOpen(false);
    }
  };

  const handleSearchClick = () => {
    if (searchTerm.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchTerm)}`);
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-[#e8dcc6] bg-white/95 shadow-sm backdrop-blur-md dark:border-[#2d4a63] dark:bg-[#0f172a]/95">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="text-2xl font-extrabold tracking-wide text-[#1e3a5f] dark:text-[#f8e7b0]"
        >
          Pharaoh <span className="text-[#c89b3c] dark:text-[#35c6c6]">Vault</span>
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          <Link
            to="/"
            className="text-sm font-semibold text-[#1f2937] hover:text-[#c89b3c] dark:text-white dark:hover:text-[#35c6c6]"
          >
            {language === "ar" ? "الرئيسية" : "Home"}
          </Link>
          <Link
            to="/products"
            className="text-sm font-semibold text-[#1f2937] hover:text-[#c89b3c] dark:text-white dark:hover:text-[#35c6c6]"
          >
            {language === "ar" ? "المنتجات" : "Products"}
          </Link>
          <Link
            to="/about"
            className="text-sm font-semibold text-[#1f2937] hover:text-[#c89b3c] dark:text-white dark:hover:text-[#35c6c6]"
          >
            {language === "ar" ? "من نحن" : "About"}
          </Link>
          <Link
            to="/contact"
            className="text-sm font-semibold text-[#1f2937] hover:text-[#c89b3c] dark:text-white dark:hover:text-[#35c6c6]"
          >
            {language === "ar" ? "تواصل معنا" : "Contact"}
          </Link>
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <div className="flex items-center rounded-full border border-[#ddd0b8] bg-[#f8f5ef] px-3 py-2 dark:border-[#35526b] dark:bg-[#132033]">
            <FiSearch className="mr-2 text-[#8b7355] dark:text-[#35c6c6]" />
            <input
              type="text"
              placeholder={language === "ar" ? "ابحثي..." : "Search..."}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleSearch}
              className="bg-transparent text-sm text-[#1f2937] outline-none placeholder:text-[#a08b6d] dark:text-white dark:placeholder:text-gray-400"
            />
          </div>

          <button
            onClick={toggleCurrency}
            className="rounded-full border border-[#ddd0b8] px-3 py-2 text-sm font-semibold text-[#1e3a5f] hover:bg-[#f8f5ef] dark:border-[#35526b] dark:text-[#f8e7b0] dark:hover:bg-[#132033]"
          >
            {currency}
          </button>

          <button
            onClick={toggleLanguage}
            className="rounded-full border border-[#ddd0b8] px-3 py-2 text-sm font-semibold text-[#1e3a5f] hover:bg-[#f8f5ef] dark:border-[#35526b] dark:text-[#f8e7b0] dark:hover:bg-[#132033]"
          >
            {language === "ar" ? "EN" : "AR"}
          </button>

          <button
            onClick={toggleTheme}
            className="rounded-full border border-[#ddd0b8] p-2 text-[#1e3a5f] hover:bg-[#f8f5ef] dark:border-[#35526b] dark:text-[#f8e7b0] dark:hover:bg-[#132033]"
          >
            {theme === "dark" ? <FiSun /> : <FiMoon />}
          </button>

          <Link
            to="/favorites"
            className="relative rounded-full border border-[#ddd0b8] p-2 text-[#1e3a5f] hover:bg-[#f8f5ef] dark:border-[#35526b] dark:text-[#f8e7b0] dark:hover:bg-[#132033]"
          >
            <FiHeart />
            {favorites.length > 0 && (
              <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-[#c89b3c] text-xs font-bold text-white dark:bg-[#35c6c6] dark:text-[#0f172a]">
                {favorites.length}
              </span>
            )}
          </Link>

          <Link
            to="/cart"
            className="relative rounded-full border border-[#ddd0b8] p-2 text-[#1e3a5f] hover:bg-[#f8f5ef] dark:border-[#35526b] dark:text-[#f8e7b0] dark:hover:bg-[#132033]"
          >
            <FiShoppingCart />
            {cartCount > 0 && (
              <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-[#c89b3c] text-xs font-bold text-white dark:bg-[#35c6c6] dark:text-[#0f172a]">
                {cartCount}
              </span>
            )}
          </Link>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="rounded-full border border-[#ddd0b8] p-2 text-[#1e3a5f] dark:border-[#35526b] dark:text-[#f8e7b0]"
          >
            {isMobileMenuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="border-t border-[#e8dcc6] bg-white px-4 py-4 dark:border-[#2d4a63] dark:bg-[#0f172a] md:hidden">
          <div className="mb-4 flex items-center rounded-2xl border border-[#ddd0b8] bg-[#f8f5ef] px-3 py-2 dark:border-[#35526b] dark:bg-[#132033]">
            <FiSearch className="mr-2 text-[#8b7355] dark:text-[#35c6c6]" />
            <input
              type="text"
              placeholder={language === "ar" ? "ابحثي..." : "Search..."}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleSearch}
              className="w-full bg-transparent text-sm text-[#1f2937] outline-none placeholder:text-[#a08b6d] dark:text-white dark:placeholder:text-gray-400"
            />
            <button
              onClick={handleSearchClick}
              className="ml-2 rounded-xl bg-[#1e3a5f] px-3 py-1 text-xs font-semibold text-white dark:bg-[#35c6c6] dark:text-[#0f172a]"
            >
              {language === "ar" ? "بحث" : "Go"}
            </button>
          </div>

          <div className="mb-4 flex flex-wrap gap-2">
            <button
              onClick={toggleLanguage}
              className="rounded-full border border-[#ddd0b8] px-3 py-2 text-xs font-semibold text-[#1e3a5f] dark:border-[#35526b] dark:text-[#f8e7b0]"
            >
              {language === "ar" ? "EN" : "AR"}
            </button>

            <button
              onClick={toggleCurrency}
              className="rounded-full border border-[#ddd0b8] px-3 py-2 text-xs font-semibold text-[#1e3a5f] dark:border-[#35526b] dark:text-[#f8e7b0]"
            >
              {currency}
            </button>

            <button
              onClick={toggleTheme}
              className="rounded-full border border-[#ddd0b8] p-2 text-[#1e3a5f] dark:border-[#35526b] dark:text-[#f8e7b0]"
            >
              {theme === "dark" ? <FiSun /> : <FiMoon />}
            </button>

            <Link
              to="/favorites"
              onClick={() => setIsMobileMenuOpen(false)}
              className="relative rounded-full border border-[#ddd0b8] p-2 text-[#1e3a5f] dark:border-[#35526b] dark:text-[#f8e7b0]"
            >
              <FiHeart />
              {favorites.length > 0 && (
                <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-[#c89b3c] text-xs font-bold text-white dark:bg-[#35c6c6] dark:text-[#0f172a]">
                  {favorites.length}
                </span>
              )}
            </Link>

            <Link
              to="/cart"
              onClick={() => setIsMobileMenuOpen(false)}
              className="relative rounded-full border border-[#ddd0b8] p-2 text-[#1e3a5f] dark:border-[#35526b] dark:text-[#f8e7b0]"
            >
              <FiShoppingCart />
              {cartCount > 0 && (
                <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-[#c89b3c] text-xs font-bold text-white dark:bg-[#35c6c6] dark:text-[#0f172a]">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>

          <div className="flex flex-col gap-3">
            <Link
              to="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-sm font-semibold text-[#1f2937] dark:text-white"
            >
              {language === "ar" ? "الرئيسية" : "Home"}
            </Link>
            <Link
              to="/products"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-sm font-semibold text-[#1f2937] dark:text-white"
            >
              {language === "ar" ? "المنتجات" : "Products"}
            </Link>
            <Link
              to="/about"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-sm font-semibold text-[#1f2937] dark:text-white"
            >
              {language === "ar" ? "من نحن" : "About"}
            </Link>
            <Link
              to="/contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-sm font-semibold text-[#1f2937] dark:text-white"
            >
              {language === "ar" ? "تواصل معنا" : "Contact"}
            </Link>
            <Link
              to="/playground"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-sm font-semibold text-[#1f2937] dark:text-white"
            >
              {language === "ar" ? "ساحة الألعاب" : "Playground"}
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
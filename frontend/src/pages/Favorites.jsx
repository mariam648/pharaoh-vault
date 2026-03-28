import Navbar from "../components/Navbar";
import { useFavorites } from "../context/FavoritesContext";
import { useCart } from "../context/CartContext";
import { useLanguage } from "../context/LanguageContext";
import { useCurrency } from "../context/CurrencyContext";
import EmptyState from "../components/EmptyState";

function Favorites() {
  const { favorites, toggleFavorite } = useFavorites();
  const { addToCart } = useCart();
  const { language } = useLanguage();
  const { formatPrice } = useCurrency();

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f8f5ef] via-white to-[#f3eadb] dark:from-[#0f172a] dark:via-[#132033] dark:to-[#1a2c44]">
      <Navbar />

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-10">
        <h1 className="mb-8 text-4xl font-extrabold text-[#1e3a5f] dark:text-[#f8e7b0]">
         {language === "ar" ? "المنتجات المفضلة" : "Favorite Products"}
        </h1>

        {favorites.length === 0 ? (
          <EmptyState
  title={language === "ar" ? "لا توجد مفضلات" : "No favorites yet"}
  description={
    language === "ar"
      ? "احفظي المنتجات التي أعجبتك هنا لتعودي إليها بسهولة."
      : "Save the products you love here and come back to them anytime."
  }
/>
        ) : (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-3">
            {favorites.map((product) => (
              <div
                key={product.id}
                className="overflow-hidden rounded-3xl border border-[#eadfcb] bg-white shadow-md dark:border-[#2d4a63] dark:bg-[#132033]"
              >
                <div className="flex h-72 w-full items-center justify-center bg-gradient-to-br from-[#f7f1e7] to-[#ebe3d2] p-4 dark:from-[#102038] dark:to-[#1c3552]">
                  <img
                    src={`/${product.image}`}
                    alt={language === "ar" ? product.name_ar : product.name_en}
                    className="h-full w-full object-contain"
                  />
                </div>

                <div className="p-5">
                  <h2 className="text-2xl font-bold text-[#1f2937] dark:text-white">
                    {language === "ar" ? product.name_ar : product.name_en}
                  </h2>

                  <p className="mt-3 text-sm leading-6 text-gray-600 dark:text-gray-300">
                 {language === "ar" ? product.description_ar : product.description_en}
                  </p>

                  <div className="mt-4 flex items-center gap-3">
                    <span className="text-2xl font-extrabold text-[#c89b3c] dark:text-[#35c6c6]">
                      {formatPrice(product.discount_price || product.price)}
                    </span>
                  </div>

                  <div className="mt-5 flex items-center gap-3">
                    <button
                      onClick={() => addToCart(product)}
                      className="rounded-2xl bg-[#1e3a5f] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#16304f] dark:bg-[#35c6c6] dark:text-[#0f172a] dark:hover:bg-[#24b2b2]"
                    >
                      {language === "ar" ? "أضف إلى السلة" : "Add to Cart"}
                    </button>

                    <button
                      onClick={() => toggleFavorite(product)}
                      className="rounded-2xl bg-red-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-600"
                    >
                      {language === "ar" ? "إزالة" : "Remove"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Favorites;
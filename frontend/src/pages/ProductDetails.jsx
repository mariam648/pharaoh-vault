import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import api from "../services/api";
import { useCart } from "../context/CartContext";
import { useFavorites } from "../context/FavoritesContext";
import { useLanguage } from "../context/LanguageContext";
import { useCurrency } from "../context/CurrencyContext";
import LoadingSpinner from "../components/LoadingSpinner";

function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { language } = useLanguage();
  const { formatPrice } = useCurrency();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.get(`/products/${id}`);
        setProduct(response.data);
      } catch (err) {
        setError(
            language === "ar" ? "فشل تحميل تفاصيل المنتج" : "Failed to load product details"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f8f5ef] dark:bg-[#0f172a]">
        <Navbar />
        <div className="flex items-center justify-center py-20">
          <h1 className="text-2xl font-bold text-yellow-700 dark:text-[#35c6c6]">
            {language === "ar" ? "جاري تحميل تفاصيل المنتج..." : "Loading product details..."}
          </h1>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-[#f8f5ef] dark:bg-[#0f172a]">
        <Navbar />
        <div className="flex items-center justify-center py-20">
          <h1 className="text-2xl font-bold text-red-600">
            {error || "Product not found"}
          </h1>
        </div>
      </div>
    );
  }

  const hasDiscount =
    product.discount_price &&
    Number(product.discount_price) < Number(product.price);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f8f5ef] via-white to-[#f3eadb] dark:from-[#0f172a] dark:via-[#132033] dark:to-[#1a2c44]">
      <Navbar />

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="rounded-3xl border border-[#eadfcb] bg-white p-6 shadow-md dark:border-[#2d4a63] dark:bg-[#132033]">
            <div className="flex h-[450px] w-full items-center justify-center rounded-3xl bg-gradient-to-br from-[#f7f1e7] to-[#ebe3d2] p-6 dark:from-[#102038] dark:to-[#1c3552]">
              <img
                src={`/${product.image}`}
                alt={product.name_en}
                className="h-full w-full object-contain"
              />
            </div>
          </div>

          <div className="rounded-3xl border border-[#eadfcb] bg-white p-8 shadow-md dark:border-[#2d4a63] dark:bg-[#132033]">
            <span className="rounded-full bg-[#1e3a5f]/10 px-3 py-1 text-xs font-semibold text-[#1e3a5f] dark:bg-[#35c6c6]/10 dark:text-[#7ce7e7]">
              {product.category?.name_en || "Category"}
            </span>

            <h1 className="mt-4 text-4xl font-extrabold text-[#1f2937] dark:text-white">
              {product.name_en}
            </h1>

            <p className="mt-4 text-base leading-8 text-gray-600 dark:text-gray-300">
              {product.description_en}
            </p>

            <div className="mt-6 flex items-center gap-4">
              {hasDiscount ? (
                <>
                  <span className="text-3xl font-extrabold text-[#c89b3c] dark:text-[#35c6c6]">
                   {formatPrice(product.discount_price)}
                  </span>
                  <span className="text-lg text-gray-400 line-through">
                    {formatPrice(product.price)}
                  </span>
                </>
              ) : (
                <span className="text-3xl font-extrabold text-[#c89b3c] dark:text-[#35c6c6]">
                  {formatPrice(product.price)}
                </span>
              )}
            </div>

            <div className="mt-6 space-y-3 text-sm text-gray-600 dark:text-gray-300">
              <p>
                <span className="font-bold text-[#1f2937] dark:text-white">
                  {language === "ar" ? "التقييم:" : "Rating:"}
                </span>{" "}
                ⭐ {product.rating}
              </p>

              <p>
                <span className="font-bold text-[#1f2937] dark:text-white">
                 {language === "ar" ? "المخزون:" : "Stock:"}
                </span>{" "}
                {product.stock}
              </p>

              <p>
                <span className="font-bold text-[#1f2937] dark:text-white">
                 {language === "ar" ? "الخامة:" : "Material:"}
                </span>{" "}
                {product.material || "Not specified"}
              </p>

              <p>
                <span className="font-bold text-[#1f2937] dark:text-white">
                  {language === "ar" ? "اللون:" : "Color:"}
                </span>{" "}
                {product.color || "Not specified"}
              </p>

              <p>
                <span className="font-bold text-[#1f2937] dark:text-white">
                  {language === "ar" ? "الأبعاد:" : "Dimensions:"}
                </span>{" "}
                {product.dimensions || "Not specified"}
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <button
                onClick={() => addToCart(product)}
                className="rounded-2xl bg-[#1e3a5f] px-6 py-3 font-semibold text-white transition hover:bg-[#16304f] dark:bg-[#35c6c6] dark:text-[#0f172a] dark:hover:bg-[#24b2b2]"
              >
                {language === "ar" ? "أضف إلى السلة" : "Add to Cart"}
              </button>

              <button
                onClick={() => toggleFavorite(product)}
                className={`rounded-2xl px-6 py-3 font-semibold transition ${
                  isFavorite(product.id) ? "bg-red-500 text-white hover:bg-red-600" : "border border-[#1e3a5f] text-[#1e3a5f] hover:bg-[#1e3a5f] hover:text-white dark:border-[#35c6c6] dark:text-[#35c6c6] dark:hover:bg-[#35c6c6] dark:hover:text-[#0f172a]"
                }`}
              >
                {isFavorite(product.id) ? "Remove from Favorites" : "Add to Favorites"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
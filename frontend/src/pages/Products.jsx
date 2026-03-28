import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import api from "../services/api";
import Navbar from "../components/Navbar";
import { useCart } from "../context/CartContext";
import { FiHeart } from "react-icons/fi";
import { useFavorites } from "../context/FavoritesContext";
import { useLanguage } from "../context/LanguageContext";
import { useCurrency } from "../context/CurrencyContext";
import LoadingSpinner from "../components/LoadingSpinner";
import EmptyState from "../components/EmptyState";
import { motion } from "framer-motion";

const categories = [
  { label: "All", value: "all" },
  { label: "Accessories", value: "accessories" },
  { label: "Antiques", value: "antiques" },
  { label: "Beds", value: "beds" },
  { label: "Carpets", value: "carpets" },
  { label: "Curtains", value: "curtains" },
  { label: "Doors", value: "doors" },
  { label: "Mirrors", value: "mirrors" },
  { label: "Mugs", value: "mugs" },
  { label: "Plates", value: "plates" },
  { label: "Pots", value: "pots" },
  { label: "Sofas", value: "sofas" },
  { label: "Tables", value: "tables" },
  { label: "Vases", value: "vases" },
  { label: "Wardrobes", value: "wardrobes" },
];

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get("search") || "";

  const { addToCart } = useCart();
  const { language } = useLanguage();
  const { formatPrice } = useCurrency();

  const { toggleFavorite, isFavorite } = useFavorites();
  const isAdmin = localStorage.getItem("isAdmin") === "true";
  const handleAdminLogout = () => {
  localStorage.removeItem("isAdmin");
  localStorage.removeItem("adminName");
  localStorage.removeItem("adminEmail");
  window.location.reload();
};

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError("");

      try {
        const params = {};

        if (selectedCategory !== "all") {
          params.category = selectedCategory;
        }

        if (searchTerm.trim()) {
          params.search = searchTerm.trim();
        }

        const response = await api.get("/products", { params });
        setProducts(response.data);
      } catch (err) {
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategory, searchTerm]);

 if (loading) {
  return (
    <div className="min-h-screen bg-[#f8f5ef] dark:bg-[#0f172a]">
      <Navbar />
      <LoadingSpinner />
    </div>
  );
}

  if (error) {
    return (
      <div className="min-h-screen bg-[#f8f5ef] dark:bg-[#0f172a]">
        <Navbar />
        <div className="flex items-center justify-center py-20">
          <h1 className="text-2xl font-bold text-red-600">{error}</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f8f5ef] via-white to-[#f3eadb] dark:from-[#0f172a] dark:via-[#132033] dark:to-[#1a2c44]">
      <Navbar />

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-10">
        <div className="mb-10 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.3em] text-[#c89b3c]">
            {language === "ar" ? "خزانة الفرعون" : "pharaoh vault"}
          </p>
          <div className="mb-6 flex justify-center">
  <div className="mb-6 flex justify-center gap-3">
  {!isAdmin ? (
    <Link
      to="/admin/login"
      className="rounded-2xl bg-[#1e3a5f] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#16304f] dark:bg-[#35c6c6] dark:text-[#0f172a] dark:hover:bg-[#24b2b2]"
    >
      Login as Administrator
    </Link>
  ) : (
    <>
      <Link
        to="/admin-dashboard"
        className="rounded-2xl bg-[#1e3a5f] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#16304f] dark:bg-[#35c6c6] dark:text-[#0f172a] dark:hover:bg-[#24b2b2]"
      >
        Go to Dashboard
      </Link>

      <button
        onClick={handleAdminLogout}
        className="rounded-2xl border border-red-300 px-6 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-50 dark:border-red-500/40 dark:text-red-400 dark:hover:bg-red-500/10"
      >
        Logout
      </button>
    </>
  )}
</div>
</div>
          <h1 className="text-4xl font-extrabold tracking-tight text-[#1e3a5f] dark:text-[#f8e7b0] sm:text-5xl">
            {language === "ar" ? "منتجاتنا" : "Our Products"}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-[#6b7280] dark:text-gray-300 sm:text-base">
            {language === "ar" ? "اكتشفي قطعًا فرعونية أنيقة صُممت لتضيف التاريخ والفخامة والجمال الخالد إلى مساحتك." : "Discover elegant pharaonic pieces crafted to bring history, luxury, and timeless beauty into your space."}
          </p>

          {searchTerm && (
            <p className="mt-3 text-sm font-medium text-[#1e3a5f] dark:text-[#7ce7e7]">
              Search results for: "{searchTerm}"
            </p>
          )}
        </div>

        <div className="mb-10 flex flex-wrap items-center justify-center gap-3">
          {categories.map((category) => (
            <button
              key={category.value}
              onClick={() => setSelectedCategory(category.value)}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
                selectedCategory === category.value
                  ? "bg-[#1e3a5f] text-white dark:bg-[#35c6c6] dark:text-[#0f172a]"
                  : "border border-[#d9c9ae] bg-white text-[#1e3a5f] hover:bg-[#f8f5ef] dark:border-[#35526b] dark:bg-[#132033] dark:text-white dark:hover:bg-[#1b2b42]"
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {products.length === 0 ? (
          <EmptyState
  title={language === "ar" ? "لا توجد منتجات" : "No products found"}
  description={
    language === "ar"
      ? "جرّبي تغيير البحث أو اختيار تصنيف مختلف."
      : "Try changing the search term or choosing another category."
  }
/>
        ) : (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-3">
            {products.map((product) => {
              const hasDiscount =
                product.discount_price &&
                Number(product.discount_price) < Number(product.price);

              const discountPercent = hasDiscount
                ? Math.round(
                    ((Number(product.price) - Number(product.discount_price)) /
                      Number(product.price)) *
                      100
                  )
                : 0;

              return (
                <motion.div
  key={product.id}
  initial={{ opacity: 0, y: 25 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.4 }}
  className="group overflow-hidden rounded-3xl border border-[#eadfcb] bg-white shadow-md transition duration-300 hover:-translate-y-2 hover:shadow-2xl dark:border-[#2d4a63] dark:bg-[#132033]"
>
                  <div className="relative">
                    <button onClick={() => toggleFavorite(product)} className={`absolute right-4 top-4 z-10 rounded-full p-3 shadow-md transition ${ isFavorite(product.id)? "bg-red-500 text-white" : "bg-white text-[#1e3a5f] dark:bg-[#132033] dark:text-[#f8e7b0]" }`}>
                      <FiHeart />
                    </button>
                    {hasDiscount && (
                      <span className="absolute left-4 top-4 z-10 rounded-full bg-[#c89b3c] px-4 py-1 text-xs font-bold text-white shadow">
                        {discountPercent}% OFF
                      </span>
                    )}

                    <div className="flex h-72 w-full items-center justify-center bg-gradient-to-br from-[#f7f1e7] to-[#ebe3d2] p-4 dark:from-[#102038] dark:to-[#1c3552]">
                      <img
                        src={`/${product.image}`}
                        alt={language === "ar" ? product.name_ar : product.name_en}
                        className="h-full w-full object-contain transition duration-500 group-hover:scale-105"
                      />
                    </div>
                  </div>

                  <div className="p-5">
                    <div className="mb-2 flex items-center justify-between">
                      <span className="rounded-full bg-[#1e3a5f]/10 px-3 py-1 text-xs font-semibold text-[#1e3a5f] dark:bg-[#35c6c6]/10 dark:text-[#7ce7e7]">
                        {language === "ar" ? product.category?.name_ar || "التصنيف" : product.category?.name_en || "Category"}
                      </span>

                      <span className="text-sm font-semibold text-[#c89b3c]">
                        ⭐ {product.rating}
                      </span>
                    </div>

                    <h2 className="text-2xl font-bold text-[#1f2937] dark:text-white">
                      {language === "ar" ? product.name_ar : product.name_en}
                    </h2>

                    <p className="mt-3 min-h-[72px] text-sm leading-6 text-gray-600 dark:text-gray-300">
                      {language === "ar" ? product.description_ar : product.description_en}
                    </p>

                    <div className="mt-4 flex items-center gap-3">
                      {hasDiscount ? (
                        <>
                          <span className="text-2xl font-extrabold text-[#c89b3c] dark:text-[#35c6c6]">
                            {formatPrice(product.discount_price)}
                          </span>
                          <span className="text-base text-gray-400 line-through">
                           {formatPrice(product.price)}
                          </span>
                        </>
                      ) : (
                        <span className="text-2xl font-extrabold text-[#c89b3c] dark:text-[#35c6c6]">
                          {formatPrice(product.price)}
                        </span>
                      )}
                    </div>

                    <div className="mt-5 flex items-center justify-between">
                      <span className="text-sm text-gray-500 dark:text-gray-300">
                        {language === "ar" ? "المخزون:" : "Stock:"} {product.stock}
                      </span>
                      <Link to={`/products/${product.id}`} className="rounded-2xl border border-[#1e3a5f] px-5 py-2.5 text-sm font-semibold text-[#1e3a5f] transition hover:bg-[#1e3a5f] hover:text-white dark:border-[#35c6c6] dark:text-[#35c6c6] dark:hover:bg-[#35c6c6] dark:hover:text-[#0f172a]">
                      {language === "ar" ? "عرض التفاصيل" : "view details"}
                      </Link>
                      <button
                        onClick={() => addToCart(product)}
                        className="rounded-2xl bg-[#1e3a5f] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#16304f] dark:bg-[#35c6c6] dark:text-[#0f172a] dark:hover:bg-[#24b2b2]">
                        {language === "ar" ? "أضف إلى السلة" : "Add to Cart"}
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default Products;
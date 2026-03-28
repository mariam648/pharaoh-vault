import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import { useCart } from "../context/CartContext";
import { useLanguage } from "../context/LanguageContext";
import { motion } from "framer-motion";

function FeaturedProducts() {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();
  const { language } = useLanguage();

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const response = await api.get("/products/featured");
        setProducts(response.data);
      } catch (error) {
        console.error("Failed to load featured products");
      }
    };

    fetchFeaturedProducts();
  }, []);

  return (
    <section className="mt-16">
      <div className="mb-8 text-center">
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.3em] text-[#c89b3c]">
          {language === "ar" ? "الأكثر مبيعًا" : "Best Sellers"}
        </p>
        <h2 className="text-3xl font-extrabold text-[#1e3a5f] dark:text-[#f8e7b0] sm:text-4xl">
          {language === "ar" ? "المنتجات المميزة" : "Featured Products"}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-gray-600 dark:text-gray-300">
          {language === "ar" ? "اكتشفي بعض القطع الأكثر إعجابًا من مجموعتنا الفرعونية." : "Explore some of the most loved pieces from our pharaonic collection."}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-4">
        {products.map((product) => {
          const hasDiscount =
            product.discount_price &&
            Number(product.discount_price) < Number(product.price);

          return (
            <motion.div
  key={product.id}
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.5 }}
  className="overflow-hidden rounded-3xl border border-[#eadfcb] bg-white shadow-md transition duration-300 hover:-translate-y-2 hover:shadow-2xl dark:border-[#2d4a63] dark:bg-[#132033]"
>
              <div className="flex h-64 w-full items-center justify-center bg-gradient-to-br from-[#f7f1e7] to-[#ebe3d2] p-4 dark:from-[#102038] dark:to-[#1c3552]">
                <img
                  src={`/${product.image}`}
                  alt={product.name_en}
                  className="h-full w-full object-contain"/>
              </div>

              <div className="p-5">
                <h3 className="text-xl font-bold text-[#1f2937] dark:text-white">
                  {language === "ar" ? product.name_ar : product.name_en}
                </h3>

                <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                  {language === "ar" ? product.category?.name_ar || "التصنيف" : product.category?.name_en || "Category"}
                </p>

                <div className="mt-4 flex items-center gap-3">
                  {hasDiscount ? (
                    <>
                      <span className="text-xl font-extrabold text-[#c89b3c] dark:text-[#35c6c6]">
                        ${product.discount_price}
                      </span>
                      <span className="text-sm text-gray-400 line-through">
                        ${product.price}
                      </span>
                    </>
                  ) : (
                    <span className="text-xl font-extrabold text-[#c89b3c] dark:text-[#35c6c6]">
                      ${product.price}
                    </span>
                  )}
                </div>

                <div className="mt-5 flex flex-wrap gap-3">
                  <button
                    onClick={() => addToCart(product)}
                    className="rounded-2xl bg-[#1e3a5f] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#16304f] dark:bg-[#35c6c6] dark:text-[#0f172a] dark:hover:bg-[#24b2b2]">
                    {language === "ar" ? "أضف إلى السلة" : "Add to Cart"}
                  </button>

                  <Link
                    to={`/products/${product.id}`}
                    className="rounded-2xl border border-[#1e3a5f] px-4 py-2 text-sm font-semibold text-[#1e3a5f] transition hover:bg-[#1e3a5f] hover:text-white dark:border-[#35c6c6] dark:text-[#35c6c6] dark:hover:bg-[#35c6c6] dark:hover:text-[#0f172a]">
                    {language === "ar" ? "التفاصيل" : "Details"}
                  </Link>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

export default FeaturedProducts;
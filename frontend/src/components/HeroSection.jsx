import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";
import heroImage from "../assets/hero/sofa (1).jpeg";

function HeroSection() {
  const { language } = useLanguage();

  return (
    <section className="relative overflow-hidden rounded-[2rem] bg-gradient-to-r from-[#1e3a5f] via-[#28527a] to-[#c89b3c] px-6 py-16 text-white shadow-2xl sm:px-10 lg:px-16 lg:py-24 dark:from-[#0f172a] dark:via-[#16304f] dark:to-[#35c6c6]">
      <div className="grid items-center gap-10 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="relative z-10 max-w-3xl"
        >
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.35em] text-[#f8e7b0] dark:text-white/80">
            Pharaoh Vault
          </p>

          <h1 className="text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
            {language === "ar"
              ? "امتلكي قطعة من الأناقة الفرعونية الخالدة"
              : "Own a Piece of Ancient Elegance"}
          </h1>

          <p className="mt-6 max-w-2xl text-sm leading-7 text-white/90 sm:text-base">
            {language === "ar"
              ? "اكتشفي أثاثًا فرعونيًا فاخرًا، وأنتيكات ملكية، وديكورًا فنيًا، وقطعًا خالدة تضيف التاريخ والجمال إلى منزلك."
              : "Discover luxurious pharaonic furniture, royal antiques, artistic decor, and timeless pieces designed to bring history and beauty into your home."}
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              to="/products"
              className="rounded-2xl bg-white px-6 py-3 font-semibold text-[#1e3a5f] transition hover:bg-[#f3eadb]"
            >
              {language === "ar" ? "تسوق الآن" : "Shop Now"}
            </Link>

            <Link
              to="/playground"
              className="rounded-2xl border border-white/70 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
            >
              {language === "ar" ? "ساحة الألعاب" : "Playground"}
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative z-10"
        >
          <img
            src={heroImage}
            alt="Pharaoh Vault Hero"
            className="h-[420px] w-full rounded-[2rem] object-cover shadow-2xl"
          />
        </motion.div>
      </div>

      <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-2xl"></div>
      <div className="pointer-events-none absolute bottom-0 right-20 h-56 w-56 rounded-full bg-[#f8e7b0]/20 blur-3xl"></div>
    </section>
  );
}

export default HeroSection;
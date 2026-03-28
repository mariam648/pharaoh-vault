import { FiAward, FiTruck, FiShield, FiStar } from "react-icons/fi";
import { useLanguage } from "../context/LanguageContext";
import { motion } from "framer-motion";

const features = [
  {
    titleEn: "Royal Craftsmanship",
    titleAr: "حرفية ملكية",
    descriptionEn:
      "Every piece is inspired by the beauty and grandeur of ancient Egyptian art.",
    descriptionAr: "كل قطعة مستوحاة من جمال وعظمة الفن المصري القديم.",
    icon: <FiAward size={28} />,
  },
  {
    titleEn: "Reliable Delivery",
    titleAr: "توصيل موثوق",
    descriptionEn:
      "We make sure your orders arrive safely and in excellent condition.",
    descriptionAr: "نحرص على وصول طلباتك بأمان وبأفضل حالة ممكنة.",
    icon: <FiTruck size={28} />,
  },
  {
    titleEn: "Premium Quality",
    titleAr: "جودة عالية",
    descriptionEn:
      "Our products are made with carefully selected materials and elegant finishes.",
    descriptionAr: "منتجاتنا مصنوعة من خامات مختارة بعناية وتشطيبات أنيقة.",
    icon: <FiShield size={28} />,
  },
  {
    titleEn: "Unique Designs",
    titleAr: "تصميمات فريدة",
    descriptionEn:
      "Exclusive pharaonic furniture and decor you won’t find in ordinary stores.",
    descriptionAr: "أثاث وديكور فرعوني حصري لن تجديه في المتاجر العادية.",
    icon: <FiStar size={28} />,
  },
];

function WhyChooseUs() {
  const { language } = useLanguage();

  return (
    <section className="mt-20">
      <div className="mb-10 text-center">
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.3em] text-[#c89b3c]">
          {language === "ar" ? "لماذا نحن" : "Why Choose Us"}
        </p>
        <h2 className="text-3xl font-extrabold text-[#1e3a5f] dark:text-[#f8e7b0] sm:text-4xl">
          {language === "ar"
            ? "فخامة مستوحاة من التاريخ"
            : "Luxury Rooted in History"}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-gray-600 dark:text-gray-300">
          {language === "ar"
            ? "نمزج بين الأناقة الفرعونية الخالدة والجودة العصرية لنقدم قطعًا لا تُنسى لمنزلك."
            : "We blend timeless pharaonic elegance with modern quality to create unforgettable pieces for your home."}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-4">
        {features.map((feature, index) => (
          <motion.div
  key={index}
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.5, delay: index * 0.1 }}
  className="rounded-3xl border border-[#eadfcb] bg-white p-6 shadow-md transition duration-300 hover:-translate-y-2 hover:shadow-xl dark:border-[#2d4a63] dark:bg-[#132033]"
>
            <div className="mb-4 inline-flex rounded-2xl bg-[#1e3a5f]/10 p-4 text-[#1e3a5f] dark:bg-[#35c6c6]/10 dark:text-[#35c6c6]">
              {feature.icon}
            </div>

            <h3 className="text-xl font-bold text-[#1f2937] dark:text-white">
              {language === "ar" ? feature.titleAr : feature.titleEn}
            </h3>

            <p className="mt-3 text-sm leading-7 text-gray-600 dark:text-gray-300">
              {language === "ar"
                ? feature.descriptionAr
                : feature.descriptionEn}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default WhyChooseUs;
import { Link } from "react-router-dom";
import { FiFacebook, FiInstagram, FiTwitter, FiMail } from "react-icons/fi";
import { useLanguage } from "../context/LanguageContext";

function Footer() {
    const { language } = useLanguage();
  return (
    <footer className="mt-20 border-t border-[#e8dcc6] bg-white/80 dark:border-[#2d4a63] dark:bg-[#0f172a]">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 py-10 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div>
          <h2 className="text-2xl font-extrabold text-[#1e3a5f] dark:text-[#f8e7b0]">
            Pharaoh <span className="text-[#c89b3c] dark:text-[#35c6c6]">Vault</span>
          </h2>
          <p className="mt-4 text-sm leading-7 text-gray-600 dark:text-gray-300">
          {language === "ar" ? "تجربة تسوق فرعونية فاخرة تجمع بين الأناقة التاريخية والفن الملكي والديكور الخالد في المنازل العصرية." : "A luxurious pharaonic e-commerce experience bringing ancient elegance, royal artistry, and timeless decor into modern homes."}
          </p>
        </div>

        <div>
          <h3 className="text-lg font-bold text-[#1f2937] dark:text-white">
            {language === "ar" ? "روابط سريعة" : "Quick Links"}
          </h3>
          <div className="mt-4 flex flex-col gap-3 text-sm">
            <Link to="/" className="text-gray-600 hover:text-[#c89b3c] dark:text-gray-300 dark:hover:text-[#35c6c6]">
              {language === "ar" ? "الرئيسية" : "Home"}
            </Link>
            <Link to="/products" className="text-gray-600 hover:text-[#c89b3c] dark:text-gray-300 dark:hover:text-[#35c6c6]">
              {language === "ar" ? "المنتجات" : "Products"}
            </Link>
            <Link to="/about" className="text-gray-600 hover:text-[#c89b3c] dark:text-gray-300 dark:hover:text-[#35c6c6]">
             {language === "ar" ? "من نحن" : "About Us"}
            </Link>
            <Link to="/contact" className="text-gray-600 hover:text-[#c89b3c] dark:text-gray-300 dark:hover:text-[#35c6c6]">
              {language === "ar" ? "تواصل معنا" : "Contact Us"}
            </Link>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-bold text-[#1f2937] dark:text-white">
            {language === "ar" ? "التصنيفات" : "Categories"}
          </h3>
          <div className="mt-4 flex flex-col gap-3 text-sm text-gray-600 dark:text-gray-300">
            <span>{language === "ar" ? "سراير" : "Beds"}</span>
            <span>{language === "ar" ? "دولايب" : "Wardrobes"}</span>
            <span>{language === "ar" ? "ترابيزات" : "Tables"}</span>
            <span>{language === "ar" ? "فازات" : "Vases"}</span>
            <span>{language === "ar" ? "سجاد" : "Carpets"}</span>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-bold text-[#1f2937] dark:text-white">
            Contact
          </h3>
          <div className="mt-4 space-y-3 text-sm text-gray-600 dark:text-gray-300">
            <p>Email: support@pharaohvault.com</p>
            <p>Phone: +20 100 000 0000</p>
            <p>Cairo, Egypt</p>
          </div>

          <div className="mt-5 flex items-center gap-3">
            <a
              href=""
              className="rounded-full border border-[#ddd0b8] p-2 text-[#1e3a5f] hover:bg-[#f8f5ef] dark:border-[#35526b] dark:text-[#f8e7b0] dark:hover:bg-[#132033]">
              <FiFacebook />
            </a>
            <a
              href=""
              className="rounded-full border border-[#ddd0b8] p-2 text-[#1e3a5f] hover:bg-[#f8f5ef] dark:border-[#35526b] dark:text-[#f8e7b0] dark:hover:bg-[#132033]">
              <FiInstagram />
            </a>
            <a
              href=""
              className="rounded-full border border-[#ddd0b8] p-2 text-[#1e3a5f] hover:bg-[#f8f5ef] dark:border-[#35526b] dark:text-[#f8e7b0] dark:hover:bg-[#132033]">
              <FiTwitter />
            </a>
            <a
              href=""
              className="rounded-full border border-[#ddd0b8] p-2 text-[#1e3a5f] hover:bg-[#f8f5ef] dark:border-[#35526b] dark:text-[#f8e7b0] dark:hover:bg-[#132033]">
              <FiMail />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-[#e8dcc6] px-4 py-4 text-center text-sm text-gray-500 dark:border-[#2d4a63] dark:text-gray-400">
       {language === "ar" ? "© 2026 Pharaoh Vault. جميع الحقوق محفوظة." : "© 2026 Pharaoh Vault. All rights reserved."}
      </div>
    </footer>
  );
}

export default Footer;
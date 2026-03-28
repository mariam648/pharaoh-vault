import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useLanguage } from "../context/LanguageContext";

function About() {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f8f5ef] via-white to-[#f3eadb] dark:from-[#0f172a] dark:via-[#132033] dark:to-[#1a2c44]">
      <Navbar />

      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-[#eadfcb] bg-white p-8 shadow-md dark:border-[#2d4a63] dark:bg-[#132033]">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.3em] text-[#c89b3c]">
            {language === "ar" ? "من نحن" : "About Us"}
          </p>

          <h1 className="text-4xl font-extrabold text-[#1e3a5f] dark:text-[#f8e7b0]">
            {language === "ar"
              ? "قصتنا في Pharaoh Vault"
              : "Our Story at Pharaoh Vault"}
          </h1>

          <p className="mt-6 text-base leading-8 text-gray-600 dark:text-gray-300">
            {language === "ar"
              ? "نحن في Pharaoh Vault نؤمن أن الجمال الحقيقي يعيش في التفاصيل. لذلك جمعنا بين سحر الحضارة الفرعونية وروعة التصميم العصري لنقدم أثاثًا وديكورًا يعكس الفخامة والأصالة في كل زاوية من منزلك."
              : "At Pharaoh Vault, we believe true beauty lives in the details. That’s why we combine the charm of ancient Egyptian heritage with modern elegance to create furniture and decor that bring luxury and authenticity into every corner of your home."}
          </p>

          <p className="mt-6 text-base leading-8 text-gray-600 dark:text-gray-300">
            {language === "ar"
              ? "ما يميزنا هو اهتمامنا بالجودة، وحرصنا على تقديم تصميمات فريدة، وتجربة تسوق أنيقة وسهلة تناسب كل من يبحث عن التميز."
              : "What sets us apart is our commitment to quality, our passion for unique designs, and a smooth shopping experience for everyone who values distinction."}
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default About;
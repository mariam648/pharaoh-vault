import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import FeaturedProducts from "../components/FeaturedProducts";
import WhyChooseUs from "../components/WhyChooseUs";
import Footer from "../components/Footer";
import { motion } from "framer-motion";

function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f8f5ef] via-white to-[#f3eadb] dark:from-[#0f172a] dark:via-[#132033] dark:to-[#1a2c44]">
      <Navbar />

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-10">
        <HeroSection />
        <motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.5 }}
>
  <WhyChooseUs />
</motion.div>
        <motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.5 }}
>
  <FeaturedProducts />
</motion.div>


        <Footer />
        
      </div>
    </div>
  );
}

export default Home;
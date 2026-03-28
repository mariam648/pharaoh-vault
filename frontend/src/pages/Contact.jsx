import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import api from "../services/api";
import { useLanguage } from "../context/LanguageContext";
import toast from "react-hot-toast";

function Contact() {
  const { language } = useLanguage();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");

    try {
      await api.post("/contact", formData);
      toast.success(
  language === "ar"
    ? "تم إرسال رسالتك بنجاح."
    : "Your message has been sent successfully."
);
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      toast.error(
  language === "ar"
    ? "حدث خطأ أثناء إرسال الرسالة."
    : "Something went wrong while sending your message."
);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f8f5ef] via-white to-[#f3eadb] dark:from-[#0f172a] dark:via-[#132033] dark:to-[#1a2c44]">
      <Navbar />

      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-[#eadfcb] bg-white p-8 shadow-md dark:border-[#2d4a63] dark:bg-[#132033]">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.3em] text-[#c89b3c]">
            {language === "ar" ? "تواصل معنا" : "Contact Us"}
          </p>

          <h1 className="text-4xl font-extrabold text-[#1e3a5f] dark:text-[#f8e7b0]">
            {language === "ar"
              ? "نحن هنا لمساعدتك"
              : "We’re Here to Help"}
          </h1>

          <form onSubmit={handleSubmit} className="mt-8 grid gap-4">
            <input
              type="text"
              name="name"
              placeholder={language === "ar" ? "الاسم" : "Name"}
              value={formData.name}
              onChange={handleChange}
              className="rounded-2xl border border-gray-300 px-4 py-3 text-[#1f2937] outline-none focus:border-[#c89b3c] dark:border-[#35526b] dark:bg-[#102038] dark:text-white dark:placeholder:text-gray-400"
              required/>

            <input
              type="email"
              name="email"
              placeholder={language === "ar" ? "البريد الإلكتروني" : "Email"}
              value={formData.email}
              onChange={handleChange}
              className="rounded-2xl border border-gray-300 px-4 py-3 text-[#1f2937] outline-none focus:border-[#c89b3c] dark:border-[#35526b] dark:bg-[#102038] dark:text-white dark:placeholder:text-gray-400"
              required/>

            <input
              type="text"
              name="phone"
              placeholder={language === "ar" ? "رقم الهاتف" : "Phone"}
              value={formData.phone}
              onChange={handleChange}
              className="rounded-2xl border border-gray-300 px-4 py-3 text-[#1f2937] outline-none focus:border-[#c89b3c] dark:border-[#35526b] dark:bg-[#102038] dark:text-white dark:placeholder:text-gray-400"/>

            <input
              type="text"
              name="subject"
              placeholder={language === "ar" ? "الموضوع" : "Subject"}
              value={formData.subject}
              onChange={handleChange}
              className="rounded-2xl border border-gray-300 px-4 py-3 text-[#1f2937] outline-none focus:border-[#c89b3c] dark:border-[#35526b] dark:bg-[#102038] dark:text-white dark:placeholder:text-gray-400"
              required/>

            <textarea
              name="message"
              placeholder={language === "ar" ? "الرسالة" : "Message"}
              value={formData.message}
              onChange={handleChange}
              rows="5"
              className="rounded-2xl border border-gray-300 px-4 py-3 text-[#1f2937] outline-none focus:border-[#c89b3c] dark:border-[#35526b] dark:bg-[#102038] dark:text-white dark:placeholder:text-gray-400"
              required></textarea>

            <button
              type="submit"
              className="mt-2 rounded-2xl bg-[#1e3a5f] px-6 py-3 font-semibold text-white transition hover:bg-[#16304f] dark:bg-[#35c6c6] dark:text-[#0f172a] dark:hover:bg-[#24b2b2]">
              {language === "ar" ? "إرسال الرسالة" : "Send Message"}
            </button>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Contact;
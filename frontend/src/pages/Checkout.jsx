import { useState } from "react";
import Navbar from "../components/Navbar";
import { useCart } from "../context/CartContext";
import api from "../services/api";
import { useLanguage } from "../context/LanguageContext";
import { useCurrency } from "../context/CurrencyContext";
import { useCoupon } from "../context/CouponContext";
import toast from "react-hot-toast";

function Checkout() {
  const { cartItems, cartTotal, clearCart } = useCart();
  const { language } = useLanguage();
  const { currency, formatPrice, convertPrice } = useCurrency();
  const { coupon } = useCoupon();
const discountAmount = coupon ? (cartTotal * coupon.discount) / 100 : 0;
const finalTotal = cartTotal - discountAmount;

  const [formData, setFormData] = useState({
    customer_name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    country: "",
    notes: "",
    currency: currency,
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
      const payload = {
        ...formData,
        currency,
        total: convertPrice(finalTotal),
        items: cartItems.map((item) => ({
          product_id: item.id,
          quantity: item.quantity,
          price: convertPrice(item.discount_price || item.price),
        })),
      };

      await api.post("/checkout", payload);

      toast.success(
  language === "ar"
    ? "تم تأكيد طلبك بنجاح."
    : "Your order has been placed successfully."
);

      clearCart();

      setFormData({
        customer_name: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        country: "",
        notes: "",
        currency: currency,
      });
    } catch (error) {
      toast.error(
  language === "ar"
    ? "حدث خطأ أثناء إرسال الطلب."
    : "Something went wrong while placing your order."
);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f8f5ef] via-white to-[#f3eadb] dark:from-[#0f172a] dark:via-[#132033] dark:to-[#1a2c44]">
      <Navbar />

      <div className="mx-auto max-w-6xl px-4 py-10">
        <h1 className="mb-8 text-4xl font-extrabold text-[#1e3a5f] dark:text-[#f8e7b0]">
          {language === "ar" ? "إتمام الطلب" : "Checkout"}
        </h1>

        {successMessage ? (
          <div className="rounded-3xl border border-green-200 bg-green-50 p-6 text-center shadow-md">
            <h2 className="text-2xl font-bold text-green-700">
              {language === "ar"
                ? "تم تأكيد طلبك بنجاح."
                : "Your order has been placed successfully."}
            </h2>
            <p className="mt-3 text-gray-600">
              {language === "ar"
                ? "شكرًا لتسوقك من Pharaoh Vault."
                : "Thank you for shopping with Pharaoh Vault."}
            </p>
          </div>
        ) : cartItems.length === 0 ? (
          <p className="text-lg text-gray-600 dark:text-gray-300">
            {language === "ar"
              ? "السلة فارغة. أضيفي بعض المنتجات أولًا."
              : "Your cart is empty. Add some products first."}
          </p>
        ) : (
          <div className="grid gap-8 lg:grid-cols-2">
            <form
              onSubmit={handleSubmit}
              className="rounded-3xl border border-[#eadfcb] bg-white p-6 shadow-md dark:border-[#2d4a63] dark:bg-[#132033]"
            >
              <h2 className="mb-5 text-2xl font-bold text-[#1f2937] dark:text-white">
                {language === "ar" ? "بيانات العميل" : "Customer Information"}
              </h2>

              <div className="grid gap-4">
                <input
                  type="text"
                  name="customer_name"
                  placeholder={language === "ar" ? "الاسم الكامل" : "Full Name"}
                  value={formData.customer_name}
                  onChange={handleChange}
                  className="rounded-2xl border border-gray-300 px-4 py-3 text-[#1f2937] outline-none focus:border-[#c89b3c] dark:border-[#35526b] dark:bg-[#102038] dark:text-white dark:placeholder:text-gray-400"
                  required
                />

                <input
                  type="email"
                  name="email"
                  placeholder={language === "ar" ? "البريد الإلكتروني" : "Email"}
                  value={formData.email}
                  onChange={handleChange}
                  className="rounded-2xl border border-gray-300 px-4 py-3 text-[#1f2937] outline-none focus:border-[#c89b3c] dark:border-[#35526b] dark:bg-[#102038] dark:text-white dark:placeholder:text-gray-400"
                  required
                />

                <input
                  type="text"
                  name="phone"
                  placeholder={language === "ar" ? "رقم الهاتف" : "Phone"}
                  value={formData.phone}
                  onChange={handleChange}
                  className="rounded-2xl border border-gray-300 px-4 py-3 text-[#1f2937] outline-none focus:border-[#c89b3c] dark:border-[#35526b] dark:bg-[#102038] dark:text-white dark:placeholder:text-gray-400"
                  required
                />

                <input
                  type="text"
                  name="address"
                  placeholder={language === "ar" ? "العنوان" : "Address"}
                  value={formData.address}
                  onChange={handleChange}
                  className="rounded-2xl border border-gray-300 px-4 py-3 text-[#1f2937] outline-none focus:border-[#c89b3c] dark:border-[#35526b] dark:bg-[#102038] dark:text-white dark:placeholder:text-gray-400"
                  required
                />

                <input
                  type="text"
                  name="city"
                  placeholder={language === "ar" ? "المدينة" : "City"}
                  value={formData.city}
                  onChange={handleChange}
                  className="rounded-2xl border border-gray-300 px-4 py-3 text-[#1f2937] outline-none focus:border-[#c89b3c] dark:border-[#35526b] dark:bg-[#102038] dark:text-white dark:placeholder:text-gray-400"
                  required
                />

                <input
                  type="text"
                  name="country"
                  placeholder={language === "ar" ? "الدولة" : "Country"}
                  value={formData.country}
                  onChange={handleChange}
                  className="rounded-2xl border border-gray-300 px-4 py-3 text-[#1f2937] outline-none focus:border-[#c89b3c] dark:border-[#35526b] dark:bg-[#102038] dark:text-white dark:placeholder:text-gray-400"
                  required
                />

                <textarea
                  name="notes"
                  placeholder={language === "ar" ? "ملاحظات" : "Notes"}
                  value={formData.notes}
                  onChange={handleChange}
                  rows="4"
                  className="rounded-2xl border border-gray-300 px-4 py-3 text-[#1f2937] outline-none focus:border-[#c89b3c] dark:border-[#35526b] dark:bg-[#102038] dark:text-white dark:placeholder:text-gray-400"
                ></textarea>
              </div>

              <button
                type="submit"
                className="mt-6 w-full rounded-2xl bg-[#1e3a5f] px-6 py-3 font-semibold text-white transition hover:bg-[#16304f] dark:bg-[#35c6c6] dark:text-[#0f172a] dark:hover:bg-[#24b2b2]"
              >
                {language === "ar" ? "تأكيد الطلب" : "Place Order"}
              </button>

              
            </form>

            <div className="rounded-3xl border border-[#eadfcb] bg-white p-6 shadow-md dark:border-[#2d4a63] dark:bg-[#132033]">
              <h2 className="mb-5 text-2xl font-bold text-[#1f2937] dark:text-white">
                {language === "ar" ? "ملخص الطلب" : "Order Summary"}
              </h2>

              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between border-b border-gray-200 pb-3 dark:border-[#35526b]"
                  >
                    <div>
                      <h3 className="font-semibold text-[#1f2937] dark:text-white">
                        {language === "ar" ? item.name_ar : item.name_en}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-300">
                        {language === "ar" ? "الكمية:" : "Qty:"} {item.quantity}
                      </p>
                    </div>

                    <p className="font-bold text-[#c89b3c] dark:text-[#35c6c6]">
                      {formatPrice(
                        Number(item.discount_price || item.price) * item.quantity
                      )}
                    </p>
                  </div>
                ))}
              </div>
              {coupon && (
  <div className="mb-3 rounded-2xl bg-[#f8f5ef] p-4 dark:bg-[#102038]">
    <p className="text-sm font-semibold text-[#1f2937] dark:text-white">
      {language === "ar" ? "الكوبون المطبق:" : "Applied Coupon:"} {coupon.code}
    </p>
    <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
      {language === "ar" ? "نسبة الخصم:" : "Discount:"} {coupon.discount}%
    </p>
    <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
      {language === "ar" ? "قيمة الخصم:" : "Discount Amount:"}{" "}
      {formatPrice(discountAmount)}
    </p>
  </div>
)}

              <div className="mt-6 border-t border-gray-200 pt-4 dark:border-[#35526b]">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold text-[#1f2937] dark:text-white">
                    {language === "ar" ? "الإجمالي" : "Total"}
                  </span>
                  <span className="text-2xl font-extrabold text-[#1e3a5f] dark:text-[#35c6c6]">
                    {formatPrice(finalTotal)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Checkout;
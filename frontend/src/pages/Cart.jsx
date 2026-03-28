import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useCart } from "../context/CartContext";
import { useLanguage } from "../context/LanguageContext";
import { useCurrency } from "../context/CurrencyContext";
import { useCoupon } from "../context/CouponContext";
import EmptyState from "../components/EmptyState";

function Cart() {
  const {
    cartItems,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    cartTotal,
  } = useCart();
const { language } = useLanguage();
const { formatPrice } = useCurrency();
const { coupon } = useCoupon();
const discountAmount = coupon ? (cartTotal * coupon.discount) / 100 : 0;
const finalTotal = cartTotal - discountAmount;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f8f5ef] via-white to-[#f3eadb] dark:from-[#0f172a] dark:via-[#132033] dark:to-[#1a2c44]">
      <Navbar />

      <div className="mx-auto max-w-6xl px-4 py-10">
        <h1 className="mb-8 text-4xl font-extrabold text-[#1e3a5f] dark:text-[#f8e7b0]">
          {language === "ar" ? "سلة التسوق" : "Shopping Cart"}
        </h1>

        {cartItems.length === 0 ? (
          <EmptyState
  title={language === "ar" ? "السلة فارغة" : "Your cart is empty"}
  description={
    language === "ar"
      ? "لم تقومي بإضافة أي منتجات بعد. ابدئي التسوق الآن."
      : "You haven’t added any products yet. Start shopping now."
  }
/>
        ) : (
          <div className="space-y-6">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex flex-col gap-4 rounded-3xl border border-[#eadfcb] bg-white p-4 shadow-md sm:flex-row sm:items-center dark:border-[#2d4a63] dark:bg-[#132033]">
                <div className="flex h-32 w-full items-center justify-center rounded-2xl bg-[#f7f1e7] sm:w-40 dark:bg-[#102038]">
                  <img
                    src={`/${item.image}`}
                    alt={item.name_en}
                    className="h-full w-full object-contain"/>
                </div>

                <div className="flex-1">
                  <h2 className="text-2xl font-bold">
  {language === "ar" ? "إجمالي السلة" : "Cart Total"}
</h2>

<p className="mt-3 text-3xl font-extrabold">{formatPrice(cartTotal)}</p>

{coupon && (
  <div className="mt-4 rounded-2xl bg-white/10 p-4">
    <p className="text-sm font-semibold">
      {language === "ar" ? "الكوبون المطبق:" : "Applied Coupon:"} {coupon.code}
    </p>
    <p className="mt-1 text-sm">
      {language === "ar" ? "الخصم:" : "Discount:"} {coupon.discount}%
    </p>
    <p className="mt-1 text-sm">
      {language === "ar" ? "قيمة الخصم:" : "Discount Amount:"}{" "}
      {formatPrice(discountAmount)}
    </p>
  </div>
)}
<p className="mt-4 text-xl font-bold text-[#f8e7b0] dark:text-[#35c6c6]">
  {language === "ar" ? "الإجمالي بعد الخصم:" : "Final Total:"}{" "}
  {formatPrice(finalTotal)}
</p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => decreaseQuantity(item.id)}
                    className="rounded-full bg-[#e5dccb] px-3 py-1 text-lg font-bold text-[#1e3a5f] dark:bg-[#24415d] dark:text-[#f8e7b0]">
                    -
                  </button>

                  <span className="text-lg font-semibold text-[#1f2937] dark:text-white">
                    {item.quantity}
                  </span>

                  <button
                    onClick={() => increaseQuantity(item.id)}
                    className="rounded-full bg-[#e5dccb] px-3 py-1 text-lg font-bold text-[#1e3a5f] dark:bg-[#24415d] dark:text-[#f8e7b0]">
                    +
                  </button>
                </div>

                <button
                  onClick={() => removeFromCart(item.id)}
                  className="rounded-2xl bg-red-500 px-4 py-2 text-sm font-semibold text-white hover:bg-red-600">
                  {language === "ar" ? "حذف" : "Remove"}
                </button>
              </div>
            ))}

            <div className="mt-8 rounded-3xl bg-[#1e3a5f] p-6 text-white shadow-xl dark:bg-[#102038]">
                <h2 className="text-2xl font-bold">
  {language === "ar" ? "إجمالي السلة" : "Cart Total"}
</h2>

<p className="mt-3 text-3xl font-extrabold">{formatPrice(cartTotal)}</p>

{coupon && (
  <div className="mt-4 rounded-2xl bg-white/10 p-4">
    <p className="text-sm font-semibold">
      {language === "ar" ? "الكوبون المطبق:" : "Applied Coupon:"} {coupon.code}
    </p>
    <p className="mt-1 text-sm">
      {language === "ar" ? "الخصم:" : "Discount:"} {coupon.discount}%
    </p>
    <p className="mt-1 text-sm">
      {language === "ar" ? "قيمة الخصم:" : "Discount Amount:"}{" "}
      {formatPrice(discountAmount)}
    </p>
  </div>
)}
<p className="mt-4 text-xl font-bold text-[#f8e7b0] dark:text-[#35c6c6]">
  {language === "ar" ? "الإجمالي بعد الخصم:" : "Final Total:"}{" "}
  {formatPrice(finalTotal)}
</p>
                

                <Link to="/checkout" cclassName="mt-5 inline-block rounded-2xl bg-[#c89b3c] px-6 py-3 font-semibold text-white transition hover:bg-[#b6892f] dark:bg-[#35c6c6] dark:text-[#0f172a] dark:hover:bg-[#24b2b2]">
                    {language === "ar" ? "المتابعة إلى الدفع" : "Proceed to Checkout"}
                </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
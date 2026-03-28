import { createContext, useContext, useEffect, useState } from "react";

const CouponContext = createContext();

export function CouponProvider({ children }) {
  const [coupon, setCoupon] = useState(() => {
    const savedCoupon = localStorage.getItem("pharaohCoupon");
    return savedCoupon ? JSON.parse(savedCoupon) : null;
  });

  useEffect(() => {
    if (coupon) {
      localStorage.setItem("pharaohCoupon", JSON.stringify(coupon));
    } else {
      localStorage.removeItem("pharaohCoupon");
    }
  }, [coupon]);

  const claimCoupon = (code, discount) => {
    setCoupon({ code, discount });
  };

  const clearCoupon = () => {
    setCoupon(null);
  };

  return (
    <CouponContext.Provider value={{ coupon, claimCoupon, clearCoupon }}>
      {children}
    </CouponContext.Provider>
  );
}

export function useCoupon() {
  return useContext(CouponContext);
}
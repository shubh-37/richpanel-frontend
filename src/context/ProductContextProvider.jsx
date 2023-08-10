import { createContext, useState } from "react";

export const productContext = createContext();

export default function ProductContextProvider({ children }) {
  const [paymentObj, setPaymentObj] = useState({
    planName: "Basic",
    planPrice: 100,
    billingCycle: "Monthly",
  });
  return (
    <productContext.Provider value={{ paymentObj, setPaymentObj }}>
      {children}{" "}
    </productContext.Provider>
  );
}

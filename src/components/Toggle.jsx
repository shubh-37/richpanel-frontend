import { useContext } from "react";
import "../css/toggle.css";
import { productContext } from "../context/ProductContextProvider";

// eslint-disable-next-line react/prop-types
export default function Toggle({ isMonthly, setIsMonthly }) {
  const { paymentObj, setPaymentObj, setFrequency } =
    useContext(productContext);
  function setPaymentObjYearly() {
    setPaymentObj({
      ...paymentObj,
      planName: "Basic",
      planPrice: 1000,
      billingCycle: "Yearly",
    });
  }
  return (
    <div className="toggle-container">
      <div
        className={`toggle-option ${isMonthly ? "active" : ""}`}
        onClick={() => {
          setIsMonthly(true);
          setFrequency("monthly");
        }}
      >
        Monthly
      </div>
      <div
        className={`toggle-option ${!isMonthly ? "active" : ""}`}
        onClick={() => {
          setIsMonthly(false);
          setFrequency("yearly");
          setPaymentObjYearly();
        }}
      >
        Yearly
      </div>
    </div>
  );
}

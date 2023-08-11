import { createContext, useState } from "react";
import axios from "axios";
export const productContext = createContext();

// eslint-disable-next-line react/prop-types
export default function ProductContextProvider({ children }) {
  const [paymentObj, setPaymentObj] = useState({
    planName: "Basic",
    planPrice: 100,
    billingCycle: "Monthly",
    priceId: "price_1NdZ03SD5dGve2BTq59Obs2R",
  });
  const [frequency, setFrequency] = useState("monthly");
  const [subscription, setSubscription] = useState({});

  const [clientSecret, setClientSecret] = useState(null);
  const custId = "cus_OQREZkFKPE0E14";
  async function createSubscription(paymentObj) {
    try {
      const response = await axios.post(
        "http://localhost:3000/create",
        {
          custId,
          priceId: paymentObj.priceId,
          subscriptionName: paymentObj.planName,
          planPrice: paymentObj.planPrice,
          billingCycle: paymentObj.billingCycle,
        },
        {
          headers: { "content-type": "application/json" },
        }
      );
      setClientSecret(response.data.clientSecret);
    } catch (error) {
      console.log(error);
    }
  }

  async function confirmSubscription(clientSecretKey) {
    try {
      const response = await axios.post(
        "http://localhost:3000/success",
        {
          clientSecret: clientSecretKey
        },
        {
          headers: { "content-type": "application/json" },
        }
      );
      setSubscription(response.data.subscriptionInstance);
      return response.status;
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <productContext.Provider
      value={{
        setPaymentObj,
        paymentObj,
        clientSecret,
        createSubscription,
        frequency,
        setFrequency,
        confirmSubscription,
        subscription,
        setSubscription
      }}
    >
      {children}{" "}
    </productContext.Provider>
  );
}

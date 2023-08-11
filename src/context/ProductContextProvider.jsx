import { createContext, useState } from "react";
import axios from "axios";
export const productContext = createContext();

// eslint-disable-next-line react/prop-types
export default function ProductContextProvider({ children }) {
  const [isActive, setIsActive] = useState(true);
  const [paymentObj, setPaymentObj] = useState({
    planName: "Basic",
    planPrice: 100,
    billingCycle: "Monthly",
    priceId: "price_1NdZ03SD5dGve2BTq59Obs2R",
  });
  const [frequency, setFrequency] = useState("monthly");
  const token = localStorage.getItem("token");
  const [clientSecret, setClientSecret] = useState(null);

  async function createSubscription(paymentObj) {
    const customerInfo = JSON.parse(localStorage.getItem("user"));
    try {
      const response = await axios.post(
        "http://localhost:3000/create", //https://richpanel.bilzo.in/success
        {
          custId: customerInfo.stripeCustomerId,
          priceId: paymentObj.priceId,
          subscriptionName: paymentObj.planName,
          planPrice: paymentObj.planPrice,
          billingCycle: paymentObj.billingCycle,
        },
        {
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
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
          clientSecret: clientSecretKey,
        },
        {
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setIsActive(true);
      localStorage.setItem(
        "subscriptionInfo",
        JSON.stringify(response.data.subscriptionInstance)
      );
      return response.status;
    } catch (error) {
      console.log(error);
    }
  }

  async function cancelSubscription(subscriptionId) {
    try {
      const response = await axios.post(
        "http://localhost:3000/cancel",
        {
          subscriptionId,
        },
        {
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        setIsActive(false);
        localStorage.setItem(
          "subscriptionInfo",
          JSON.stringify(response.data.subscriptionInstance)
        );
      }
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
        cancelSubscription,
        isActive
      }}
    >
      {children}{" "}
    </productContext.Provider>
  );
}

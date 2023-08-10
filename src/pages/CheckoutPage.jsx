import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/CheckoutForm"; // Create this component next
import "../css/checkout.css";
import { useLocation } from "react-router-dom";

const stripePromise = loadStripe(
  "pk_test_51NdG1qSD5dGve2BTUYCeASYVYwr3feyfx5gOLdD9LcVHGnWm6XKsR1KUsGAin1l9JNtuoFdRYAtcS0HRxSxZUZvg00lBJBr177"
);

export default function Checkout() {
  const location = useLocation();
  const data = location.state;
  return (
    <div className="checkout-container">
      <div className="checkout-content">
        <div className="payment">
          <h2>Complete Payment</h2>
          <p>Enter your credit or debit card details below</p>
          <Elements stripe={stripePromise}>
            <CheckoutForm />
          </Elements>
        </div>
        <div className="summary">
          <h3>Order Summary</h3>
          
          <div>
            <p>Plan Name</p><p>{data.planName}</p>
          </div>
          <div>
            <p>Billing Cycle</p><p>{data.billingCycle}</p>
          </div>
          <div>
            <p>Plan Price</p><p>₹ {data.planPrice}/{data.billingCycle === 'Monthly'? "mo" : "yearly"} </p>
          </div>
        </div>
      </div>
    </div>
  );
}

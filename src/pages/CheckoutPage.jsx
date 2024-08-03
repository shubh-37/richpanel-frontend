import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from '../components/CheckoutForm';
import infoIcon from '../assets/info.svg';
import '../css/checkout.css';
import { useLocation } from 'react-router-dom';

const stripePromise = loadStripe(
  'pk_test_51NdG1qSD5dGve2BTUYCeASYVYwr3feyfx5gOLdD9LcVHGnWm6XKsR1KUsGAin1l9JNtuoFdRYAtcS0HRxSxZUZvg00lBJBr177'
);

export default function Checkout() {
  const location = useLocation();
  const data = location.state;
  const tooltip = `Use the below details to complete payment: \nCard num: 4242 4242 4242 4242\nExpiry: 12/34\nCVV: 123\nPostal: 12345`;

  return (
    <>
      <div className="checkout-container">
        <div className="checkout-content">
          <div className="payment">
            <span className="checkout-heading">
              <h2 style={{ margin: '0', marginBottom: '9px', marginTop: '8px' }}>Complete Payment</h2>
              <div className="info">
                <img src={infoIcon} alt="info icon" />
                <div className="tooltiptext">
                  {tooltip.split('\n').map((line, index) => (
                    <div key={index}>{line}</div>
                  ))}
                </div>
              </div>
            </span>

            <p style={{ fontSize: 'small', margin: '0', marginBottom: '15px' }}>
              Enter your credit or debit card details below
            </p>
            <Elements stripe={stripePromise}>
              <CheckoutForm />
            </Elements>
          </div>
          <div className="summary">
            <h3 style={{ margin: '0', marginBottom: '9px', marginTop: '8px' }}>Order Summary</h3>

            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                borderBottom: '1px solid #d1d5db',
                fontSize: 'small'
              }}
            >
              <p>Plan Name</p>
              <p>{data.planName}</p>
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                borderBottom: '1px solid #d1d5db',
                fontSize: 'small'
              }}
            >
              <p>Billing Cycle</p>
              <p>{data.billingCycle}</p>
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                borderBottom: '1px solid #d1d5db',
                fontSize: 'small'
              }}
            >
              <p>Plan Price</p>
              <p>
                ₹ {data.planPrice}/{data.billingCycle === 'Monthly' ? 'mo' : 'yearly'}{' '}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

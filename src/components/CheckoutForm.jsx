import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useContext } from 'react';
import { productContext } from '../context/ProductContextProvider';
import { useNavigate } from 'react-router-dom';

function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const { clientSecret, confirmSubscription } = useContext(productContext);
  const navigate = useNavigate();
  const customerInfo = JSON.parse(localStorage.getItem('user'));

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }
    const cardElement = elements.getElement(CardElement);
    const billingDetails = {
      name: customerInfo.emailId,
      address: {
        line1: '1234 Main Street',
        city: 'Mumbai',
        state: 'MH',
        postal_code: '400001',
        country: 'IN'
      }
    };
    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
        billing_details: billingDetails
      }
    });
    if (error) {
      console.error(error);
    } else {
      if (paymentIntent.status === 'succeeded') {
        const response = await confirmSubscription(paymentIntent.client_secret);
        if (response === 200) {
          navigate('/');
        }
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="stripe-input">
        <CardElement />
      </div>

      <button type="submit" disabled={!stripe} className="confirm-btn">
        Confirm Payment
      </button>
    </form>
  );
}

export default CheckoutForm;

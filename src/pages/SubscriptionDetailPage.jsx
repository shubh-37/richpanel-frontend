import { Fragment, useContext, useState } from 'react';
import '../css/subscription.css';
import data from '../data';
import Toggle from '../components/Toggle';
import { useNavigate } from 'react-router-dom';
import { productContext } from '../context/ProductContextProvider';

export default function SubscriptionDetail() {
  const [isMonthly, setIsMonthly] = useState(true);

  const { paymentObj, setPaymentObj, createSubscription, frequency } = useContext(productContext);
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);
  const handleSquareClick = (index) => {
    setActiveIndex(index);
  };
  function paymentDetails(item) {
    console.log({ frequency });
    setPaymentObj({
      ...paymentObj,
      planName: item.planName,
      planPrice: item[frequency].price,
      billingCycle: frequency,
      priceId: item[frequency].priceId
    });
  }
  return (
    <Fragment>
      <div>
        <h3 style={{ textAlign: 'center' }}>Choose the right plan for you</h3>
      </div>
      <div className="container">
        <div className="heading-container">
          <Toggle isMonthly={isMonthly} setIsMonthly={setIsMonthly} />
          <div className="columns">
            <p>Monthly Price</p>

            <p>Video Quality</p>
            <p>Resolution</p>
            <p>Devices you can use to watch</p>
          </div>
        </div>

        <div className="square-box-container">
          {data.map((box, index) => (
            <div key={index}>
              <div
                className={`square-box ${index === activeIndex ? 'active' : ''}`}
                onClick={() => {
                  handleSquareClick(index);
                  paymentDetails(box);
                }}
              >
                {index === activeIndex && <div className="arrow"></div>}
                {box.planName}
              </div>
              {isMonthly ? (
                <>
                  <p
                    style={{
                      color: index === activeIndex ? '#073980' : '',
                      textAlign: 'center'
                    }}
                  >
                    ₹ {box.monthly.price}
                  </p>
                  <hr />
                </>
              ) : (
                <>
                  <p
                    style={{
                      color: index === activeIndex ? '#073980' : '',
                      textAlign: 'center'
                    }}
                  >
                    ₹ {box.yearly.price}
                  </p>
                  <hr />
                </>
              )}

              <p
                style={{
                  color: index === activeIndex ? '#073980' : '',
                  textAlign: 'center'
                }}
              >
                {box.videoQuality}
              </p>
              <hr />
              <p
                style={{
                  color: index === activeIndex ? '#073980' : '',
                  textAlign: 'center'
                }}
              >
                {box.resolution}
              </p>
              <hr />
              <p
                style={{
                  color: index === activeIndex ? '#073980' : '',
                  textAlign: 'center'
                }}
              >
                <div
                  style={{
                    color: index === activeIndex ? '#073980' : '',
                    textAlign: 'center'
                  }}
                >
                  {box.devices.map((item, index) => (
                    <p key={index}>{item}</p>
                  ))}
                </div>
              </p>
            </div>
          ))}
        </div>
      </div>
      <button
        className="next-btn"
        onClick={async () => {
          await createSubscription(paymentObj);
          navigate('/checkout', { state: paymentObj });
        }}
      >
        Next
      </button>
    </Fragment>
  );
}

import { useContext } from 'react';
import '../css/homepage.css';
import moment from 'moment-timezone';
import { productContext } from '../context/ProductContextProvider';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const { cancelSubscription, isActive } = useContext(productContext);

  const today = moment().format('MMM Do YYYY');
  const nextMonthFromToday = moment().add(1, 'M').format('MMM Do YYYY');
  const nextYearFromToday = moment().add(1, 'Y').format('MMM Do YYYY');
  const navigate = useNavigate();
  const subscriptionInfo = JSON.parse(localStorage.getItem('subscriptionInfo'));
  return (
    <div className="home-container">
      <div className="home-content">
        <div className="header">
          <div style={{ display: 'flex', height: '1.5rem', alignItems: 'center' }}>
            <h4>Current Plan Details</h4>
            <p className={isActive ? 'active-state' : 'canceled-state'}>{isActive ? 'Active' : 'Cancelled'}</p>
          </div>
          <div>
            {isActive ? (
              <button onClick={() => cancelSubscription(subscriptionInfo?.subscriptionId)}>Cancel</button>
            ) : (
              <></>
            )}
          </div>
        </div>
        <div className="body">
          <p className="plan-heading">{subscriptionInfo?.subscriptionName}</p>
          <p className="sub-desc">Phone + Tablet</p>
          <span>
            <b style={{ fontSize: 'x-large' }}>₹ {subscriptionInfo?.planPrice}</b>
            {subscriptionInfo?.billingCycle === 'yearly' ? '/yr' : '/mon'}
          </span>
          <button className="change-btn" onClick={() => navigate('/plans')}>
            {isActive ? 'Change Plan' : 'Choose Plan'}
          </button>
        </div>
        <div className="footer">
          <p className="footer-text">
            {`Your subscription has started on ${today} and will auto renew
            on ${subscriptionInfo?.billingCycle === 'yearly' ? nextYearFromToday : nextMonthFromToday}.`}
          </p>
        </div>
      </div>
    </div>
  );
}

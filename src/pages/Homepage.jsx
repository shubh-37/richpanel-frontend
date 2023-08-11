import "../css/homepage.css";
import { useLocation } from "react-router-dom";

export default function Home() {
  const location = useLocation();
  const data = location.state;
  return (
    <div className="home-container">
      <div className="home-content">
        <div className="header">
          <div style={{ display: "flex" }}>
            <h4>Current Plan Details</h4>
            <p>Active</p>
          </div>
          <button>Cancel</button>
        </div>
        <div className="body">
          <p>Basic</p>
          <p className="sub-desc">Phone + Tablet</p>
          <span><b>2000</b>/yr</span>
          <button className="change-btn">
            Change plan
          </button>
        </div>
        <div className="footer">
          <p>Your subscription has started on Jul 11th, 2023 and will auto renew on Jul 12th, 2023.</p>
        </div>
      </div>
    </div>
  );
}

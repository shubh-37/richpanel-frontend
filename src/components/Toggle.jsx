import { useState } from "react";
import "../css/toggle.css"; // We will define the styles in this file.

const Toggle = ({isMonthly, setIsMonthly}) => {
  

  return (
    <div className="toggle-container">
      <div
        className={`toggle-option ${isMonthly ? "active" : ""}`}
        onClick={() => setIsMonthly(true)}
      >
        Monthly
      </div>
      <div
        className={`toggle-option ${!isMonthly ? "active" : ""}`}
        onClick={() => setIsMonthly(false)}
      >
        Yearly
      </div>
    </div>
  );
};

export default Toggle;

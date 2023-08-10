import { Fragment, useState } from "react";
import "../css/subscription.css";
import data from "../data";
import Toggle from "../components/Toggle";

export default function SubscriptionDetail() {
  const [isMonthly, setIsMonthly] = useState(true);

  const [activeIndex, setActiveIndex] = useState(0);
  const handleSquareClick = (index) => {
    setActiveIndex(index);
  };

  const columnNames = [
    "Monthly Price",
    "Video Quality",
    "Resolution",
    "Devices",
  ];
  return (
    <Fragment>
      <div>
        <h3>Choose the right plan for you</h3>
        <table>
          <tr>
            <th className="toggle-heading">
              <Toggle isMonthly={isMonthly} setIsMonthly={setActiveIndex} />
            </th>
            {/* <th className="plan-heading">Mobile</th>
            <th className="plan-heading">Basic</th>
            <th className="plan-heading">Standard</th>
            <th className="plan-heading">Premium</th> */}
            {data.map((item, index) => (
              <th key={index}>
                <div
                  className={`square-box ${
                    index === activeIndex ? "active" : ""
                  }`}
                  onClick={() => handleSquareClick(index)}
                >
                  {index === activeIndex && <div className="arrow"></div>}
                  {item.planName}
                </div>
              </th>
            ))}
          </tr>

          {columnNames.map((item, index) => (
            <tr key={index}>{item}</tr>
          ))}
          {data.map((item, index) => (
            <>
              <tr>
                <td key={index}>{item.monthlyPrice}</td>
                {/* <td>{item.videoQuality}</td>
              <td>{item.resolution}</td> */}
              </tr>
            </>
          ))}
        </table>
      </div>

      <div>
        <h3 style={{ textAlign: "center" }}>Choose the right plan for you</h3>
      </div>
      <div className="container">
        <div className="heading-container">
          <Toggle isMonthly={isMonthly} setIsMonthly={setIsMonthly} />
          <div className="columns">
            <p>Monthly Price</p>
            <p>Video Quality</p>
            <p>Resolution</p>
            <p>Device you can watch on</p>
          </div>
        </div>

        <div className="square-box-container">
          {data.map((box, index) => (
            <div key={index}>
              <div
                className={`square-box ${
                  index === activeIndex ? "active" : ""
                }`}
                onClick={() => handleSquareClick(index)}
              >
                {index === activeIndex && <div className="arrow"></div>}
                {box.planName}
              </div>
              {isMonthly ? (
                <p
                  style={{
                    color: index === activeIndex ? "#073980" : "",
                    textAlign: "center",
                  }}
                >
                  {box.monthlyPrice}
                </p>
              ) : (
                <p style={{ color: index === activeIndex ? "#073980" : "" }}>
                  {box.yearlyPrice}
                </p>
              )}

              <p style={{ color: index === activeIndex ? "#073980" : "" }}>
                {box.videoQuality}
              </p>
              <p style={{ color: index === activeIndex ? "#073980" : "" }}>
                {box.resolution}
              </p>
              <p style={{ color: index === activeIndex ? "#073980" : "" }}>
                <div style={{ color: index === activeIndex ? "#073980" : "" }}>
                  {box.devices.map((item, index) => (
                    <p key={index}>{item}</p>
                  ))}
                </div>
              </p>
            </div>
          ))}
        </div>
      </div>
      <button className="next-btn">Next</button>
    </Fragment>
  );
}

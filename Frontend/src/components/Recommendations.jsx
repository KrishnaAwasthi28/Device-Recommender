import React from "react";
import { useLocation } from "react-router-dom";
// import "./Recommendations.css"; // Add your CSS for styling cards

function Recommendations() {
  const location = useLocation();
  const devices = location.state?.devices || []; // array of 5 devices from backend

  if (devices.length === 0) {
    return <h2>No recommendations found.</h2>;
  }

  return (
    <div className="recommendations-page">
      <h1>Top Device Recommendations</h1>
      <div className="device-cards-container">
        {devices.map((device, idx) => {
          // Generate Flipkart search URL dynamically
          const flipkartLink = `https://www.flipkart.com/search?q=${encodeURIComponent(
            device.brand + " " + device.device_name
          )}`;

          return (
            <div className="device-card-rec" key={idx}>
              <h3>{device.device_name}</h3>
              <p><strong>Brand:</strong> {device.brand}</p>
              <a
                href={flipkartLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <button>View on Flipkart</button>
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Recommendations;

import React, { useState } from "react";
import deviceData from "./device_dataset.json";
// import "./Devices.css";

function Devices() {
  const [selectedType, setSelectedType] = useState("Mobile");

  const handleTypeChange = (type) => {
    setSelectedType(type);
  };

  // Filter devices based on selected type
  const filteredDevices = deviceData
    .filter((d) => d.device_type.toLowerCase() === selectedType.toLowerCase())
    .sort((a, b) => a.chosen_device.localeCompare(b.chosen_device));

  return (
    <div className="devices-page">
      <div className="device-buttons">
        <button
          className={selectedType === "Mobile" ? "active" : ""}
          onClick={() => handleTypeChange("Mobile")}
        >
          Mobile
        </button>
        <button
          className={selectedType === "Tablet" ? "active" : ""}
          onClick={() => handleTypeChange("Tablet")}
        >
          Tablet
        </button>
        <button
          className={selectedType === "Laptop" ? "active" : ""}
          onClick={() => handleTypeChange("Laptop")}
        >
          Laptop
        </button>
      </div>

      <div className="device-list">
        {filteredDevices.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Device Name</th>
                <th>Brand</th>
                <th>Use Case</th>
                <th>Budget Range</th>
              </tr>
            </thead>
            <tbody>
              {filteredDevices.map((device, index) => (
                <tr key={index}>
                  <td>{device.chosen_device}</td>
                  <td>{device.brand_preference}</td>
                  <td>{device.use_case}</td>
                  <td>{device.budget_range}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No devices found</p>
        )}
      </div>
    </div>
  );
}

export default Devices;

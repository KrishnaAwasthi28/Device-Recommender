import React from "react";
import { useNavigate } from "react-router-dom";
import { IoIosLaptop } from "react-icons/io";
import { CiMobile3 } from "react-icons/ci";
import { BsTablet } from "react-icons/bs";

function Home() {
  const navigate = useNavigate();

  const goToForm = (deviceType) => {
    navigate(`/form/${deviceType}`);
  };

  return (
    <div className="home-page">
      {/* Intro Section */}
      <header className="intro">
        <h1>Find Your Perfect Device</h1>
        <p>AI-powered recommendations tailored to your needs.</p>
      </header>

      {/* Device Selection */}
      <section className="device-selection">
        <h2>Choose Your Device</h2>
        <div className="device-cards">
          <div className="device-card" onClick={() => goToForm("Mobile")}>
            {/* <img src={mobileIcon} alt="Mobile" /> */}
            <span><CiMobile3/></span>
            <h3>Mobile</h3>
          </div>
          <div className="device-card" onClick={() => goToForm("Tablet")}>
            {/* <img src={tabletIcon} alt="Tablet" /> */}
            <span><BsTablet/></span>
            <h3>Tablet</h3>
          </div>
          <div className="device-card" onClick={() => goToForm("Laptop")}>
            {/* <img src={laptopIcon} alt="Laptop" /> */}
            <span><IoIosLaptop/></span>
            <h3>Laptop</h3>
          </div>
        </div>
      </section>

      {/* Outro/Footer */}
      <footer className="outro">
        <p>Smart recommendations. Better choices. All tailored for you.</p>
        <p>© 2025 DeviceFinder. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Home;

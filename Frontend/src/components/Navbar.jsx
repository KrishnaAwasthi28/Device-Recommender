import React from "react";
import { MdOutlineRecommend } from "react-icons/md";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <nav className="navbar">
        
      <div className="logo">DeviceFinder</div>
      <ul className="nav-links">
        <li>
          <Link to={'/'}>Home</Link>
        </li>
        <li>
          <Link to={'/devices'}>Devices</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

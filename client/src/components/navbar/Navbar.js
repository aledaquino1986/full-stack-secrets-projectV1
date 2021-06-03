import React from "react";
import "./navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header>
      <div className="header__logo">
        <p>Your secret</p>
      </div>

      <nav className="header__nav">
        <ul className="nav-links-container">
          <li>
            <Link to="/">Home Page</Link>
          </li>
          <li>
            <Link to="/write-secret"> Write your secret</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;

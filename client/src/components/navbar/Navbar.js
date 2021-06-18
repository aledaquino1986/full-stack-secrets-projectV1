import React from "react";
import "./navbar.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {
  const { authState, setAuthState } = useContext(AuthContext);

  const logOut = () => {
    setAuthState({
      username: "",
      id: null,
      status: false
    });
    localStorage.removeItem("accessToken");
  };
  return (
    <header>
      <div className="header__logo">
        <p>Your secret</p>
      </div>

      <nav className="header__nav">
        <ul style={{ width: "30rem" }} className="nav-links-container">
          <li>
            <Link to="/">Home Page</Link>
          </li>
          <li>
            <Link to="/write-secret"> Write your secret</Link>
          </li>

          {!authState.status ? (
            <>
              <li>
                <Link to="/users/login"> Login</Link>
              </li>

              <li>
                <Link to="/users/register"> Register</Link>
              </li>
            </>
          ) : (
            <button onClick={logOut}>Logout</button>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;

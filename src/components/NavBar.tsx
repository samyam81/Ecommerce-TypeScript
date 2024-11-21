import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "./CartContext";
import "bootstrap/dist/css/bootstrap.min.css";

const NavBar = () => {
  const { cartItems } = useCart();

  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark"
      style={{ backgroundColor: "#333" }}
    >
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">
          Home
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/about" className="nav-link">
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/contact" className="nav-link">
                Contact
              </Link>
            </li>
          </ul>
        </div>
        <div className="d-flex align-items-center" style={{ color: "white" }}>
          <Link to="/cart" className="nav-link">
            <i className="bi bi-bag text-white"></i> ({cartItems.length})
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;

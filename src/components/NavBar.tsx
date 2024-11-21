import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "./CartContext"; 

const NavBar = () => {
  const { cartItems } = useCart(); 

  return (
    <nav style={{ padding: "10px", backgroundColor: "#333", color: "white" }}>
      <Link
        to="/"
        style={{ color: "white", textDecoration: "none", marginRight: "20px" }}
      >
        Home
      </Link>
      <Link
        to="/about"
        style={{ color: "white", textDecoration: "none", marginRight: "20px" }}
      >
        About
      </Link>
      <Link
        to="/contact"
        style={{ color: "white", textDecoration: "none", marginRight: "20px" }}
      >
        Contact
      </Link>
      <div style={{ float: "right" }}>
        <Link to="/cart" style={{ color: "white", textDecoration: "none" }}>
          Cart ({cartItems.length})
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;

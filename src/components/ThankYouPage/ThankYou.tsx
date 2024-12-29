import React, { useEffect } from "react";
import { useCart } from "../Cart/CartContext";
import { Link } from "react-router-dom";
import "../Styles/Main.css";
import "../Styles/Responsive.css";
import "../Styles/Animation.css"; // Import Animation.css

const ThankYou: React.FC = () => {
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();
  }, []);

  return (
    <div className="container text-center py-5">
      {/* Apply the fade-in Animation class */}
      <h1 className="display-4 text-success mb-4 fade-in pop-effect">
        Thank You for Your Purchase!
      </h1>
      <p className="lead text-muted mb-4 fade-in-fast">
        Your order is being processed. We hope to serve you again soon!
      </p>
      <p className="text-muted mb-4 fade-in-fast">
        Need assistance? Contact us at{" "}
        <a href="mailto:ecommerce@example.com" className="text-success">
          ecommerce@example.com
        </a>
      </p>
      <div className="d-flex justify-content-center gap-3">
        <button
          className="btn btn-lg btn-success mt-3 px-4 py-3 rounded-pill shadow-lg hover-shadow scale-up pop-effect"
          onClick={() => (window.location.href = "/")}
        >
          Continue Shopping
        </button>
        <Link to="/contact">
          <button className="btn btn-lg btn-outline-success mt-3 px-4 py-3 rounded-pill shadow-lg hover-shadow scale-up pop-effect">
            Contact Us
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ThankYou;

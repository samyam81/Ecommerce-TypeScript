import { Link } from "react-router-dom";
import { useCart } from "../Cart/CartContext";
import { useWish } from "../Wish/WishContext";

const NavBar = () => {
  const { cartItems } = useCart();
  const { wishItems } = useWish();

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-transparent shadow-sm p-3 mb-3">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand text-primary fw-bold">
          <i className="bi bi-shop"></i>
        </Link>

        {/* Toggle Button */}
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

        {/* Navbar Links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
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

          {/* Cart and Wish List Links */}
          <div className="d-flex">
            <Link
              to="/cart"
              className="btn btn-outline-primary me-2"
              style={{ position: "relative" }}
            >
              Cart
              <span
                className="badge bg-primary text-white rounded-pill"
                style={{
                  position: "absolute",
                  top: "-5px",
                  right: "-10px",
                  fontSize: "0.8rem",
                }}
              >
                {cartItems.length}
              </span>
            </Link>

            <Link
              to="/wish"
              className="btn btn-outline-secondary"
              style={{ position: "relative" }}
            >
              Wish List
              <span
                className="badge bg-secondary text-white rounded-pill"
                style={{
                  position: "absolute",
                  top: "-5px",
                  right: "-10px",
                  fontSize: "0.8rem",
                }}
              >
                {wishItems.length}
              </span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
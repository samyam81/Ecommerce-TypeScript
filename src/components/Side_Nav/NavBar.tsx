import { Link } from "react-router-dom";
import { useCart } from "../Cart/CartContext";
import { useWish } from "../Wish/WishContext";
import { useFilter } from "../Filter/FilterContext";
import { useState } from "react";

const NavBar = () => {
  const { cartItems } = useCart();
  const { wishItems } = useWish();
  const {
    searchQuery,
    setSearchQuery,
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
  } = useFilter();

  const [isActive, setIsActive] = useState(false); // For mobile menu toggle

  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setMinPrice(value >= 0 ? value : 0);
  };

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setMaxPrice(value >= 0 ? value : 0);
  };

  return (
    <nav className="navbar sticky-top shadow-md" style={{ background: "white" }}>
      <div className="container">
        {/* Brand and Mobile Toggle */}
        <div className="d-flex justify-content-between align-items-center w-100">
          <Link
            to="/"
            className="navbar-brand slide-in-left"
          >
            <i className="bi bi-shop me-2"></i>
            <span className="text-royal">Samyam</span>Shop
          </Link>

          {/* Desktop Menu */}
          <div className="navbar-nav d-none d-md-flex">
            <Link to="/about" className="nav-link slide-in-right">
              About
            </Link>
            <Link to="/contact" className="nav-link slide-in-right">
              Contact
            </Link>
          </div>

          {/* Search and Price Filter Section - Desktop */}
          <div className="d-none d-md-flex align-items-center">
            <div className="d-flex me-3">
              <input
                type="text"
                className="form-control me-2"
                placeholder="Search for Items"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <input
                type="number"
                className="form-control me-2"
                placeholder="Min"
                value={minPrice ?? ""}
                onChange={handleMinPriceChange}
              />
              <input
                type="number"
                className="form-control"
                placeholder="Max"
                value={maxPrice ?? ""}
                onChange={handleMaxPriceChange}
              />
            </div>

            {/* Cart and Wishlist */}
            <div className="d-flex">
              <Link to="/cart" className="btn btn-outline-primary me-2 hover-lift">
                <i className="bi bi-cart me-1"></i>
                Cart
                {cartItems.length > 0 && (
                  <span className="badge badge-primary ms-1">{cartItems.length}</span>
                )}
              </Link>

              <Link to="/wish" className="btn btn-wine hover-lift">
                <i className="bi bi-heart me-1"></i>
                Wishlist
                {wishItems.length > 0 && (
                  <span className="badge badge-outline-primary ms-1">{wishItems.length}</span>
                )}
              </Link>
            </div>
          </div>

          {/* Mobile menu toggle button */}
          <button
            className="navbar-toggler d-md-none"
            type="button"
            onClick={() => setIsActive(!isActive)}
          >
            <i className={`bi ${isActive ? "bi-x" : "bi-list"}`}></i>
          </button>
        </div>

        {/* Mobile Menu */}
        {isActive && (
          <div className="mobile-menu d-md-none w-100 mt-3 fade-in">
            <div className="d-flex flex-column">
              <Link
                to="/about"
                className="nav-link py-2"
                onClick={() => setIsActive(false)}
              >
                About
              </Link>
              <Link
                to="/contact"
                className="nav-link py-2"
                onClick={() => setIsActive(false)}
              >
                Contact
              </Link>

              <div className="py-3">
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Search for Items"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <div className="d-flex">
                  <input
                    type="number"
                    className="form-control me-2"
                    placeholder="Min Price"
                    value={minPrice ?? ""}
                    onChange={handleMinPriceChange}
                  />
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Max Price"
                    value={maxPrice ?? ""}
                    onChange={handleMaxPriceChange}
                  />
                </div>
              </div>

              <div className="d-flex justify-content-between mt-2">
                <Link
                  to="/cart"
                  className="btn btn-outline-primary flex-grow-1 me-2"
                  onClick={() => setIsActive(false)}
                >
                  <i className="bi bi-cart me-1"></i>
                  Cart
                  {cartItems.length > 0 && (
                    <span className="badge badge-primary ms-1">{cartItems.length}</span>
                  )}
                </Link>

                <Link
                  to="/wish"
                  className="btn btn-wine  flex-grow-1"
                  onClick={() => setIsActive(false)}
                >
                  <i className="bi bi-heart me-1"></i>
                  Wishlist
                  {wishItems.length > 0 && (
                    <span className="badge text-danger badge-outline-primary ms-1">{wishItems.length}</span>
                  )}
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
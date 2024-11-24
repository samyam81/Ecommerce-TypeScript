import { Link } from "react-router-dom";
import { useCart } from "../Cart/CartContext";
import { useWish } from "../Wish/WishContext";
import { useFilter } from "../Filter/FilterContext";

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

  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setMinPrice(value >= 0 ? value : 0);
  };

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setMaxPrice(value >= 0 ? value : 0);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm p-3 mb-3">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand text-primary fw-bold">
          <i className="bi bi-shop"></i> SamyamREACT
        </Link>

        {/* Toggle Button for Mobile */}
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

          {/* Search and Price Filter Section */}
          <div className="d-flex gap-2 me-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search for Items"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <input
              type="number"
              className="form-control"
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

          {/* Cart and Wish List Links with badges */}
          <div className="d-flex">
            <Link
              to="/cart"
              className="btn btn-outline-primary position-relative me-2"
            >
              <i className="bi bi-cart"></i> Cart
              <span
                className="badge bg-primary text-white rounded-pill position-absolute"
                style={{
                  top: "-5px",
                  right: "-10px",
                  fontSize: "0.75rem",
                }}
              >
                {cartItems.length}
              </span>
            </Link>

            <Link
              to="/wish"
              className="btn btn-outline-secondary position-relative"
            >
              <i className="bi bi-heart"></i> Wish List
              <span
                className="badge bg-secondary text-white rounded-pill position-absolute"
                style={{
                  top: "-5px",
                  right: "-10px",
                  fontSize: "0.75rem",
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

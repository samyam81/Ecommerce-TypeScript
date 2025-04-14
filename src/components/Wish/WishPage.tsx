import React from "react";
import { useWish } from "./WishContext";
import { Link } from "react-router-dom";
import "../Styles/Main.css";
import "../Styles/Responsive.css";
import "../Styles/Animation.css";

const Wishpage = () => {
  const { wishItems, removeItemFromWish } = useWish();

  return (
    <section className="section main-content">
      <div className="container fade-in">
        <div className="text-center mb-5">
          <h1 className="mb-3">Your Wishlist</h1>
          <p className="text-muted">Items you've saved for later</p>
        </div>

        {/* Empty Wishlist State */}
        {wishItems.length === 0 ? (
          <div className="card shadow-royal text-center p-5 fade-in">
            <div className="card-body">
              <div className="mb-4">
                <i className="bi bi-heart" style={{ fontSize: "4rem", color: "var(--red-wine-light)" }}></i>
              </div>
              <h2 className="h3 mb-3">Your wishlist is empty!</h2>
              <p className="text-muted mb-4">Start adding items to your wishlist to keep track of products you love.</p>
              <Link
                to="/"
                className="btn btn-primary btn-lg hover-lift"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        ) : (
          <>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <p className="text-muted mb-0">{wishItems.length} {wishItems.length === 1 ? 'item' : 'items'} in your wishlist</p>
              <div className="dropdown">
                <button className="btn btn-outline-secondary btn-sm dropdown-toggle" type="button" id="sortDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                  Sort by
                </button>
                <ul className="dropdown-menu" aria-labelledby="sortDropdown">
                  <li><button className="dropdown-item">Newest first</button></li>
                  <li><button className="dropdown-item">Price: high to low</button></li>
                  <li><button className="dropdown-item">Price: low to high</button></li>
                </ul>
              </div>
            </div>

            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
              {wishItems.map((item) => (
                <div key={item.id} className="col">
                  <div className="card product-card h-100 slide-in-right">
                    <div className="position-relative">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="card-img-top"
                        style={{ height: "240px", objectFit: "cover" }}
                      />
                      <button
                        className="wishlist-icon active"
                        onClick={() => removeItemFromWish(item.id)}
                        aria-label="Remove from wishlist"
                      >
                        <i className="bi bi-heart-fill"></i>
                      </button>
                    </div>
                    <div className="card-body d-flex flex-column">
                      <h5 className="card-title">{item.title}</h5>
                      <div className="product-price mt-2 mb-3">${item.price.toFixed(2)}</div>
                      <div className="mt-auto">
                        <Link
                          to={`/product/${item.id}`}
                          className="btn btn-primary w-100 mb-2"
                        >
                          View Details
                        </Link>
                        <button
                          onClick={() => removeItemFromWish(item.id)}
                          className="btn btn-outline-wine w-100"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Wishlist Actions */}
            <div className="d-flex justify-content-between mt-5">
              <Link to="/" className="btn btn-outline-secondary">
                <i className="bi bi-arrow-left me-2"></i>
                Continue Shopping
              </Link>
              <button className="btn btn-wine">
                Clear Wishlist
              </button>
            </div>
          </>
        )}

        {/* Newsletter */}
        <div className="ad-section mt-5">
          <div className="row align-items-center">
            <div className="col-md-7">
              <h4>Get updates on new arrivals and sales</h4>
              <p>Subscribe to our newsletter to receive exclusive offers and be the first to know about new products.</p>
            </div>
            <div className="col-md-5">
              <div className="input-group">
                <input type="email" className="form-control" placeholder="Your email address" />
                <button className="btn btn-gold" type="button">Subscribe</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Wishpage;
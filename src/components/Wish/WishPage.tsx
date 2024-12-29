import { useWish } from "./WishContext";
import { Link } from "react-router-dom";
import "../Styles/Main.css";
import "../Styles/Responsive.css";
import "../Styles/Animation.css"
const Wishpage = () => {
  const { wishItems, removeItemFromWish } = useWish();

  return (
    <div className="container my-5">
      <h1 className="text-center mb-4 fade-in">💖 Your Wishlist</h1>

      {/* Empty Wishlist State */}
      {wishItems.length === 0 ? (
        <div className="text-center mt-4 fade-in">
          <p className="text-muted fs-4">Your wishlist is empty!</p>
          <Link
            to="/"
            className="btn btn-lg btn-primary mt-3 px-4 py-3 rounded-pill shadow-lg"
          >
            🛍️ Start Adding Favorites
          </Link>
        </div>
      ) : (
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {wishItems.map((item) => (
            <div key={item.id} className="col d-flex justify-content-center">
              <div
                className="card shadow-sm border-0 card-zoom"
                style={{
                  width: "20rem",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  opacity: 0,
                  animation: "fadeIn 0.5s forwards",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.05)";
                  e.currentTarget.style.boxShadow =
                    "0 6px 20px rgba(0, 0, 0, 0.2)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="card-img-top"
                  style={{
                    height: "220px",
                    objectFit: "cover",
                    borderTopLeftRadius: "8px",
                    borderTopRightRadius: "8px",
                    transition: "transform 0.3s ease",
                  }}
                />
                <div className="card-body text-center">
                  <h5
                    className="card-title"
                    style={{ fontSize: "1.3rem", fontWeight: "bold" }}
                  >
                    {item.title}
                  </h5>
                  <p className="card-text text-danger fs-5 fw-semibold">
                    Price: ${item.price}
                  </p>
                  <div className="d-grid gap-2">
                    <button
                      onClick={() => removeItemFromWish(item.id)}
                      className="btn btn-outline-danger shadow-sm animate-remove"
                    >
                      🗑️ Remove
                    </button>
                    <Link
                      to={`/product/${item.id}`}
                      className="btn btn-outline-primary shadow-sm animate-view"
                    >
                      🔍 View Details
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishpage;

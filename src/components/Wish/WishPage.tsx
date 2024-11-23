import { useWish } from "./WishContext";
import { Link } from "react-router-dom";

const Wishpage = () => {
  const { wishItems, removeItemFromWish } = useWish();

  if (wishItems.length === 0) {
    return (
      <p className="text-center mt-4" style={{ fontSize: "1.2rem" }}>
        Your wishlist is empty!
      </p>
    );
  }

  return (
    <div className="container my-5 p-4 bg-light rounded shadow-sm">
      <h1 className="text-center mb-4">Your Wishlist</h1>
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {wishItems.map((item) => (
          <div key={item.id} className="col d-flex justify-content-center">
            <div className="card shadow-sm" style={{ width: "18rem" }}>
              <img
                src={item.image}
                alt={item.title}
                className="card-img-top"
                style={{
                  height: "200px",
                  objectFit: "cover",
                  borderRadius: "8px 8px 0 0",
                }}
              />
              <div className="card-body text-center">
                <h5 className="card-title" style={{ fontSize: "1.2rem" }}>
                  {item.title}
                </h5>
                <p className="card-text font-weight-bold text-danger">
                  Price: {item.price} USD
                </p>
                <button
                  onClick={() => removeItemFromWish(item.id)}
                  className="btn btn-danger w-100"
                >
                  Remove
                </button>
                <Link
                  to={`/product/${item.id}`}
                  className="btn btn-link text-primary d-block mt-2"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishpage;

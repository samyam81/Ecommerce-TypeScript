import { useWish } from "./WishContext";
import { Link } from "react-router-dom";

const Wishpage = () => {
  const { wishItems, removeItemFromWish } = useWish();

  if (wishItems.length === 0) {
    return (
      <p style={{ textAlign: "center", fontSize: "1.2rem", marginTop: "20px" }}>
        Your wishlist is empty!
      </p>
    );
  }

  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "1200px",
        margin: "0 auto",
        backgroundColor: "#f9f9f9",
        borderRadius: "8px",
      }}
    >
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
        Your Wishlist
      </h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: "20px",
        }}
      >
        {wishItems.map((item) => (
          <div
            key={item.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "10px",
              backgroundColor: "#fff",
              textAlign: "center",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            }}
          >
            <img
              src={item.image}
              alt={item.title}
              style={{
                maxWidth: "100%",
                height: "150px",
                objectFit: "cover",
                marginBottom: "10px",
                borderRadius: "8px",
              }}
            />
            <h2 style={{ fontSize: "1.2rem", margin: "10px 0" }}>
              {item.title}
            </h2>
            <p style={{ fontWeight: "bold", color: "#7B0323" }}>
              Price: {item.price} USD
            </p>
            <button
              onClick={() => removeItemFromWish(item.id)}
              style={{
                padding: "8px 16px",
                backgroundColor: "#dc3545",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                marginTop: "10px",
              }}
            >
              Remove
            </button>
            <Link
              to={`/product/${item.id}`}
              style={{
                display: "block",
                marginTop: "10px",
                textDecoration: "none",
                color: "#007bff",
              }}
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishpage;

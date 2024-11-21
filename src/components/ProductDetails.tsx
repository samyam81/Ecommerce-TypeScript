import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useWish } from "./WishContext"; // Import useWish

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<any | null>(null);
  const { addItemToWish } = useWish(); // Destructure addItemToWish

  useEffect(() => {
    axios
      .get(`http://dummyjson.com/products/${id}`)
      .then((response) => {
        setProduct(response.data);
      })
      .catch((error) => {
        console.error("Error fetching product details", error);
      });
  }, [id]);

  if (!product) return <div>Loading...</div>;

  return (
    <div className="product-details" style={styles.productDetails}>
      <h1 className="product-title" style={styles.productTitle}>
        {product.title}
      </h1>
      {/* Centered Image */}
      <div style={styles.imageContainer}>
        <img
          src={product.images[0]} // Use the first image from the images array
          alt={product.title}
          className="product-image"
          style={styles.productImage}
        />
      </div>
      <p className="product-description" style={styles.productDescription}>
        {product.description}
      </p>
      <p className="product-price" style={styles.productPrice}>
        Price: {product.price} USD
      </p>
      <p className="product-rating" style={styles.productRating}>
        Rating: {product.rating} ⭐
      </p>

      {/* Back Button */}
      <Link to="/">
        <button
          style={{
            padding: "10px 20px",
            backgroundColor: "#28a745",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "16px",
            transition: "background-color 0.3s ease",
          }}
        >
          Back
        </button>
      </Link>

      {/* Add to Wish Button */}
      <button
        className="add-to-cart-button"
        onClick={() => {
          addItemToWish({
            id: product.id,
            title: product.title,
            price: product.price,
          });
          console.log("Item added to wish list");
        }}
        style={{
          padding: "10px 20px",
          backgroundColor: "#ffc107",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          fontSize: "16px",
          marginTop: "10px",
        }}
      >
        Add to Wish
      </button>
    </div>
  );
};

// Styles for the component
const styles: Record<string, React.CSSProperties> = {
  productDetails: {
    padding: "20px",
    maxWidth: "900px",
    margin: "0 auto",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
  productTitle: {
    fontSize: "2rem",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: "15px",
  },
  imageContainer: {
    textAlign: "center",
    marginBottom: "15px",
  },
  productImage: {
    width: "300px",
    height: "auto",
    objectFit: "contain",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
  productDescription: {
    fontSize: "1rem",
    lineHeight: "1.6",
    color: "#555",
    marginBottom: "15px",
  },
  productPrice: {
    fontSize: "1.2rem",
    fontWeight: "bold",
    color: "#7B0323",
    marginBottom: "10px",
  },
  productRating: {
    fontSize: "1rem",
    marginBottom: "10px",
  },
};

export default ProductDetails;

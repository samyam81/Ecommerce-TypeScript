import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const ProductDetails = () => {
  const { id } = useParams(); // Get the product ID from the URL
  const [product, setProduct] = useState<any | null>(null);

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
      {/* Ensure the image source is from the images array */}
      <img
        src={product.images[0]} // Use the first image from the images array
        alt={product.title}
        className="product-image"
        style={styles.productImage}
      />
      <p className="product-description" style={styles.productDescription}>
        {product.description}
      </p>
      <p className="product-price" style={styles.productPrice}>
        Price: {product.price} USD
      </p>
      <p className="product-rating" style={styles.productRating}>
        Rating: {product.rating} ⭐
      </p>
      <p className="product-stock" style={styles.productStock}>
        Stock Status: {product.availabilityStatus}
      </p>
      <p className="product-warranty" style={styles.productWarranty}>
        Warranty: {product.warrantyInformation}
      </p>
      <p className="product-shipping" style={styles.productShipping}>
        Shipping: {product.shippingInformation}
      </p>
      <div className="product-dimensions" style={styles.productDimensions}>
        <p>
          Dimensions: {product.dimensions.width} x {product.dimensions.height} x{" "}
          {product.dimensions.depth} cm
        </p>
      </div>
      <p className="product-return-policy" style={styles.productReturnPolicy}>
        Return Policy: {product.returnPolicy}
      </p>
      <p className="product-min-order" style={styles.productMinOrder}>
        Minimum Order Quantity: {product.minimumOrderQuantity}
      </p>
      <div className="product-reviews" style={styles.productReviews}>
        <h3>Reviews</h3>
        {product.reviews.map((review: any, index: number) => (
          <div key={index} style={styles.reviewItem}>
            <p>
              <strong>{review.reviewerName}</strong> ({review.date})
            </p>
            <p>Rating: {review.rating} ⭐</p>
            <p>{review.comment}</p>
          </div>
        ))}
      </div>
      <div className="product-meta" style={styles.productMeta}>
        <p>SKU: {product.sku}</p>
        <p>Barcode: {product.meta.barcode}</p>
        <img src={product.meta.qrCode} alt="QR Code" style={styles.qrCode} />
      </div>

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
    </div>
  );
};

// Styles for the component
const styles = {
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
  productImage: {
    width: "80%", // Decreased width to 80% of its container
    height: "auto",
    maxHeight: "250px", // Reduced the max height
    objectFit: "cover",
    marginBottom: "15px",
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
    color: "#28a745",
    marginBottom: "10px",
  },
  productRating: {
    fontSize: "1rem",
    marginBottom: "10px",
  },
  productStock: {
    fontSize: "1rem",
    marginBottom: "10px",
  },
  productWarranty: {
    fontSize: "1rem",
    marginBottom: "10px",
  },
  productShipping: {
    fontSize: "1rem",
    marginBottom: "10px",
  },
  productDimensions: {
    fontSize: "1rem",
    marginBottom: "10px",
  },
  productReturnPolicy: {
    fontSize: "1rem",
    marginBottom: "10px",
  },
  productMinOrder: {
    fontSize: "1rem",
    marginBottom: "15px",
  },
  productReviews: {
    fontSize: "1rem",
    marginBottom: "20px",
  },
  reviewItem: {
    borderTop: "1px solid #ddd",
    paddingTop: "10px",
    paddingBottom: "10px",
  },
  productMeta: {
    fontSize: "1rem",
    marginBottom: "20px",
  },
  qrCode: {
    width: "100px",
    height: "100px",
    marginTop: "10px",
  },
};

export default ProductDetails;

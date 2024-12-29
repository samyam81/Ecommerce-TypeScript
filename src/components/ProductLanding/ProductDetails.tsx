import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useCart } from "../Cart/CartContext";
import { useWish } from "../Wish/WishContext";
import "../Styles/Main.css"; // Ensure you import the updated CSS file with Animations
import "../Styles/Responsive.css";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<any | null>(null);
  const [quantity, setQuantity] = useState<number>(1); // Default to 1
  const { addItemToCart } = useCart();
  const { addItemToWish } = useWish();

  useEffect(() => {
    if (!id) {
      console.error("Product ID is undefined");
      return;
    }

    // Fetch product details
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://dummyjson.com/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product details", error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product)
    return (
      <div className="text-center mt-5">
        <p>Loading product details...</p>
      </div>
    );

  const handleAddToCart = () => {
    addItemToCart({ ...product, quantity });
  };

  const handleAddToWish = () => {
    addItemToWish({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.images[0],
    });
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value)) {
      setQuantity(Math.max(1, value)); // Ensure quantity is always at least 1
    }
  };

  const totalPrice = product.price * quantity;

  return (
    <div className="container mt-5 product-details-container fade-in">
      <div className="card shadow-sm border-0">
        <div className="row g-0">
          <div className="col-md-6">
            <img
              src={product.images[0]}
              alt={product.title}
              className="img-fluid rounded-start product-image"
              style={{ maxHeight: "400px", objectFit: "cover" }}
            />
          </div>
          <div className="col-md-6">
            <div className="card-body">
              <h5 className="card-title">{product.title}</h5>
              <p className="card-text">{product.description}</p>
              <p className="text-success fw-bold">Price: ${product.price}</p>

              {/* Quantity selector with hover effect */}
              <div className="d-flex align-items-center gap-2 mb-3">
                <button
                  className="btn btn-outline-secondary quantity-button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  aria-label="Decrease quantity"
                >
                  <i className="bi bi-dash"></i>
                </button>
                <input
                  type="number"
                  id="quantity"
                  value={quantity}
                  onChange={handleQuantityChange}
                  min="1"
                  className="form-control text-center"
                  style={{ width: "70px" }}
                  aria-label="Product quantity"
                />
                <button
                  className="btn btn-outline-secondary quantity-button"
                  onClick={() => setQuantity(quantity + 1)}
                  aria-label="Increase quantity"
                >
                  <i className="bi bi-plus"></i>
                </button>
              </div>

              <Link to="/" className="btn btn-secondary mb-3">
                <i className="bi bi-arrow-left-circle"></i> Back
              </Link>

              <div className="bg-danger text-white text-center py-2 rounded my-3">
                <p className="mb-0 fs-5">Total: ${totalPrice.toFixed(2)}</p>
              </div>

              {/* Add to Cart Button with hover Animation */}
              <button
                className="btn btn-primary w-100 mb-2 button-hover"
                onClick={handleAddToCart}
              >
                Add to Cart
              </button>

              {/* Add to Wishlist Button */}
              <button
                className="btn btn-outline-warning w-100 button-hover"
                onClick={handleAddToWish}
              >
                Add to Wishlist
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;

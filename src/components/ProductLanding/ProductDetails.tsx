import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useCart } from "../Cart/CartContext"; // Import cart context
import { useWish } from "../Wish/WishContext";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<any | null>(null);
  const [quantity, setQuantity] = useState(1); // State for quantity
  const { addItemToCart } = useCart(); // Get addItemToCart from context
  const { addItemToWish } = useWish(); // Get addItemToWish from context

  useEffect(() => {
    if (!id) {
      console.error("Product ID is undefined");
      return;
    }

    // Fetch product details
    axios
      .get(`http://dummyjson.com/products/${id}`)
      .then((response) => setProduct(response.data))
      .catch((error) => console.error("Error fetching product details", error));
  }, [id]);

  if (!product)
    return (
      <div className="text-center mt-5">
        <p>Loading product details...</p>
      </div>
    );

  const handleAddToCart = (product: any, quantity: number) => {
    // Add the item to the cart with the specified quantity
    addItemToCart({ ...product, quantity });
  };

  const handleAddToWish = (product: any) => {
    // Add or remove the item from the wishlist
    addItemToWish({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.images[0],
    });
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Ensure quantity is a valid number and not less than 1
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value)) {
      setQuantity(Math.max(1, value)); // Set quantity to 1 if it's less than 1
    }
  };

  const handleIncreaseQuantity = () => setQuantity(quantity + 1);
  const handleDecreaseQuantity = () => setQuantity(Math.max(1, quantity - 1));

  const totalPrice = product.price * quantity;

  return (
    <div className="container mt-5">
      <div className="card shadow-sm border-0">
        <div className="row g-0">
          <div className="col-md-6">
            <img
              src={product.images[0]}
              alt={product.title}
              className="img-fluid rounded-start"
              style={{ maxHeight: "400px", objectFit: "cover" }}
            />
          </div>
          <div className="col-md-6">
            <div className="card-body">
              <h5 className="card-title">{product.title}</h5>
              <p className="card-text">{product.description}</p>
              <p className="text-success fw-bold">Price: ${product.price}</p>

              {/* Quantity selector with + and - buttons */}
              <div className="d-flex align-items-center gap-2 mb-3">
                <button
                  className="btn btn-outline-secondary"
                  onClick={handleDecreaseQuantity}
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
                />
                <button
                  className="btn btn-outline-secondary"
                  onClick={handleIncreaseQuantity}
                >
                  <i className="bi bi-plus"></i>
                </button>
              </div>

              {/* Back Button */}
              <Link to="/" className="btn btn-secondary mb-3">
                <i className="bi bi-arrow-left-circle"></i> Back
              </Link>

              {/* Total Price Section */}
              <div className="bg-danger text-white text-center py-2 rounded my-3">
                <p className="mb-0 fs-5">Total: ${totalPrice.toFixed(2)}</p>
              </div>

              {/* Add to Cart Button */}
              <button
                className="btn btn-primary w-100 mb-2"
                onClick={() => handleAddToCart(product, quantity)} // Pass quantity to addItemToCart
              >
                Add to Cart
              </button>

              {/* Add to Wishlist Button */}
              <button
                className="btn btn-outline-warning w-100"
                onClick={() => handleAddToWish(product)} // Add or remove from wishlist
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

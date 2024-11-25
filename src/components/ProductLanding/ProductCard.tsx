import React, { useEffect, useState } from "react";
import { useCart } from "../Cart/CartContext";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaCartPlus, FaMinus, FaPlus } from "react-icons/fa"; // Using react-icons for a better look

const ProductCard = ({
  product,
  onClose,
}: {
  product: any;
  onClose: () => void;
}) => {
  const { cartItems, updateItemQuantity, addItemToCart } = useCart();
  const navigate = useNavigate();

  if (!product || !product.id || !product.title || !product.price) return null;

  // Check if the product is already in the cart
  const cartItem = cartItems.find((item) => item.id === product.id);

  // Initialize quantity to 1 by default if no item in cart, or use cart item's quantity
  const [quantity, setQuantity] = useState<number>(
    cartItem ? cartItem.quantity : 1
  );

  // Update quantity only after the first render when the cartItem is found
  useEffect(() => {
    if (cartItem) {
      setQuantity(cartItem.quantity); // If item exists in cart, set the quantity to the cart value
    }
  }, [cartItem]); // This effect runs when cartItem is updated

  // Calculate total price
  const totalPrice =
    !isNaN(quantity) && !isNaN(product.price)
      ? product.price * quantity
      : product.price;

  // Handle adding item to cart
  const handleAddToCart = () => {
    if (!cartItem) {
      // If the item is not in the cart, add it with the selected quantity
      addItemToCart({ ...product, quantity });
    } else {
      // If the item is already in the cart, update the quantity directly
      updateItemQuantity(cartItem.id, quantity);
    }

    // Navigate to login page if user is not logged in (Optional: Adjust with your auth logic)
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true"; // Example check
    if (!isLoggedIn) {
      navigate("/login"); // Redirect to login if not logged in
    }
  };

  // Handle changes in quantity input
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newQuantity = parseInt(e.target.value) || 1; // Ensure it's at least 1
    newQuantity = Math.max(1, newQuantity); // Enforce min of 1
    setQuantity(newQuantity); // Update the local quantity
  };

  // Handle increase in quantity
  const handleIncrease = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  // Handle decrease in quantity
  const handleDecrease = () => {
    setQuantity((prevQuantity) => Math.max(1, prevQuantity - 1)); // Enforce min of 1
  };

  // Handle back button
  const handleBackClick = () => {
    navigate("/"); // Navigate to home (root path)
  };

  return (
    <div
      className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-flex justify-content-center align-items-center"
      style={{ zIndex: 1000 }}
    >
      <div
        className="bg-white p-4 rounded-3 shadow-lg"
        style={{ maxWidth: "600px", width: "90%" }}
      >
        {/* Back button */}
        <button
          onClick={handleBackClick}
          className="position-absolute top-0 start-0 p-2 border-0 bg-transparent fs-4 text-secondary"
        >
          <FaArrowLeft />
        </button>

        {/* Close button (X) */}
        <button
          onClick={onClose}
          className="position-absolute top-0 end-0 p-2 border-0 bg-transparent fs-4 text-secondary"
        >
          &times;
        </button>

        <h2 className="text-center mb-3">{product.title}</h2>

        <img
          src={product.thumbnail || product.images[0]}
          alt={product.title}
          className="w-100 mb-3 rounded"
          style={{ height: "300px", objectFit: "cover", borderRadius: "15px" }}
        />

        <p className="text-muted mb-3">{product.description}</p>
        <p className="text-success fw-bold mb-3">
          Price: ${product.price.toFixed(2)}
        </p>
        <p className="text-warning mb-3">Rating: {product.rating}</p>

        {/* Quantity Control */}
        <div className="d-flex align-items-center justify-content-center mb-3">
          <button
            className="btn btn-outline-secondary btn-sm shadow-sm"
            onClick={handleDecrease}
            aria-label="Decrease Quantity"
          >
            <FaMinus />
          </button>
          <input
            type="number"
            className="form-control mx-2 text-center"
            value={quantity}
            onChange={handleQuantityChange}
            style={{ width: "70px" }}
            min="1"
          />
          <button
            className="btn btn-outline-secondary btn-sm shadow-sm"
            onClick={handleIncrease}
            aria-label="Increase Quantity"
          >
            <FaPlus />
          </button>
        </div>

        <div className="bg-danger text-white text-center py-2 rounded my-3">
          <p className="mb-0 fs-5">Total: ${totalPrice.toFixed(2)}</p>
        </div>

        {/* Add to Cart Button */}
        <div className="d-flex justify-content-center mb-3">
          <button
            className="btn btn-primary w-100 py-2 shadow-sm"
            onClick={handleAddToCart}
          >
            <FaCartPlus className="me-2" />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

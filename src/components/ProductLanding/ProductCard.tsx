import React, { useEffect, useState } from "react";
import { useCart } from "../Cart/CartContext";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaCartPlus, FaMinus, FaPlus } from "react-icons/fa";
import "../Styles/Main.css";
import "../Styles/Responsive.css";
import "../Styles/Animation.css"; // Importing Animation styles

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

  const cartItem = cartItems.find((item) => item.id === product.id);

  const [quantity, setQuantity] = useState<number>(cartItem ? cartItem.quantity : 1);

  useEffect(() => {
    if (cartItem) {
      setQuantity(cartItem.quantity);
    }
  }, [cartItem]);

  const totalPrice =
    !isNaN(quantity) && !isNaN(product.price)
      ? product.price * quantity
      : product.price;

  const handleAddToCart = () => {
    if (!cartItem) {
      addItemToCart({ ...product, quantity });
    } else {
      updateItemQuantity(cartItem.id, quantity);
    }

    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    if (!isLoggedIn) {
      navigate("/login");
    }
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newQuantity = parseInt(e.target.value) || 1;
    newQuantity = Math.max(1, newQuantity);
    setQuantity(newQuantity);
  };

  const handleIncrease = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleDecrease = () => {
    setQuantity((prevQuantity) => Math.max(1, prevQuantity - 1));
  };

  const handleBackClick = () => {
    navigate("/");
  };

  return (
    <div
      className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-flex justify-content-center align-items-center product-card-container"
      style={{ zIndex: 1000 }}
    >
      <div
        className="bg-white p-4 rounded-3 shadow-lg product-card color-change"
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

        {/* Add to Cart Button with hover Animation */}
        <div className="d-flex justify-content-center mb-3">
          <button
            className="btn btn-primary w-100 py-2 shadow-sm button-hover-color-change"
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

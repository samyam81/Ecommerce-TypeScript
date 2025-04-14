import React, { useEffect, useState } from "react";
import { useCart } from "../Cart/CartContext";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaCartPlus, FaMinus, FaPlus } from "react-icons/fa";

const ProductCard = ({ product, onClose }: { product: any; onClose: () => void }) => {
  const { cartItems, updateItemQuantity, addItemToCart } = useCart();
  const navigate = useNavigate();

  if (!product) return null;

  const cartItem = cartItems.find((item) => item.id === product.id);
  const [quantity, setQuantity] = useState<number>(cartItem ? cartItem.quantity : 1);

  useEffect(() => {
    if (cartItem) setQuantity(cartItem.quantity);
  }, [cartItem]);

  const totalPrice = product.price * quantity;

  const handleAddToCart = () => {
    if (!cartItem) addItemToCart({ ...product, quantity });
    else updateItemQuantity(cartItem.id, quantity);

    if (!localStorage.getItem("isLoggedIn")) navigate("/login");
  };

  return (
    <div className="modal-overlay fade-in" onClick={onClose}>
      <div
        className="modal-content card shadow-royal hover-lift"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          className="close-btn"
          onClick={onClose}
          aria-label="Close modal"
        >
          &times;
        </button>

        {/* Product Info */}
        <div className="card-body">
          <h2 className="card-title text-royal">{product.title}</h2>

          <div className="product-image-container mb-3">
            <img
              src={product.thumbnail}
              alt={product.title}
              className="product-image"
            />
          </div>

          <div className="product-price mb-3">
            ${product.price.toFixed(2)}
          </div>

          {/* Quantity Controls */}
          <div className="quantity-controls mb-4">
            <div className="btn-group">
              <button
                className="btn btn-outline-secondary"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                <FaMinus />
              </button>
              <input
                type="number"
                className="quantity-input"
                value={quantity}
                min={1}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
              />
              <button
                className="btn btn-outline-secondary"
                onClick={() => setQuantity(quantity + 1)}
              >
                <FaPlus />
              </button>
            </div>
          </div>

          {/* Add to Cart */}
          <button
            onClick={handleAddToCart}
            className="btn btn-primary hover-lift w-100"
          >
            <FaCartPlus className="me-2" />
            Add to Cart - ${totalPrice.toFixed(2)}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
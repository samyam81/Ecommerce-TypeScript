import React from "react";
import { useCart } from "../Cart/CartContext";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom

export const calculateTotalPrice = (cartItems: CartItem[]): number => {
  return cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
};

const ProductCard = ({
  product,
  onClose,
}: {
  product: any;
  onClose: () => void;
}) => {
  const { cartItems, updateItemQuantity, addItemToCart } = useCart();
  const navigate = useNavigate(); // Initialize useNavigate hook

  if (!product) return null;

  const cartItem = cartItems.find((item) => item.id === product.id);

  const quantity = cartItem ? cartItem.quantity : 1;

  const totalPrice = calculateTotalPrice(cartItems);

  const handleAddToCart = () => {
    if (!cartItem) {
      addItemToCart({ ...product, quantity: 1 }); // Add new item with initial quantity 1
    } else {
      updateItemQuantity(cartItem.id, cartItem.quantity + 1); // Increment quantity if already in cart
    }
    navigate("/login"); // Navigate to the login page
  };

  return (
    <div
      className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-flex justify-content-center align-items-center"
      style={{ zIndex: 1000 }}
    >
      <div
        className="bg-white p-4 rounded-3"
        style={{ maxWidth: "400px", width: "90%" }}
      >
        <button
          onClick={onClose}
          className="position-absolute top-0 end-0 p-2 border-0 bg-transparent fs-4"
        >
          &times;
        </button>
        <h2>{product.title}</h2>
        <img
          src={product.thumbnail || product.images[0]}
          alt={product.title}
          className="w-100 mb-3"
          style={{
            height: "200px",
            objectFit: "cover",
          }}
        />
        <p>{product.description}</p>
        <p className="text-success fw-bold">Price: {product.price}/pc USD</p>
        <p>Rating: {product.rating}</p>
        <div className="d-flex align-items-center">
          <button
            className="btn btn-outline-secondary btn-sm"
            onClick={() => {
              if (cartItem && cartItem.quantity > 1) {
                updateItemQuantity(cartItem.id, cartItem.quantity - 1);
              }
            }}
          >
            -
          </button>
          <input
            type="number"
            className="form-control mx-2 text-center"
            value={quantity}
            onChange={(e) => {
              const newQuantity = parseInt(e.target.value) || 1;
              if (cartItem) {
                updateItemQuantity(cartItem.id, newQuantity);
              }
            }}
            style={{ width: "60px" }}
          />
          <button
            className="btn btn-outline-secondary btn-sm"
            onClick={() => {
              if (cartItem) {
                updateItemQuantity(cartItem.id, cartItem.quantity + 1);
              }
            }}
          >
            +
          </button>
        </div>
        <div className="bg-danger text-white text-center py-2 rounded my-3">
          <p className="mb-0 fs-5">Total: ${totalPrice.toFixed(2)}</p>
        </div>
        <div className="bg-secondary rounded-lg text-white text-center py-3 px-6 rounded-lg shadow-md my-3">
          <label className="btn btn-secondary hover:bg-secondary-dark active:bg-secondary-dark focus:outline-none focus:ring-2 focus:ring-secondary-light rounded-lg transition duration-200 ease-in-out">
            <p
              className="font-semibold text-lg btn"
              role="button"
              onClick={handleAddToCart} // Add to cart and navigate
            >
              Add to Cart and Go to Login
            </p>
          </label>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

import React from "react";
import { useCart } from "./CartContext";
import "../Styles/Main.css";
import "../Styles/Responsive.css";
import "../Styles/Animation.css"; // Import the Animation styles

// Define types for CartItem
interface CartItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
}

// Exported function to calculate total price
export const calculateTotalPrice = (cartItems: CartItem[]): number => {
  return cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
};

const CartPage: React.FC = () => {
  const { cartItems, removeItemFromCart, updateItemQuantity, clearCart } =
    useCart();

  const totalPrice = calculateTotalPrice(cartItems);

  return (
    <div className="container py-5">
      <h1 className="text-center mb-4 fade-in">🛒 Your Shopping Cart</h1>

      {/* Cart Empty State */}
      {cartItems.length === 0 ? (
        <div className="text-center fade-in">
          <p className="text-muted fs-4">Your cart is currently empty.</p>
          <button
            className="btn btn-lg btn-primary mt-3 px-4 py-3 rounded-pill shadow-lg scale-up"
            onClick={() => (window.location.href = "/")}
          >
            🛍️ Start Shopping
          </button>
        </div>
      ) : (
        <div>
          {/* Cart Items List */}
          <div className="list-group my-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="list-group-item d-flex align-items-center justify-content-between p-3 shadow-sm rounded mb-3 slide-in-bottom"
                style={{
                  backgroundColor: "#f9f9f9",
                  border: "2px solid #ddd",
                  borderRadius: "8px",
                }}
              >
                <div className="d-flex flex-grow-1 align-items-center gap-3">
                  <div>
                    <h5 className="mb-1">{item.title}</h5>
                    <p className="text-muted mb-0">Price: ${item.price}</p>
                  </div>
                </div>

                <div className="d-flex align-items-center gap-3">
                  {/* Quantity Controls */}
                  <button
                    className="btn btn-sm btn-outline-secondary scale-up"
                    onClick={() =>
                      updateItemQuantity(
                        item.id,
                        Math.max(1, item.quantity - 1)
                      )
                    }
                  >
                    -
                  </button>
                  <input
                    type="number"
                    className="form-control text-center"
                    value={item.quantity}
                    onChange={(e) => {
                      const newQuantity = Math.max(
                        parseInt(e.target.value) || 1,
                        1
                      );
                      updateItemQuantity(item.id, newQuantity);
                    }}
                    style={{
                      width: "60px",
                      border: "1px solid #ccc",
                    }}
                  />
                  <button
                    className="btn btn-sm btn-outline-secondary scale-up"
                    onClick={() =>
                      updateItemQuantity(item.id, item.quantity + 1)
                    }
                  >
                    +
                  </button>
                </div>

                {/* Remove Item Button */}
                <button
                  className="btn btn-sm btn-danger ms-3 scale-up"
                  onClick={() => removeItemFromCart(item.id)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          {/* Clear Cart Button */}
          <button
            className="btn btn-danger w-100 mb-3 py-2 shadow-sm scale-up"
            onClick={clearCart}
            style={{ border: "2px solid red" }}
          >
            🗑️ Clear Cart
          </button>

          {/* Total Price Section */}
          <div
            className="text-center bg-primary text-white py-3 rounded shadow-sm scale-up"
            style={{
              opacity: totalPrice === 0 ? 0.7 : 1,
              border: "2px solid #ccc",
            }}
          >
            <h4 className="mb-0">💰 Total: ${totalPrice.toFixed(2)}</h4>
          </div>

          {/* Buy Now Button */}
          {totalPrice > 0 && (
            <div className="text-center mt-4">
              <button
                className="btn btn-lg btn-warning px-4 py-3 rounded-pill shadow-lg scale-up"
                onClick={() => (window.location.href = "/login")}
                style={{ border: "2px solid #f8b400" }}
              >
                🛒 Buy Now
              </button>
            </div>
          )}

          {/* Shop Now Button */}
          <div className="text-center mt-3">
            <button
              className="btn btn-lg btn-success px-4 py-3 rounded-pill shadow-lg scale-up"
              onClick={() => (window.location.href = "/")}
              style={{ border: "2px solid #28a745" }}
            >
              🛍️ Shop More
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;

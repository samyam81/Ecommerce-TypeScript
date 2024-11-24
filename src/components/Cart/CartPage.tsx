import React from "react";
import { useCart } from "./CartContext";
import { Link } from "react-router-dom";

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
    useCart(); // Get cart items and functions from context

  const totalPrice = calculateTotalPrice(cartItems);

  return (
    <div className="container py-4">
      <h1 className="text-center">Your Cart</h1>

      {cartItems.length === 0 ? (
        <p className="text-center text-muted fs-4">Your cart is empty</p>
      ) : (
        <div>
          <div className="list-group my-3">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <div className="d-flex justify-content-between w-100">
                  <div className="flex-grow-1">
                    <h5 className="mb-1">{item.title}</h5>
                    <p className="mb-1 text-muted">Price: ${item.price}</p>
                  </div>

                  <div className="d-flex align-items-center gap-2">
                    <button
                      className="btn btn-outline-secondary btn-sm"
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
                      style={{ width: "60px" }}
                    />
                    <button
                      className="btn btn-outline-secondary btn-sm"
                      onClick={() =>
                        updateItemQuantity(item.id, item.quantity + 1)
                      }
                    >
                      +
                    </button>
                  </div>

                  <button
                    className="btn btn-danger btn-sm mx-4 my-4"
                    onClick={() => removeItemFromCart(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <button className="btn btn-danger w-100 my-3" onClick={clearCart}>
            Clear Cart
          </button>
        </div>
      )}

      {/* Total Price Section */}
      <div
        className={`bg-danger text-white text-center py-2 rounded my-3 ${
          totalPrice === 0 ? "opacity-50" : ""
        }`}
      >
        <p className="mb-0 fs-5">Total: ${totalPrice.toFixed(2)}</p>
      </div>

      {/* Shop Now Button */}
      <button
        className="btn btn-lg btn-success mt-3 px-4 py-3 rounded-pill shadow-lg hover-shadow"
        onClick={() => (window.location.href = "/")}
      >
        Shop Now
      </button>
    </div>
  );
};

export default CartPage;

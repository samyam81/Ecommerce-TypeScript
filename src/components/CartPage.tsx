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
                <div>
                  <h5 className="mb-1">{item.title}</h5>
                  <p className="mb-1 text-muted">Price: ${item.price}</p>
                </div>
                <div className="d-flex align-items-center">
                  <button
                    className="btn btn-outline-secondary btn-sm"
                    onClick={() =>
                      updateItemQuantity(item.id, item.quantity - 1)
                    }
                  >
                    -
                  </button>
                  <input
                    type="number"
                    className="form-control mx-2 text-center"
                    value={item.quantity}
                    onChange={(e) =>
                      updateItemQuantity(item.id, parseInt(e.target.value) || 1)
                    }
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
                  className="btn btn-danger btn-sm"
                  onClick={() => removeItemFromCart(item.id)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          <button className="btn btn-danger w-100 my-3" onClick={clearCart}>
            Clear Cart
          </button>
        </div>
      )}
      <div className="bg-danger text-white text-center py-2 rounded my-3">
        <p className="mb-0 fs-5">Total: ${totalPrice.toFixed(2)}</p>
      </div>
      {totalPrice > 0 && (
        <Link to="/buy">
          <button className="btn btn-primary w-100">Buy now</button>
        </Link>
      )}
    </div>
  );
};

export default CartPage;

import React from "react";
import { useCart } from "./CartContext";

interface CartItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
}

export const calculateTotalPrice = (cartItems: CartItem[]): number => {
  return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
};

const CartPage: React.FC = () => {
  const { cartItems, removeItemFromCart, updateItemQuantity, clearCart } = useCart();
  const totalPrice = calculateTotalPrice(cartItems);

  return (
    <div className="container main-content fade-in">
      <h1 className="text-center">🛒 Your Shopping Cart</h1>

      {/* Cart Empty State */}
      {cartItems.length === 0 ? (
        <div className="text-center fade-in">
          <p className="text-muted">Your cart is currently empty.</p>
          <button
            className="btn btn-primary hover-lift mt-3"
            onClick={() => (window.location.href = "/")}
          >
            🛍️ Start Shopping
          </button>
        </div>
      ) : (
        <div>
          {/* Cart Items List */}
          <div className="my-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="card mb-3 fade-in"
              >
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h5 className="card-title">{item.title}</h5>
                      <p className="text-muted">Price: ${item.price}</p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="d-flex align-items-center">
                      <div className="btn-group">
                        <button
                          className="btn btn-outline-secondary"
                          onClick={() =>
                            updateItemQuantity(item.id, Math.max(1, item.quantity - 1))
                          }
                        >
                          -
                        </button>
                        <input
                          type="number"
                          className="form-control text-center mx-1"
                          value={item.quantity}
                          onChange={(e) => {
                            const newQuantity = Math.max(parseInt(e.target.value) || 1, 1);
                            updateItemQuantity(item.id, newQuantity);
                          }}
                          style={{ width: "50px" }}
                        />
                        <button
                          className="btn btn-outline-secondary"
                          onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
                        >
                          +
                        </button>
                      </div>

                      {/* Remove Item Button */}
                      <button
                        className="btn btn-outline-danger ms-3 hover-lift"
                        onClick={() => removeItemFromCart(item.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Clear Cart Button */}
          <button
            className="btn btn-danger w-100 hover-lift"
            onClick={clearCart}
          >
            🗑️ Clear Cart
          </button>

          {/* Total Price Section */}
          <div className="card bg-royal-purple text-white mt-4 shadow-royal">
            <div className="card-body text-center">
              <h4>💰 Total: ${totalPrice.toFixed(2)}</h4>
            </div>
          </div>

          {/* Buy Now Button */}
          {totalPrice > 0 && (
            <div className="text-center mt-4">
              <button
                className="btn btn-gold hover-lift"
                onClick={() => (window.location.href = "/login")}
              >
                🛒 Buy Now
              </button>
            </div>
          )}

          {/* Shop More Button */}
          <div className="text-center mt-3">
            <button
              className="btn btn-secondary hover-lift"
              onClick={() => (window.location.href = "/")}
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
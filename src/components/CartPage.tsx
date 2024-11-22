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

  // Using the helper function to calculate total price
  const totalPrice = calculateTotalPrice(cartItems);

  return (
    <div style={styles.cartContainer}>
      <h1>Your Cart</h1>
      {cartItems.length === 0 ? (
        <p style={styles.emptyCartMessage}>Your cart is empty</p>
      ) : (
        <div style={styles.cartItems}>
          {cartItems.map((item) => (
            <div key={item.id} style={styles.cartItem}>
              <p style={styles.itemTitle}>{item.title}</p>
              <p style={styles.itemPrice}>Price: ${item.price}</p>

              {/* Quantity Selector */}
              <div style={styles.quantityWrapper}>
                <button
                  style={styles.quantityBtn}
                  onClick={() => updateItemQuantity(item.id, item.quantity - 1)}
                >
                  -
                </button>
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) =>
                    updateItemQuantity(item.id, parseInt(e.target.value) || 1)
                  }
                  style={styles.quantityInput}
                />
                <button
                  style={styles.quantityBtn}
                  onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
                >
                  +
                </button>
              </div>

              <button
                style={styles.removeItemBtn}
                onClick={() => removeItemFromCart(item.id)}
              >
                Remove
              </button>
            </div>
          ))}
          <button style={styles.clearCartBtn} onClick={clearCart}>
            Clear Cart
          </button>
        </div>
      )}
      <div style={styles.totalBar}>
        <p style={styles.totalText}>Total: ${totalPrice.toFixed(2)}</p>
      </div>
      {totalPrice > 0 && (
        <Link to="/buy">
          <button style={styles.clearCartBtn}>Buy now</button>
        </Link>
      )}
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  cartContainer: {
    padding: "20px",
    maxWidth: "800px",
    margin: "0 auto",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  cartItems: {
    marginTop: "20px",
  },
  cartItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px",
    backgroundColor: "#fff",
    border: "1px solid #ddd",
    borderRadius: "5px",
    marginBottom: "10px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
  },
  itemTitle: {
    fontWeight: "bold",
  },
  itemPrice: {
    color: "#555",
  },
  removeItemBtn: {
    backgroundColor: "#ff5c5c",
    border: "none",
    color: "white",
    padding: "8px 16px",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "1rem",
    transition: "background-color 0.3s",
  },
  clearCartBtn: {
    backgroundColor: "#ff5c5c",
    border: "none",
    color: "white",
    padding: "8px 16px",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "1rem",
    marginTop: "20px",
    width: "100%",
    transition: "background-color 0.3s",
  },
  emptyCartMessage: {
    textAlign: "center",
    fontSize: "1.2rem",
    color: "#888",
  },
  totalBar: {
    backgroundColor: "#ff5c5c",
    padding: "10px",
    marginTop: "20px",
    borderRadius: "5px",
    color: "white",
    fontSize: "1.2rem",
    textAlign: "center",
  },
  totalText: {
    margin: "0",
  },
  quantityWrapper: {
    display: "flex",
    alignItems: "center",
  },
  quantityBtn: {
    padding: "5px 10px",
    fontSize: "1rem",
    cursor: "pointer",
  },
  quantityInput: {
    width: "50px",
    textAlign: "center",
    fontSize: "1rem",
    margin: "0 5px",
  },
};

export default CartPage;

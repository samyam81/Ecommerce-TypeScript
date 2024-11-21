import React, { useEffect } from "react";
import { useWish } from "./WishContext"; // Make sure the path is correct
import { useCart } from "./CartContext";

// Define types for WishItem
interface WishItem {
  id: number;
  title: string;
  price: number;
}

const WishPage: React.FC = () => {
  const { wishItems, addItemToWish, removeItemFromWish, clearWish } = useWish(); // Get wish items and functions from context
  const { addItemToCart, cartItems } = useCart(); // Get cart functions from context

  // Add item to the cart
  const handleAddToCart = (item: WishItem) => {
    addItemToCart(item); // Add item to cart
  };

  // Function to toggle wishlist item
  const handleToggleWishlist = (item: WishItem) => {
    const isItemInWish = wishItems.some((wishItem) => wishItem.id === item.id);
    if (isItemInWish) {
      removeItemFromWish(item); // Remove item from wishlist if it's already there
    } else {
      addItemToWish(item); // Add item to wishlist if it's not there
    }
  };

  // Log cart items when they change
  useEffect(() => {
    console.log(cartItems); // Log the cart items to verify the addition
  }, [cartItems]);

  return (
    <div style={styles.wishContainer}>
      <h1>Your Wish List</h1>
      {wishItems.length === 0 ? (
        <p style={styles.emptyWishMessage}>Your wish list is empty</p>
      ) : (
        <div style={styles.wishItems}>
          {wishItems.map((item) => (
            <div key={item.id} style={styles.wishItem}>
              <p style={styles.itemTitle}>{item.title}</p>
              <p style={styles.itemPrice}>Price: ${item.price}</p>
              <button
                style={styles.addToCartBtn}
                onClick={() => handleAddToCart(item)}
              >
                Add to Cart
              </button>
              <button
                style={styles.addToCartBtn}
                onClick={() => handleToggleWishlist(item)}
              >
                {wishItems.some((wishItem) => wishItem.id === item.id)
                  ? "Remove from Wishlist"
                  : "Add to Wishlist"}
              </button>
            </div>
          ))}
          <button style={styles.clearWishBtn} onClick={clearWish}>
            Clear Wish List
          </button>
        </div>
      )}

      {/* Display message if there are items in the wish list */}
      {wishItems.length > 0 && (
        <div style={styles.checkoutBar}>{/* Checkout-related content */}</div>
      )}
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  wishContainer: {
    padding: "20px",
    maxWidth: "800px",
    margin: "0 auto",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  wishItems: {
    marginTop: "20px",
  },
  wishItem: {
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
  addToCartBtn: {
    backgroundColor: "#4caf50", // Green color for the Add to Cart button
    border: "none",
    color: "white",
    padding: "8px 16px",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "1rem",
    transition: "background-color 0.3s",
  },
  clearWishBtn: {
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
  emptyWishMessage: {
    textAlign: "center",
    fontSize: "1.2rem",
    color: "#888",
  },
  checkoutBar: {
    marginTop: "20px",
    display: "flex",
    justifyContent: "center",
  },
};

export default WishPage;

import React, { useEffect } from "react";
import { useCart } from "./CartContext"; 

const ThankYou: React.FC = () => {
  const { clearCart } = useCart(); 

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Thank You for Your Purchase!</h1>
      <p style={styles.message}>
        Your order is being processed. We hope to serve you again soon!
      </p>
      <p style={styles.contact}>
        Need assistance? Contact us at{" "}
        <a href="mailto:support@example.com" style={styles.link}>
          support@example.com
        </a>
      </p>
      <button
        style={styles.button}
        onClick={() => (window.location.href = "/")}
      >
        Continue Shopping
      </button>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    textAlign: "center",
    padding: "50px",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f0fff4",
    borderRadius: "8px",
    margin: "0 auto",
    maxWidth: "600px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  header: {
    fontSize: "2.5rem",
    color: "#2e7d32",
    marginBottom: "20px",
    animation: "fadeIn 1.5s ease-in-out",
  },
  message: {
    fontSize: "1.2rem",
    color: "#555",
    marginBottom: "20px",
  },
  contact: {
    fontSize: "1rem",
    color: "#777",
    marginBottom: "30px",
  },
  link: {
    color: "#2e7d32",
    textDecoration: "none",
  },
  button: {
    backgroundColor: "#4caf50",
    color: "#fff",
    border: "none",
    padding: "10px 20px",
    borderRadius: "4px",
    fontSize: "1rem",
    cursor: "pointer",
    transition: "background-color 0.3s",
  }
};

export default ThankYou;

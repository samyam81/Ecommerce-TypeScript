import React, { useState } from "react";
import { calculateTotalPrice } from "./CartPage";
import { useCart } from "./CartContext";
import { useNavigate } from "react-router-dom";

const Buy: React.FC = () => {
  const { cartItems } = useCart();
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
  });
  const [errors, setErrors] = useState({
    name: false,
    address: false,
    phone: false,
  });

  const totalPrice = calculateTotalPrice(cartItems);
  const navigate = useNavigate(); 
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: false,
    });
  };

  const validateForm = () => {
    const newErrors = {
      name: formData.name.trim() === "",
      address: formData.address.trim() === "",
      phone: formData.phone.trim() === "",
    };
    setErrors(newErrors);

    return !Object.values(newErrors).includes(true);
  };

  const handlePaymentMethod = (method: string) => {
    if (!validateForm()) {
      alert("Please fill in all the fields.");
      return;
    }

    alert(`You are paying through ${method}.`);
    navigate("/thankyou"); 
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Checkout</h1>
      <p style={styles.totalPrice}>Total Price: ${totalPrice.toFixed(2)}</p>
      <form style={styles.form}>
        <div style={styles.formGroup}>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            style={styles.input}
            placeholder="Enter your name"
          />
          {errors.name && <p style={styles.error}>Name is required.</p>}
        </div>
        <div style={styles.formGroup}>
          <label>Address:</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            style={styles.input}
            placeholder="Enter your address"
          />
          {errors.address && <p style={styles.error}>Address is required.</p>}
        </div>
        <div style={styles.formGroup}>
          <label>Phone Number:</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            style={styles.input}
            placeholder="Enter your phone number"
          />
          {errors.phone && (
            <p style={styles.error}>Phone number is required.</p>
          )}
        </div>
      </form>
      <div style={styles.paymentMethods}>
        <button
          style={styles.paymentButton}
          onClick={() => handlePaymentMethod("E-sewa")}
        >
          E-sewa
        </button>
        <button
          style={styles.paymentButton}
          onClick={() => handlePaymentMethod("Cash on Delivery")}
        >
          Cash on Delivery
        </button>
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    maxWidth: "600px",
    margin: "0 auto",
    padding: "20px",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    fontFamily: "Arial, sans-serif",
  },
  header: {
    textAlign: "center",
    color: "#333",
  },
  totalPrice: {
    fontSize: "1.2rem",
    fontWeight: "bold",
    marginBottom: "20px",
    textAlign: "center",
    color: "#ff5c5c",
  },
  form: {
    marginBottom: "20px",
  },
  formGroup: {
    marginBottom: "15px",
  },
  input: {
    width: "100%",
    padding: "10px",
    margin: "5px 0",
    border: "1px solid #ddd",
    borderRadius: "4px",
    fontSize: "1rem",
  },
  paymentMethods: {
    display: "flex",
    justifyContent: "space-around",
  },
  paymentButton: {
    backgroundColor: "#ff5c5c",
    color: "#fff",
    border: "none",
    padding: "10px 20px",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "1rem",
    transition: "background-color 0.3s",
  },
  thankYouContainer: {
    textAlign: "center",
    padding: "50px",
    fontFamily: "Arial, sans-serif",
  },
  thankYouHeader: {
    fontSize: "2rem",
    color: "#4caf50",
  },
  thankYouMessage: {
    fontSize: "1.2rem",
    color: "#555",
  },
  error: {
    color: "red",
    fontSize: "0.9rem",
  },
};

export default Buy;

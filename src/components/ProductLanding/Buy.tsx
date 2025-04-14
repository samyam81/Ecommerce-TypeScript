import React, { useState } from "react";
import { calculateTotalPrice } from "../Cart/CartPage";
import { useCart } from "../Cart/CartContext";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify"; // Toast components
import "react-toastify/dist/ReactToastify.css"; // Toast CSS
import "../Styles/Main.css";
import "../Styles/Responsive.css";

const Buy: React.FC = () => {
  const { cartItems } = useCart();
  const [formData, setFormData] = useState({ name: "", address: "", phone: "" });
  const [errors, setErrors] = useState({ name: false, address: false, phone: false });

  const totalPrice = calculateTotalPrice(cartItems);
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: false });
  };

  const validateForm = () => {
    const newErrors = {
      name: formData.name.trim() === "",
      address: formData.address.trim() === "",
      phone: formData.phone.trim() === "",
    };
    setErrors(newErrors);
    if (Object.values(newErrors).includes(true)) {
      toast.error("Please fill in all the fields.", { position: "top-right", autoClose: 3000 });
      return false;
    }
    return true;
  };

  const handlePaymentMethod = (method: string) => {
    if (!validateForm()) return;

    toast.success(`You are paying through ${method}.`, { position: "top-right", autoClose: 3000 });

    setTimeout(() => navigate("/thankyou"), 3000);
  };

  return (
    <div className="section fade-in">
      <ToastContainer />
      <div className="box" style={{ maxWidth: "600px", margin: "0 auto" }}>
        <h1 className="title is-4 text-royal">Checkout</h1>
        <p className="has-text-danger has-text-weight-bold">Total Price: ${totalPrice.toFixed(2)}</p>
        <form>
          {/* Name Field */}
          <div className="field">
            <label htmlFor="name" className="label">Name:</label>
            <div className="control">
              <input
                type="text"
                id="name"
                name="name"
                className={`input ${errors.name ? "is-danger" : ""}`}
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter your name"
              />
            </div>
            {errors.name && <p className="help is-danger">Name is required.</p>}
          </div>

          {/* Address Field */}
          <div className="field">
            <label htmlFor="address" className="label">Address:</label>
            <div className="control">
              <input
                type="text"
                id="address"
                name="address"
                className={`input ${errors.address ? "is-danger" : ""}`}
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Enter your address"
              />
            </div>
            {errors.address && <p className="help is-danger">Address is required.</p>}
          </div>

          {/* Phone Number Field */}
          <div className="field">
            <label htmlFor="phone" className="label">Phone Number:</label>
            <div className="control">
              <input
                type="text"
                id="phone"
                name="phone"
                className={`input ${errors.phone ? "is-danger" : ""}`}
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Enter your phone number"
              />
            </div>
            {errors.phone && <p className="help is-danger">Phone number is required.</p>}
          </div>

          {/* Payment Buttons */}
          <div className="field is-grouped is-grouped-centered">
            <button type="button" className="btn btn-primary" onClick={() => handlePaymentMethod("E-sewa")}>
              E-sewa
            </button>
            <button type="button" className="btn btn-outline-primary" onClick={() => handlePaymentMethod("Cash on Delivery")}>
              Cash on Delivery
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};


export default Buy;

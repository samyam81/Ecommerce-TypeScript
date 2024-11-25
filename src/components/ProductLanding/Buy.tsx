import React, { useState } from "react";
import { calculateTotalPrice } from "../Cart/CartPage";
import { useCart } from "../Cart/CartContext";
import { useNavigate } from "react-router-dom";
import { FaExclamationCircle } from "react-icons/fa"; // Icon for error feedback

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
      return (
        <div role="alert" className="alert alert-danger">
          <FaExclamationCircle /> Please fill in all the fields.
        </div>
      );
    }

    alert(`You are paying through ${method}.`);
    navigate("/thankyou");
  };

  return (
    <div className="container py-5">
      <div className="card shadow-lg mx-auto" style={{ maxWidth: "600px" }}>
        <div className="card-body">
          <h1 className="text-center mb-4 text-primary">Checkout</h1>
          <p className="text-center text-danger fw-bold">
            Total Price: ${totalPrice.toFixed(2)}
          </p>
          <form>
            {/* Name Field */}
            <div className="mb-4">
              <label htmlFor="name" className="form-label fs-5">
                Name:
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className={`form-control ${errors.name ? "is-invalid" : ""}`}
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter your name"
              />
              {errors.name && (
                <div className="invalid-feedback">
                  <FaExclamationCircle /> Name is required.
                </div>
              )}
            </div>

            {/* Address Field */}
            <div className="mb-4">
              <label htmlFor="address" className="form-label fs-5">
                Address:
              </label>
              <input
                type="text"
                id="address"
                name="address"
                className={`form-control ${errors.address ? "is-invalid" : ""}`}
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Enter your address"
              />
              {errors.address && (
                <div className="invalid-feedback">
                  <FaExclamationCircle /> Address is required.
                </div>
              )}
            </div>

            {/* Phone Number Field */}
            <div className="mb-4">
              <label htmlFor="phone" className="form-label fs-5">
                Phone Number:
              </label>
              <input
                type="text"
                id="phone"
                name="phone"
                className={`form-control ${errors.phone ? "is-invalid" : ""}`}
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Enter your phone number"
              />
              {errors.phone && (
                <div className="invalid-feedback">
                  <FaExclamationCircle /> Phone number is required.
                </div>
              )}
            </div>

            {/* Payment Buttons */}
            <div className="d-flex justify-content-between">
              <button
                className="btn btn-primary w-48"
                onClick={() => handlePaymentMethod("E-sewa")}
              >
                E-sewa
              </button>
              <button
                className="btn btn-outline-secondary w-48"
                onClick={() => handlePaymentMethod("Cash on Delivery")}
              >
                Cash on Delivery
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Buy;

import React, { useState } from "react";
import { calculateTotalPrice } from "../Cart/CartPage";
import { useCart } from "../Cart/CartContext";
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
      return (
        <div role="alert" className="alert alert-danger">
          Please fill in all the fields.
        </div>
      );
    }

    alert(`You are paying through ${method}.`);
    navigate("/thankyou");
  };

  return (
    <div className="container py-5">
      <div className="card shadow mx-auto" style={{ maxWidth: "600px" }}>
        <div className="card-body">
          <h1 className="text-center mb-4">Checkout</h1>
          <p className="text-center text-danger fw-bold">
            Total Price: ${totalPrice.toFixed(2)}
          </p>
          <form>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
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
                <div className="invalid-feedback">Name is required.</div>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="address" className="form-label">
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
                <div className="invalid-feedback">Address is required.</div>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="phone" className="form-label">
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
                  Phone number is required.
                </div>
              )}
            </div>
          </form>
          <div className="d-flex justify-content-around mt-4">
            <button
              className="btn btn-primary"
              onClick={() => handlePaymentMethod("E-sewa")}
            >
              E-sewa
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => handlePaymentMethod("Cash on Delivery")}
            >
              Cash on Delivery
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Buy;

import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { FaExclamationCircle } from "react-icons/fa";

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    address: "",
    address2: "",
    city: "",
    state: "",
    zip: "",
    acceptTerms: false,
  });

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    acceptTerms: "",
  });

  const [isRegistered, setIsRegistered] = useState(false); // New state for successful registration
  const [loading, setLoading] = useState(false); // State to handle loading during registration

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const validateForm = (): boolean => {
    let isValid = true;
    const newErrors: any = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required.";
      isValid = false;
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required.";
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is not valid.";
      isValid = false;
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required.";
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long.";
      isValid = false;
    }

    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = "Please confirm your password.";
      isValid = false;
    } else if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = "Passwords do not match.";
      isValid = false;
    }

    if (!formData.address.trim()) {
      newErrors.address = "Address is required.";
      isValid = false;
    }

    if (!formData.city.trim()) {
      newErrors.city = "City is required.";
      isValid = false;
    }

    if (!formData.state.trim()) {
      newErrors.state = "State is required.";
      isValid = false;
    }

    if (!formData.zip.trim()) {
      newErrors.zip = "Zip code is required.";
      isValid = false;
    } else if (!/^\d{5}$/.test(formData.zip)) {
      newErrors.zip = "Zip code must be a 5-digit number.";
      isValid = false;
    }

    if (!formData.acceptTerms) {
      newErrors.acceptTerms = "You must accept the terms and conditions.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setLoading(true); // Start loading while registration is processing
      setTimeout(() => {
        setLoading(false);
        setIsRegistered(true); // Simulate successful registration
      }, 2000);
    }
  };

  if (isRegistered) {
    return <Navigate to="/login" />; // Navigate to login on successful registration
  }

  return (
    <div className="container mt-5">
      <div className="card shadow-lg p-4 rounded">
        <h2
          className="text-center mb-4 font-weight-bold"
          style={{ fontSize: "28px", color: "#4A90E2" }}
        >
          Register
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Enter your name</label>
            <div className="row">
              <div className="col-md-6 mb-3">
                <input
                  type="text"
                  className={`form-control ${
                    errors.firstName ? "is-invalid" : ""
                  }`}
                  placeholder="First name"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  style={{ padding: "12px", fontSize: "16px" }}
                />
                {errors.firstName && (
                  <div className="invalid-feedback d-flex align-items-center">
                    <FaExclamationCircle
                      style={{ color: "#E74C3C", marginRight: "8px" }}
                    />
                    {errors.firstName}
                  </div>
                )}
              </div>
              <div className="col-md-6 mb-3">
                <input
                  type="text"
                  className={`form-control ${
                    errors.lastName ? "is-invalid" : ""
                  }`}
                  placeholder="Last name"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  style={{ padding: "12px", fontSize: "16px" }}
                />
                {errors.lastName && (
                  <div className="invalid-feedback d-flex align-items-center">
                    <FaExclamationCircle
                      style={{ color: "#E74C3C", marginRight: "8px" }}
                    />
                    {errors.lastName}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="inputEmail">Email</label>
            <input
              type="email"
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
              id="inputEmail"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              style={{ padding: "12px", fontSize: "16px" }}
            />
            {errors.email && (
              <div className="invalid-feedback d-flex align-items-center">
                <FaExclamationCircle
                  style={{ color: "#E74C3C", marginRight: "8px" }}
                />
                {errors.email}
              </div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="inputPassword">Password</label>
            <input
              type="password"
              className={`form-control ${errors.password ? "is-invalid" : ""}`}
              id="inputPassword"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              style={{ padding: "12px", fontSize: "16px" }}
            />
            {errors.password && (
              <div className="invalid-feedback d-flex align-items-center">
                <FaExclamationCircle
                  style={{ color: "#E74C3C", marginRight: "8px" }}
                />
                {errors.password}
              </div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="inputConfirmPassword">Re-enter your Password</label>
            <input
              type="password"
              className={`form-control ${
                errors.confirmPassword ? "is-invalid" : ""
              }`}
              id="inputConfirmPassword"
              placeholder="Confirm Password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              style={{ padding: "12px", fontSize: "16px" }}
            />
            {errors.confirmPassword && (
              <div className="invalid-feedback d-flex align-items-center">
                <FaExclamationCircle
                  style={{ color: "#E74C3C", marginRight: "8px" }}
                />
                {errors.confirmPassword}
              </div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="inputAddress">Permanent Address</label>
            <input
              type="text"
              className={`form-control ${errors.address ? "is-invalid" : ""}`}
              id="inputAddress"
              placeholder="1234 Main St"
              name="address"
              value={formData.address}
              onChange={handleChange}
              style={{ padding: "12px", fontSize: "16px" }}
            />
            {errors.address && (
              <div className="invalid-feedback d-flex align-items-center">
                <FaExclamationCircle
                  style={{ color: "#E74C3C", marginRight: "8px" }}
                />
                {errors.address}
              </div>
            )}
          </div>

          <div className="form-group form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="gridCheck"
              name="acceptTerms"
              checked={formData.acceptTerms}
              onChange={handleChange}
            />
            <label className="form-check-label" htmlFor="gridCheck">
              I accept the terms and conditions
            </label>
            {errors.acceptTerms && (
              <div className="invalid-feedback d-flex align-items-center">
                <FaExclamationCircle
                  style={{ color: "#E74C3C", marginRight: "8px" }}
                />
                {errors.acceptTerms}
              </div>
            )}
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-block"
            style={{ padding: "12px", fontSize: "16px", borderRadius: "5px" }}
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;

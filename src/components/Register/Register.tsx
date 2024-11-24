import React, { useState } from "react";
import { Navigate } from "react-router-dom";

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

        // First Name & Last Name Validation
        if (!formData.firstName.trim()) {
            newErrors.firstName = "First name is required.";
            isValid = false;
        }
        if (!formData.lastName.trim()) {
            newErrors.lastName = "Last name is required.";
            isValid = false;
        }

        // Email Validation
        if (!formData.email.trim()) {
            newErrors.email = "Email is required.";
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Email is not valid.";
            isValid = false;
        }

        // Password Validation
        if (!formData.password.trim()) {
            newErrors.password = "Password is required.";
            isValid = false;
        } else if (formData.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters long.";
            isValid = false;
        }

        // Confirm Password Validation
        if (!formData.confirmPassword.trim()) {
            newErrors.confirmPassword = "Please confirm your password.";
            isValid = false;
        } else if (formData.confirmPassword !== formData.password) {
            newErrors.confirmPassword = "Passwords do not match.";
            isValid = false;
        }

        // Address Validation
        if (!formData.address.trim()) {
            newErrors.address = "Address is required.";
            isValid = false;
        }

        // City Validation
        if (!formData.city.trim()) {
            newErrors.city = "City is required.";
            isValid = false;
        }

        // State Validation
        if (!formData.state.trim()) {
            newErrors.state = "State is required.";
            isValid = false;
        }

        // Zip Validation
        if (!formData.zip.trim()) {
            newErrors.zip = "Zip code is required.";
            isValid = false;
        } else if (!/^\d{5}$/.test(formData.zip)) {
            newErrors.zip = "Zip code must be a 5-digit number.";
            isValid = false;
        }

        // Terms and Conditions Checkbox
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
            setIsRegistered(true); // Set registration success flag to true
        }
    };

    if (isRegistered) {
        return <Navigate to="/login" />; // Navigate to login on successful registration
    }

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Register</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Enter your name</label>
                    <div className="row">
                        <div className="col">
                            <input
                                type="text"
                                className={`form-control ${errors.firstName ? "is-invalid" : ""
                                    }`}
                                placeholder="First name"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                            />
                            {errors.firstName && (
                                <div className="invalid-feedback">{errors.firstName}</div>
                            )}
                        </div>
                        <div className="col">
                            <input
                                type="text"
                                className={`form-control ${errors.lastName ? "is-invalid" : ""
                                    }`}
                                placeholder="Last name"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                            />
                            {errors.lastName && (
                                <div className="invalid-feedback">{errors.lastName}</div>
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
                    />
                    {errors.email && (
                        <div className="invalid-feedback">{errors.email}</div>
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
                    />
                    {errors.password && (
                        <div className="invalid-feedback">{errors.password}</div>
                    )}
                </div>
                <div className="form-group">
                    <label htmlFor="inputConfirmPassword">Re-enter your Password</label>
                    <input
                        type="password"
                        className={`form-control ${errors.confirmPassword ? "is-invalid" : ""
                            }`}
                        id="inputConfirmPassword"
                        placeholder="Confirm Password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                    />
                    {errors.confirmPassword && (
                        <div className="invalid-feedback">{errors.confirmPassword}</div>
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
                    />
                    {errors.address && (
                        <div className="invalid-feedback">{errors.address}</div>
                    )}
                </div>
                <div className="form-group">
                    <label htmlFor="inputAddress2">Temporary Address</label>
                    <input
                        type="text"
                        className="form-control"
                        id="inputAddress2"
                        placeholder="Apartment, studio, or floor"
                        name="address2"
                        value={formData.address2}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-row">
                    <div className="form-group col-md-6">
                        <label htmlFor="inputCity">City</label>
                        <input
                            type="text"
                            className={`form-control ${errors.city ? "is-invalid" : ""}`}
                            id="inputCity"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                        />
                        {errors.city && (
                            <div className="invalid-feedback">{errors.city}</div>
                        )}
                    </div>
                    <div className="form-group col-md-4">
                        <label htmlFor="inputState">State</label>
                        <select
                            id="inputState"
                            className={`form-control ${errors.state ? "is-invalid" : ""}`}
                            name="state"
                            value={formData.state}
                            onChange={handleChange}
                        >
                            <option value="">Choose...</option>
                            <option>...</option>
                        </select>
                        {errors.state && (
                            <div className="invalid-feedback">{errors.state}</div>
                        )}
                    </div>
                    <div className="form-group col-md-2">
                        <label htmlFor="inputZip">Zip</label>
                        <input
                            type="text"
                            className={`form-control ${errors.zip ? "is-invalid" : ""}`}
                            id="inputZip"
                            name="zip"
                            value={formData.zip}
                            onChange={handleChange}
                        />
                        {errors.zip && <div className="invalid-feedback">{errors.zip}</div>}
                    </div>
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
                        <div className="invalid-feedback d-block">{errors.acceptTerms}</div>
                    )}
                </div>
                <button type="submit" className="btn btn-primary btn-block">
                    Register
                </button>
            </form>
        </div>
    );
};

export default Register;

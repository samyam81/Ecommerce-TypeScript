import React, { useState } from "react";

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { name: "", email: "", message: "" };

    if (!formData.name.trim()) {
      newErrors.name = "Name is required.";
      isValid = false;
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
      isValid = false;
    }
    if (!formData.message.trim()) {
      newErrors.message = "Message is required.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      alert("Thank you for contacting us. We will get back to you soon.");
      setFormData({ name: "", email: "", message: "" });
    }
  };

  return (
    <div className="container mt-5 p-4 bg-light rounded shadow-lg" style={{ maxWidth: '600px' }}>
      <h2 className="text-center mb-4 text-info" style={{ fontWeight: "600", color: '#007bff' }}>
        Contact Us
      </h2>
      <p className="text-center mb-4" style={{ color: '#6c757d' }}>
        If you have any questions or feedback about E-commerce Nepal, feel free to reach out using the form below.
      </p>
      <form onSubmit={handleSubmit}>
        {/* Name Field */}
        <div className="mb-3">
          <label htmlFor="name" className="form-label" style={{ fontWeight: "500", color: '#495057' }}>
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className={`form-control ${errors.name ? "is-invalid" : ""}`}
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
            aria-describedby="nameError"
          />
          {errors.name && (
            <div id="nameError" className="invalid-feedback" style={{ fontSize: "0.875rem", color: '#dc3545' }}>
              {errors.name}
            </div>
          )}
        </div>

        {/* Email Field */}
        <div className="mb-3">
          <label htmlFor="email" className="form-label" style={{ fontWeight: "500", color: '#495057' }}>
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className={`form-control ${errors.email ? "is-invalid" : ""}`}
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            aria-describedby="emailError"
          />
          {errors.email && (
            <div id="emailError" className="invalid-feedback" style={{ fontSize: "0.875rem", color: '#dc3545' }}>
              {errors.email}
            </div>
          )}
        </div>

        {/* Message Field */}
        <div className="mb-3">
          <label htmlFor="message" className="form-label" style={{ fontWeight: "500", color: '#495057' }}>
            Message:
          </label>
          <textarea
            id="message"
            name="message"
            className={`form-control ${errors.message ? "is-invalid" : ""}`}
            placeholder="Write your message here"
            value={formData.message}
            onChange={handleChange}
            rows={4}
            aria-describedby="messageError"
          />
          {errors.message && (
            <div id="messageError" className="invalid-feedback" style={{ fontSize: "0.875rem", color: '#dc3545' }}>
              {errors.message}
            </div>
          )}
        </div>

        {/* Submit Button */}
        <div className="d-flex justify-content-center">
          <button
            type="submit"
            className="btn btn-primary w-50 shadow-sm py-2 px-3"
            style={{
              transition: "transform 0.3s, box-shadow 0.3s ease, background-color 0.3s ease",
              fontWeight: "500",
              backgroundColor: '#007bff',
              borderColor: '#007bff'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.05)";
              e.currentTarget.style.boxShadow = "0 4px 15px rgba(0, 0, 0, 0.2)";
              e.currentTarget.style.backgroundColor = "#0056b3";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "none";
              e.currentTarget.style.backgroundColor = "#007bff";
            }}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Contact;

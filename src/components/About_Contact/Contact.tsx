import React, { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    subscribe: false,
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    message: "",
  });

  useEffect(() => {
    emailjs.init("-jlq9VRlor9jTRh8F");
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData({
        ...formData,
        [name]: checked,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
      setErrors({ ...errors, [name]: "" });
    }
  };


  const validateForm = () => {
    let isValid = true;
    const newErrors = { name: "", email: "", message: "", gender: "" };

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
      emailjs
        .send(
          "service_cin4xa6", // Replace with your service ID
          "template_5vp7f0c", // Replace with your template ID
          {
            to_name: "Recipient Name", // You could replace this with the recipient's name dynamically if needed
            from_name: formData.name,  // Sender's name
            from_email: formData.email, // Sender's email
            message: formData.message,  // Sender's message
          },
          "-jlq9VRlor9jTRh8F" // Replace with your public key
        )
        .then(
          (response) => {
            // Display success toast notification
            toast.success("Thank you for contacting us. We will get back to you soon.");
            setFormData({
              name: "",
              email: "",
              message: "",
              subscribe: false,
            });
            console.log(response);
          },
          (error) => {
            // Display error toast notification
            toast.error("Something went wrong. Please try again later.");
            console.error(error);
          }
        );
    }
  };

  return (
    <div className="container mt-5 p-4 bg-white rounded shadow-lg" style={{ maxWidth: "600px" }}>
      <h2 className="text-center mb-4 text-primary" style={{ fontWeight: "600" }}>
        Contact Us
      </h2>
      <p className="text-center mb-4 text-muted">
        Have questions or feedback? Fill out the form below, and we'll get back to you promptly.
      </p>
      <form onSubmit={handleSubmit} className="p-3">
        {/* Name Field */}
        <div className="mb-3">
          <label htmlFor="name" className="form-label text-secondary">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className={`form-control ${errors.name ? "is-invalid" : ""}`}
            placeholder="Enter your full name"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <div className="invalid-feedback">{errors.name}</div>}
        </div>

        {/* Email Field */}
        <div className="mb-3">
          <label htmlFor="email" className="form-label text-secondary">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className={`form-control ${errors.email ? "is-invalid" : ""}`}
            placeholder="Enter your email address"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <div className="invalid-feedback">{errors.email}</div>}
        </div>

        {/* Message Field */}
        <div className="mb-3">
          <label htmlFor="message" className="form-label text-secondary">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            className={`form-control ${errors.message ? "is-invalid" : ""}`}
            placeholder="Write your message here"
            value={formData.message}
            onChange={handleChange}
            rows={4}
          />
          {errors.message && <div className="invalid-feedback">{errors.message}</div>}
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="btn btn-primary w-50 shadow py-2 px-3"
            style={{
              fontWeight: "600",
              borderRadius: "30px",
              transition: "all 0.3s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.1)";
              e.currentTarget.style.boxShadow = "0 4px 15px rgba(0, 0, 0, 0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "none";
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

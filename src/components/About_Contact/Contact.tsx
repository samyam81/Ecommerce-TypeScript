import React, { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
      setFormData({ ...formData, [name]: checked });
    } else {
      setFormData({ ...formData, [name]: value });
      setErrors({ ...errors, [name]: "" });
    }
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
    return { isValid, newErrors };
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { isValid, newErrors } = validateForm();

    if (!isValid) {
      if (newErrors.name) toast.error(newErrors.name);
      if (newErrors.email) toast.error(newErrors.email);
      if (newErrors.message) toast.error(newErrors.message);
      return;
    }

    emailjs
      .send(
        "service_cin4xa6",
        "template_5vp7f0c",
        {
          to_name: "Recipient Name",
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
        },
        "-jlq9VRlor9jTRh8F"
      )
      .then(
        () => {
          toast.success("Thank you for contacting us. We will get back to you soon.");
          setFormData({ name: "", email: "", message: "", subscribe: false });
        },
        () => {
          toast.error("Something went wrong. Please try again later.");
        }
      );
  };

  return (
    <div className="container main-content fade-in">
      <ToastContainer />
      <div className="card shadow-royal">
        <div className="card-body">
          <h2 className="text-center">Contact Us</h2>
          <p className="text-center text-muted">
            Have questions or feedback? Fill out the form below, and we'll get back to you promptly.
          </p>

          <form onSubmit={handleSubmit} className="form">
            {/* Name Field */}
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
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
              <label htmlFor="email" className="form-label">
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
              <label htmlFor="message" className="form-label">
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
                className="btn btn-primary hover-lift"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
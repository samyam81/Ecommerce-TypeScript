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
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: "", // Clear error when the user types
    });
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors: Record<string, string> = {
      name: "",
      email: "",
      message: "",
    };

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
      setFormData({
        name: "",
        email: "",
        message: "",
      });
    }
  };

  const styles: Record<string, React.CSSProperties> = {
    container: {
      maxWidth: "600px",
      margin: "0 auto",
      padding: "20px",
      backgroundColor: "#f4f4f4",
      borderRadius: "8px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    },
    heading: {
      textAlign: "center",
      fontSize: "2em",
      marginBottom: "20px",
      color: "#333",
    },
    paragraph: {
      textAlign: "center",
      marginBottom: "20px",
      color: "#555",
    },
    form: {
      display: "flex",
      flexDirection: "column",
    },
    formGroup: {
      marginBottom: "15px",
    },
    label: {
      fontWeight: "bold",
      marginBottom: "5px",
      display: "block",
      color: "#333",
    },
    input: {
      width: "100%",
      padding: "10px",
      border: "1px solid #ccc",
      borderRadius: "4px",
      fontSize: "1em",
      color: "#333",
    },
    textarea: {
      width: "100%",
      padding: "10px",
      border: "1px solid #ccc",
      borderRadius: "4px",
      fontSize: "1em",
      color: "#333",
      resize: "vertical",
      minHeight: "120px",
    },
    button: {
      padding: "10px 20px",
      backgroundColor: "#007bff",
      color: "white",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      fontSize: "1em",
      transition: "background-color 0.3s",
      alignSelf: "center",
    },
    buttonHover: {
      backgroundColor: "#0056b3",
    },
    errorText: {
      color: "red",
      fontSize: "0.9em",
      marginTop: "5px",
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Contact Us</h2>
      <p style={styles.paragraph}>
        If you have any questions or feedback about the E-commerce Nepal, feel
        free to reach out using the form below.
      </p>
      <form style={styles.form} onSubmit={handleSubmit}>
        <div style={styles.formGroup}>
          <label htmlFor="name" style={styles.label}>
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter your name"
            style={styles.input}
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <p style={styles.errorText}>{errors.name}</p>}
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="email" style={styles.label}>
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            style={styles.input}
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <p style={styles.errorText}>{errors.email}</p>}
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="message" style={styles.label}>
            Message:
          </label>
          <textarea
            id="message"
            name="message"
            placeholder="Write your message here"
            style={styles.textarea}
            value={formData.message}
            onChange={handleChange}
          ></textarea>
          {errors.message && <p style={styles.errorText}>{errors.message}</p>}
        </div>
        <button
          type="submit"
          style={styles.button}
          onMouseOver={(e) => {
            const target = e.target as HTMLButtonElement;
            target.style.backgroundColor = styles.buttonHover.backgroundColor!;
          }}
          onMouseOut={(e) => {
            const target = e.target as HTMLButtonElement;
            target.style.backgroundColor = styles.button.backgroundColor!;
          }}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Contact;

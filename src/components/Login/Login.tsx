import React, { useState } from "react";
import { Navigate } from "react-router-dom";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errors, setErrors] = useState<{ email: string; password: string }>({
    email: "",
    password: "",
  });
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setIsAuthenticated(true);
      }, 2000);
    }
  };

  const validateForm = (): boolean => {
    let isValid = true;
    const newErrors = { email: "", password: "" };

    if (!email.trim()) {
      newErrors.email = "Email is required.";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is not valid.";
      isValid = false;
    }

    if (!password.trim()) {
      newErrors.password = "Password is required.";
      isValid = false;
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  if (isAuthenticated) {
    return <Navigate to="/buy" />;
  }

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div
        className="card p-4 shadow-lg"
        style={{
          maxWidth: "400px",
          width: "100%",
          borderRadius: "10px",
          backgroundColor: "#f9f9f9",
        }}
      >
        <h3 className="text-center mb-4" style={{ color: "#343a40" }}>
          Login
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <label htmlFor="InputEmail" className="form-label" style={{ color: "#495057" }}>
              Email address
            </label>
            <input
              type="email"
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
              id="InputEmail"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-describedby="emailHelp"
              style={{
                borderColor: errors.email ? "#e74c3c" : "#ced4da",
                backgroundColor: "#fff",
              }}
            />
            {errors.email && (
              <div
                className="invalid-feedback"
                style={{ fontSize: "0.875rem", color: "#e74c3c" }}
              >
                {errors.email}
              </div>
            )}
          </div>

          <div className="form-group mb-3">
            <label htmlFor="InputPassword" className="form-label" style={{ color: "#495057" }}>
              Password
            </label>
            <input
              type="password"
              className={`form-control ${errors.password ? "is-invalid" : ""}`}
              id="InputPassword"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                borderColor: errors.password ? "#e74c3c" : "#ced4da",
                backgroundColor: "#fff",
              }}
            />
            {errors.password && (
              <div
                className="invalid-feedback"
                style={{ fontSize: "0.875rem", color: "#e74c3c" }}
              >
                {errors.password}
              </div>
            )}
          </div>

          <div className="form-check mb-3">
            <input
              type="checkbox"
              className="form-check-input"
              id="exampleCheck1"
            />
            <label className="form-check-label" htmlFor="exampleCheck1" style={{ color: "#495057" }}>
              Remember me
            </label>
          </div>

          <button
            type="submit"
            className={`btn btn-primary w-100 py-2 ${loading ? "disabled" : ""}`}
            disabled={loading}
            style={{
              backgroundColor: "#007bff",
              borderColor: "#007bff",
              padding: "10px 20px",
              fontWeight: "bold",
              transition: "background-color 0.3s ease",
            }}
          >
            {loading ? (
              <span
                className="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
            ) : (
              "Submit"
            )}
          </button>

          <div className="text-center mt-3">
            <p>
              Don't have an account?{" "}
              <a
                href="#"
                style={{
                  color: "#007bff",
                  textDecoration: "none",
                  fontWeight: "bold",
                  transition: "color 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  (e.target as HTMLAnchorElement).style.color = "#0056b3";
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLAnchorElement).style.color = "#007bff";
                }}
              >
                Sign up
              </a>

            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

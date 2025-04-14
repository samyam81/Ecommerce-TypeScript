import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errors, setErrors] = useState<{ email: string; password: string }>({
    email: "",
    password: "",
  });
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [rememberMe, setRememberMe] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const { isValid, newErrors } = validateForm();

    if (!isValid) {
      if (newErrors.email) toast.error(newErrors.email);
      if (newErrors.password) toast.error(newErrors.password);
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setIsAuthenticated(true);
      toast.success("Login successful!");
    }, 2000);
  };

  const validateForm = (): { isValid: boolean; newErrors: { email: string; password: string } } => {
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
    return { isValid, newErrors };
  };

  if (isAuthenticated) {
    return <Navigate to="/buy" />;
  }

  return (
    <div className="container main-content d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      <div className="card shadow-royal p-4" style={{ maxWidth: "400px", width: "100%" }}>
        <h3 className="text-center mb-4">Login</h3>
        <form onSubmit={handleSubmit}>
          {/* Email Field */}
          <div className="mb-3">
            <label htmlFor="InputEmail" className="form-label">Email address</label>
            <input
              type="email"
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
              id="InputEmail"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
          </div>

          {/* Password Field */}
          <div className="mb-3">
            <label htmlFor="InputPassword" className="form-label">Password</label>
            <input
              type="password"
              className={`form-control ${errors.password ? "is-invalid" : ""}`}
              id="InputPassword"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && <div className="invalid-feedback">{errors.password}</div>}
          </div>

          {/* Remember Me Checkbox */}
          <div className="mb-3 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="rememberMe"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <label className="form-check-label" htmlFor="rememberMe">Remember me</label>
          </div>

          {/* Submit Button */}
          <div className="d-grid gap-2">
            <button
              type="submit"
              className={`btn btn-primary ${loading ? "disabled" : ""}`}
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Loading...
                </>
              ) : (
                "Submit"
              )}
            </button>
          </div>

          {/* Signup Link */}
          <div className="text-center mt-3">
            <p className="text-muted">
              Don't have an account?{" "}
              <a href="#" className="text-royal">Sign up</a>
            </p>
          </div>
        </form>
      </div>

      <ToastContainer position="top-right" autoClose={5000} />
    </div>
  );
};

export default Login;
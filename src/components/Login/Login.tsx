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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            setIsAuthenticated(true); // Redirect to /buy page
        }
    };

    const validateForm = (): boolean => {
        let isValid = true;
        const newErrors = { email: "", password: "" };

        // Validate email
        if (!email.trim()) {
            newErrors.email = "Email is required.";
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = "Email is not valid.";
            isValid = false;
        }

        // Validate password
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
                style={{ maxWidth: "400px", width: "100%" }}
            >
                <h3 className="text-center mb-4">Login</h3>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="InputEmail">Email address</label>
                        <input
                            type="email"
                            className={`form-control ${errors.email ? "is-invalid" : ""}`}
                            id="InputEmail"
                            placeholder="Enter email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        {errors.email && (
                            <div className="invalid-feedback">{errors.email}</div>
                        )}
                    </div>
                    <div className="form-group">
                        <label htmlFor="InputPassword">Password</label>
                        <input
                            type="password"
                            className={`form-control ${errors.password ? "is-invalid" : ""}`}
                            id="InputPassword"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {errors.password && (
                            <div className="invalid-feedback">{errors.password}</div>
                        )}
                    </div>
                    <div className="form-check mb-3">
                        <input
                            type="checkbox"
                            className="form-check-input"
                            id="exampleCheck1"
                        />
                        <label className="form-check-label" htmlFor="exampleCheck1">
                            Remember me
                        </label>
                    </div>
                    <button type="submit" className="btn btn-primary btn-block">
                        Submit
                    </button>
                    <div className="text-center mt-3">
                        <p>
                            Don't have an account? <a href="/register">Sign up</a>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;

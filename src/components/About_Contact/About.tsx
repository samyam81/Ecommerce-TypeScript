const About = () => {
  return (
    <div className="container py-5">
      {/* Main Header Section */}
      <h1 className="display-4 mb-4 text-primary font-weight-bold" style={{ fontSize: "3rem", letterSpacing: "1px" }}>
        About Us
      </h1>
      <p className="lead text-muted mb-5" style={{ fontSize: "1.2rem", lineHeight: "1.8" }}>
        Welcome to our e-commerce store! We are committed to providing you with the best products at the most affordable prices. Whether you're looking for electronics, fashion, or home essentials, we have something for everyone.
      </p>

      <p className="mb-4 text-muted" style={{ fontSize: "1.1rem", lineHeight: "1.8" }}>
        Our goal is to make your shopping experience as seamless and enjoyable as possible. With a wide range of high-quality products, secure payment options, and fast delivery, we aim to exceed your expectations.
      </p>

      {/* Mission Section */}
      <h2 className="display-5 mb-3 text-secondary font-weight-bold" style={{ fontSize: "2.5rem", textTransform: "uppercase" }}>
        Our Mission
      </h2>
      <p className="mb-4 text-muted" style={{ fontSize: "1.1rem", lineHeight: "1.8" }}>
        To offer our customers an exceptional online shopping experience by providing top-notch products, excellent customer service, and fast, reliable shipping.
      </p>

      {/* Contact Section */}
      <h2 className="display-5 mb-3 text-secondary font-weight-bold" style={{ fontSize: "2.5rem", textTransform: "uppercase" }}>
        Contact Us
      </h2>
      <p className="text-muted" style={{ fontSize: "1.1rem" }}>
        If you have any questions, feel free to reach out to us at{" "}
        <a
          href="mailto:samyam081@gmail.com"
          className="text-decoration-none text-danger"
          style={{
            fontWeight: "bold",
            transition: "color 0.3s ease, transform 0.3s ease",
            fontSize: "1.2rem",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "#007bff";
            e.currentTarget.style.transform = "scale(1.05)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "#dc3545"; // Red color for contact link
            e.currentTarget.style.transform = "scale(1)";
          }}
        >
          samyam081@gmail.com
        </a>
      </p>

      {/* Features Section - Why Shop With Us? */}
      <div className="d-flex justify-content-center mt-5">
        <div className="bg-light p-4 rounded-lg shadow-lg" style={{ maxWidth: "600px", width: "100%" }}>
          <h3 className="h5 text-primary mb-3" style={{ fontWeight: "600", fontSize: "1.5rem" }}>
            Why Shop With Us?
          </h3>
          <ul className="list-unstyled">
            <li className="mb-3" style={{ fontSize: "1.1rem" }}>
              <i className="bi bi-check-circle text-success"></i> High-quality products
            </li>
            <li className="mb-3" style={{ fontSize: "1.1rem" }}>
              <i className="bi bi-check-circle text-success"></i> Secure payment options
            </li>
            <li className="mb-3" style={{ fontSize: "1.1rem" }}>
              <i className="bi bi-check-circle text-success"></i> Fast and reliable shipping
            </li>
            <li className="mb-3" style={{ fontSize: "1.1rem" }}>
              <i className="bi bi-check-circle text-success"></i> Excellent customer service
            </li>
          </ul>
        </div>
      </div>

      {/* About Section with background */}
      <div className="py-5" style={{ background: "linear-gradient(135deg, #6f42c1, #007bff)", borderRadius: "10px", marginTop: "30px" }}>
        <div className="container text-white text-center">
          <h2 className="mb-4" style={{ fontSize: "2.5rem", fontWeight: "700" }}>Join Us Today</h2>
          <p className="mb-4" style={{ fontSize: "1.2rem", lineHeight: "1.8" }}>
            Experience the best online shopping experience today with unbeatable deals, exceptional customer service, and fast delivery.
          </p>
          <button className="btn btn-light px-4 py-2" style={{ fontSize: "1rem", fontWeight: "600" }}>
            Start Shopping Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default About;

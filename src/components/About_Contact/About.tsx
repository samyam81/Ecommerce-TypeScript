import "../Styles/Responsive.css";
import "../Styles/Animation.css"; // Import the animation styles

const About = () => {
  return (
    <div className="container py-5">
      {/* Main Header Section */}
      <h1
        className="display-4 mb-4 text-primary fw-bold text-center text-md-start fade-in"
        style={{ letterSpacing: "1px" }}
      >
        About Us
      </h1>
      <p
        className="lead text-muted mb-5 text-center text-md-start fade-in-fast"
        style={{ lineHeight: "1.8" }}
      >
        Welcome to our e-commerce store! We are committed to providing you with the best products at the most affordable prices. Whether you're looking for electronics, fashion, or home essentials, we have something for everyone.
      </p>

      <p className="mb-4 text-muted text-center text-md-start fade-in-fast" style={{ lineHeight: "1.8" }}>
        Our goal is to make your shopping experience as seamless and enjoyable as possible. With a wide range of high-quality products, secure payment options, and fast delivery, we aim to exceed your expectations.
      </p>

      {/* Mission Section */}
      <h2
        className="display-5 mb-3 text-secondary fw-bold text-center text-md-start text-uppercase slide-in-left"
      >
        Our Mission
      </h2>
      <p className="mb-4 text-muted text-center text-md-start" style={{ lineHeight: "1.8" }}>
        To offer our customers an exceptional online shopping experience by providing top-notch products, excellent customer service, and fast, reliable shipping.
      </p>

      {/* Contact Section */}
      <h2
        className="display-5 mb-3 text-secondary fw-bold text-center text-md-start text-uppercase slide-in-left"
      >
        Contact Us
      </h2>
      <p className="text-muted text-center text-md-start">
        If you have any questions, feel free to reach out to us at{" "}
        <a
          href="mailto:samyam081@gmail.com"
          className="text-decoration-none text-danger fw-bold"
          style={{
            transition: "color 0.3s ease, transform 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "#007bff";
            e.currentTarget.style.transform = "scale(1.05)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "#dc3545";
            e.currentTarget.style.transform = "scale(1)";
          }}
        >
          samyam081@gmail.com
        </a>
      </p>

      {/* Features Section - Why Shop With Us? */}
      <div className="d-flex justify-content-center mt-5">
        <div
          className="bg-light p-4 rounded shadow-lg w-100 scale-up"
          style={{ maxWidth: "600px" }}
        >
          <h3 className="h5 text-primary mb-3 fw-bold text-center">Why Shop With Us?</h3>
          <ul className="list-unstyled">
            <li className="mb-3">
              <i className="bi bi-check-circle text-success"></i> High-quality products
            </li>
            <li className="mb-3">
              <i className="bi bi-check-circle text-success"></i> Secure payment options
            </li>
            <li className="mb-3">
              <i className="bi bi-check-circle text-success"></i> Fast and reliable shipping
            </li>
            <li className="mb-3">
              <i className="bi bi-check-circle text-success"></i> Excellent customer service
            </li>
          </ul>
        </div>
      </div>

      {/* About Section with Background */}
      <div
        className="py-5 mt-4 rounded fade-in"
        style={{
          background: "linear-gradient(135deg, #6f42c1, #007bff)",
        }}
      >
        <div className="container text-white text-center">
          <h2 className="mb-4" style={{ fontWeight: "700" }}>Join Us Today</h2>
          <p className="mb-4" style={{ lineHeight: "1.8" }}>
            Experience the best online shopping experience today with unbeatable deals, exceptional customer service, and fast delivery.
          </p>
          <button className="btn btn-light px-4 py-2 fw-bold">
            Start Shopping Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default About;

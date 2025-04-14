const About = () => {
  return (
    <div className="container main-content">
      {/* Main Header Section */}
      <h1 className="fade-in" style={{ letterSpacing: "1px" }}>
        About Us
      </h1>
      <p
        className="fade-in-fast"
        style={{ lineHeight: "1.8" }}
      >
        Welcome to our e-commerce store! We are committed to providing you with
        the best products at the most affordable prices. Whether you're looking
        for electronics, fashion, or home essentials, we have something for
        everyone.
      </p>

      <p
        className="fade-in-fast"
        style={{ lineHeight: "1.8" }}
      >
        Our goal is to make your shopping experience as seamless and enjoyable
        as possible. With a wide range of high-quality products, secure payment
        options, and fast delivery, we aim to exceed your expectations.
      </p>

      {/* Mission Section */}
      <h2 className="slide-in-left">
        Our Mission
      </h2>
      <p style={{ lineHeight: "1.8" }}>
        To offer our customers an exceptional online shopping experience by
        providing top-notch products, excellent customer service, and fast,
        reliable shipping.
      </p>

      {/* Contact Section */}
      <h2 className="slide-in-left">
        Contact Us
      </h2>
      <p>
        If you have any questions, feel free to reach out to us at{" "}
        <a
          href="mailto:samyam081@gmail.com"
          className="text-wine"
          style={{
            fontWeight: "bold",
            transition: "color 0.3s ease, transform 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "var(--royal-purple-light)";
            e.currentTarget.style.transform = "scale(1.05)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "var(--red-wine)";
            e.currentTarget.style.transform = "scale(1)";
          }}
        >
          samyam081@gmail.com
        </a>
      </p>

      {/* Features Section - Why Shop With Us? */}
      <div className="is-flex is-justify-content-center mt-5">
        <div
          className="card fade-in"
          style={{ maxWidth: "600px", width: "100%" }}
        >
          <div className="card-body">
            <h3 className="card-title">
              Why Shop With Us?
            </h3>
            <ul className="content">
              <li>
                <span className="icon has-text-success">
                  <i className="fas fa-check-circle"></i>
                </span>{" "}
                High-quality products
              </li>
              <li>
                <span className="icon has-text-success">
                  <i className="fas fa-check-circle"></i>
                </span>{" "}
                Secure payment options
              </li>
              <li>
                <span className="icon has-text-success">
                  <i className="fas fa-check-circle"></i>
                </span>{" "}
                Fast and reliable shipping
              </li>
              <li>
                <span className="icon has-text-success">
                  <i className="fas fa-check-circle"></i>
                </span>{" "}
                Excellent customer service
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* About Section with Background */}
      <div
        className="py-5 mt-5 fade-in ad-section"
        style={{
          borderRadius: "var(--radius-lg)",
        }}
      >
        <div className="container">
          <h2>Join Us Today</h2>
          <p style={{ lineHeight: "1.8" }}>
            Experience the best online shopping experience today with unbeatable
            deals, exceptional customer service, and fast delivery.
          </p>
          <button className="btn btn-primary mt-3">
            Start Shopping Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default About;
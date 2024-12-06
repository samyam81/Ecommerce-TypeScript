const About = () => {
  return (
    <div className="container py-5 text-center">
      <h1 className="display-4 mb-4 text-primary font-weight-bold">About Us</h1>
      <p className="lead text-muted">
        Welcome to our e-commerce store! We are committed to providing you with
        the best products at the most affordable prices. Whether you're looking
        for electronics, fashion, or home essentials, we have something for
        everyone.
      </p>
      <p className="mb-4 text-muted">
        Our goal is to make your shopping experience as seamless and enjoyable
        as possible. With a wide range of high-quality products, secure payment
        options, and fast delivery, we aim to exceed your expectations.
      </p>
      <h2 className="display-5 mb-3 text-secondary font-weight-bold">
        Our Mission
      </h2>
      <p className="mb-4 text-muted">
        To offer our customers an exceptional online shopping experience by
        providing top-notch products, excellent customer service, and fast,
        reliable shipping.
      </p>
      <h2 className="display-5 mb-3 text-secondary font-weight-bold">
        Contact Us
      </h2>
      <p>
        If you have any questions, feel free to reach out to us at{" "}
        <a
          href="mailto:samyam081@gmail.com"
          className="text-decoration-none text-danger"
          style={{
            fontWeight: "bold",
            transition: "color 0.3s, transform 0.3s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "#007bff";
            e.currentTarget.style.transform = "scale(1.05)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "#0d6efd";
            e.currentTarget.style.transform = "scale(1)";
          }}
        >
          samyam081@gmail.com
        </a>
      </p>

      <div className="d-flex justify-content-center mt-5">
        <div className="bg-light p-4 rounded shadow-sm">
          <h3 className="h5 text-primary">Why Shop With Us?</h3>
          <ul className="list-unstyled">
            <li className="mb-2">
              <i className="bi bi-check-circle text-success"></i> High-quality
              products
            </li>
            <li className="mb-2">
              <i className="bi bi-check-circle text-success"></i> Secure payment
              options
            </li>
            <li className="mb-2">
              <i className="bi bi-check-circle text-success"></i> Fast and
              reliable shipping
            </li>
            <li className="mb-2">
              <i className="bi bi-check-circle text-success"></i> Excellent
              customer service
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default About;

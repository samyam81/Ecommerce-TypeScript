import { useEffect, useState } from "react";
import { useFilter } from "../Filter/FilterContext";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const {
    setSearchQuery,
    setSelectedCategory,
    setMinPrice,
    setMaxPrice,
    setKeywords,
  } = useFilter();

  const [categories, setCategories] = useState<string[]>([]);
  const [keywords] = useState<string[]>([
    "apple",
    "watch",
    "fashion",
    "trend",
    "shoes",
    "shirt",
  ]);
  const [randomProduct, setRandomProduct] = useState<any | null>(null);

  // Fetch categories and random product
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("https://dummyjson.com/products");
        const data = await response.json();
        const uniqueCategories: string[] = Array.from(
          new Set(
            data.products.map(
              (product: { category: string }) => product.category
            )
          )
        );
        setCategories(uniqueCategories);
      } catch (err) {
        console.error("Error fetching categories", err);
      }
    };

    const fetchRandomProduct = async () => {
      try {
        const response = await fetch("https://dummyjson.com/products");
        const data = await response.json();
        const randomProduct =
          data.products[Math.floor(Math.random() * data.products.length)];
        setRandomProduct(randomProduct);
      } catch (err) {
        console.error("Error fetching random product", err);
      }
    };

    fetchCategories();
    fetchRandomProduct();
  }, []);

  const handleKeywordClick = (keyword: string) => {
    setKeywords(keyword);
  };

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("");
    setMaxPrice(undefined);
    setMinPrice(undefined);
    setKeywords("");
  };

  return (
    <div className="sidebar bg-white p-4 rounded shadow">
      <h1
        className="text-center text-gradient fw-bold py-3"
        style={{
          background: "linear-gradient(to right, #007bff, #28a745)",
          WebkitBackgroundClip: "text",
          color: "transparent",
          fontSize: "1.8rem",
        }}
      >
       Samyam React
      </h1>

      {/* Keywords Section */}
      <section className="mb-5">
        <h3 className="h5 text-dark mb-3">Keywords</h3>
        <div className="d-flex flex-wrap gap-2">
          {keywords.map((keyword, index) => (
            <span
              key={index}
              className="badge bg-light text-dark border shadow-sm cursor-pointer px-3 py-2 rounded-pill"
              onClick={() => handleKeywordClick(keyword)}
              style={{
                transition: "transform 0.2s, background-color 0.3s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.1)";
                e.currentTarget.style.backgroundColor = "#f8f9fa";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.backgroundColor = "white";
              }}
            >
              {keyword.toUpperCase()}
            </span>
          ))}
        </div>
      </section>

      {/* Special Offer Section */}
      {randomProduct && (
        <section className="mb-5">
          <h3 className="h5 text-dark mb-3">Special Offer</h3>
          <div
            className="card shadow-lg border-0"
            style={{
              maxWidth: "250px",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.05)";
              e.currentTarget.style.boxShadow =
                "0 4px 15px rgba(0, 0, 0, 0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <img
              src={randomProduct.thumbnail || randomProduct.image}
              alt={randomProduct.title}
              className="card-img-top"
              style={{
                objectFit: "cover",
                height: "150px",
                borderRadius: "5px 5px 0 0",
              }}
            />
            <div className="card-body p-3">
              <h5 className="card-title text-dark">{randomProduct.title}</h5>
              <p className="card-text text-muted">
                Price: <strong>${randomProduct.price}</strong>
              </p>
              <Link
                to={`/product/${randomProduct.id}`}
                className="btn btn-primary btn-sm w-100"
                style={{
                  fontWeight: "bold",
                  letterSpacing: "1px",
                  transition: "background-color 0.3s",
                }}
              >
                View Product
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Reset Filters */}
      <button
        className="btn btn-danger w-100 mt-4 py-2 shadow"
        onClick={handleResetFilters}
        style={{
          fontWeight: "bold",
          letterSpacing: "1px",
          borderRadius: "8px",
          transition: "transform 0.3s ease, background-color 0.3s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.05)";
          e.currentTarget.style.backgroundColor = "#e02b2b";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.backgroundColor = "#dc3545";
        }}
      >
        Reset Filters
      </button>

      {/* Follow Us Section */}
      <div className="mt-5 text-center">
        <h5 className="mb-3 text-success">Follow Us On</h5>
        <div className="d-flex justify-content-center gap-3">
          <i className="bi bi-youtube text-danger fs-3"></i>
          <i className="bi bi-facebook text-primary fs-3"></i>
          <i className="bi bi-twitter text-info fs-3"></i>
        </div>
        <span style={{display:'none'}}>{categories}</span>
      </div>
    </div>
  );
};

export default Sidebar;

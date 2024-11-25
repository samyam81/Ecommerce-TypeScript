import { useEffect, useState } from "react";
import { useFilter } from "../Filter/FilterContext";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const {
    setSearchQuery,
    selectedCategory,
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

  const handleRadioChangeCategories = (category: string) => {
    setSelectedCategory(category);
  };

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
    <div className="sidebar bg-light p-4 rounded shadow-sm">
      <h1 className="sidebar-header border-bottom pb-3 mb-4 text-center text-primary fw-bold">
        React Store
      </h1>

      {/* Categories Section */}
      <section className="mb-5">
        <h3 className="h5 text-dark mb-3">Categories</h3>
        {categories.length > 0 ? (
          categories.map((category, index) => (
            <div key={index} className="form-check mb-2">
              <input
                type="radio"
                className="form-check-input"
                id={category}
                name="category"
                value={category}
                onChange={() => handleRadioChangeCategories(category)}
                checked={selectedCategory === category}
              />
              <label className="form-check-label text-muted" htmlFor={category}>
                {category.toUpperCase()}
              </label>
            </div>
          ))
        ) : (
          <p className="text-muted">Loading categories...</p>
        )}
      </section>

      {/* Keywords Section */}
      <section className="mb-5">
        <h3 className="h5 text-dark mb-3">Keywords</h3>
        <div className="d-flex flex-wrap gap-2">
          {keywords.map((keyword, index) => (
            <span
              key={index}
              className="badge bg-success text-white cursor-pointer p-2 shadow-sm"
              onClick={() => handleKeywordClick(keyword)}
              style={{
                transition: "transform 0.2s, background-color 0.3s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.1)";
                e.currentTarget.style.backgroundColor = "#28a745";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.backgroundColor = "#28a745";
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
              maxWidth: "220px",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.05)";
              e.currentTarget.style.boxShadow = "0 4px 15px rgba(0, 0, 0, 0.2)";
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
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#007bff";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#0056b3";
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
        className="btn btn-danger w-100 mt-4 py-2 shadow-sm"
        onClick={handleResetFilters}
        style={{
          fontWeight: "bold",
          letterSpacing: "1px",
          transition: "background-color 0.3s, transform 0.3s",
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
    </div>
  );
};

export default Sidebar;

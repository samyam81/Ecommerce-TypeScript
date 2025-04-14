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
    <div className="card shadow-royal border-0 fade-in">
      <div className="card-body p-4">
        {/* Logo/Brand */}
        <h1 className="text-center mb-4">
          <span className="text-royal fw-bold">Royal</span>
          <span className="text-royal-blue fw-bold">Shop</span>
        </h1>

        {/* Keywords Section */}
        <section className="mb-4">
          <h3 className="h5 text-royal-purple-dark mb-3">Popular Keywords</h3>
          <div className="d-flex flex-wrap gap-2">
            {keywords.map((keyword, index) => (
              <span
                key={index}
                className="badge badge-outline-primary hover-scale cursor-pointer"
                onClick={() => handleKeywordClick(keyword)}
              >
                {keyword.toUpperCase()}
              </span>
            ))}
          </div>
        </section>

        {/* Special Offer Section */}
        {randomProduct && (
          <section className="mb-4">
            <h3 className="h5 text-royal-purple-dark mb-3">Special Offer</h3>
            <div className="card shadow-sm hover-shadow product-card">
              <div className="position-relative">
                <img
                  src={randomProduct.thumbnail || randomProduct.image}
                  alt={randomProduct.title}
                  className="card-img-top"
                  style={{
                    objectFit: "cover",
                    height: "150px",
                  }}
                />
                <span className="badge badge-wine position-absolute top-0 end-0 m-2">
                  SPECIAL
                </span>
              </div>
              <div className="card-body p-3">
                <h5 className="card-title">{randomProduct.title}</h5>
                <p className="product-price mb-2">
                  ${randomProduct.price}
                  {randomProduct.discountPercentage && (
                    <small className="text-muted ms-2">
                      <del>
                        $
                        {Math.round(
                          randomProduct.price *
                          (1 + randomProduct.discountPercentage / 100)
                        )}
                      </del>
                    </small>
                  )}
                </p>
                <Link
                  to={`/product/${randomProduct.id}`}
                  className="btn btn-primary w-100"
                >
                  View Product
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* Reset Filters Button */}
        <button
          className="btn btn-wine w-100 mb-4 hover-scale"
          onClick={handleResetFilters}
        >
          <i className="bi bi-x-circle me-2"></i>
          Reset All Filters
        </button>

        {/* Follow Us Section */}
        <div className="ad-section text-center p-4">
          <h4 className="mb-3">Follow Us</h4>
          <div className="d-flex justify-content-center gap-3 mb-3">
            <a href="#" className="text-white fs-4 hover-scale">
              <i className="bi bi-youtube"></i>
            </a>
            <a href="#" className="text-white fs-4 hover-scale">
              <i className="bi bi-facebook"></i>
            </a>
            <a href="#" className="text-white fs-4 hover-scale">
              <i className="bi bi-twitter"></i>
            </a>
            <a href="#" className="text-white fs-4 hover-scale">
              <i className="bi bi-instagram"></i>
            </a>
          </div>
          <p className="mb-0">Stay updated with our latest offers</p>
        </div>
      </div>
      <span style={{ display: "none" }}>{categories}</span>
    </div>
  );
};

export default Sidebar;
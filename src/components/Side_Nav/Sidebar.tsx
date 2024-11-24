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

  // Handle changes to inputs
  // const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const value = e.target.value;
  //   setMinPrice(value ? parseFloat(value) : undefined);
  // };

  // const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const value = e.target.value;
  //   setMaxPrice(value ? parseFloat(value) : undefined);
  // };

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
    <div className="sidebar bg-light p-3">
      <h1 className="sidebar-header border-bottom pb-2 mb-3">React Store</h1>

      {/* Categories Section */}
      <section className="mb-4">
        <h3 className="h5">Categories</h3>
        {categories.length > 0 ? (
          categories.map((category, index) => (
            <div key={index} className="form-check">
              <input
                type="radio"
                className="form-check-input"
                id={category}
                name="category"
                value={category}
                onChange={() => handleRadioChangeCategories(category)}
                checked={selectedCategory === category}
              />
              <label className="form-check-label" htmlFor={category}>
                {category.toLocaleUpperCase()}
              </label>
            </div>
          ))
        ) : (
          <p>Loading categories...</p>
        )}
      </section>

      {/* Keywords Section */}
      <section className="mb-4">
        <h3 className="h5">Keywords</h3>
        <div className="d-flex flex-wrap gap-2">
          {keywords.map((keyword, index) => (
            <span
              key={index}
              className="badge bg-primary text-white cursor-pointer"
              onClick={() => handleKeywordClick(keyword)}
              style={{ cursor: "pointer" }}
            >
              {keyword.toUpperCase()}
            </span>
          ))}
        </div>
      </section>

      {/* Special Offer Section */}
      {randomProduct && (
        <section className="mb-4">
          <h3 className="h5">Special Offer</h3>
          <div
            className="card"
            style={{
              maxWidth: "200px",
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
              style={{ objectFit: "cover", height: "150px" }}
            />
            <div className="card-body">
              <h5 className="card-title">{randomProduct.title}</h5>
              <p className="card-text">Price: ${randomProduct.price}</p>
              <Link
                to={`/product/${randomProduct.id}`}
                className="btn btn-primary btn-sm w-100"
              >
                View Product
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Reset Filters */}
      <button
        className="btn btn-danger w-100 mt-3"
        onClick={handleResetFilters}
      >
        Reset Filters
      </button>
    </div>
  );
};

export default Sidebar;

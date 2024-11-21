import React, { useEffect, useState } from "react";
import { useFilter } from "./FilterContext";
import "bootstrap/dist/css/bootstrap.min.css";

const Sidebar = () => {
  const {
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    minPrice,
    setMinPrice,
    maxPrice,
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

    fetchCategories();
  }, []);

  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMinPrice(value ? parseFloat(value) : undefined);
  };

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMaxPrice(value ? parseFloat(value) : undefined);
  };

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
    <div
      className="d-flex flex-column p-3 bg-dark text-white"
      style={{
        width: "250px",
        height: "100%",
        boxShadow: "2px 0 5px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h1 className="text-center mb-4">React Store</h1>

      <section className="mb-4">
        <input
          type="text"
          placeholder="Search for Items"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="form-control mb-3"
        />
        <div className="d-flex justify-content-between">
          <input
            type="number"
            placeholder="Min"
            value={minPrice ?? ""}
            onChange={handleMinPriceChange}
            className="form-control me-2"
            style={{ width: "48%" }}
          />
          <input
            type="number"
            placeholder="Max"
            value={maxPrice ?? ""}
            onChange={handleMaxPriceChange}
            className="form-control ms-2"
            style={{ width: "48%" }}
          />
        </div>
      </section>

      <section className="mb-4">
        <h3 className="fs-5 mb-3">Categories</h3>
        {categories.length > 0 ? (
          categories.map((category, index) => (
            <div key={index} className="form-check">
              <input
                type="radio"
                id={category}
                name="category"
                value={category}
                onChange={() => handleRadioChangeCategories(category)}
                checked={selectedCategory === category}
                className="form-check-input"
              />
              <label htmlFor={category} className="form-check-label">
                {category.toUpperCase()}
              </label>
            </div>
          ))
        ) : (
          <p>Loading categories...</p>
        )}
      </section>

      <section className="mb-4">
        <h3 className="fs-5 mb-3">Keywords</h3>
        <div className="d-flex flex-wrap">
          {keywords.map((keyword, index) => (
            <button
              key={index}
              onClick={() => handleKeywordClick(keyword)}
              className="btn btn-success mb-2 me-2"
              style={{ width: "100%" }}
            >
              {keyword.toUpperCase()}
            </button>
          ))}
        </div>
      </section>

      <button
        onClick={handleResetFilters}
        className="btn btn-danger w-100 mt-3"
      >
        Reset Filters
      </button>
    </div>
  );
};

export default Sidebar;

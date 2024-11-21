import React, { useEffect, useState } from "react";
import { useFilter } from "./FilterContext";

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
        const uniqueCategories = Array.from(
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
      style={{ padding: "20px", backgroundColor: "#2e2e2e", color: "white" }}
    >
      <h1>React Store</h1>
      <section>
        <div>
          <input
            type="text"
            placeholder="Search for Items"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ padding: "8px", margin: "5px", width: "200px" }}
          />
          <div>
            <input
              type="number"
              placeholder="Min"
              value={minPrice ?? ""}
              onChange={handleMinPriceChange}
              style={{ padding: "8px", margin: "5px" }}
            />
            <input
              type="number"
              placeholder="Max"
              value={maxPrice ?? ""}
              onChange={handleMaxPriceChange}
              style={{ padding: "8px", margin: "5px" }}
            />
          </div>
        </div>

        <section>
          <h3>Categories</h3>
          {categories.length > 0 ? (
            categories.map((category, index) => (
              <label key={index}>
                <input
                  type="radio"
                  name="category"
                  value={category}
                  onChange={() => handleRadioChangeCategories(category)}
                  checked={selectedCategory === category}
                />
                {category.toUpperCase()}
              </label>
            ))
          ) : (
            <p>Loading categories...</p>
          )}
        </section>

        <div>
          <h3>Keywords</h3>
          <div>
            {keywords.map((keyword, index) => (
              <button
                key={index}
                onClick={() => handleKeywordClick(keyword)}
                style={{
                  padding: "5px 10px",
                  margin: "5px",
                  backgroundColor: "#4caf50",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                {keyword.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
        <button
          onClick={handleResetFilters}
          style={{
            padding: "10px 20px",
            marginTop: "20px",
            backgroundColor: "#f44336",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Reset Filters
        </button>
      </section>
    </div>
  );
};

export default Sidebar;

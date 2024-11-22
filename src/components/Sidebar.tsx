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
    <div className="sidebar border-end p-3">
      <h1 className="sidebar-header border-bottom pb-2">React Store</h1>

      <section className="mb-4">
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Search for Items"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div className="d-flex gap-2">
          <input
            type="number"
            className="form-control"
            placeholder="Min"
            value={minPrice ?? ""}
            onChange={handleMinPriceChange}
          />
          <input
            type="number"
            className="form-control"
            placeholder="Max"
            value={maxPrice ?? ""}
            onChange={handleMaxPriceChange}
          />
        </div>
      </section>

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
                {category.toUpperCase()}
              </label>
            </div>
          ))
        ) : (
          <p>Loading categories...</p>
        )}
      </section>

      <section className="mb-4">
        <h3 className="h5">Keywords</h3>
        <div className="d-flex flex-wrap gap-2">
          {keywords.map((keyword, index) => (
            <button
              key={index}
              className="btn btn-outline-primary btn-sm"
              onClick={() => handleKeywordClick(keyword)}
            >
              {keyword.toUpperCase()}
            </button>
          ))}
        </div>
      </section>

      <button className="btn btn-danger" onClick={handleResetFilters}>
        Reset Filters
      </button>
    </div>
  );
};

export default Sidebar;

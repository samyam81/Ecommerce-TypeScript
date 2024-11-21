import React, { useEffect, useState } from "react";
import { useFilter } from "./FilterContext";
import "./Sidebar.css";

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
    <div className="sidebar">
      <h1 className="sidebar__title">React Store</h1>

      <section className="sidebar__search">
        <input
          type="text"
          placeholder="Search for Items"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="sidebar__input"
        />
        <div className="sidebar__price-range">
          <input
            type="number"
            placeholder="Min"
            value={minPrice ?? ""}
            onChange={handleMinPriceChange}
            className="sidebar__input sidebar__input--half"
          />
          <input
            type="number"
            placeholder="Max"
            value={maxPrice ?? ""}
            onChange={handleMaxPriceChange}
            className="sidebar__input sidebar__input--half"
          />
        </div>
      </section>

      <section className="sidebar__categories">
        <h3 className="sidebar__section-title">Categories</h3>
        {categories.length > 0 ? (
          categories.map((category, index) => (
            <label key={index} className="sidebar__category">
              <input
                type="radio"
                name="category"
                value={category}
                onChange={() => handleRadioChangeCategories(category)}
                checked={selectedCategory === category}
                className="sidebar__radio"
              />
              {category.toUpperCase()}
            </label>
          ))
        ) : (
          <p>Loading categories...</p>
        )}
      </section>

      <section className="sidebar__keywords">
        <h3 className="sidebar__section-title">Keywords</h3>
        <div className="sidebar__keywords-list">
          {keywords.map((keyword, index) => (
            <button
              key={index}
              onClick={() => handleKeywordClick(keyword)}
              className="sidebar__keyword-btn"
            >
              {keyword.toUpperCase()}
            </button>
          ))}
        </div>
      </section>

      <button onClick={handleResetFilters} className="sidebar__reset-btn">
        Reset Filters
      </button>
    </div>
  );
};

export default Sidebar;

import { Tally3 } from "lucide-react";
import { useFilter } from "./FilterContext";
import { useEffect, useState } from "react";
import axios from "axios";
import { useCart } from "./CartContext"; 
import { Link } from "react-router-dom";
import "./MainContent.css";

const MainContent = () => {
  const { searchQuery, selectedCategory, minPrice, maxPrice, keyword } =
    useFilter();
  const { addItemToCart, cartItems } = useCart(); 
  const [products, setProducts] = useState<any[]>([]);
  const [filter, setFilter] = useState<"all" | string>("all");
  const [dropdown, setDropdown] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  useEffect(() => {
    let url = `http://dummyjson.com/products?limit=${itemsPerPage}&skip=${
      (currentPage - 1) * itemsPerPage
    }`;

    if (keyword) {
      url = `http://dummyjson.com/products/search?q=${keyword}`;
    }

    axios
      .get(url)
      .then((response) => {
        setProducts(response.data.products);
      })
      .catch((error) => {
        console.error("Error fetching data", error);
      });
  }, [currentPage, keyword]);

  function getFilteredProducts() {
    let filteredProducts = products;

    if (selectedCategory) {
      filteredProducts = filteredProducts.filter(
        (product) => product.category === selectedCategory
      );
    }

    if (minPrice !== undefined) {
      filteredProducts = filteredProducts.filter(
        (product) => product.price >= minPrice
      );
    }

    if (maxPrice !== undefined) {
      filteredProducts = filteredProducts.filter(
        (product) => product.price <= maxPrice
      );
    }

    if (searchQuery) {
      filteredProducts = filteredProducts.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filteredProducts;
  }

  return (
    <section className="main-content">
      <div className="filter-container">
        <div className="dropdown-container">
          <button
            className="filter-button"
            onClick={() => setDropdown(!dropdown)}
          >
            <Tally3 />
            {filter === "all"
              ? "Filter"
              : filter.charAt(0).toLowerCase() + filter.slice(1)}
          </button>
          {dropdown && (
            <div className="dropdown-menu">
              <button onClick={() => setFilter("Cheap")}>Cheap</button>
              <button onClick={() => setFilter("Expensive")}>Expensive</button>
              <button onClick={() => setFilter("Popular")}>Popular</button>
            </div>
          )}
        </div>
      </div>
      <div className="product-grid">
        {getFilteredProducts().map((product) => (
          <div key={product.id} className="product-card">
            <h3 className="product-title">{product.title}</h3>
            <p className="product-price">{product.price} USD</p>
            <img
              src={product.thumbnail}
              alt={product.title}
              className="product-image"
            />
            <button
              className="add-to-cart-button"
              onClick={() => {
                addItemToCart(product);
                console.log(cartItems);
              }}
            >
              Add to Cart
            </button>
            <Link to={`/product/${product.id}`} className="add-to-cart-button">
              View Details
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MainContent;

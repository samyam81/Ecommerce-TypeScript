import { Tally3 } from "lucide-react";
import { useFilter } from "../Filter/FilterContext";
import { useEffect, useState } from "react";
import axios from "axios";
import { useCart } from "../Cart/CartContext";
import { Link } from "react-router-dom";

const MainContent = () => {
  const { searchQuery, selectedCategory, minPrice, maxPrice, keyword } =
    useFilter();
  const { addItemToCart, cartItems } = useCart();
  const [products, setProducts] = useState<any[]>([]);
  const [filter, setFilter] = useState<"all" | string>("all");
  const [dropdown, setDropdown] = useState(false);
  const [currentPage] = useState(1);
  const itemsPerPage = 12;

  useEffect(() => {
    let url = `https://dummyjson.com/products?limit=${itemsPerPage}&skip=${
      (currentPage - 1) * itemsPerPage
    }`;

    if (keyword) {
      url = `https://dummyjson.com/products/search?q=${keyword}`;
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

    if (filter !== "all") {
      if (filter === "Cheap") {
        filteredProducts = filteredProducts.sort((a, b) => a.price - b.price);
      } else if (filter === "Expensive") {
        filteredProducts = filteredProducts.sort((a, b) => b.price - a.price);
      } else if (filter === "Popular") {
        filteredProducts = filteredProducts.sort((a, b) => b.rating - a.rating);
      }
    }

    return filteredProducts;
  }

  return (
    <section
      className="main-content container-fluid mt-4"
      style={{ margin: 0, padding: "20px", flex: 1, overflowY: "auto" }}
    >
      <style>
        {`
          .card-hover-effect {
            transition: border-color 0.3s ease, box-shadow 0.3s ease;
          }
          .card-hover-effect:hover {
            border: 2px solid red !important;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
          }
          .ad-section {
            background-color: #f8f9fa;
            padding: 20px;
            text-align: center;
            margin-bottom: 20px;
            border-radius: 5px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          }
          .ad-section h4 {
            margin-bottom: 15px;
          }
          .ad-section button {
            margin-top: 10px;
          }
        `}
      </style>

      {/* Ad Section */}
      <div className="ad-section">
        <h4>Exclusive Offer!</h4>
        <p>
          Get 50% off on your first order! Don't miss out on this limited time
          offer.
        </p>
        <button className="btn btn-primary">Shop Now</button>
      </div>

      {/* Filter Container */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Products</h2>
        <div className="dropdown">
          <button
            className="btn btn-outline-primary dropdown-toggle"
            onClick={() => setDropdown(!dropdown)}
          >
            <Tally3 className="me-2" />
            {filter === "all"
              ? "Filter"
              : filter.charAt(0).toUpperCase() + filter.slice(1)}
          </button>
          {dropdown && (
            <ul className="dropdown-menu show">
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => setFilter("Cheap")}
                >
                  Cheap
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => setFilter("Expensive")}
                >
                  Expensive
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => setFilter("Popular")}
                >
                  Popular
                </button>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => setFilter("all")}
                >
                  Reset Filter
                </button>
              </li>
            </ul>
          )}
        </div>
      </div>

      {/* Product Grid */}
      <div className="row">
        {getFilteredProducts().map((product) => (
          <div
            key={product.id}
            className="col-lg-2 col-md-3 col-sm-4 col-6 mb-3"
          >
            <Link
              to={`/product/${product.id}`}
              className="text-decoration-none text-dark"
            >
              <div
                className="card h-100 card-hover-effect"
                style={{
                  width: "100%",
                  maxWidth: "150px", // Reduced width
                  margin: "0 auto",
                }}
              >
                <img
                  src={product.thumbnail || product.images[0]}
                  alt={product.title}
                  className="card-img-top"
                  style={{
                    height: "120px", // Reduced height
                    objectFit: "cover",
                  }}
                />
                <div
                  className="card-body d-flex flex-column"
                  style={{
                    padding: "10px", // Reduced padding
                  }}
                >
                  <h6
                    className="card-title"
                    style={{
                      fontSize: "0.85rem", // Smaller title font
                      lineHeight: "1.2",
                    }}
                  >
                    {product.title}
                  </h6>
                  <p
                    className="card-text text-success fw-bold"
                    style={{
                      fontSize: "0.75rem", // Smaller price font
                    }}
                  >
                    {product.price} USD
                  </p>
                  <button
                    className="btn btn-primary w-100 mt-auto"
                    style={{
                      fontSize: "0.75rem", // Smaller button text
                      padding: "5px",
                    }}
                    onClick={(e) => {
                      e.preventDefault(); // Prevent navigation when adding to cart
                      addItemToCart(product);
                    }}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MainContent;

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
  const itemsPerPage = 8;

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
    <section className="main-content container mt-4">
      <style>
        {`
          .card-hover-effect {
            transition: border-color 0.3s ease, box-shadow 0.3s ease;
          }
          .card-hover-effect:hover {
            border: 2px solid red !important;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
          }
        `}
      </style>

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
            <ul className="dropdown-menu">
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
            </ul>
          )}
        </div>
      </div>

      {/* Product Grid */}
      <div className="row">
        {getFilteredProducts().map((product) => (
          <div key={product.id} className="col-lg-3 col-md-4 col-sm-6 mb-4">
            <Link
              to={`/product/${product.id}`}
              className="text-decoration-none text-dark"
            >
              <div className="card h-100 card-hover-effect">
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="card-img-top"
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{product.title}</h5>
                  <p className="card-text text-success fw-bold">
                    {product.price} USD
                  </p>
                  <button
                    className="btn btn-primary w-100 mt-auto"
                    onClick={(e) => {
                      e.preventDefault(); // Prevent navigation when adding to cart
                      addItemToCart(product);
                      console.log(cartItems);
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

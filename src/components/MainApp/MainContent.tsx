import { Tally3 } from "lucide-react";
import { useFilter } from "../Filter/FilterContext";
import { useEffect, useState } from "react";
import axios from "axios";
import { useCart } from "../Cart/CartContext";
import { useWish } from "../Wish/WishContext"; // Import the Wish context
import { Link } from "react-router-dom";
import ProductCard from "../ProductLanding/ProductCard";
import "../Styles/Main.css";

const MainContent = () => {
  const { searchQuery, selectedCategory, minPrice, maxPrice, keyword } =
    useFilter();
  const { addItemToCart } = useCart();
  const { wishItems, addItemToWish } = useWish(); // Access wish context
  const [products, setProducts] = useState<any[]>([]);
  const [filter, setFilter] = useState<"all" | string>("all");
  const [dropdown, setDropdown] = useState(false);
  const [currentPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const itemsPerPage = 12;

  useEffect(() => {
    let url = `https://dummyjson.com/products?limit=${itemsPerPage}&skip=${(currentPage - 1) * itemsPerPage
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

  useEffect(() => {
    setProducts([]); // Reset products when filters are changed
  }, [searchQuery, selectedCategory, minPrice, maxPrice, filter]);

  function getFilteredProducts() {
    let filteredProducts = products;

    if (!products.length) return [];

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

  function handleAddToCart(product: any) {
    addItemToCart(product); // Add to cart
    setSelectedProduct(product); // Open modal with selected product
  }

  function handleToggleWishlist(product: any) {
    addItemToWish(product); // Add or remove from wishlist
  }

  function closeProductCard() {
    setSelectedProduct(null); // Close modal
  }

  return (
    <section className="main-content container-fluid mt-4 px-4">
      <div className="ad-section bg-primary text-white p-5 rounded mb-4 text-center shadow-lg">
        <h4 className="display-4">🎉 Exclusive Offer!</h4>
        <p className="lead">
          Get 50% off on your first order! Don’t miss out on this limited-time
          deal.
        </p>
        <button className="btn btn-warning btn-lg rounded-pill shadow-lg hover-shadow">
          Shop Now
        </button>
      </div>

      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-dark">🛍️ Products</h2>
        <div className="dropdown">
          <button
            className="btn btn-outline-dark dropdown-toggle"
            onClick={() => setDropdown(!dropdown)}
          >
            <Tally3 className="me-2" />
            {filter === "all"
              ? "Sort By"
              : filter.charAt(0).toUpperCase() + filter.slice(1)}
          </button>
          {dropdown && (
            <ul className="dropdown-menu show">
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => setFilter("Cheap")}
                >
                  Cheapest
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => setFilter("Expensive")}
                >
                  Most Expensive
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => setFilter("Popular")}
                >
                  Most Popular
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

      <div className="row g-4">
        {getFilteredProducts().map((product) => (
          <div key={product.id} className="col-lg-3 col-md-4 col-sm-6">
            <div className="card h-100 shadow-lg card-hover-effect position-relative">
              <button
                className={`wishlist-icon btn ${wishItems.some((item) => item.id === product.id)
                  ? "btn-danger"
                  : "btn-outline-danger"
                  }`}
                onClick={(e) => {
                  e.preventDefault();
                  handleToggleWishlist(product);
                }}
              >
                ♥
              </button>
              <Link
                to={`/product/${product.id}`}
                className="text-decoration-none text-dark"
              >
                <img
                  src={product.thumbnail || product.images[0]}
                  alt={product.title}
                  className="card-img-top"
                  style={{ height: "180px", objectFit: "cover" }}
                />
                <div className="card-body">
                  <h6
                    className="card-title text-truncate"
                    title={product.title}
                  >
                    {product.title}
                  </h6>
                  <p className="card-text text-success fw-bold">
                    ${product.price}
                  </p>
                </div>
              </Link>
              <div className="card-footer bg-transparent border-top-0 d-flex justify-content-between">
                <button
                  className="btn btn-primary btn-sm"
                  onClick={(e) => {
                    e.preventDefault();
                    handleAddToCart(product);
                  }}
                >
                  Add to Cart
                </button>
                <Link
                  to={`/product/${product.id}`}
                  className="btn btn-outline-secondary btn-sm"
                >
                  Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedProduct && (
        <ProductCard product={selectedProduct} onClose={closeProductCard} />
      )}
    </section>
  );
};

export default MainContent;

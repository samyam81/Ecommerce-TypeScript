"use client"

import { Tally3 } from "lucide-react"
import { useFilter } from "../Filter/FilterContext"
import { useEffect, useState } from "react"
import axios from "axios"
import { useCart } from "../Cart/CartContext"
import { useWish } from "../Wish/WishContext"
import { Link } from "react-router-dom"
import ProductCard from "../ProductLanding/ProductCard"
import "../Styles/Main.css"
import "../Styles/Responsive.css"
import "../Styles/Animation.css" // Import Animation styles
import "./royal-colors.css"

const MainContent = () => {
  const { searchQuery, selectedCategory, minPrice, maxPrice, keyword } = useFilter()
  const { addItemToCart } = useCart()
  const { wishItems, addItemToWish } = useWish()
  const [products, setProducts] = useState<any[]>([])
  const [filter, setFilter] = useState<"all" | string>("all")
  const [dropdown, setDropdown] = useState(false)
  const [currentPage] = useState(1)
  const [selectedProduct, setSelectedProduct] = useState<any>(null)
  const [animate, setAnimate] = useState(true) // New state for Animation
  const itemsPerPage = 12

  useEffect(() => {
    let url = `https://dummyjson.com/products?limit=${itemsPerPage}&skip=${(currentPage - 1) * itemsPerPage}`

    if (keyword) {
      url = `https://dummyjson.com/products/search?q=${keyword}`
    }

    axios
      .get(url)
      .then((response) => {
        setProducts(response.data.products)
      })
      .catch((error) => {
        console.error("Error fetching data", error)
      })
  }, [currentPage, keyword])

  useEffect(() => {
    setProducts([]) // Reset products when filters are changed
  }, [searchQuery, selectedCategory, minPrice, maxPrice, filter])

  function getFilteredProducts() {
    let filteredProducts = products

    if (!products.length) return []

    if (selectedCategory) {
      filteredProducts = filteredProducts.filter((product) => product.category === selectedCategory)
    }

    if (minPrice !== undefined) {
      filteredProducts = filteredProducts.filter((product) => product.price >= minPrice)
    }

    if (maxPrice !== undefined) {
      filteredProducts = filteredProducts.filter((product) => product.price <= maxPrice)
    }

    if (searchQuery) {
      filteredProducts = filteredProducts.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    if (filter !== "all") {
      if (filter === "Cheap") {
        filteredProducts = filteredProducts.sort((a, b) => a.price - b.price)
      } else if (filter === "Expensive") {
        filteredProducts = filteredProducts.sort((a, b) => b.price - a.price)
      } else if (filter === "Popular") {
        filteredProducts = filteredProducts.sort((a, b) => b.rating - a.rating)
      }
    }

    return filteredProducts
  }

  function handleAddToCart(product: any) {
    addItemToCart(product)
    setSelectedProduct(product)
  }

  function handleToggleWishlist(product: any) {
    addItemToWish(product)
  }

  function closeProductCard() {
    setSelectedProduct(null)
  }

  return (
    <section className="main-content container-fluid mt-4 px-4">
      <div
        className="ad-section bg-royal-purple text-white p-5 rounded mb-4 text-center shadow-lg fade-in"
        style={{ background: "linear-gradient(135deg, #5b21b6 0%, #4c1d95 100%)" }}
      >
        <h4 className="display-4">👑 Royal Exclusive!</h4>
        <p className="lead">Get 50% off on your first order! Experience our royal collection today.</p>
        <button
          className="btn rounded-pill shadow-lg hover-shadow"
          style={{ background: "#991b1b", color: "white", borderColor: "#991b1b" }}
        >
          Shop Now
        </button>
      </div>

      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="royal-heading">👑 Royal Collection</h2>
        <div className="dropdown">
          <button
            className="btn dropdown-toggle royal-sort-btn"
            onClick={() => setDropdown(!dropdown)}
            style={{ borderColor: "#5b21b6", color: "#5b21b6" }}
          >
            <Tally3 className="me-2" />
            {filter === "all" ? "Sort By" : filter.charAt(0).toUpperCase() + filter.slice(1)}
          </button>
          {dropdown && (
            <ul className="dropdown-menu show">
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => {
                    setAnimate(false)
                    setTimeout(() => {
                      setFilter("Cheap")
                      setAnimate(true)
                    }, 500)
                  }}
                >
                  Cheapest
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => {
                    setAnimate(false)
                    setTimeout(() => {
                      setFilter("Expensive")
                      setAnimate(true)
                    }, 500)
                  }}
                >
                  Most Expensive
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => {
                    setAnimate(false)
                    setTimeout(() => {
                      setFilter("Popular")
                      setAnimate(true)
                    }, 500)
                  }}
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
                  onClick={() => {
                    setAnimate(false)
                    setTimeout(() => {
                      setFilter("all")
                      setAnimate(true)
                    }, 500)
                  }}
                >
                  Reset Filter
                </button>
              </li>
            </ul>
          )}
        </div>
      </div>

      <div className={`row g-4 ${animate ? "fade-in" : ""}`}>
        {getFilteredProducts().map((product) => (
          <div key={product.id} className="col-lg-3 col-md-4 col-sm-6">
            <div className="card h-100 shadow-lg rounded-3 overflow-hidden position-relative royal-card">
              {/* Wishlist Button */}
              <button
                className={`wishlist-icon btn ${wishItems.some((item) => item.id === product.id) ? "royal-wishlist-active" : "royal-wishlist"
                  } position-absolute top-0 end-0 p-3 rounded-circle d-flex justify-content-center align-items-center`}
                onClick={(e) => {
                  e.preventDefault()
                  handleToggleWishlist(product)
                }}
                aria-label="Add to Wishlist"
                style={{
                  width: "40px",
                  height: "40px",
                  fontSize: "1.5rem",
                  lineHeight: "1.2",
                  borderRadius: "50%",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                }}
              >
                ♥
              </button>

              {/* Product Link */}
              <Link to={`/product/${product.id}`} className="text-decoration-none text-dark">
                <img
                  src={product.thumbnail || product.images[0]}
                  alt={product.title}
                  className="card-img-top img-fluid rounded-top product-image"
                />
                <div className="card-body">
                  <h6 className="card-title text-truncate" title={product.title}>
                    {product.title}
                  </h6>
                  <p className="card-text fw-bold royal-price">${product.price}</p>
                </div>
              </Link>

              {/* Footer with Add to Cart and Details Button */}
              <div className="card-footer bg-transparent border-top-0 d-flex justify-content-between align-items-center">
                <button
                  className="btn btn-sm shadow-sm royal-cart-btn"
                  onClick={(e) => {
                    e.preventDefault()
                    handleAddToCart(product)
                  }}
                  aria-label="Add to Cart"
                >
                  Add to Cart
                </button>
                <Link
                  to={`/product/${product.id}`}
                  className="btn btn-sm shadow-sm royal-details-btn"
                  aria-label="View Product Details"
                >
                  Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedProduct && <ProductCard product={selectedProduct} onClose={closeProductCard} />}
    </section>
  )
}

export default MainContent

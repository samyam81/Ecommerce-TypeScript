import { Tally3 } from "lucide-react";
import { useFilter } from "./FilterContext";
import { useEffect, useState } from "react";
import axios from "axios";
import { useCart } from "./CartContext"; // Importing useCart hook

const MainContent = () => {
  const { searchQuery, selectedCategory, minPrice, maxPrice, keyword } =
    useFilter();
  const { addItemToCart, cartItems } = useCart(); // Use addItemToCart and cartItems from context
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
    <section>
      <div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div
            style={{
              position: "relative",
              marginBottom: "15px",
              marginTop: "15px",
            }}
          >
            <button
              style={{
                border: "1px solid",
                padding: "6px 12px",
                borderRadius: "9999px",
                display: "flex",
                alignItems: "center",
              }}
              onClick={() => setDropdown(!dropdown)}
            >
              <Tally3 />
              {filter === "all"
                ? "Filter"
                : filter.charAt(0).toLowerCase() + filter.slice(1)}
            </button>
            {dropdown && (
              <div
                style={{
                  position: "absolute",
                  top: "50px",
                  left: "0",
                  background: "white",
                  border: "1px solid #fff",
                  padding: "8px",
                }}
              >
                <button onClick={() => setFilter("Cheap")}>Cheap</button>
                <button onClick={() => setFilter("Expensive")}>
                  Expensive
                </button>
                <button onClick={() => setFilter("Popular")}>Popular</button>
              </div>
            )}
          </div>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
            gap: "15px",
          }}
        >
          {getFilteredProducts().map((product) => (
            <div
              key={product.id}
              style={{
                border: "1px solid #ccc",
                padding: "8px",
                borderRadius: "8px",
                textAlign: "center",
                fontSize: "0.9rem",
              }}
            >
              <h3 style={{ fontSize: "1rem" }}>{product.title}</h3>
              <p style={{ fontSize: "0.8rem" }}>{product.price} USD</p>
              <img
                src={product.thumbnail}
                alt={product.title}
                style={{
                  width: "100%",
                  height: "120px",
                  objectFit: "cover",
                  borderRadius: "4px",
                }}
              />
              <button
                style={{
                  marginTop: "10px",
                  padding: "6px 12px",
                  backgroundColor: "#28a745",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
                onClick={() => {
                  addItemToCart(product); // Add product to cart
                  console.log(cartItems); // Log to verify cart is updated
                }}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MainContent;

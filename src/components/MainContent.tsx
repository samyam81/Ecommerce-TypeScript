import { Tally3 } from "lucide-react";
import { useFilter } from "./FilterContext";
import { useEffect, useState } from "react";
import axios from "axios";

const MainContent = () => {
  const { searchQuery, selectedCategory, minPrice, maxPrice, keyword } =
    useFilter();

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

    if (minPrice!=undefined) {
        filteredProducts = filteredProducts.filter(product=>product.price>=minPrice);
    }

    if (maxPrice!=undefined) {
        filteredProducts = filteredProducts.filter(product=>product.price<=maxPrice);
    }

    if (searchQuery) {
        filteredProducts = filteredProducts.filter(product=>product.title.toLowerCase().include(searchQuery.toLowerCase()));
    }


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
              marginBottom: "20px",
              marginTop: "20px",
            }}
          >
            <button
              style={{
                border: "1px solid",
                padding: "8px 16px",
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
                  padding: "10px",
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
            gap: "20px",
          }}
        >
          {products.map((product) => (
            <div
              key={product.id}
              style={{
                border: "1px solid #ccc",
                padding: "10px",
                borderRadius: "8px",
                textAlign: "center",
              }}
            >
              <h3>{product.title}</h3>
              <p>{product.price} USD</p>
              <img
                src={product.thumbnail}
                alt={product.title}
                style={{ width: "100%", height: "150px", objectFit: "cover" }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MainContent;

import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useWish } from "../Wish/WishContext";
import { useCart } from "../Cart/CartContext";
import ProductCard from "../ProductLanding/ProductCard"; // Import the ProductCard component

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<any | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<any[]>([]);
  const [addedToCart, setAddedToCart] = useState(false); // State to manage if product is added to cart
  const { addItemToWish, wishItems, removeItemFromWish } = useWish();
  const { addItemToCart } = useCart();

  const [hoveredProductId, setHoveredProductId] = useState<number | null>(null);

  useEffect(() => {
    if (!id) {
      console.error("Product ID is undefined");
      return;
    }

    // Fetch the current product details
    axios
      .get(`http://dummyjson.com/products/${id}`)
      .then((response) => {
        setProduct(response.data);
      })
      .catch((error) => {
        console.error("Error fetching product details", error);
      });

    // Fetch all products and filter out the current product
    axios
      .get("http://dummyjson.com/products")
      .then((response) => {
        const filteredProducts = response.data.products.filter(
          (item: any) => item.id !== parseInt(id, 10)
        );
        setRelatedProducts(filteredProducts.slice(0, 3));
      })
      .catch((error) => {
        console.error("Error fetching related products", error);
      });
  }, [id]);

  if (!product) return <div className="text-center mt-5">Loading...</div>;

  const isInWishlist = wishItems.some((item) => item.id === product.id);

  const handleAddToCart = (product: any) => {
    addItemToCart(product);
    setAddedToCart(true); // Set addedToCart to true after adding the product
  };

  return (
    <div className="container mt-5">
      {/* Product Details Card */}
      <div className="card shadow-sm border-0">
        <div className="row g-0">
          <div className="col-md-6">
            <img
              src={product.images[0]}
              alt={product.title}
              className="img-fluid rounded-start"
              style={{ maxHeight: "400px", objectFit: "cover" }}
            />
          </div>
          <div className="col-md-6">
            <div className="card-body">
              <h5 className="card-title">{product.title}</h5>
              <p className="card-text">{product.description}</p>
              <p className="text-success fw-bold">Price: ${product.price}</p>
              <p className="text-muted">Rating: {product.rating} ⭐</p>
              <div className="d-flex justify-content-start gap-2">
                <Link to="/" className="btn btn-secondary">
                  Back
                </Link>
                <button
                  className={`btn ${
                    isInWishlist ? "btn-danger" : "btn-warning"
                  }`}
                  onClick={() =>
                    isInWishlist
                      ? removeItemFromWish(product.id)
                      : addItemToWish({
                          id: product.id,
                          title: product.title,
                          price: product.price,
                          image: product.images[0],
                        })
                  }
                >
                  {isInWishlist ? "Remove from Wish" : "Add to Wish"}
                </button>
                <button
                  className="btn btn-primary"
                  onClick={() => handleAddToCart(product)} // Call the function to add to cart
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Conditionally render ProductCard when item is added to cart */}
      {addedToCart && (
        <div className="mt-4">
          <h5>Product Added to Cart</h5>
          <ProductCard product={product} onClose={function (): void {
            throw new Error("Function not implemented.");
          } } />
        </div>
      )}

      {/* Related Products Section */}
      <div className="mt-5">
        <h4>You may also like</h4>
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {relatedProducts.map((relatedProduct) => (
            <div
              key={relatedProduct.id}
              className="col"
              onMouseEnter={() => setHoveredProductId(relatedProduct.id)}
              onMouseLeave={() => setHoveredProductId(null)}
              style={{
                transition:
                  "transform 0.3s ease, box-shadow 0.3s ease, border 0.3s ease",
                transform:
                  hoveredProductId === relatedProduct.id
                    ? "scale(1.05)"
                    : "scale(1)",
                boxShadow:
                  hoveredProductId === relatedProduct.id
                    ? "0 4px 8px rgba(0, 0, 0, 0.2)"
                    : "0 2px 4px rgba(0, 0, 0, 0.1)",
                border:
                  hoveredProductId === relatedProduct.id
                    ? "2px solid #7B0323"
                    : "1px solid #eaeaea",
                borderRadius: "8px",
                backgroundColor: "#ffffff",
              }}
            >
              <div
                className="card h-100 card-hover-effect"
                style={{
                  width: "100%",
                  maxWidth: "150px",
                  margin: "0 auto",
                }}
              >
                <img
                  src={relatedProduct.images[0]}
                  alt={relatedProduct.title}
                  className="card-img-top"
                  style={{
                    height: "120px",
                    objectFit: "cover",
                    borderRadius: "8px 8px 0 0",
                  }}
                />
                <div
                  className="card-body d-flex flex-column"
                  style={{
                    padding: "10px",
                  }}
                >
                  <h6
                    className="card-title"
                    style={{
                      fontSize: "0.85rem",
                      lineHeight: "1.2",
                    }}
                  >
                    {relatedProduct.title}
                  </h6>
                  <p
                    className="card-text text-success fw-bold"
                    style={{
                      fontSize: "0.75rem",
                    }}
                  >
                    ${relatedProduct.price}
                  </p>
                  <Link
                    to={`/product/${relatedProduct.id}`}
                    className="btn btn-outline-primary btn-sm"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;

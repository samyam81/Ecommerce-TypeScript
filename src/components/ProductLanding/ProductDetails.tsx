import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useWish } from "../Wish/WishContext";
import { useCart } from "../Cart/CartContext";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<any | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<any[]>([]);
  const { addItemToWish, wishItems, removeItemFromWish } = useWish();
  const { addItemToCart } = useCart();

  // For hover effect
  const [hoveredProductId, setHoveredProductId] = useState<number | null>(null);

  useEffect(() => {
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
      .get("http://dummyjson.com/products") // Assuming this returns a list of products
      .then((response) => {
        const filteredProducts = response.data.products.filter(
          (item: any) => item.id !== parseInt(id) // Parse `id` to an integer if needed
        );
        setRelatedProducts(filteredProducts.slice(0, 3)); // Limit to 3 products
      })
      .catch((error) => {
        console.error("Error fetching related products", error);
      });
  }, [id]);

  if (!product) return <div className="text-center mt-5">Loading...</div>;

  const isInWishlist = wishItems.some((item) => item.id === product.id);

  return (
    <div className="container mt-5">
      {/* Card with Product Details */}
      <div className="card shadow-sm border-light">
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
                  onClick={() => addItemToCart(product)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

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
                    ? "0 4px 8px rgba(0, 0, 0, 0.1)"
                    : "none",
                border:
                  hoveredProductId === relatedProduct.id
                    ? "2px solid blue" // Blue border on hover
                    : "none", // Remove border when not hovered
              }}
            >
              <div className="card h-100 shadow-sm border-light">
                <img
                  src={relatedProduct.images[0]}
                  alt={relatedProduct.title}
                  className="card-img-top"
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="card-body">
                  <h5 className="card-title">{relatedProduct.title}</h5>
                  <p className="text-success fw-bold">
                    Price: ${relatedProduct.price}
                  </p>
                  <Link
                    to={`/product/${relatedProduct.id}`}
                    className="btn btn-primary"
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

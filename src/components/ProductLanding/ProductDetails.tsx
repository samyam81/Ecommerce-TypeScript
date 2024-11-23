import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useWish } from "../Wish/WishContext";
import { useCart } from "../Cart/CartContext";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<any | null>(null);
  const { addItemToWish, wishItems, removeItemFromWish } = useWish();
  const { addItemToCart } = useCart();

  useEffect(() => {
    axios
      .get(`http://dummyjson.com/products/${id}`)
      .then((response) => {
        setProduct(response.data);
      })
      .catch((error) => {
        console.error("Error fetching product details", error);
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
    </div>
  );
};

export default ProductDetails;

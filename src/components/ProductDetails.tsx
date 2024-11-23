import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useWish } from "./WishContext";
import { useCart } from "./CartContext";

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
    <div className="container mt-5 p-4 bg-light rounded shadow">
      <h1 className="text-center mb-4">{product.title}</h1>
      <div className="text-center mb-4">
        <img
          src={product.images[0]}
          alt={product.title}
          className="img-fluid rounded shadow-sm"
          style={{ maxWidth: "400px" }}
        />
      </div>
      <p className="text-muted">{product.description}</p>
      <p className="text-success fw-bold">Price: ${product.price}</p>
      <p>Rating: {product.rating} ⭐</p>
      <div className="d-flex justify-content-center gap-2">
        <Link to="/" className="btn btn-secondary">
          Back
        </Link>
        <button
          className={`btn ${isInWishlist ? "btn-danger" : "btn-warning"}`}
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
  );
};

export default ProductDetails;

import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useCart } from "../Cart/CartContext";
import { useWish } from "../Wish/WishContext";
import "../Styles/Main.css";
import "../Styles/Responsive.css";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<any | null>(null);
  const [quantity, setQuantity] = useState<number>(1); // Default to 1
  const { addItemToCart } = useCart();
  const { addItemToWish } = useWish();

  useEffect(() => {
    if (!id) {
      console.error("Product ID is undefined");
      return;
    }

    // Fetch product details
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://dummyjson.com/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product details", error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product)
    return (
      <div className="has-text-centered mt-5">
        <p>Loading product details...</p>
      </div>
    );

  const handleAddToCart = () => {
    addItemToCart({ ...product, quantity });
  };

  const handleAddToWish = () => {
    addItemToWish({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.images[0],
    });
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value)) {
      setQuantity(Math.max(1, value)); // Ensure quantity is always at least 1
    }
  };

  const totalPrice = product.price * quantity;

  return (
    <section className="section">
      <div className="container product-details-container fade-in">
        <div className="box">
          <div className="columns is-variable is-5">
            {/* Product Image */}
            <div className="column is-half">
              <figure className="image is-4by3">
                <img
                  src={product.images[0]}
                  alt={product.title}
                  className="is-rounded"
                  style={{ objectFit: "cover", maxHeight: "400px" }}
                />
              </figure>
            </div>

            {/* Product Details */}
            <div className="column is-half">
              <h1 className="title is-4">{product.title}</h1>
              <p className="has-text-grey">{product.description}</p>
              <p className="has-text-success has-text-weight-bold">
                Price: ${product.price.toFixed(2)}
              </p>

              {/* Quantity Selector */}
              <div className="field has-addons is-justify-content-center mb-3">
                <p className="control">
                  <button
                    className="button is-light"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    -
                  </button>
                </p>
                <p className="control">
                  <input
                    type="number"
                    className="input has-text-centered"
                    value={quantity}
                    onChange={handleQuantityChange}
                    min="1"
                    style={{ maxWidth: "70px" }}
                  />
                </p>
                <p className="control">
                  <button
                    className="button is-light"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    +
                  </button>
                </p>
              </div>

              {/* Total Price */}
              <div className="notification is-danger has-text-centered">
                <p className="is-size-5">Total: ${totalPrice.toFixed(2)}</p>
              </div>

              {/* Action Buttons */}
              <div className="buttons">
                <Link to="/" className="button is-secondary">
                  Back
                </Link>

                <button className="button is-primary is-fullwidth" onClick={handleAddToCart}>
                  Add to Cart
                </button>

                <button className="button is-warning is-fullwidth" onClick={handleAddToWish}>
                  Add to Wishlist
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;

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
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [isWishlist, setIsWishlist] = useState<boolean>(false);
  const { addItemToCart } = useCart();
  const { addItemToWish, isInWishlist } = useWish();

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
        setSelectedImage(response.data.images[0]);

        // Check if item is in wishlist
        if (isInWishlist && response.data) {
          setIsWishlist(isInWishlist(response.data.id));
        }
      } catch (error) {
        console.error("Error fetching product details", error);
      }
    };

    fetchProduct();
  }, [id, isInWishlist]);

  if (!product)
    return (
      <div className="container text-center my-5 py-5">
        <div className="card shadow-royal p-5">
          <div className="card-body text-center">
            <div className="spinner-border text-royal-purple" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3 text-royal-purple">Loading product details...</p>
          </div>
        </div>
      </div>
    );

  const handleAddToCart = () => {
    addItemToCart({ ...product, quantity });

    // Show success alert
    const alertElement = document.getElementById('successAlert');
    if (alertElement) {
      alertElement.classList.remove('d-none');
      setTimeout(() => {
        alertElement.classList.add('d-none');
      }, 3000);
    }
  };

  const handleAddToWish = () => {
    addItemToWish({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.images[0],
    });
    setIsWishlist(true);
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value)) {
      setQuantity(Math.max(1, value));
    }
  };

  const totalPrice = product.price * quantity;
  const discountedPrice = product.discountPercentage
    ? (product.price * (1 - product.discountPercentage / 100)).toFixed(2)
    : null;

  return (
    <section className="section main-content">
      <div className="container fade-in">
        <nav aria-label="breadcrumb" className="mb-4">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link to="/">Home</Link></li>
            <li className="breadcrumb-item"><Link to="/products">Products</Link></li>
            <li className="breadcrumb-item active" aria-current="page">{product.title}</li>
          </ol>
        </nav>

        <div className="alert alert-primary d-none" id="successAlert" role="alert">
          Product added to your cart successfully!
        </div>

        <div className="card shadow-royal border-0">
          <div className="row g-0">
            {/* Product Images */}
            <div className="col-md-6 p-4">
              <div className="product-gallery">
                <div className="main-image-container mb-3 position-relative">
                  <img
                    src={selectedImage}
                    alt={product.title}
                    className="img-fluid rounded hover-shadow"
                    style={{ objectFit: "cover", height: "400px", width: "100%" }}
                  />
                  <button
                    className={`wishlist-icon ${isWishlist ? 'active' : ''}`}
                    onClick={handleAddToWish}
                    aria-label="Add to wishlist"
                  >
                    <i className={`bi ${isWishlist ? 'bi-heart-fill' : 'bi-heart'}`}></i>
                  </button>
                </div>

                {/* Thumbnail gallery */}
                <div className="thumbnail-gallery d-flex overflow-auto pb-2">
                  {product.images.map((image: string, index: number) => (
                    <div
                      key={index}
                      className={`thumbnail-item me-2 ${selectedImage === image ? 'border border-2 border-royal' : ''}`}
                      onClick={() => setSelectedImage(image)}
                    >
                      <img
                        src={image}
                        alt={`${product.title} - view ${index + 1}`}
                        className="img-fluid rounded"
                        style={{ width: "80px", height: "80px", objectFit: "cover", cursor: "pointer" }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Product Details */}
            <div className="col-md-6 p-4">
              <div className="product-info">
                <div className="mb-3 d-flex align-items-center">
                  {product.category && (
                    <span className="badge badge-outline-primary me-2">{product.category}</span>
                  )}
                  {product.brand && (
                    <span className="badge badge-outline-secondary">{product.brand}</span>
                  )}
                </div>

                <h1 className="card-title h2 mb-3">{product.title}</h1>

                <div className="mb-4">
                  <p className="text-secondary">{product.description}</p>
                </div>

                <div className="product-meta mb-4">
                  <div className="d-flex align-items-center mb-3">
                    <div className="rating me-2">
                      {[...Array(5)].map((_, i) => (
                        <i
                          key={i}
                          className={`bi ${i < Math.round(product.rating) ? 'bi-star-fill text-gold' : 'bi-star text-muted'}`}
                        ></i>
                      ))}
                    </div>
                    <span className="text-muted">({product.rating}/5)</span>
                  </div>

                  <div className="d-flex align-items-baseline mb-3">
                    <h2 className="product-price me-3 mb-0">${totalPrice.toFixed(2)}</h2>
                    {discountedPrice && (
                      <div>
                        <span className="text-muted text-decoration-line-through me-2">${(totalPrice / (1 - product.discountPercentage / 100)).toFixed(2)}</span>
                        <span className="badge badge-wine">{product.discountPercentage}% OFF</span>
                      </div>
                    )}
                  </div>

                  {product.stock > 0 ? (
                    <span className="badge badge-primary">In Stock ({product.stock} available)</span>
                  ) : (
                    <span className="badge badge-wine">Out of Stock</span>
                  )}
                </div>

                <div className="product-actions">
                  <div className="input-group mb-4">
                    <span className="input-group-text">Quantity</span>
                    <button
                      className="btn btn-outline-secondary"
                      type="button"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      disabled={quantity <= 1}
                    >
                      <i className="bi bi-dash"></i>
                    </button>
                    <input
                      type="number"
                      className="form-control text-center"
                      value={quantity}
                      onChange={handleQuantityChange}
                      min="1"
                      max={product.stock}
                      aria-label="Quantity"
                    />
                    <button
                      className="btn btn-outline-secondary"
                      type="button"
                      onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                      disabled={quantity >= product.stock}
                    >
                      <i className="bi bi-plus"></i>
                    </button>
                  </div>

                  <div className="d-grid gap-2">
                    <button
                      className="btn btn-primary btn-lg"
                      onClick={handleAddToCart}
                      disabled={product.stock <= 0}
                    >
                      <i className="bi bi-cart-plus me-2"></i>
                      Add to Cart
                    </button>

                    <div className="d-flex gap-2">
                      <Link to="/" className="btn btn-outline-secondary w-100">
                        <i className="bi bi-arrow-left me-2"></i>
                        Back to Shop
                      </Link>

                      <button
                        className={`btn ${isWishlist ? 'btn-wine' : 'btn-outline-wine'} w-100`}
                        onClick={handleAddToWish}
                      >
                        <i className={`bi ${isWishlist ? 'bi-heart-fill' : 'bi-heart'} me-2`}></i>
                        {isWishlist ? 'In Wishlist' : 'Add to Wishlist'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default ProductDetails;
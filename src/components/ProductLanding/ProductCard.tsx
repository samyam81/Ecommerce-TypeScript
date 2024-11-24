import { useCart } from "../Cart/CartContext";

// Exported function to calculate total price
export const calculateTotalPrice = (cartItems: CartItem[]): number => {
    return cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );
};

const ProductCard = ({
    product,
    onClose,
}: {
    product: any;
    onClose: () => void;
}) => {
    const { cartItems, removeItemFromCart, updateItemQuantity, clearCart } =
        useCart(); // Get cart items and functions from context

    if (!product) return null;

    // Find the cart item that matches the product
    const cartItem = cartItems.find((item) => item.id === product.id);

    // Set a default quantity of 1 if the product is not in the cart
    const quantity = cartItem ? cartItem.quantity : 1;

    const totalPrice = calculateTotalPrice(cartItems); // Calculate total price from cart items

    return (
        <div
            className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-flex justify-content-center align-items-center"
            style={{ zIndex: 1000 }}
        >
            <div
                className="bg-white p-4 rounded-3"
                style={{ maxWidth: "400px", width: "90%" }}
            >
                <button
                    onClick={onClose}
                    className="position-absolute top-0 end-0 p-2 border-0 bg-transparent fs-4"
                >
                    &times;
                </button>
                <h2>{product.title}</h2>
                <img
                    src={product.thumbnail || product.images[0]}
                    alt={product.title}
                    className="w-100 mb-3"
                    style={{
                        height: "200px",
                        objectFit: "cover",
                    }}
                />
                <p>{product.description}</p>
                <p className="text-success fw-bold">Price: {product.price}/pc USD</p>
                <p>Rating: {product.rating}</p>
                <div className="d-flex align-items-center">
                    <button
                        className="btn btn-outline-secondary btn-sm"
                        onClick={() => {
                            if (cartItem && cartItem.quantity > 1) {
                                updateItemQuantity(cartItem.id, cartItem.quantity - 1);
                            }
                        }}
                    >
                        -
                    </button>
                    <input
                        type="number"
                        className="form-control mx-2 text-center"
                        value={quantity}
                        onChange={(e) => {
                            const newQuantity = parseInt(e.target.value) || 1;
                            if (cartItem) {
                                updateItemQuantity(cartItem.id, newQuantity);
                            }
                        }}
                        style={{ width: "60px" }}
                    />
                    <button
                        className="btn btn-outline-secondary btn-sm"
                        onClick={() => {
                            if (cartItem) {
                                updateItemQuantity(cartItem.id, cartItem.quantity + 1);
                            }
                        }}
                    >
                        +
                    </button>
                </div>
                <div className="bg-danger text-white text-center py-2 rounded my-3">
                    <p className="mb-0 fs-5">Total: ${totalPrice.toFixed(2)}</p>
                </div>
            <button className="bg-danger text-white text-center py-2 rounded my-3">
                Add to cart
            </button>
            </div>
        </div>
    );
};

export default ProductCard;

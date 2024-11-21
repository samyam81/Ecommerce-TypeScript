import React, { createContext, useState, useContext, ReactNode } from "react";

// Define types for a cart item
interface CartItem {
  id: number;
  title: string;
  price: number;
}

// Define types for the context value
interface CartContextType {
  cartItems: CartItem[];
  addItemToCart: (item: CartItem) => void;
  removeItemFromCart: (itemId: number) => void;
  clearCart: () => void;
}

// Create the context with a default value of an empty object (will be overwritten by the provider)
const CartContext = createContext<CartContextType | undefined>(undefined);

// Custom hook to use cart context
export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

// CartProvider to wrap the app and manage the cart state
interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Add item to the cart
  const addItemToCart = (item: CartItem) => {
    setCartItems((prevItems) => [...prevItems, item]);
  };

  // Remove item from the cart
  const removeItemFromCart = (itemId: number) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  // Clear the cart
  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addItemToCart, removeItemFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

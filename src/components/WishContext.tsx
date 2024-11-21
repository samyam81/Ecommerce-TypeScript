import { createContext, ReactNode, useContext, useState } from "react";

interface WishItem {
  id: number;
  title: string;
  price: number;
}

interface WishListType {
  wishItems: WishItem[];
  addItemToWish: (item: WishItem) => void;
  removeItemFromWish: (itemId: number) => void;
  clearWish: () => void;
}

const WishContext = createContext<WishListType | undefined>(undefined);

export const useWish = (): WishListType => {
  const context = useContext(WishContext);
  if (!context) {
    throw new Error("useWish must be used within a WishProvider");
  }
  return context;
};

interface WishProviderProps {
  children: ReactNode;
}

export const WishProvider: React.FC<WishProviderProps> = ({ children }) => {
  const [wishItems, setWishItems] = useState<WishItem[]>([]);

  const addItemToWish = (item: WishItem) => {
    setWishItems((prevItems) => [...prevItems, item]);
  };

  const removeItemFromWish = (itemId: number) => {
    setWishItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  const clearWish = () => {
    setWishItems([]);
  };

  return (
    <WishContext.Provider
      value={{ wishItems, addItemToWish, removeItemFromWish, clearWish }}
    >
      {children}
    </WishContext.Provider>
  );
};

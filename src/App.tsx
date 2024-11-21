import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { CartProvider } from "./components/CartContext";
import MainContent from "./components/MainContent";
import CartPage from "./components/CartPage";
import NavBar from "./components/NavBar";
import Sidebar from "./components/Sidebar";
import About from "./components/About";
import Contact from "./components/Contact";
import Buy from "./components/Buy";
import ProductDetails from "./components/ProductDetails";
import { WishProvider } from "./components/WishContext";
import WishPage from "./components/WishPage";

const App = () => {
  return (
    <CartProvider>
      <WishProvider>
        <Router>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              height: "100vh",
            }}
          >
            <NavBar />
            <div style={{ display: "flex", flex: 1 }}>
              <Sidebar /> {/* Sidebar */}
              <div style={{ flexGrow: 1, padding: "20px", overflowY: "auto" }}>
                <Routes>
                  <Route path="/" element={<MainContent />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/product/:id" element={<ProductDetails />} />
                  <Route path="/cart" element={<CartPage />} />
                  <Route path="/wish" element={<WishPage />} />
                  <Route path="/buy" element={<Buy />} />
                </Routes>
              </div>
            </div>
            {/* Footer Section */}
            <footer
              style={{
                backgroundColor: "#333",
                color: "#fff",
                textAlign: "center",
                padding: "10px",
                marginTop: "auto",
              }}
            >
              <p>&copy; 2024 Project. All rights reserved.</p>
            </footer>
          </div>
        </Router>
      </WishProvider>
    </CartProvider>
  );
};

export default App;

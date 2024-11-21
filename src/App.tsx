import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { CartProvider } from "./components/CartContext";
import MainContent from "./components/MainContent";
import CartPage from "./components/CartPage";
import NavBar from "./components/NavBar";
import Sidebar from "./components/Sidebar";
import About from "./components/About";
import Contact from "./components/Contact";

const App = () => {
  return (
    <CartProvider>
      <Router>
        <div
          style={{ display: "flex", flexDirection: "column", height: "100vh" }}
        >
          <NavBar />
          <div style={{ display: "flex", flex: 1 }}>
            <Sidebar /> {/* Sidebar */}
            <div style={{ flexGrow: 1, padding: "20px", overflowY: "auto" }}>
              <Routes>
                <Route path="/" element={<MainContent />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact/>}/>
              </Routes>
            </div>
          </div>
        </div>
      </Router>
    </CartProvider>
  );
};

export default App;

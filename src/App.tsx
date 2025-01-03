import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { CartProvider } from "./components/Cart/CartContext";
import MainContent from "./components/MainApp/MainContent";
import CartPage from "./components/Cart/CartPage";
import NavBar from "./components/Side_Nav/NavBar";
import Sidebar from "./components/Side_Nav/Sidebar";
import About from "./components/About_Contact/About";
import Contact from "./components/About_Contact/Contact";
import Buy from "./components/ProductLanding/Buy";
import ProductDetails from "./components/ProductLanding/ProductDetails";
import { WishProvider } from "./components/Wish/WishContext";
import WishPage from "./components/Wish/WishPage";
import ThankYou from "./components/ThankYouPage/ThankYou";
import Login from "./components/Login/Login";
import { ToastContainer } from "react-toastify"; // Import ToastContainer
import "react-toastify/dist/ReactToastify.css"; // Import toast styles

const App = () => {
  return (
    <CartProvider>
      <WishProvider>
        <Router>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              minHeight: "100vh",
            }}
          >
            {/* Navigation Bar */}
            <NavBar />

            {/* Main Content Section */}
            <div
              style={{
                display: "flex",
                flex: 1,
              }}
            >
              {/* Sidebar */}
              <Sidebar />

              {/* Main Content */}
              <div
                style={{
                  flexGrow: 1, // Main content takes remaining space
                  padding: "20px",
                  overflowY: "auto",
                }}
              >
                <Routes>
                  <Route path="/" element={<MainContent />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/product/:id" element={<ProductDetails />} />
                  <Route path="/cart" element={<CartPage />} />
                  <Route path="/wish" element={<WishPage />} />
                  <Route path="/buy" element={<Buy />} />
                  <Route path="/thankyou" element={<ThankYou />} />
                  <Route path="/login" element={<Login />} />
                </Routes>
              </div>
            </div>

            {/* Footer */}
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

            {/* Toast Notifications Container */}
            <ToastContainer />
          </div>
        </Router>
      </WishProvider>
    </CartProvider>
  );
};

export default App;

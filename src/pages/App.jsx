import { useState } from "react";
import ProductList from "./ProductList";
import AboutUs from "../components/AboutUs";
import Button from "../components/Button";
import "../styles/index.css";

function App() {
  const [showProductList, setShowProductList] = useState(false);

  const handleGetStartedClick = () => {
    setShowProductList(true);
  };

  const handleHomeClick = () => {
    setShowProductList(false);
  };

  return (
    <div className="app-container">
      <div className={`landing-page ${showProductList ? "fade-out" : ""}`}>
        <div className="background-image"></div>
        <div className="content">
          <div className="landing-content">
            <h1>Welcome To Paradise Nursery</h1>
            <div className="divider"></div>
            <p className="tagline">Where Green Meets Serenity</p>

            <Button
              className="get-started-button"
              onClick={handleGetStartedClick}
            >
              Get Started
            </Button>
          </div>
          <div className="about-us-container">
            <AboutUs />
          </div>
        </div>
      </div>
      <div
        className={`product-list-container ${showProductList ? "visible" : ""}`}
      >
        <ProductList onHomeClick={handleHomeClick} />
      </div>
    </div>
  );
}

export default App;

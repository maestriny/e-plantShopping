import { useState } from "react";
import CartItem from "../components/CartItem";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../store/CartSlice";
import { products } from "../data/products";
import CartIcon from "../components/CartIcon";
import Card from "../components/Card";
import { PlantIcon } from "../components/Icons";
import PropTypes from "prop-types";

function ProductList({ onHomeClick }) {
  const [showCart, setShowCart] = useState(false);

  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const addedToCart = cartItems.reduce((acc, item) => {
    acc[item.name] = true;
    return acc;
  }, {});

  const handleAddToCart = (plant) => {
    const numericCost = parseFloat(plant.cost.replace("$", ""));
    dispatch(addItem({ ...plant, cost: numericCost }));
  };

  const handleHomeClick = (e) => {
    e.preventDefault();
    onHomeClick();
    setShowCart(false);
  };

  const handleCartClick = (e) => {
    e.preventDefault();
    setShowCart(true);
  };

  const handlePlantsClick = (e) => {
    e.preventDefault();
    setShowCart(false);
  };

  const handleContinueShopping = () => {
    setShowCart(false);
  };

  return (
    <div>
      <div className="navbar">
        <div className="tag">
          <div className="luxury">
            <PlantIcon onClick={handleHomeClick} className="tag-icon" />
            <a href="#" onClick={handleHomeClick}>
              <div className="tag-home-link">
                <h3>Paradise Nursery</h3>
                <i>Where Green Meets Serenity</i>
              </div>
            </a>
          </div>
        </div>

        <div className="navbar-center">
          <a href="#" onClick={handlePlantsClick}>
            Plants
          </a>
        </div>

        <div className="navbar-right cart">
          <a href="#" onClick={handleCartClick}>
            <h1 className="cart">
              <CartIcon quantity={totalQuantity} />
            </h1>
          </a>
        </div>
      </div>

      {!showCart ? (
        <div className="product-grid">
          {products.map((categoryObj) => (
            <div key={categoryObj.category}>
              <div className="plant-category">
                <div className="plant-name-heading">
                  <h2 className="plant-heading">{categoryObj.category}</h2>
                </div>
                <div className="product-list">
                  {categoryObj.plants.map((plant) => (
                    <Card
                      key={plant.name}
                      plant={plant}
                      onAddToCart={handleAddToCart}
                      isAdded={addedToCart[plant.name]}
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <CartItem onContinueShopping={handleContinueShopping} />
      )}
    </div>
  );
}

ProductList.propTypes = {
  onHomeClick: PropTypes.func.isRequired,
};

export default ProductList;

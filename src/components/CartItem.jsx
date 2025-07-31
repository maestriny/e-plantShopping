import { useSelector, useDispatch } from "react-redux";
import { removeItem, updateQuantity } from "../store/CartSlice";
import Button from "./Button";
import PropTypes from "prop-types";

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const calculateTotalAmount = () => {
    return cart
      .reduce((total, item) => total + item.cost * item.quantity, 0)
      .toFixed(2);
  };

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    const newQuantity = item.quantity - 1;
    if (newQuantity >= 1) {
      dispatch(updateQuantity({ name: item.name, quantity: newQuantity }));
    } else {
      dispatch(removeItem(item.name));
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  const calculateTotalCost = (item) => {
    return (item.cost * item.quantity).toFixed(2);
  };

  return (
    <div className="cart-container">
      <h2 className="total-cart-amount">
        Total Cart Amount: ${calculateTotalAmount()}
      </h2>
      <div>
        {cart.length === 0 ? (
          <div className="empty-cart">
            <h2>Your cart is empty</h2>
            <p>Add some plants to get started!</p>
          </div>
        ) : (
          cart.map((item) => (
            <div className="cart-item" key={item.name}>
              <img
                className="cart-item-image"
                src={item.image}
                alt={item.name}
              />
              <div className="cart-item-details">
                <div className="cart-item-name">{item.name}</div>
                <div className="cart-item-cost">${item.cost}</div>
                <div className="cart-item-quantity">
                  <Button
                    variant="primary"
                    size="small"
                    className="cart-item-button"
                    onClick={() => handleDecrement(item)}
                  >
                    -
                  </Button>
                  <span className="cart-item-quantity-value">
                    {item.quantity}
                  </span>
                  <Button
                    variant="primary"
                    size="small"
                    className="cart-item-button"
                    onClick={() => handleIncrement(item)}
                  >
                    +
                  </Button>
                </div>
                <div className="cart-item-total">
                  Total: ${calculateTotalCost(item)}
                </div>
                <Button variant="danger" onClick={() => handleRemove(item)}>
                  Delete
                </Button>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="continue-shopping-btn">
        <Button variant="primary" onClick={onContinueShopping}>
          Continue Shopping
        </Button>
        <Button variant="primary" disabled={cart.length === 0}>
          Checkout
        </Button>
      </div>
    </div>
  );
};

CartItem.propTypes = {
  onContinueShopping: PropTypes.func.isRequired,
};

export default CartItem;

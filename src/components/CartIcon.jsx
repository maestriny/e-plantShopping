import PropTypes from "prop-types";
import { ShoppingCartIcon } from "./Icons";

const CartIcon = ({ quantity }) => (
  <div style={{ position: "relative" }}>
    <ShoppingCartIcon />
    {quantity > 0 && (
      <span
        style={{
          position: "absolute",
          top: "18px",
          right: "0px",
          backgroundColor: "red",
          color: "white",
          borderRadius: "50%",
          width: "24px",
          height: "24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "14px",
          fontWeight: "bold",
        }}
      >
        {quantity}
      </span>
    )}
  </div>
);

CartIcon.propTypes = {
  quantity: PropTypes.number.isRequired,
};

export default CartIcon;

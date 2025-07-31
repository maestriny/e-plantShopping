import Button from "./Button";
import PropTypes from "prop-types";

const Card = ({ plant, onAddToCart, isAdded }) => {
  const cost = plant.cost.replace("$", "");
  return (
    <div className="card product-card">
      <img className="product-image" src={plant.image} alt={plant.name} />
      <div className="product-title">{plant.name}</div>
      <div className="product-price">${cost}</div>
      <p>{plant.description}</p>
      <Button
        variant="primary"
        className="product-button"
        onClick={() => onAddToCart(plant)}
        disabled={isAdded}
      >
        {isAdded ? "Already in Cart" : "Add to Cart"}
      </Button>
    </div>
  );
};

Card.propTypes = {
  plant: PropTypes.shape({
    name: PropTypes.string.isRequired,
    cost: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    description: PropTypes.string,
  }).isRequired,
  onAddToCart: PropTypes.func.isRequired,
  isAdded: PropTypes.bool,
};

export default Card;

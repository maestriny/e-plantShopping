import PropTypes from "prop-types";

const Button = ({
  children,
  onClick,
  variant = "primary",
  size = "medium",
  className = "",
  disabled,
  ...props
}) => {
  const baseClass = "btn";
  const variantClass = `btn-${variant}`;
  const sizeClass = `btn-${size}`;
  const classes = [baseClass, variantClass, sizeClass, className]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      className={classes}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  variant: PropTypes.oneOf(["primary", "danger", "secondary"]),
  size: PropTypes.oneOf(["small", "medium", "large"]),
  className: PropTypes.string,
  disabled: PropTypes.bool,
};

export default Button;

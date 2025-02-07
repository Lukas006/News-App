// Button.jsx
import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

const Button = ({ children, variant = "default", className, ...props }) => {
  const buttonClasses = classNames(
    "px-4 py-2 font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2",
    {
      "bg-gray-200 text-black hover:bg-gray-300": variant === "default",
      "bg-transparent text-black hover:bg-gray-100": variant === "ghost",
    },
    className
  );

  return (
    <button className={buttonClasses} {...props}>
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(["default", "ghost"]),
  className: PropTypes.string,
};

export default Button;
import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

const Card = ({ children, className, ...props }) => {
  const cardClasses = classNames(
    "bg-white shadow-lg rounded-2xl p-4",
    className
  );

  return (
    <div className={cardClasses} {...props}>
      {children}
    </div>
  );
};

Card.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default Card;
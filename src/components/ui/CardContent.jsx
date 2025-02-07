import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

const CardContent = ({ children, className, ...props }) => {
  const contentClasses = classNames("space-y-4", className);

  return (
    <div className={contentClasses} {...props}>
      {children}
    </div>
  );
};

CardContent.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export { Card, CardContent };
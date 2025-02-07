// Avatar.jsx
import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

const Avatar = ({ src, alt = "Avatar", className, size = "medium" }) => {
  const sizes = {
    small: "w-8 h-8",
    medium: "w-10 h-10",
    large: "w-16 h-16",
  };

  const avatarClasses = classNames(
    "rounded-full bg-gray-300",
    sizes[size],
    className
  );

  return (
    <img src={src} alt={alt} className={avatarClasses} />
  );
};

Avatar.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  className: PropTypes.string,
  size: PropTypes.oneOf(["small", "medium", "large"]),
};

export default Avatar;

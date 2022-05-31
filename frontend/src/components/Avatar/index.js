import { forwardRef } from "react";

import PropTypes from "prop-types";

import AvatarRoot from "components/Avatar/AvatarRoot";
const Avatar = forwardRef(({ bgColor, size, shadow, ...rest }, ref) => (
  <AvatarRoot ref={ref} ownerState={{ shadow, bgColor, size }} {...rest} />
));

Avatar.defaultProps = {
  bgColor: "transparent",
  size: "md",
  shadow: "none",
};

Avatar.propTypes = {
  bgColor: PropTypes.oneOf([
    "transparent",
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "light",
    "dark",
  ]),
  size: PropTypes.oneOf(["xs", "sm", "md", "lg", "xl", "xxl"]),
  shadow: PropTypes.oneOf(["none", "xs", "sm", "md", "lg", "xl", "xxl", "inset"]),
};

export default Avatar;

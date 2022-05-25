import { forwardRef } from "react";

import PropTypes from "prop-types";

import MDAvatarRoot from "components/MDAvatar/MDAvatarRoot";

const MDAvatar = forwardRef(({ bgColor, size, shadow, ...rest }, ref) => (
  <MDAvatarRoot ref={ref} ownerState={{ shadow, bgColor, size }} {...rest} />
));

MDAvatar.defaultProps = {
  bgColor: "transparent",
  size: "md",
  shadow: "none",
};

MDAvatar.propTypes = {
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

export default MDAvatar;

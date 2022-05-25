import { forwardRef } from "react";

import PropTypes from "prop-types";

import MDInputRoot from "components/MDInput/MDInputRoot";

const MDInput = forwardRef(({ error, success, disabled, onChange, ...rest }, ref) => (
  <MDInputRoot {...rest} ref={ref} ownerState={{ error, success, disabled }} onChange={onChange} />
));

MDInput.defaultProps = {
  error: false,
  success: false,
  disabled: false,
};

MDInput.propTypes = {
  error: PropTypes.bool,
  success: PropTypes.bool,
  disabled: PropTypes.bool,
};

export default MDInput;

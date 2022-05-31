import { forwardRef } from "react";

import PropTypes from "prop-types";

import InputRoot from "components/Input/InputRoot";

const Input = forwardRef(({ error, success, disabled, onChange, ...rest }, ref) => (
  <InputRoot {...rest} ref={ref} ownerState={{ error, success, disabled }} onChange={onChange} />
));

Input.defaultProps = {
  error: false,
  success: false,
  disabled: false,
};

Input.propTypes = {
  error: PropTypes.bool,
  success: PropTypes.bool,
  disabled: PropTypes.bool,
};

export default Input;

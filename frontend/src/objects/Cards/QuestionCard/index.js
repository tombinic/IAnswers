import PropTypes from "prop-types";
import {forwardRef} from "react";
import Card from "@mui/material/Card";
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import {styled } from '@mui/material/styles';
import Box from "components/Box";
import Typography from "components/Typography";

import SearchingButton from "objects/Buttons/SearchingButton";

const StyledInput = styled(TextField)({
  margin:'20px 0',
  '& input:valid + fieldset': {
    borderColor: 'black',
    borderWidth: 2,
  },
  '& input:invalid + fieldset': {
    borderColor: 'black',
    borderWidth: 2,
  },
  '& input:valid:focus + fieldset': {
    borderColor: 'black',
    borderLeftWidth: 6,
    padding: '4px !important',
  },
});

const TopicViewCard = forwardRef (( { color, title, description, date, chart, onClick, btnState, handleQuestionChange}, ref) => {

  return (
    <Card sx={{ height: "100%" }}>
      <Box padding="1rem">
            <Typography variant="button" color="text" fontWeight="light">
            <StyledInput
              label="Question"
              variant="outlined"
              placeholder='Insert your question'
              fullWidth
              id="inputQuestion"
              onChange={handleQuestionChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                  <SearchingButton onClick={onClick} btnState={btnState}/>
                  </InputAdornment>
                ),
              }}
            />
            </Typography>
          </Box>
    </Card>
);
});

TopicViewCard.defaultProps = {
  color: "dark",
  description: "",
};

TopicViewCard.propTypes = {
  color: PropTypes.oneOf(["primary", "secondary", "info", "success", "warning", "error", "dark"]),
  title: PropTypes.string.isRequired,
  description: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  date: PropTypes.string.isRequired,
  chart: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.array, PropTypes.object])).isRequired,
};

export default TopicViewCard;

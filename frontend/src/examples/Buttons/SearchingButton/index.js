import { useState, forwardRef} from "react";
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import SaveIcon from '@mui/icons-material/Save';
import SendIcon from '@mui/icons-material/Send';

const LoadingButtonsTransition = forwardRef (( { onClick, btnState}, ref) => {

  return (
      <Box sx={{ '& > button': { m: 1 } }}>
        <LoadingButton
          size="small"
          endIcon={<SendIcon />}
          loadingPosition="end"
          variant="contained"
          loading={btnState}
          onClick={onClick}
        >
          Send
        </LoadingButton>
      </Box>
);
});

export default LoadingButtonsTransition;

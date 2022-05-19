import React, { Component } from "react";
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import { alpha, styled } from '@mui/material/styles';

const StyledInput = styled(TextField)({
  margin:'20px 0',
  '& input:valid + fieldset': {
    borderColor: 'purple',
    borderWidth: 2,
  },
  '& input:invalid + fieldset': {
    borderColor: 'purple',
    borderWidth: 2,
  },
  '& input:valid:focus + fieldset': {
    borderColor: 'purple',
    borderLeftWidth: 6,
    padding: '4px !important', // override inline-style
  },
});

function QuestionCard({}) {

  return (
    <StyledInput
      label="Question"
      variant="outlined"
      placeholder='Insert your question'
      id="inputEmail"
      fullWidth
      id="inputQuestion"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">

          </InputAdornment>
        ),
      }}
    />

  );}

export default QuestionCard;

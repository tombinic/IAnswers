/**
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useMemo } from "react";

// porp-types is a library for typechecking of props
import PropTypes from "prop-types";
import { useState, forwardRef} from "react";

// react-chartjs-2 components
import { Line } from "react-chartjs-2";

// @mui material components
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Icon from "@mui/material/Icon";
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import { alpha, styled } from '@mui/material/styles';

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// ReportsLineChart configurations
import configs from "examples/Charts/LineCharts/ReportsLineChart/configs";
import SearchingButton from "examples/Buttons/SearchingButton";

const StyledInput = styled(TextField)({
  margin:'20px 0',
  '& input:valid + fieldset': {
    borderColor: 'green',
    borderWidth: 2,
  },
  '& input:invalid + fieldset': {
    borderColor: 'green',
    borderWidth: 2,
  },
  '& input:valid:focus + fieldset': {
    borderColor: 'green',
    borderLeftWidth: 6,
    padding: '4px !important', // override inline-style
  },
});

const ReportsLineChart = forwardRef (( {  color, title, description, date, chart, onClick, btnState, handleQuestionChange}, ref) => {
  const { data, options } = configs(chart.labels || [], chart.datasets || {});

  return (
    <Card sx={{ height: "100%" }}>
      <MDBox padding="1rem">
            <MDTypography variant="button" color="text" fontWeight="light">
            <StyledInput
              label="Question"
              variant="outlined"
              placeholder='Insert your question'
              id="inputEmail"
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
            </MDTypography>
          </MDBox>
    </Card>
);
});

// Setting default values for the props of ReportsLineChart
ReportsLineChart.defaultProps = {
  color: "dark",
  description: "",
};

// Typechecking props for the ReportsLineChart
ReportsLineChart.propTypes = {
  color: PropTypes.oneOf(["primary", "secondary", "info", "success", "warning", "error", "dark"]),
  title: PropTypes.string.isRequired,
  description: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  date: PropTypes.string.isRequired,
  chart: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.array, PropTypes.object])).isRequired,
};

export default ReportsLineChart;

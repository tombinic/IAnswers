import { useMemo,useState } from "react";

import PropTypes from "prop-types";

import { Line } from "react-chartjs-2";

import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Icon from "@mui/material/Icon";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";


function ReportsLineChart({ id, title, description, date , image,reload}) {
  var newImage = (image==null)?"":image;
  var content = null;

  const myComponent = {
      width: '100%',
      height: '200px',
      overflow: 'scroll'
  };

  if(image != null) {
    content= (
      <div id={id}>
        {description}
      </div>
    );
  }
  else {
    content = (
      <div id={id} style={myComponent}>
        {description}
      </div>
    );
  }

  function useForceUpdate(){
    const [value, setValue] = useState(0);
    return () => setValue(value => value + 1);
}




  return (
    <Card sx={{ height: "100%"}}>
      <MDBox padding="1rem">
            <MDBox>
              <img py={2} pr={0.5}  mt={-5} width="100%" src={newImage} />
            </MDBox>
        <MDBox pt={3} pb={1} px={1}>
          <MDTypography variant="h6" textTransform="capitalize">
            {title}
          </MDTypography>
          <MDTypography component="div" variant="button" color="text" fontWeight="light">
    {content}

          </MDTypography>
          <Divider />
          <MDBox display="flex" alignItems="center">
            <MDTypography variant="button" color="text" lineHeight={1} sx={{ mt: 0.15, mr: 0.5 }}>
              <Icon>schedule</Icon>
            </MDTypography>
            <MDTypography variant="button" color="text" fontWeight="light">
              {date}
            </MDTypography>
          </MDBox>
        </MDBox>
      </MDBox>
    </Card>
  );
}

ReportsLineChart.defaultProps = {
  color: "dark",
  description: "",
};

ReportsLineChart.propTypes = {
  color: PropTypes.oneOf(["primary", "secondary", "info", "success", "warning", "error", "dark"]),
  title: PropTypes.string.isRequired,
  description: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  date: PropTypes.string.isRequired,
  chart: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.array, PropTypes.object])).isRequired,
};

export default ReportsLineChart;

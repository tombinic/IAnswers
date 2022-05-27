import PropTypes from "prop-types";
import { forwardRef} from "react";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Icon from "@mui/material/Icon";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

import {
  useMaterialUIController,
  setMiniSidenav,
  setTransparentSidenav,
  setWhiteSidenav,
} from "context";

const ComplexStatisticsCard = forwardRef (({ reload, color, title, count, subtitle, icon, index}, ref ) => {
const [controller, dispatch] = useMaterialUIController();
const { sidenavColor } = controller;
const changeTopic = () => {
  var topics = JSON.parse(localStorage.getItem('topics'));
  var activeTopic = topics.topics[index];
  activeTopic.index = index;
  localStorage.setItem('active-topics', JSON.stringify(activeTopic));
  localStorage.setItem('topics', JSON.stringify(topics));
  reload();
}
  return (
    <Card>
      <MDBox display="flex" justifyContent="space-between" pt={1} px={2}>
        <MDBox
          variant="gradient"
          bgColor={sidenavColor}
          color={color === "light" ? "dark" : "white"}
          coloredShadow={sidenavColor}
          borderRadius="xl"
          display="flex"
          justifyContent="center"
          alignItems="center"
          width="4rem"
          height="4rem"
          mt={-3}
        >
          <Icon fontSize="medium" color="inherit">
            {icon}
          </Icon>
        </MDBox>
        <MDBox textAlign="right" lineHeight={1.25}>
          <MDTypography variant="button" fontWeight="light" color="text">
            {title}
          </MDTypography>
          <MDTypography variant="h4">{count}</MDTypography>
        </MDBox>
      </MDBox>
      <Divider />
      <MDBox pb={2} px={2}>
        <MDTypography component="p" variant="button" color="text" display="flex">
          <MDTypography
            component="span"
            variant="button"
            fontWeight="bold"
            color={sidenavColor}
            onClick={changeTopic}
          ><span style={{cursor: "pointer"}}>{subtitle.label}</span>
          </MDTypography>
          &nbsp;<b> {subtitle.amount}</b>
        </MDTypography>
      </MDBox>
    </Card>
  );
});

ComplexStatisticsCard.defaultProps = {
  color: "info",
  subtitle: {
    color: "success",
    text: "",
    label: "",
  },
};

ComplexStatisticsCard.propTypes = {
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "light",
    "dark",
  ]),
  title: PropTypes.string.isRequired,
  count: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  subtitle: PropTypes.shape({
    color: PropTypes.oneOf([
      "primary",
      "secondary",
      "info",
      "success",
      "warning",
      "error",
      "dark",
      "white",
    ]),
    amount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    label: PropTypes.string,
  }),
  icon: PropTypes.node.isRequired,
};

export default ComplexStatisticsCard;

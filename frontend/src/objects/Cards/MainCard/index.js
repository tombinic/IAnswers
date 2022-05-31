import PropTypes from "prop-types";
import { forwardRef} from "react";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Icon from "@mui/material/Icon";
import Box from "components/Box";
import Typography from "components/Typography";

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
      <Box display="flex" justifyContent="space-between" pt={1} px={2}>
        <Box
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
        </Box>
        <Box textAlign="right" lineHeight={1.25}>
          <Typography variant="button" fontWeight="light" color="text">
            {title}
          </Typography>
          <Typography variant="h4">{count}</Typography>
        </Box>
      </Box>
      <Divider />
      <Box pb={2} px={2}>
        <Typography component="p" variant="button" color="text" display="flex">
          <Typography
            component="span"
            variant="button"
            fontWeight="bold"
            color={sidenavColor}
            onClick={changeTopic}
          ><span style={{cursor: "pointer"}}>{subtitle.label}</span>
          </Typography>
          &nbsp;<b> {subtitle.amount}</b>
        </Typography>
      </Box>
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

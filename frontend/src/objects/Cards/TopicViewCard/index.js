import { useMemo,useState } from "react";

import PropTypes from "prop-types";

import { Line } from "react-chartjs-2";

import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Icon from "@mui/material/Icon";

import Box from "components/Box";
import Typography from "components/Typography";


function TopicViewCard({ id, title, description, subtitle , image,reload}) {
  var newImage = (image==null)?"":image;
  var content = null;

  const myComponent = {
      width: '100%',
      height: '100%',
      maxHeight: '400px',
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
      <Box padding="1rem">
            <Box>
              <img py={2} pr={0.5}  mt={-5} width="100%" src={newImage} />
            </Box>
        <Box pt={3} pb={1} px={1}>
          <Typography variant="h6" textTransform="capitalize">
            {title}
          </Typography>
          <Typography component="div" variant="button" color="text" fontWeight="light">
          {content}

          </Typography>
          <Divider />
          <Box display="flex" alignItems="center">
            <Typography variant="button" color="text" lineHeight={1} sx={{ mt: 0.15, mr: 0.5 }}>
              <Icon>schedule</Icon>
            </Typography>
            <Typography variant="button" color="text" fontWeight="light">
              {subtitle}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Card>
  );
}

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

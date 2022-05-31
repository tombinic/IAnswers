import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Tooltip from "@mui/material/Tooltip";
import Box from "components/Box";
import Typography from "components/Typography";
import Button from "components/Button";
import Avatar from "components/Avatar";

function TopicCard({ image, label, title, description, action, authors, index }) {
  const updateMainTopic = () => {
    var topics = JSON.parse(localStorage.getItem('topics'));
    topics.mainTopic = topics.topics[index];
    topics.mainTopic.index = index;
    localStorage.setItem('active-topics', JSON.stringify(topics.mainTopic));
  }
  const renderAuthors = authors.map(({ image: media, name }) => (
    <Tooltip key={name} title={name} placement="bottom">
      <Avatar
        src={media}
        alt={name}
        size="xs"
        sx={({ borders: { borderWidth }, palette: { white } }) => ({
          border: `${borderWidth[2]} solid ${white.main}`,
          cursor: "pointer",
          position: "relative",
          ml: -1.25,

          "&:hover, &:focus": {
            zIndex: "10",
          },
        })}
      />
    </Tooltip>
  ));

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "transparent",
        boxShadow: "none",
        overflow: "visible",
      }}
    >
      <Box position="relative" width="100.25%" shadow="xl" borderRadius="xl">
        <CardMedia
          src={image}
          component="img"
          title={title}
          sx={{
            maxWidth: "100%",
            margin: 0,
            boxShadow: ({ boxShadows: { md } }) => md,
            objectFit: "cover",
            objectPosition: "center",
          }}
        />
      </Box>
      <Box mt={1} mx={0.5}>
        <Typography variant="button" fontWeight="regular" color="text" textTransform="capitalize">
          {label}
        </Typography>
        <Box mb={1}>
          {action.type === "internal" ? (
            <Typography
              component={Link}
              to={action.route}
              variant="h5"
              textTransform="capitalize"
            >
              {title}
            </Typography>
          ) : (
            <Typography
              component="a"
              href={action.route}
              target="_blank"
              rel="noreferrer"
              variant="h5"
              textTransform="capitalize"
            >
              {title}
            </Typography>
          )}
        </Box>
        <Box mb={3} lineHeight={0}>
          <Typography variant="button" fontWeight="light" color="text">
            {description}
          </Typography>
        </Box>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          {action.type === "internal" ? (
            <Button
              component={Link}
              to={action.route}
              variant="outlined"
              size="small"
              color={action.color}
              onClick={updateMainTopic}
            >
              {action.label}
            </Button>
          ) : (
            <Button
              component="a"
              href={action.route}
              target="_blank"
              rel="noreferrer"
              variant="outlined"
              size="small"
              color={action.color}
            >
              {action.label}
            </Button>
          )}
          <Box display="flex">{renderAuthors}</Box>
        </Box>
      </Box>
    </Card>
  );
}

TopicCard.defaultProps = {
  authors: [],
};

TopicCard.propTypes = {
  image: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  action: PropTypes.shape({
    type: PropTypes.oneOf(["external", "internal"]),
    route: PropTypes.string.isRequired,
    color: PropTypes.oneOf([
      "primary",
      "secondary",
      "info",
      "success",
      "warning",
      "error",
      "light",
      "dark",
      "white",
    ]).isRequired,
    label: PropTypes.string.isRequired,
  }).isRequired,
  authors: PropTypes.arrayOf(PropTypes.object),
};

export default TopicCard;

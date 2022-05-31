import Box from "components/Box";
import Typography from "components/Typography";
import Avatar from "components/Avatar";

import LogoTopics from "assets/images/small-logos/topics.svg";
import LogoTexts from "assets/images/small-logos/texts.svg";
import LogoTitles from "assets/images/small-logos/titles.svg";
import LogoUser from "assets/images/small-logos/user.svg";

export default function data() {
    const user = JSON.parse(localStorage.getItem('auth'));
    var userApi = "http://localhost:3005/api/" + user.username;
  const Project = ({ image, name }) => (
    <Box display="flex" alignItems="center" lineHeight={1}>
      <Avatar src={image} name={name} size="sm" variant="rounded" />
      <Typography display="block" variant="button" fontWeight="medium" ml={1} lineHeight={1}>
        {name}
      </Typography>
    </Box>
  );

  return {
    columns: [
      { Header: "API", accessor: "project", width: "30%", align: "left" },
      { Header: "Description", accessor: "desc", align: "left" },
      { Header: "status", accessor: "status", align: "center" },
      { Header: "complete url", accessor: "complete_url", align: "center" },
    ],

    rows: [
      {
        project: <Project image={LogoTopics} name="Topics" />,
        desc: (
          <Typography component="a" variant="caption" color="text" fontWeight="medium">
            A complete list of topic in IAnswers
          </Typography>
        ),
        status: (
          <Typography component="a" variant="caption" color="text" fontWeight="medium">
            online
          </Typography>
        ),
        complete_url: (
          <Typography component="a" href="http://localhost:3005/api/topics" target="_blank" variant="button" color="text" fontWeight="medium">
            api/topics
          </Typography>
        ),
      },
      {
        project: <Project image={LogoTitles} name="Topics" />,
        desc: (
          <Typography component="a" variant="caption" color="text" fontWeight="medium">
            A complete list of topics' titles in IAnswers
          </Typography>
        ),
        status: (
          <Typography component="a" variant="caption" color="text" fontWeight="medium">
            online
          </Typography>
        ),
        complete_url: (
          <Typography component="a" href="http://localhost:3005/api/topics/titles" target="_blank" variant="button" color="text" fontWeight="medium">
            api/topics/titles
          </Typography>
        ),
      },
      {
        project: <Project image={LogoTexts} name="Topics" />,
        desc: (
          <Typography component="a" variant="caption" color="text" fontWeight="medium">
            A complete list of topics' texts in IAnswers
          </Typography>
        ),
        status: (
          <Typography component="a" variant="caption" color="text" fontWeight="medium">
            online
          </Typography>
        ),
        complete_url: (
          <Typography component="a" href="http://localhost:3005/api/topics/texts" target="_blank" variant="button" color="text" fontWeight="medium">
            api/topics/texts
          </Typography>
        ),
      },
      {
        project: <Project image={LogoUser} name="User" />,
        desc: (
          <Typography component="a" variant="caption" color="text" fontWeight="medium">
            All information about you!
          </Typography>
        ),
        status: (
          <Typography component="a" variant="caption" color="text" fontWeight="medium">
            online
          </Typography>
        ),
        complete_url: (
          <Typography component="a"  href={userApi} target="_blank" variant="button" color="text" fontWeight="medium">
            api/user
          </Typography>
        ),
      },
    ],
  };
}

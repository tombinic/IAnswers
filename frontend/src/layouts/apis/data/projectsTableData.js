import Icon from "@mui/material/Icon";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";

import LogoAsana from "assets/images/small-logos/logo-asana.svg";
import logoGithub from "assets/images/small-logos/github.svg";
import logoAtlassian from "assets/images/small-logos/logo-atlassian.svg";
import logoSlack from "assets/images/small-logos/logo-slack.svg";
import logoSpotify from "assets/images/small-logos/logo-spotify.svg";
import logoInvesion from "assets/images/small-logos/logo-invision.svg";

export default function data() {
    const user = JSON.parse(localStorage.getItem('auth'));
    var userApi = "http://localhost:3005/api/" + user.email;
  const Project = ({ image, name }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={image} name={name} size="sm" variant="rounded" />
      <MDTypography display="block" variant="button" fontWeight="medium" ml={1} lineHeight={1}>
        {name}
      </MDTypography>
    </MDBox>
  );

  const Progress = ({ color, value }) => (
    <MDBox display="flex" alignItems="center">
      <MDTypography variant="caption" color="text" fontWeight="medium">
        {value}%
      </MDTypography>

    </MDBox>
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
        project: <Project image={LogoAsana} name="Topics" />,
        desc: (
          <MDTypography component="a" variant="caption" color="text" fontWeight="medium">
            A complete list of topic in IAnswers
          </MDTypography>
        ),
        status: (
          <MDTypography component="a" variant="caption" color="text" fontWeight="medium">
            online
          </MDTypography>
        ),
        complete_url: (
          <MDTypography component="a" href="http://localhost:3005/api/topics" target="_blank" variant="button" color="text" fontWeight="medium">
            api/topics
          </MDTypography>
        ),
      },
      {
        project: <Project image={logoGithub} name="User" />,
        desc: (
          <MDTypography component="a" variant="caption" color="text" fontWeight="medium">
            All information about you!
          </MDTypography>
        ),
        status: (
          <MDTypography component="a" variant="caption" color="text" fontWeight="medium">
            online
          </MDTypography>
        ),
        complete_url: (
          <MDTypography component="a"  href={userApi} target="_blank" variant="button" color="text" fontWeight="medium">
            api/user
          </MDTypography>
        ),
      },
    ],
  };
}

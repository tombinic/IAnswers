import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ProfileInfoCard from "examples/Cards/InfoCards/ProfileInfoCard";
import DefaultProjectCard from "examples/Cards/ProjectCards/DefaultProjectCard";
import Header from "layouts/profile/components/Header";
import {forwardRef, React} from "react";

const Overview = forwardRef(( { auth }, ref) => {
  const topics = JSON.parse(localStorage.getItem('topics'));
  var topicsList = [];
  topicsList = (topics!=null)?topics.topics.map((element, index) =>
  <Grid item xs={12} md={6} xl={3}>
    <DefaultProjectCard
      image={(topics==null)?"":element.blob}
      label={element.topic}
      title={element.title}
      description={element.summary}
      action={{
        type: "internal",
        route: "/dashboard",
        color: "info",
        label: "Go to topic",
      }}
      index={index}
    />
  </Grid>):[];
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mb={2} />
      <Header auth={auth}>
        <MDBox mt={5} mb={12}>
          <Grid container spacing={1}>
            <Grid item xs={12} md={6} xl={12} sx={{ display: "flex" }}>
              <ProfileInfoCard
                title="profile information"
                description={auth.motto}
                info={{
                  surname: auth.surname,
                  name: auth.name,
                  email: auth.email,
                  location: "ITA",
                }}
                action={{ route: "", tooltip: "Edit Profile" }}
                shadow={false}
              />
            </Grid>
          </Grid>
        </MDBox>
        <MDBox pt={2} px={2} lineHeight={1.25}>
          <MDTypography variant="h6" fontWeight="medium">
            Topics
          </MDTypography>
          <MDBox mb={1}>
            <MDTypography variant="button" color="text">
              All topics in our website!
            </MDTypography>
          </MDBox>
        </MDBox>
        <MDBox p={2}>
          <Grid container spacing={6}>
          {topicsList}
          </Grid>
        </MDBox>
      </Header>
      <Footer />
    </DashboardLayout>
    );
  });

export default Overview;
